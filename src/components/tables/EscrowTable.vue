<script setup lang="ts">
import { useGlobalStore } from 'stores/globalStore';
import { computed, ref, watch } from 'vue';
import TokenIcon from 'components/elements/TokenIcon.vue';
import { get_token_imageURL_form_mint } from 'src/functions/get_token_imageURL_form_mint';
import { useWallet } from 'solana-wallets-vue';
import EscrowStateElement from 'components/elements/EscrowStateElement.vue';
import { get_token_name_from_mint } from '../../functions/get_token_name_from_mint';
import FormatTokenNumber from 'components/elements/FormatTokenNumber.vue';
import { useRoute } from 'vue-router';
import CancelEscrow from 'components/actions/CancelEscrowAction.vue';
import { I_Escrows, useEscrowStore } from 'stores/escrowStore';
import { watchDebounced } from '@vueuse/core';
import { useQuasar } from 'quasar';
import { copy_to_clipboard } from 'src/functions/copy_to_clipboard';

const decimals = 9;

const sort_tab = ref('buy_name');

const current_path = useRoute().path;

const columns = [
  {
    name: 'tokens',
    label: 'Tokens',
    align: 'center',
  },
  {
    name: 'size',
    label: 'Size',
    align: 'center',
  },
  {
    name: 'ppu',
    label: 'Price per Unit',
    align: 'center',
  },

  {
    name: 'states',
    label: '',
    align: 'center',
  },
  {
    name: 'actions',
    label: '',
    align: 'center',
  },
];

const filtered_rows = ref(useEscrowStore().escrows);

watch(
  () => useEscrowStore().escrow_selected,
  () => (filtered_rows.value = useEscrowStore().escrows_filtered),
);

function make_take_view(escrow: I_Escrows) {
  if (useEscrowStore().escrow_selected == escrow) {
    useGlobalStore().showRightDrawer = false;
    useEscrowStore().escrow_selected = undefined;
    return;
  }

  useEscrowStore().escrow_selected = escrow;

  if (current_path.includes('exchange')) {
    useGlobalStore().showRightDrawer = true;
  }

  /*  if (expandable.value) {
    if (
      useEscrowStore().escrow_selected?.publicKey.toString() ==
        escrow.publicKey.toString() &&
      useGlobalStore().showRightDrawer == true
    ) {
      useGlobalStore().showRightDrawer = false;
    } else {
      useGlobalStore().showRightDrawer = true;
      useGlobalStore().escrow_selected = escrow;
    }
  }*/
}
</script>

<template>
  <q-table
    class="full-width"
    flat
    square
    bordered
    v-if="useEscrowStore().escrows_filtered?.length"
    :rows="useEscrowStore().escrows_filtered"
    :columns="columns"
    row-key="name"
    hide-bottom
    :pagination="{
      rowsPerPage: 0,
    }"
  >
    <template v-slot:top>
      <div class="row full-width items-center q-gutter-x-md">
        <q-space class="col" />
        <div class="text-subtitle1">Sort by:</div>
        <div>
          <q-tabs
            v-model="useEscrowStore().sort_direction"
            dense
            align="justify"
            :breakpoint="0"
          >
            <q-tab name="buy_ppu" no-caps label="Buy Price" />
            <q-tab name="sell_ppu" no-caps label="Sell Price" />
          </q-tabs>
        </div>
      </div>
    </template>
    <template v-slot:body="props">
      <q-tr :props="props" @click="make_take_view(props.row)">
        <q-td key="tokens" :props="props">
          <div class="q-gutter-y-xs">
            <div class="row items-center justify-around no-wrap">
              <q-badge label="SELL" color="red" outline />
              <q-space />

              <div class="q-mx-sm text-subtitle1">
                {{ get_token_name_from_mint(props.row.account.requestToken) }}
              </div>
              <TokenIcon
                size="sm"
                :src="
                  get_token_imageURL_form_mint(props.row.account.requestToken)
                "
              />
            </div>
            <div class="row items-center justify-around no-wrap">
              <q-badge label="BUY" color="green" outline />
              <q-space />

              <div class="q-mx-sm text-subtitle1">
                {{ get_token_name_from_mint(props.row.account.depositToken) }}
              </div>
              <TokenIcon
                size="sm"
                :src="
                  get_token_imageURL_form_mint(props.row.account.depositToken)
                "
              />
            </div>
          </div>
        </q-td>

        <q-td key="size" :props="props">
          <div class="q-gutter-y-xs">
            <div class="row items-center justify-end q-gutter-x-sm no-wrap">
              <FormatTokenNumber
                :mint="props.row.account.requestToken"
                :amount="
                  props.row.account.tokensDepositRemaining.toNumber() *
                  props.row.account.price *
                  10 **
                    -useGlobalStore().token_list.find(
                      (t) => t.address == props.row.account.depositToken,
                    )?.decimals
                "
              />

              <TokenIcon
                size="sm"
                :src="
                  get_token_imageURL_form_mint(props.row.account.requestToken)
                "
              />
            </div>
            <div class="row items-center justify-end q-gutter-x-sm no-wrap">
              <FormatTokenNumber
                :mint="props.row.account.depositToken"
                :amount="
                  props.row.account.tokensDepositRemaining.toNumber() *
                  10 **
                    -useGlobalStore().token_list.find(
                      (t) => t.address == props.row.account.depositToken,
                    )?.decimals
                "
              />

              <TokenIcon
                size="sm"
                :src="
                  get_token_imageURL_form_mint(props.row.account.depositToken)
                "
              />
            </div>
          </div>
        </q-td>

        <q-td key="ppu" :props="props">
          <div class="q-gutter-y-xs">
            <div class="row items-center justify-end q-gutter-x-sm no-wrap">
              <div class="text-subtitle2">
                {{ props.row.account.price.toFixed(decimals) }}
              </div>

              <TokenIcon
                size="sm"
                :src="
                  get_token_imageURL_form_mint(props.row.account.requestToken)
                "
              />
            </div>
            <div class="row items-center justify-end q-gutter-x-sm no-wrap">
              <div class="text-subtitle2">
                {{ (1 / props.row.account.price).toFixed(decimals) }}
              </div>

              <TokenIcon
                size="sm"
                :src="
                  get_token_imageURL_form_mint(props.row.account.depositToken)
                "
              />
            </div>
          </div>
        </q-td>
        <q-td key="states" :props="props">
          <div class="row items-center" style="width: 100px">
            <div class="col">
              <q-icon
                size="sm"
                name="balance"
                :color="props.row.account.allowPartialFill ? 'purple' : 'grey'"
              >
                <q-tooltip
                  >Partial fill
                  {{ props.row.account.allowPartialFill ? '' : 'NOT ' }}
                  allowed</q-tooltip
                >
              </q-icon>
            </div>
            <div class="col">
              <q-icon
                size="sm"
                name="timer"
                :color="
                  props.row.account.expireTimestamp > 0 ? 'orange' : 'grey'
                "
              >
                <q-tooltip
                  >Will
                  {{ props.row.account.expireTimestamp > 0 ? '' : 'NOT ' }}
                  expire</q-tooltip
                >
              </q-icon>
            </div>

            <div class="col">
              <q-icon
                size="sm"
                name="design_services"
                :color="
                  props.row.account.maker.toString() ==
                  useWallet().publicKey.value?.toString()
                    ? 'orange'
                    : 'grey'
                "
              >
                <q-tooltip
                  >You are
                  {{
                    props.row.account.maker.toString() ===
                    useWallet().publicKey.value?.toString()
                      ? ''
                      : 'NOT '
                  }}
                  the creator</q-tooltip
                >
              </q-icon>
            </div>
            <div class="col">
              <EscrowStateElement size="xs" :escrow="props.row" />
            </div>
          </div>
        </q-td>

        <q-td key="actions" :props="props">
          <div
            v-if="useRoute().path != '/exchange' || useQuasar().screen.lt.md"
            class="row items-center justify-around q-gutter-sm"
          >
            <q-btn
              :to="
                '/details/' +
                useEscrowStore().escrow_selected?.publicKey.toString()
              "
              dense
              color="secondary"
              icon="aspect_ratio"
            >
              <q-tooltip>Expand offer</q-tooltip>
            </q-btn>
            <q-btn
              dense
              @click="
                () => {
                  copy_to_clipboard(
                    'https://escrow.skullnbones.xyz/#/details/' +
                      useEscrowStore().escrow_selected?.publicKey.toString() ??
                      'not-found',
                  );
                }
              "
              color="secondary"
              icon="share"
            >
            </q-btn>
            <CancelEscrow v-if="useRoute().path.includes('manage')" />
          </div>
        </q-td>
      </q-tr>
    </template>
  </q-table>

  <h5 class="col text-center" v-else>No Escrows found</h5>
</template>
