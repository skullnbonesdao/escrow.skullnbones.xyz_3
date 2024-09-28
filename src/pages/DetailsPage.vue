<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { useGlobalStore } from 'stores/globalStore';
import { copy_to_clipboard } from 'src/functions/copy_to_clipboard';
import { format_address } from '../functions/format_address';
import { PublicKey } from '@solana/web3.js';
import { useRoute, useRouter } from 'vue-router';
import EscrowTakeView from 'components/views/EscrowTakeView.vue';
import { useEscrowStore } from 'stores/escrowStore';
import { useQuasar } from 'quasar';

const route = useRoute();
const address = route.params.account;

onMounted(async () => {
  useGlobalStore().showLeftDrawer = false;
  useGlobalStore().showRightDrawer = false;
  await useEscrowStore().load_escrow(new PublicKey(address));
});

const router = useRouter();

watch(
  () => useGlobalStore().showRightDrawer,
  async () => {
    useGlobalStore().showRightDrawer = false;
  },
);
</script>

<template>
  <q-page
    class="row justify-center"
    :class="useQuasar().screen.lt.md ? '' : 'q-pa-md'"
  >
    <q-card
      class="full-width"
      style="max-width: 600px"
      :square="useQuasar().screen.lt.md"
      flat
    >
      <q-card-section class="row items-center">
        <q-btn
          size="lg"
          icon="arrow_back"
          color="primary"
          @click="router.back()"
        ></q-btn>
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
          color="primary"
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
