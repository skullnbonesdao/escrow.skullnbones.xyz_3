<script setup lang="ts">
import { useWallet, WalletMultiButton } from 'solana-wallets-vue';
import { useQuasar } from 'quasar';
import { useWorkspace } from 'src/adapter/adapterPrograms';
import * as anchor from '@coral-xyz/anchor';

import {
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
import { useEscrowStore } from 'stores/escrowStore';
import {
  check_ata_exists,
  make_ata_instruction,
} from 'src/functions/check_and_make_ata';
import { FEE_ACCOUNT, WHITELIST_PROGRAM_ID } from 'stores/constants';
import { waitForTransactionConfirmation } from 'src/functions/wait_for_transaction_confirmation';
import { useWhitelistStore } from 'stores/whitelistStore';
import { useRPCStore } from 'stores/rpcStore';

const q = useQuasar();

async function buildTransaction() {
  const ws = useWorkspace();
  const { sendTransaction } = useWallet();
  const pg_escrow = ws?.pg_escrow;

  setTimeout(() => {
    q.notify({
      group: false,
      spinner: true,
      message: 'Waiting for user to sign...',
    });
  }, 2000);

  try {
    let transaction = new Transaction();

    const seed = new anchor.BN(
      window.crypto.getRandomValues(new Uint8Array(8)),
    );

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
      new PublicKey(useEscrowStore().new_escrow.deposit_token.address),
      useWallet().publicKey.value as PublicKey,
      undefined,
      TOKEN_PROGRAM_ID,
      ASSOCIATED_TOKEN_PROGRAM_ID,
    );

    if (
      !(await check_ata_exists(
        new PublicKey(useEscrowStore().new_escrow.deposit_token.address),
        useWallet().publicKey.value!,
      ))
    ) {
      transaction.add(
        make_ata_instruction(
          maker_ata,
          new PublicKey(useEscrowStore().new_escrow.deposit_token.address),
        ),
      );
    }

    const maker_ata_request = getAssociatedTokenAddressSync(
      new PublicKey(useEscrowStore().new_escrow.request_token.address),
      useWallet().publicKey.value as PublicKey,
      undefined,
      TOKEN_PROGRAM_ID,
      ASSOCIATED_TOKEN_PROGRAM_ID,
    );

    if (
      !(await check_ata_exists(
        new PublicKey(useEscrowStore().new_escrow.request_token.address),
        useWallet().publicKey.value!,
      ))
    ) {
      transaction.add(
        make_ata_instruction(
          maker_ata_request,
          new PublicKey(useEscrowStore().new_escrow.request_token.address),
        ),
      );
    }

    const recipient = useEscrowStore().new_escrow.only_recipient
      ? useEscrowStore().new_escrow.recipient_address
      : null;

    let whitelistProgram = null;
    let whitelist = null;
    let entry = null;

    if (useWhitelistStore().is_whitelisted) {
      whitelistProgram = WHITELIST_PROGRAM_ID;
      whitelist = useWhitelistStore().whitelist_account;
      entry = useWhitelistStore().entry_account;
    }

    console.info(useEscrowStore().new_escrow);

    let escrow_transaction = await pg_escrow?.value.methods
      .initialize(
        seed,
        new anchor.BN(
          (
            useEscrowStore().new_escrow.deposit_amount *
            10 ** useEscrowStore().new_escrow.deposit_token.decimals
          ).toFixed(0),
        ),
        new anchor.BN(
          (
            useEscrowStore().new_escrow.request_amount *
            10 ** useEscrowStore().new_escrow.request_token.decimals
          ).toFixed(0),
        ),
        new anchor.BN(useEscrowStore().new_escrow.closing_timestamp),
        useEscrowStore().new_escrow.allow_partial_fill as any,
        useEscrowStore().new_escrow.only_whitelist as any,
        (useEscrowStore().new_escrow.allow_partial_fill as any)
          ? (useEscrowStore().new_escrow.slippage as any)
          : 0,
      )
      .accounts({
        maker: useWallet().publicKey!.value,
        makerAta: maker_ata,
        recipient: recipient,
        depositToken: new PublicKey(
          useEscrowStore().new_escrow.deposit_token.address,
        ),
        requestToken: new PublicKey(
          useEscrowStore().new_escrow.request_token.address,
        ),
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
      icon: 'info',
      spinner: false,
      message: 'Transaction confirmed!',
      timeout: 5000,
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
    :disable="
      !useEscrowStore().new_escrow.request_token ||
      !useEscrowStore().new_escrow.deposit_token ||
      useEscrowStore().new_escrow.request_amount <= 0 ||
      useEscrowStore().new_escrow.deposit_amount <= 0
    "
    @click="buildTransaction().then(() => {})"
    v-else
    class="full-width"
    :label="useWhitelistStore().is_whitelisted ? 'Create as Member' : 'Create'"
    color="secondary"
  >
  </q-btn>
</template>

<style scoped lang="sass"></style>
