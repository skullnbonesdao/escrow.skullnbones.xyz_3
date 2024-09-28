<template>
  <q-layout view="hHh lpr fFf">
    <q-header class="bg-dark">
      <q-toolbar
        :class="useQuasar().screen.lt.md || 'justify-center'"
        class="row q-pa-none"
      >
        <q-btn
          :class="useWhitelistStore().is_whitelisted ? 'bg-primary' : ''"
          flat
          square
          no-caps
          to="/"
          class="justify-center"
        >
          <q-toolbar-title>
            <q-avatar>
              <q-img src="logo.svg" />
            </q-avatar>
            Escrow Service
          </q-toolbar-title>
        </q-btn>
      </q-toolbar>

      <div class="absolute" style="top: 0px; right: -0px">
        <WalletMultiButton class="col" dark />
      </div>

      <q-tabs align="left" inline-label>
        <q-route-tab icon="countertops" to="/exchange" label="Exchange" />
        <q-route-tab icon="design_services" to="/manage" label="Manage" />
        <q-route-tab label="FAQ" icon="quiz" to="/faq" />
      </q-tabs>
      <q-separator />
    </q-header>

    <q-drawer
      :mini="useGlobalStore().leftDrawerMini"
      show-if-above
      v-if="useGlobalStore().showLeftDrawer"
      side="left"
      @click.capture="leftDrawerClick"
    >
      <div class="col-2 text-h5 q-ma-sm text-center">Filter</div>
      <q-separator />
      <FilterEscrows2 />
    </q-drawer>

    <q-drawer
      width="450"
      show-if-above
      v-if="useGlobalStore().showRightDrawer"
      side="right"
    >
      <div class="q-mb-xs">
        <q-tabs>
          <q-tab
            @click="useGlobalStore().showRightDrawer = false"
            icon="chevron_right"
          ></q-tab>
          <q-separator vertical />
          <q-route-tab
            icon="aspect_ratio"
            :to="
              '/details/' +
              useEscrowStore().escrow_selected?.publicKey.toString()
            "
            exact
          />
          <q-separator vertical />
          <q-tab
            ripple="false"
            @click="
              copy_to_clipboard(
                'https://escrow.skullnbones.xyz/#/details/' +
                  useEscrowStore().escrow_selected?.publicKey.toString() ??
                  'not-found',
              )
            "
            icon="share"
          ></q-tab>
        </q-tabs>
        <q-separator />
      </div>
      <EscrowTakeView />

      <!--      <div class="q-mini-drawer-hide absolute" style="top: 10px; left: -17px">-->
      <!--        <q-btn-->
      <!--          dense-->
      <!--          round-->
      <!--          unelevated-->
      <!--          color="accent"-->
      <!--          icon="chevron_right"-->
      <!--          @click="useGlobalStore().showRightDrawer = false"-->
      <!--        />-->
      <!--      </div>-->
    </q-drawer>

    <q-page-container>
      <DisclaimerDialog class="col-1" />
      <RPCDialog v-if="useRPCStore().show_rpc_select" class="col-1" />
      <router-view class="bg-gradient" />
    </q-page-container>

    <q-footer class="bg-dark">
      <FooterLayout />
    </q-footer>
  </q-layout>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useGlobalStore } from 'stores/globalStore';

import { copy_to_clipboard } from 'src/functions/copy_to_clipboard';
import { WalletMultiButton } from 'solana-wallets-vue';
import FilterEscrows2 from 'components/filters/FilterEscrows2.vue';
import EscrowTakeView from 'components/views/EscrowTakeView.vue';
import { useQuasar } from 'quasar';
import { useEscrowStore } from 'stores/escrowStore';
import DisclaimerDialog from 'components/dialogs/DisclaimerDialog.vue';
import { useWhitelistStore } from '../stores/whitelistStore';
import FooterLayout from 'layouts/FooterLayout.vue';
import RPCDialog from 'components/dialogs/RPCDialog.vue';
import { useRPCStore } from 'stores/rpcStore';

const leftDrawerOpen = ref(false);
const rightDrawerOpen = ref(false);

onMounted(() => {
  leftDrawerOpen.value = useGlobalStore().showLeftDrawer;
  rightDrawerOpen.value = useGlobalStore().showRightDrawer;
});

function leftDrawerClick(e) {
  if (useGlobalStore().leftDrawerMini) {
    useGlobalStore().leftDrawerMini = false;
    e.stopPropagation();
  }
}
</script>
<style>
/* width */
::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: none;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
