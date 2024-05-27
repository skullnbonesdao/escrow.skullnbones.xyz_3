<script setup lang="ts">
import { onMounted, watch, computed } from 'vue';
import { useGlobalStore } from 'stores/globalStore';
import { copy_to_clipboard } from 'src/functions/copy_to_clipboard';
import { format_address } from '../functions/format_address';
import { PublicKey } from '@solana/web3.js';
import { useRoute } from 'vue-router';
import EscrowTakeView from 'components/views/EscrowTakeView.vue';
import { useEscrowStore } from 'stores/escrowStore';

onMounted(() => {
  useGlobalStore().showLeftDrawer = false;
  useGlobalStore().showRightDrawer = false;
});

onMounted(async () => {
  const address = new PublicKey(useRoute().params.account);
  await useEscrowStore().load_escrow(address);
});

watch(
  () => useRoute()?.params,
  async () => {
    const address = new PublicKey(useRoute().params.account);
    await useEscrowStore().load_escrow(address);
  },
);

watch(
  () => useGlobalStore().showRightDrawer,
  async () => {
    useGlobalStore().showRightDrawer = false;
  },
);
</script>

<template>
  <q-page class="row q-pa-sm justify-center">
    <q-card class="full-width" style="max-width: 600px" bordered>
      <q-card-section class="row q-gutter-x-sm items-center">
        <p class="text-h4 q-pa-sm">Offer</p>
        <q-space />
        <p
          class="text-h6"
          @click="
            copy_to_clipboard(
              useEscrowStore().escrow_selected?.publicKey.toString() ??
                'not-found',
            )
          "
        >
          {{
            format_address(
              useEscrowStore().escrow_selected?.publicKey.toString(),
              5,
            ) ?? 'not-found'.toUpperCase()
          }}
        </p>
        <q-space />
        <q-btn
          @click="
            copy_to_clipboard(
              'https://escrow.skullnbones.xyz/#/details/' +
                useEscrowStore().escrow_selected?.publicKey.toString() ??
                'not-found',
            )
          "
          color="secondary"
          size="lg"
          icon="share"
        >
          <q-tooltip>Copy direct link</q-tooltip>
        </q-btn>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <EscrowTakeView />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<style scoped lang="sass"></style>
