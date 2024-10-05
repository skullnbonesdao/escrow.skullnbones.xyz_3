<script setup lang="ts">
import { format_address } from 'src/functions/format_address';
import { Escrow } from 'src/adapter/escrow_gen/accounts';
import { get_token_imageURL_form_mint } from 'src/functions/get_token_imageURL_form_mint';
import { useWallet } from 'solana-wallets-vue';
import { format_number } from 'src/functions/format_number';
import { useGlobalStore } from 'stores/globalStore';
import EscrowStateElement from 'components/elements/EscrowStateElement.vue';
import TokenIcon from 'components/elements/TokenIcon.vue';
import { ref } from 'vue';
import { I_Escrows, useEscrowStore } from 'stores/escrowStore';
import { useQuasar } from 'quasar';
import { useRoute, useRouter } from 'vue-router';

const is_mobile = ref(useQuasar().screen.lt.md);
const current_path = useRoute().path;
const router = useRouter();

const props = defineProps(['groupValue', 'groupKey']);

function make_take_view(escrow: I_Escrows) {
  if (!is_mobile.value) {
    if (useEscrowStore().escrow_selected == escrow) {
      useGlobalStore().showRightDrawer = false;
      useEscrowStore().escrow_selected = undefined;
      return;
    }

    useEscrowStore().escrow_selected = escrow;

    if (current_path.includes('exchange')) {
      useGlobalStore().showRightDrawer = true;
    }
  } else router.push(`/details/${escrow.publicKey.toString()}`);
}

function getPagination(side: string) {
  if (side === 'buy') {
    return {
      rowsPerPage: 0,
      sortBy: 'price',
      descending: false,
    };
  } else
    return {
      rowsPerPage: 0,
      sortBy: 'price',
      descending: true,
    };
}
</script>

<template>
  <div
    class="q-pa-md"
    :class="is_mobile ? 'col q-gutter-y-sm' : 'row q-gutter-x-sm'"
  >
    <q-card
      flat
      bordered
      square
      class="col q-pa-none"
      v-for="side in ['buy', 'sell']"
      :key="side"
    >
      <div class="row">
        <div class="col q-pa-md text-bold text-center" :class="'bg-' + side">
          {{ side.toUpperCase() }}
        </div>
      </div>

      <q-table
        v-if="groupValue[side]"
        flat
        hide-bottom
        :pagination="getPagination(side)"
        :rows="groupValue[side]"
        :columns="[
          {
            name: 'info',
            align: 'left',
            label: 'Pair',
            field: 'account',
            sortable: false,
          },
          {
            name: 'symbol',
            align: 'left',
            label: '',
            field: 'account',
            format: (val, row) =>
              `${
                useGlobalStore().token_list.find(
                  (t) => t.address == val.requestToken.toString(),
                )?.symbol +
                '/' +
                useGlobalStore().token_list.find(
                  (t) => t.address == val.depositToken.toString(),
                )?.symbol
              }`,
            sortable: false,
          },

          {
            name: 'escrow',
            label: 'Escrow',
            align: 'left',
            field: 'publicKey',
            format: (val, row) => format_address(`${val}`, 2),
            sortable: true,
          },

          {
            name: 'options',
            align: 'left',
            label: 'Options',
            field: 'account',
            sortable: false,
          },
          {
            name: 'volume',
            label: 'Size',
            field: 'account',
            format: (val: Escrow, row) => `${val}`,
            sort: (a: Escrow, b: Escrow, rowA, rowB) =>
              parseInt(a.tokensDepositRemaining.toString(), 10) -
              parseInt(b.tokensDepositRemaining.toString(), 10),
            sortable: true,
          },
          {
            name: 'price',
            label: 'Price per Unit',
            field: (row) => row.account.price,
            sort: (a: number, b: number, rowA, rowB) => a - b,
            format: (val: number, row) => `${val.toString()}`,
            sortable: true,
          },
        ]"
      >
        <template v-slot:body-cell="props">
          <q-td
            v-if="props.col.name == 'info'"
            :props="props"
            @click="make_take_view(props.row)"
          >
            <div class="col">
              <div class="col q-gutter-y-sm items-center">
                <TokenIcon
                  size="sm"
                  :src="
                    get_token_imageURL_form_mint(props.row.account.requestToken)
                  "
                />

                <q-icon name="chevron_right" />
                <TokenIcon
                  size="sm"
                  :src="
                    get_token_imageURL_form_mint(props.row.account.depositToken)
                  "
                />
              </div>
            </div>
          </q-td>
          <q-td
            v-else-if="props.col.name == 'price'"
            :props="props"
            @click="make_take_view(props.row)"
          >
            <div class="col q-gutter-y-sm">
              <div class="row items-center q-gutter-x-xs justify-end">
                <div>
                  {{ format_number(parseFloat(props.value), 5) }}
                </div>
                <TokenIcon
                  class=""
                  size="xs"
                  :src="
                    get_token_imageURL_form_mint(
                      props.row.account.requestToken.toString(),
                    )
                  "
                />
              </div>
              <div class="row items-center q-gutter-x-xs justify-end">
                <div>
                  {{ format_number(1 / parseFloat(props.value), 5) }}
                </div>
                <TokenIcon
                  class=""
                  size="xs"
                  :src="
                    get_token_imageURL_form_mint(
                      props.row.account.depositToken.toString(),
                    )
                  "
                />
              </div>
            </div>
          </q-td>

          <q-td
            @click="make_take_view(props.row)"
            v-else-if="props.col.name == 'options'"
            :props="props"
          >
            <div class="row items-center" style="width: 100px">
              <div class="col">
                <q-icon
                  size="sm"
                  name="balance"
                  :color="
                    props.row.account.allowPartialFill ? 'purple' : 'grey'
                  "
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

          <q-td
            @click="make_take_view(props.row)"
            v-else-if="props.col.name == 'volume'"
            :props="props"
          >
            <div class="col">
              <div>
                {{
                  format_number(
                    props.row.account.price *
                      props.row.account.tokensDepositRemaining *
                      10 **
                        -useGlobalStore().token_list.find(
                          (t) => t.address == props.row.account.depositToken,
                        ).decimals,
                    1,
                  )
                }}
              </div>
              <div>
                {{
                  format_number(
                    props.row.account.tokensDepositRemaining *
                      10 **
                        -useGlobalStore().token_list.find(
                          (t) => t.address == props.row.account.depositToken,
                        ).decimals,
                    1,
                  )
                }}
              </div>
            </div>
          </q-td>

          <q-td v-else :props="props" @click="make_take_view(props.row)">
            {{ props.value }}
          </q-td>
        </template>
      </q-table>
    </q-card>
  </div>
</template>

<style scoped lang="sass"></style>
