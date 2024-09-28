<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { NULL_ADDRESS } from 'stores/constants';
import { useWallet } from 'solana-wallets-vue';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import TokenSelectInput from 'components/input/TokenSelectInput.vue';
import { I_Token } from 'stores/interfaces/I_TokenList';
import { I_Escrows, useEscrowStore } from 'stores/escrowStore';
import { useGlobalStore } from 'stores/globalStore';
import { watchDeep } from '@vueuse/core';

const r = useRouter();

const disable_input = computed(() => {
  return r.currentRoute.value.path == '/manage';
});

const tab = ref<any>('buy');

onMounted(() => useEscrowStore().apply_filter());

watch(
  () => useEscrowStore().escrows,
  () => useEscrowStore().apply_filter(),
);

watchDeep(
  () => useEscrowStore().filter_cards,
  () => useEscrowStore().apply_filter(),
);
</script>

<template>
  <q-card flat>
    <q-card-section>
      <div class="col-2 text-overline">Side</div>
      <q-tabs
        align="justify"
        v-model="useEscrowStore().filter_cards.by"
        inline-label
        class="q-pb-sm"
      >
        <q-tab name="sell" label="Sell" class="bg-sell" />
        <q-tab name="buy" label="Buy" class="bg-buy" />
      </q-tabs>
    </q-card-section>
    <q-separator />
    <q-card-section>
      <div class="col-2 text-overline">Asset</div>
      <q-tree
        :tick-strategy="'leaf'"
        :nodes="useGlobalStore().getAsTree"
        accordion
        node-key="label"
        v-model:ticked="useEscrowStore().filter_cards.treeKeys"
    /></q-card-section>
    <q-separator />
    <q-card-section :class="useQuasar().screen.lt.md ? 'row' : 'col'">
      <div class="col-2 text-overline">Offer Type</div>

      <div class="col">
        <q-list>
          <q-item tag="label" v-ripple>
            <q-item-section>
              <q-item-label>Public Offers</q-item-label>
              <q-item-label caption
                >Offers can be filled by any recipient</q-item-label
              >
            </q-item-section>
            <q-item-section avatar>
              <q-radio
                v-model="useEscrowStore().filter_cards.filter_type"
                val="type_public"
                color="accent"
              />
            </q-item-section>
          </q-item>
          <q-item tag="label" v-ripple>
            <q-item-section>
              <q-item-label>Private Offers</q-item-label>
              <q-item-label caption
                >Offer can only be filled by the specified
                recipient</q-item-label
              >
            </q-item-section>
            <q-item-section avatar>
              <q-radio
                v-model="useEscrowStore().filter_cards.filter_type"
                val="type_private"
                color="accent"
              />
            </q-item-section>
          </q-item>
          <q-item tag="label" v-ripple>
            <q-item-section>
              <q-item-label>S&B Member Offers</q-item-label>
              <q-item-label caption
                >Offers can only be filled by members</q-item-label
              >
            </q-item-section>
            <q-item-section avatar>
              <q-radio
                v-model="useEscrowStore().filter_cards.filter_type"
                val="type_members"
                color="accent"
              />
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </q-card-section>
    <q-separator />
    <q-card-section :class="useQuasar().screen.lt.md ? 'row' : 'col'">
      <div class="col-2 text-overline">Fill Type</div>
      <div class="col">
        <q-list>
          <q-item tag="label" v-ripple>
            <q-item-section>
              <q-item-label>One-Time Fill</q-item-label>
              <q-item-label caption
                >Offer can only be taken as a whole</q-item-label
              >
            </q-item-section>
            <q-item-section avatar>
              <q-checkbox
                :disable="disable_input"
                v-model="useEscrowStore().filter_cards.extra_filter"
                val="fill_full"
                color="accent"
              />
            </q-item-section>
          </q-item>
          <q-item tag="label" v-ripple>
            <q-item-section>
              <q-item-label>Partial Fill</q-item-label>
              <q-item-label caption>Offer can be filled partially</q-item-label>
            </q-item-section>
            <q-item-section avatar>
              <q-checkbox
                :disable="disable_input"
                v-model="useEscrowStore().filter_cards.extra_filter"
                val="fill_partial"
                color="accent"
              />
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </q-card-section>
    <q-separator />

    <q-card-section :class="useQuasar().screen.lt.md ? 'row' : 'col'">
      <div class="col-2 text-overline">Options</div>
      <div class="col">
        <q-list>
          <q-item tag="label" v-ripple>
            <q-item-section>
              <q-item-label>Show mine</q-item-label>
              <q-item-label caption>Show self created Offers</q-item-label>
            </q-item-section>
            <q-item-section avatar>
              <q-checkbox
                :disable="disable_input"
                v-model="useEscrowStore().filter_cards.extra_filter"
                val="self"
                color="accent"
              />
            </q-item-section>
          </q-item>
          <q-item tag="label" v-ripple>
            <q-item-section>
              <q-item-label>Show filled</q-item-label>
              <q-item-label caption
                >Show offers that are 100% filled</q-item-label
              >
            </q-item-section>
            <q-item-section avatar>
              <q-checkbox
                :disable="disable_input"
                v-model="useEscrowStore().filter_cards.extra_filter"
                val="filled"
                color="accent"
              />
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </q-card-section>
  </q-card>
</template>

<style scoped lang="sass"></style>
