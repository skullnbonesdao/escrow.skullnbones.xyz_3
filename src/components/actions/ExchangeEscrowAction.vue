<script setup lang="ts">
import { useWallet, WalletMultiButton } from 'solana-wallets-vue';
import { useWorkspace } from 'src/adapter/adapterPrograms';
import { useQuasar } from 'quasar';
import { useEscrowStore } from 'stores/escrowStore';
import {
  ComputeBudgetProgram,
  Connection,
  PublicKey,
  SystemProgram,
  Transaction,
} from '@solana/web3.js';
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  getAssociatedTokenAddressSync,
  TOKEN_PROGRAM_ID,
} from '@solana/spl-token';
import {
  check_ata_exists,
  make_ata_instruction,
} from 'src/functions/check_and_make_ata';
import { ui2amount } from 'src/functions/token_deciaml_convert';
import BN from 'bn.js';
import { FEE_ACCOUNT } from 'stores/constants';
import { useGlobalStore } from 'stores/globalStore';
import { waitForTransactionConfirmation } from 'src/functions/wait_for_transaction_confirmation';
import { get_token_amount_wallet, userTokenStore } from 'stores/userTokenStore';

const q = useQuasar();
const props = defineProps(['exchange_amount']);

async function buildTransaction() {
  const ws = useWorkspace();
  const { sendTransaction } = useWallet();
  const pg_escrow = ws?.pg_escrow;

  if (
    get_token_amount_wallet(
      useEscrowStore().escrow_selected?.account.requestToken.toString() ?? '',
    ) < props.exchange_amount
  ) {
    console.log('BBB');
    q.notify({
      message: `You dont have enough '${useGlobalStore().token_list.find(
        (t) =>
          t.address ==
          useEscrowStore().escrow_selected?.account.requestToken.toString(),
      )?.name}' to fill the trade!`,
      color: 'info',
    });
    return;
  }

  let notification_process = q.notify({
    group: false,
    timeout: 0,
    spinner: true,
    message: 'Preparing transaction...',
  });

  try {
    if (useEscrowStore().escrow_selected) {
      let transaction = new Transaction();

      // transaction.add(
      //   ComputeBudgetProgram.setComputeUnitLimit({
      //     units: 70000,
      //   }),
      // );

      const seed = useEscrowStore().escrow_selected!.account.seed;
      const creator = useEscrowStore().escrow_selected!.account.maker;

      const escrow = PublicKey.findProgramAddressSync(
        [
          Buffer.from('escrow'),
          creator.toBytes(),
          seed.toArrayLike(Buffer).reverse(),
        ],
        <PublicKey>pg_escrow?.value.programId,
      )[0];

      const vault = PublicKey.findProgramAddressSync(
        [Buffer.from('vault'), escrow.toBuffer()],
        <PublicKey>pg_escrow?.value.programId,
      )[0];

      const auth = PublicKey.findProgramAddressSync(
        [Buffer.from('auth'), escrow.toBuffer()],
        <PublicKey>pg_escrow?.value.programId,
      )[0];

      const maker_receive_ata = getAssociatedTokenAddressSync(
        new PublicKey(
          useEscrowStore().escrow_selected?.account.requestToken ?? '',
        ),
        <PublicKey>useEscrowStore().escrow_selected?.account.maker,
        undefined,
        TOKEN_PROGRAM_ID,
        ASSOCIATED_TOKEN_PROGRAM_ID,
      );

      const taker_request_ata = getAssociatedTokenAddressSync(
        new PublicKey(
          useEscrowStore().escrow_selected?.account.depositToken ?? '',
        ),
        useWallet().publicKey.value as PublicKey,
        undefined,
        TOKEN_PROGRAM_ID,
        ASSOCIATED_TOKEN_PROGRAM_ID,
      );

      if (
        !(await check_ata_exists(
          new PublicKey(
            useEscrowStore().escrow_selected?.account.depositToken ?? '',
          ),
          useWallet().publicKey.value!,
        ))
      ) {
        transaction.add(
          make_ata_instruction(
            taker_request_ata,
            new PublicKey(
              useEscrowStore().escrow_selected?.account.depositToken ?? '',
            ),
          ),
        );
      }

      const taker_deposit_ata = getAssociatedTokenAddressSync(
        new PublicKey(
          useEscrowStore().escrow_selected?.account.requestToken ?? '',
        ),
        useWallet().publicKey.value as PublicKey,
        undefined,
        TOKEN_PROGRAM_ID,
        ASSOCIATED_TOKEN_PROGRAM_ID,
      );

      if (
        !(await check_ata_exists(
          new PublicKey(
            useEscrowStore().escrow_selected?.account.requestToken ?? '',
          ),
          useWallet().publicKey.value!,
        ))
      ) {
        transaction.add(
          make_ata_instruction(
            taker_deposit_ata,
            new PublicKey(
              useEscrowStore().escrow_selected?.account.requestToken ?? '',
            ),
          ),
        );
      }

      const exchange_amount = await ui2amount(
        new PublicKey(
          useEscrowStore().escrow_selected?.account.depositToken ?? '',
        ),
        props.exchange_amount,
      );
      console.log(`exchange_amount: ${exchange_amount}`);

      let whitelistProgram = null;
      let whitelist = null;
      let entry = null;

      let escrow_transaction = await pg_escrow?.value.methods
        .exchange(new BN(exchange_amount))
        .accounts({
          taker: new PublicKey(useWallet().publicKey?.value ?? ''),
          takerAta: taker_deposit_ata,
          takerReceiveAta: taker_request_ata,
          requestToken: useEscrowStore().escrow_selected?.account.requestToken,
          maker: useEscrowStore().escrow_selected?.account.maker,
          makerReceiveAta: maker_receive_ata,
          depositToken: useEscrowStore().escrow_selected?.account.depositToken,
          auth: auth,
          escrow: escrow,
          vault: vault,
          tokenProgram: TOKEN_PROGRAM_ID,
          associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
          systemProgram: SystemProgram.programId,
          fee: FEE_ACCOUNT,
          whitelistProgram,
          whitelist,
          entry,
        })
        .transaction();

      if (escrow_transaction) transaction.add(escrow_transaction);

      // const units = await getSimulationComputeUnits(
      //   useGlobalStore().connection as Connection,
      //   transaction.instructions,
      //   useWallet().publicKey.value ?? new PublicKey(''),
      //   [],
      // );

      // console.log(units);

      const signature = await sendTransaction(
        transaction,
        useGlobalStore().connection as Connection,
      );

      await waitForTransactionConfirmation(
        useGlobalStore().connection as Connection,
        signature,
      );

      console.log(signature);
    }
  } catch (err: any) {
    notification_process({
      type: 'negative',
      icon: 'error',
      spinner: false,
      message: err.toString(),
      timeout: 5000,
    });
    console.error(err);
  }
}
</script>

<template>
  <div
    v-if="!useWallet().publicKey.value"
    class="row justify-center bg-secondary"
  >
    <WalletMultiButton dark />
  </div>
  <q-btn
    v-else
    color="secondary "
    class="full-width"
    label="Exchange"
    @click="buildTransaction().then(() => {})"
  ></q-btn>
</template>

<style scoped lang="sass"></style>
