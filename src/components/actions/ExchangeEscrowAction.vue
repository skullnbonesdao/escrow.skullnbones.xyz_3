<script setup lang="ts">
import { useWallet, WalletMultiButton } from 'solana-wallets-vue';
import { useWorkspace } from 'src/adapter/adapterPrograms';
import { useQuasar } from 'quasar';
import { useEscrowStore } from 'stores/escrowStore';
import { PublicKey } from '@solana/web3.js';
//import { ASSOCIATED_TOKEN_PROGRAM_ID, getAssociatedTokenAddressSync, TOKEN_PROGRAM_ID } from '@solana/spl-token';

const q = useQuasar();

async function buildTransaction() {
  const ws = useWorkspace();
  const pg_escrow = ws?.pg_escrow;

  let notification_process = q.notify({
    group: false,
    timeout: 0,
    spinner: true,
    message: 'Preparing transaction...',

  });

  try {
    if(useEscrowStore().escrow_selected){

    // const escrow_account = await pg_escrow?.value.account.escrow.fetch(
    //   useEscrowStore().escrow_selected?.publicKey.toString() ?? ''
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

      // const maker_receive_ata = getAssociatedTokenAddressSync(
      //   new PublicKey(useEscrowStore().escrow_selected?.account.requestToken ?? ""),
      //   <PublicKey>useEscrowStore().escrow_selected?.account.maker,
      //   undefined,
      //   TOKEN_PROGRAM_ID,
      //   ASSOCIATED_TOKEN_PROGRAM_ID,
      // );

    }
  }
  catch (err) {
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
