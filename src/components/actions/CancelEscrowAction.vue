<script setup lang="ts">
import { useWallet, WalletMultiButton } from 'solana-wallets-vue';
import {
  Connection,
  PublicKey,
  SystemProgram,
  Transaction,
} from '@solana/web3.js';
import { waitForTransactionConfirmation } from 'src/functions/wait_for_transaction_confirmation';
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  getAssociatedTokenAddressSync,
  TOKEN_PROGRAM_ID,
} from '@solana/spl-token';
import { useQuasar } from 'quasar';
import { useWorkspace } from 'src/adapter/adapterPrograms';
import { useEscrowStore } from 'stores/escrowStore';
import {
  check_ata_exists,
  make_ata_instruction,
} from 'src/functions/check_and_make_ata';
import { useRPCStore } from 'stores/rpcStore';

const q = useQuasar();
const props = defineProps(['label', 'escrow_address']);

async function buildTransaction() {
  const ws = useWorkspace();
  const { sendTransaction } = useWallet();
  const pg_escrow = ws?.pg_escrow;

  let notification_process: any;

  setTimeout(() => {
    q.notify({
      group: false,
      spinner: true,
      message: 'Waiting for user to sign...',
    });
  }, 2000);

  try {
    let transaction = new Transaction();

    if (props.escrow_address) {
      await useEscrowStore().load_escrow(new PublicKey(props.escrow_address));
    }

    const escrow_account = await pg_escrow?.value.account.escrow.fetch(
      useEscrowStore().escrow_selected?.publicKey ?? '',
    );

    const seed = useEscrowStore().escrow_selected!.account.seed;

    const escrow = PublicKey.findProgramAddressSync(
      [
        Buffer.from('escrow'),
        useWallet().publicKey.value!.toBytes(),
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

    const maker_ata = getAssociatedTokenAddressSync(
      <PublicKey>useEscrowStore().escrow_selected?.account.depositToken,
      useWallet().publicKey.value as PublicKey,
      undefined,
      TOKEN_PROGRAM_ID,
      ASSOCIATED_TOKEN_PROGRAM_ID,
    );

    if (
      !(await check_ata_exists(
        <PublicKey>useEscrowStore().escrow_selected?.account.depositToken,
        useWallet().publicKey.value!,
      ))
    ) {
      transaction.add(
        make_ata_instruction(
          maker_ata,
          new PublicKey(
            useEscrowStore().escrow_selected?.account.depositToken ?? '',
          ),
        ),
      );
    }

    const maker_ata_request = getAssociatedTokenAddressSync(
      <PublicKey>useEscrowStore().escrow_selected?.account.requestToken,
      <PublicKey>useWallet().publicKey.value,
      undefined,
      TOKEN_PROGRAM_ID,
      ASSOCIATED_TOKEN_PROGRAM_ID,
    );

    if (
      !(await check_ata_exists(
        <PublicKey>useEscrowStore().escrow_selected?.account.requestToken,
        useWallet().publicKey.value!,
      ))
    ) {
      transaction.add(
        make_ata_instruction(
          maker_ata,
          <PublicKey>useEscrowStore().escrow_selected?.account.requestToken,
        ),
      );
    }

    let escrow_transaction = await pg_escrow?.value.methods
      .cancel()
      .accounts({
        maker: useWallet().publicKey!.value,
        makerAta: maker_ata,
        depositToken: useEscrowStore().escrow_selected?.account.depositToken,
        makerAtaRequest: maker_ata_request,
        makerTokenRequest:
          useEscrowStore().escrow_selected?.account.requestToken,
        auth: auth,
        escrow: escrow,
        vault: vault,
        tokenProgram: TOKEN_PROGRAM_ID,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        systemProgram: SystemProgram.programId,
      })
      .transaction();

    if (escrow_transaction) transaction.add(await escrow_transaction);

    const signature = await sendTransaction(
      transaction,
      useRPCStore().connection as Connection,
    );

    await waitForTransactionConfirmation(
      useRPCStore().connection as Connection,
      signature,
    );

    console.log(signature);

    q.notify({
      type: 'positive',
      icon: 'done',
      spinner: false,
      message: 'Transaction confirmed!',
      timeout: 2500,
    });
    await useEscrowStore().load_all_escrows();
  } catch (err: any) {
    console.error(err);

    q.notify({
      type: 'negative',
      icon: 'error',
      spinner: false,
      message: err.toString(),
      timeout: 5000,
    });
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
    @click="buildTransaction().then(() => {})"
    v-else
    dense
    :label="props.label"
    color="secondary"
    icon="highlight_off"
  >
    <q-tooltip> Cancel/Close escrow </q-tooltip>
  </q-btn>
</template>

<style scoped lang="sass"></style>
