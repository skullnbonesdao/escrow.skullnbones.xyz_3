<script setup lang="ts">
import EscrowTable from 'components/tables/EscrowTable.vue';
import { onMounted } from 'vue';
import { useEscrowStore } from 'stores/escrowStore';
import { useGlobalStore } from 'stores/globalStore';
import { useWallet } from 'solana-wallets-vue';

onMounted(() => {
  useEscrowStore().escrows_filtered = useEscrowStore().escrows?.filter(
        (escrow) =>
            escrow.account.maker.toString() ==
            useWallet().publicKey.value?.toString()
    );
});
</script>

<template>
    <q-card class="full-width">
        <q-card-section class="q-gutter-y-xs">
            <p class="text-center text-h4 text-uppercase">Edit Escrow</p>
        </q-card-section>
        <q-card-section>
            <EscrowTable />
        </q-card-section>
    </q-card>
</template>

<style scoped></style>
