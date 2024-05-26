<script setup lang="ts">
import { useWallet, WalletMultiButton } from 'solana-wallets-vue';
import {
  Connection,
  PublicKey,
  SystemProgram,
  Transaction,
} from '@solana/web3.js';
import { waitForTransactionConfirmation } from 'src/functions/wait_for_transaction_confirmation';
import { useGlobalStore } from 'stores/globalStore';
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

const q = useQuasar();
const props = defineProps(['label']);

async function buildTransaction() {
  const ws = useWorkspace();
  const { sendTransaction } = useWallet();
  const pg_escrow = ws?.pg_escrow;

  let notification_process: any;

  notification_process = q.notify({
    group: false, // required to be updatable
    timeout: 0, // we want to be in control when it gets dismissed
    spinner: true,
    message: 'Sending TX...',
  });

  try {
    let transaction = new Transaction();

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

    if (escrow_transaction) transaction.add(escrow_transaction);

    const signature = await sendTransaction(
      transaction,
      useGlobalStore().connection as Connection,
    );

    await waitForTransactionConfirmation(
      useGlobalStore().connection as Connection,
      signature,
    );

    console.log(signature);

    notification_process({
      type: 'positive',
      icon: 'done', // we add an icon
      spinner: false, // we reset the spinner setting so the icon can be displayed
      message: 'Transaction confirmed!',
      timeout: 2500, // we will timeout it in 2.5s
    });
  } catch (err: any) {
    console.error(err);

    notification_process({
      type: 'negative',
      icon: 'error', // we add an icon
      spinner: false, // we reset the spinner setting so the icon can be displayed
      message: err.toString(),
      timeout: 5000, // we will timeout it in 2.5s
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
