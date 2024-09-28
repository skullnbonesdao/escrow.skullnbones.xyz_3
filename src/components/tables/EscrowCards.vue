<script setup lang="ts">
import { useGlobalStore } from 'stores/globalStore';
import { computed, ref, watch } from 'vue';
import TokenIcon from 'components/elements/TokenIcon.vue';
import { get_token_imageURL_form_mint } from 'src/functions/get_token_imageURL_form_mint';
import { useWallet } from 'solana-wallets-vue';
import EscrowStateElement from 'components/elements/EscrowStateElement.vue';
import { get_token_name_from_mint } from '../../functions/get_token_name_from_mint';
import FormatTokenNumber from 'components/elements/FormatTokenNumber.vue';
import { useRoute, useRouter } from 'vue-router';
import CancelEscrow from 'components/actions/CancelEscrowAction.vue';
import { I_Escrows, useEscrowStore } from 'stores/escrowStore';
import { useQuasar } from 'quasar';
import { copy_to_clipboard } from 'src/functions/copy_to_clipboard';
import { userTokenStore } from 'stores/userTokenStore';
import { format_address } from 'src/functions/format_address';
import {
  get_price_by_side,
  getPriceByMintSide,
  getPriceByPairName,
} from 'src/functions/get_price_by_side';
import { Escrow } from 'src/adapter/escrow_gen/accounts';

const decimals = 9;

const sort_tab = ref('buy_name');
const is_mobile = ref(useQuasar().screen.lt.md);

const current_path = useRoute().path;

function group_rows(
  data: I_Escrows[] | undefined,
  by: 'buy' | 'sell' | '3',
): Record<string, I_Escrows[]> | undefined {
  if (!data) return;
  const groupedData = data?.reduce(
    (acc, item) => {
      const { depositToken, requestToken } = item.account;

      const dToken = useGlobalStore().token_list.find(
        (t) => t.address == depositToken.toString(),
      );

      const rToken = useGlobalStore().token_list.find(
        (t) => t.address == requestToken.toString(),
      );

      let key;
      if (by == 'buy') {
        key = `${dToken?.symbol}`;
      } else if (by == 'sell') {
        key = `${rToken?.symbol}`;
      } else if (by == '3') {
        key = `${dToken?.symbol}-${rToken?.symbol}`;
      }

      // Create a unique key for the combination of depositToken and requestToken

      // If the key doesn't exist in the accumulator, initialize it with an empty array
      if (!acc[key]) {
        acc[key] = [] as any;
      }

      // Push the current item to the respective group
      acc[key].push(item);

      return acc;
    },
    {} as Record<string, I_Escrows[]>,
  );
  console.log(groupedData);
  return groupedData;
}

const router = useRouter();

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

const data = computed(() => useEscrowStore().escrows_cards);
</script>

<template>
  <div
    v-if="!Object.entries(data!).every(([key, value]) => value.length == 0)"
    class="q-gutter-y-md q-ma-sm"
  >
    <q-card
      flat
      v-for="[groupKey, groupValue] of Object.entries(data!).filter(
        ([key, value]) => {
          return value.length > 0;
        },
      )"
      :key="groupKey"
    >
      <q-expansion-item>
        <template v-slot:header>
          <q-item-section avatar>
            <div class="row items-center">
              <q-badge
                color="transparent"
                outline
                class="col text-center q-ma-sm"
                :class="`bg-${useEscrowStore().filter_cards.by}`"
                ><div style="width: 70px" class="q-gutter-y-xs">
                  <div class="text-white">
                    {{ useEscrowStore().filter_cards.by.toUpperCase() }}
                  </div>
                  <TokenIcon
                    class=""
                    size="sm"
                    :src="
                      get_token_imageURL_form_mint(
                        useGlobalStore().token_list.find(
                          (t) => t.symbol == groupKey,
                        )?.address,
                      )
                    "
                  />
                  <div class="text-white">{{ groupKey.split('-')[0] }}</div>
                </div>
              </q-badge>
            </div>
          </q-item-section>

          <q-item-section> </q-item-section>

          <q-item-section side>
            <div class="row items-center">
              <q-icon name="tag" />
              <div>{{ groupValue.length }}</div>
            </div>
          </q-item-section>
        </template>
        <q-card>
          <q-card-section v-if="groupValue">
            <q-card
              class="q-mb-sm"
              bordered
              square
              flat
              v-for="[innerGroupKey, innerGroupValue] of Object.entries(
                group_rows(groupValue, '3')!,
              )"
              :key="innerGroupKey"
            >
              <q-expansion-item>
                <template v-slot:header>
                  <q-item-section avatar>
                    <div class="row items-center">
                      <q-badge
                        color="transparent"
                        outline
                        class="col text-center q-ma-sm bg-sell"
                        ><div style="width: 70px" class="q-gutter-y-xs">
                          <TokenIcon
                            class=""
                            size="sm"
                            :src="
                              get_token_imageURL_form_mint(
                                innerGroupValue[0].account.requestToken.toString(),
                              )
                            "
                          />
                          <div class="text-white">
                            {{
                              useGlobalStore().token_list.find(
                                (t) =>
                                  t.address ==
                                  innerGroupValue[0].account.requestToken.toString(),
                              ).symbol
                            }}
                          </div>
                        </div>
                      </q-badge>
                      <q-icon name="chevron_right" />
                      <q-badge
                        color="transparent"
                        outline
                        class="col text-center q-ma-sm bg-buy"
                        ><div style="width: 70px" class="q-gutter-y-xs">
                          <TokenIcon
                            class=""
                            size="sm"
                            :src="
                              get_token_imageURL_form_mint(
                                innerGroupValue[0].account.depositToken.toString(),
                              )
                            "
                          />
                          <div class="text-white">
                            {{
                              useGlobalStore().token_list.find(
                                (t) =>
                                  t.address ==
                                  innerGroupValue[0].account.depositToken.toString(),
                              ).symbol
                            }}
                          </div>
                        </div>
                      </q-badge>
                    </div>
                  </q-item-section>

                  <q-item-section>
                    <div class="row items-center">
                      <div>{{ innerGroupKey }}</div>
                    </div>
                  </q-item-section>

                  <q-item-section side>
                    <div class="row items-center">
                      <q-icon name="tag" />
                      <div>{{ innerGroupValue.length }}</div>
                    </div>
                  </q-item-section>
                </template>
                <q-card>
                  <q-card-section v-if="innerGroupValue">
                    <q-table
                      flat
                      hide-bottom
                      :rows-per-page-options="[0]"
                      :rows="innerGroupValue"
                      :columns="[
                        {
                          name: 'escrow',
                          label: 'Escrow',
                          align: 'left',
                          field: 'publicKey',
                          format: (val, row) => format_address(`${val}`),
                          sortable: true,
                        },
                        {
                          name: 'maker',
                          align: 'left',
                          label: 'Maker',
                          field: 'account',
                          format: (val, row) => format_address(`${val.maker}`),
                          sortable: true,
                        },
                        {
                          name: 'options',
                          align: 'left',
                          label: 'Options',
                          field: 'account',
                          sortable: true,
                        },
                        {
                          name: 'price',
                          label: 'Price per Unit',
                          field: 'account',
                          format: (val: Escrow, row) =>
                            `${val.price.toString()}`,
                          sortable: true,
                        },
                      ]"
                    >
                      <template v-slot:body-cell="props">
                        <q-td
                          v-if="props.col.name == 'price'"
                          :props="props"
                          @click="make_take_view(props.row)"
                        >
                          <div class="col q-gutter-y-sm">
                            <div
                              class="row items-center q-gutter-x-xs justify-end"
                            >
                              <div>
                                {{ parseFloat(props.value).toFixed(5) }}
                              </div>
                              <TokenIcon
                                class=""
                                size="xs"
                                :src="
                                  get_token_imageURL_form_mint(
                                    useGlobalStore().token_list.find(
                                      (t) =>
                                        t.symbol == innerGroupKey.split('-')[1],
                                    )?.address,
                                  )
                                "
                              />
                            </div>
                            <div
                              class="row items-center q-gutter-x-xs justify-end"
                            >
                              <div>
                                {{ (1 / parseFloat(props.value)).toFixed(5) }}
                              </div>
                              <TokenIcon
                                class=""
                                size="xs"
                                :src="
                                  get_token_imageURL_form_mint(
                                    useGlobalStore().token_list.find(
                                      (t) =>
                                        t.symbol == innerGroupKey.split('-')[0],
                                    )?.address,
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
                                  props.row.account.allowPartialFill
                                    ? 'purple'
                                    : 'grey'
                                "
                              >
                                <q-tooltip
                                  >Partial fill
                                  {{
                                    props.row.account.allowPartialFill
                                      ? ''
                                      : 'NOT '
                                  }}
                                  allowed</q-tooltip
                                >
                              </q-icon>
                            </div>
                            <div class="col">
                              <q-icon
                                size="sm"
                                name="timer"
                                :color="
                                  props.row.account.expireTimestamp > 0
                                    ? 'orange'
                                    : 'grey'
                                "
                              >
                                <q-tooltip
                                  >Will
                                  {{
                                    props.row.account.expireTimestamp > 0
                                      ? ''
                                      : 'NOT '
                                  }}
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
                              <EscrowStateElement
                                size="xs"
                                :escrow="props.row"
                              />
                            </div>
                          </div>
                        </q-td>

                        <q-td
                          v-else
                          :props="props"
                          @click="make_take_view(props.row)"
                        >
                          {{ props.value }}
                        </q-td>
                      </template>
                    </q-table>
                  </q-card-section>
                </q-card>
              </q-expansion-item>
            </q-card>
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </q-card>
  </div>

  <div class="col text-center" v-else>
    <h5>No Escrows found</h5>
    <h6>You may need to check your filter settings</h6>
  </div>
</template>
