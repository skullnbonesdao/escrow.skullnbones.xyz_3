<script setup lang="ts">
import EscrowTable from 'components/tables/EscrowTable.vue';
import { onMounted } from 'vue';
import { useEscrowStore } from 'stores/escrowStore';
import { useWallet, WalletMultiButton } from 'solana-wallets-vue';

onMounted(() => {
  useEscrowStore().escrows_filtered = useEscrowStore().escrows?.filter(
    (escrow) =>
      escrow.account.maker.toString() ==
      useWallet().publicKey.value?.toString(),
  );
});
</script>

<template>
  <q-card class="full-width">
    <q-card-section class="q-gutter-y-xs">
      <p class="text-center text-h4 text-uppercase">Manage your escrows</p>
    </q-card-section>
    <q-card-section>
      <div
        v-if="!useWallet().publicKey.value"
        class="row justify-center bg-secondary"
      >
        <WalletMultiButton dark />
      </div>
      <EscrowTable v-else />
    </q-card-section>
  </q-card>
</template>

<style scoped></style>
