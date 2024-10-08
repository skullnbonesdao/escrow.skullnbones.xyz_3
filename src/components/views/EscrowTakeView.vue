<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { useGlobalStore } from 'stores/globalStore';
import BuySellTokenInputElemenet from 'components/elements/BuySellTokenInputElemenet.vue';
import EscrowDetails from 'components/elements/EscrowDetails.vue';
import ExchangeEscrowAction from 'components/actions/ExchangeEscrowAction.vue';
import { useEscrowStore } from 'stores/escrowStore';
import { I_Token } from 'stores/interfaces/I_TokenList';
import { TAKER_FEE } from 'stores/constants';
import { useWhitelistStore } from 'stores/whitelistStore';
import { format_number } from 'src/functions/format_number';
import TokenIcon from 'components/elements/TokenIcon.vue';
import CancelEscrow from 'components/actions/CancelEscrowAction.vue';
import { useWallet } from 'solana-wallets-vue';
import TransactionHistoryElement from 'components/elements/TransactionHistoryElement.vue';
import { laMusicSolid } from '@quasar/extras/line-awesome';

const token_deposit_info = computed(() => {
  return useGlobalStore().token_list.find(
    (t) =>
      t.address ==
      useEscrowStore().escrow_selected?.account.depositToken.toString(),
  ) as I_Token;
});
const token_request_info = computed(() => {
  return useGlobalStore().token_list.find(
    (t) =>
      t.address ==
      useEscrowStore().escrow_selected?.account.requestToken.toString(),
  );
});

const amount_to_buy = ref(0);
const amount_to_sell = ref(0);
onMounted(() => calc_percent_amount(1));

watch(
  () => useEscrowStore().escrow_selected?.publicKey,
  () => {
    amount_to_buy.value = 0;
    amount_to_sell.value = 0;
    calc_percent_amount(1);
  },
);

function calc_percent_amount(percentage: number) {
  amount_to_buy.value =
    (useEscrowStore().escrow_selected?.account.tokensDepositRemaining.toNumber() ??
      0) *
    Math.pow(10, -(token_deposit_info.value?.decimals ?? 0)) *
    percentage;

  calculate_side('sell', amount_to_buy.value);
}

function calculate_side(side: 'buy' | 'sell', other: number) {
  console.log(side);

  switch (side) {
    case 'buy':
      amount_to_buy.value =
        other / (useEscrowStore().escrow_selected?.account.price ?? 0);
      break;
    case 'sell':
      amount_to_sell.value =
        other * (useEscrowStore().escrow_selected?.account.price ?? 0);
  }
  console.log(`Amount_to_buy= ${amount_to_buy.value}`);
  console.log(`amount_to_sell= ${amount_to_sell.value}`);
}
</script>

<template>
  <q-card flat class="q-mx-xs">
    <q-list class="bg-primary">
      <q-expansion-item icon="info" label="Details" dense>
        <template v-slot:header>
          <div class="full-width">
            <q-btn-group flat class="text-center full-width row items-center">
              <div class="q-ml-md">
                <div class="row">
                  <q-avatar size="40px" color="white">
                    <img :src="token_request_info?.logoURI ?? 'unknown.png'" />
                  </q-avatar>
                  <q-avatar
                    size="40px"
                    class="overlapping"
                    :style="`right: ${15}px`"
                    color="white"
                  >
                    <img :src="token_deposit_info?.logoURI ?? 'unknown.png'" />
                  </q-avatar>
                </div>
              </div>

              <div class="col">
                <div class="text-h5 col-2">
                  {{
                    useGlobalStore().token_list.find(
                      (token) =>
                        token.address ==
                        useEscrowStore().escrow_selected?.account.requestToken.toString(),
                    )?.name
                  }}
                </div>
                <q-icon size="md" name="swap_vert"></q-icon>
                <div class="text-h6 col-2">
                  {{
                    useGlobalStore().token_list.find(
                      (token) =>
                        token.address ==
                        useEscrowStore().escrow_selected?.account.depositToken.toString(),
                    )?.name
                  }}
                </div>
              </div>
            </q-btn-group>
          </div>
        </template>

        <q-card>
          <q-card-section>
            <EscrowDetails />
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </q-list>
  </q-card>

  <q-card flat class="">
    <q-card-section class="">
      <q-btn-group flat class="row full-width items-center">
        <div class="col-2 text-h6 text-center">Price</div>

        <div class="col q-mr-sm">
          <div class="row items-center">
            <q-space />
            <div class="col row justify-center q-gutter-x-xs">
              <p>1</p>
              <div class="row">
                <p>
                  {{
                    useGlobalStore().token_list.find(
                      (t) =>
                        t.address ==
                        useEscrowStore().escrow_selected?.account.depositToken.toString(),
                    )?.symbol
                  }}
                </p>
                <TokenIcon
                  class="q-ml-xs"
                  size="xs"
                  :src="
                    useGlobalStore().token_list.find(
                      (token) =>
                        token.address ==
                        useEscrowStore().escrow_selected?.account.depositToken.toString(),
                    )?.logoURI ?? 'unknown.png'
                  "
                />
              </div>
            </div>

            <q-icon
              size="md"
              name="swap_vert"
              style="transform: rotate(90deg)"
            />
            <div class="col row justify-center q-gutter-x-xs">
              <p>
                {{
                  format_number(
                    useEscrowStore().escrow_selected?.account.price ?? 0,
                    10,
                  )
                }}
              </p>
              <div class="row">
                <p>
                  {{
                    useGlobalStore().token_list.find(
                      (t) =>
                        t.address ==
                        useEscrowStore().escrow_selected?.account.requestToken.toString(),
                    )?.symbol
                  }}
                </p>
                <TokenIcon
                  class="q-ml-xs"
                  size="xs"
                  :src="
                    useGlobalStore().token_list.find(
                      (token) =>
                        token.address ==
                        useEscrowStore().escrow_selected?.account.requestToken.toString(),
                    )?.logoURI ?? 'unknown.png'
                  "
                />
              </div>
            </div>
          </div>
          <div class="row items-center">
            <q-space />
            <div class="col row justify-center q-gutter-x-xs">
              <p>1</p>
              <div class="row">
                <p>
                  {{
                    useGlobalStore().token_list.find(
                      (t) =>
                        t.address ==
                        useEscrowStore().escrow_selected?.account.requestToken.toString(),
                    )?.symbol
                  }}
                </p>
                <TokenIcon
                  class="q-ml-xs"
                  size="xs"
                  :src="
                    useGlobalStore().token_list.find(
                      (token) =>
                        token.address ==
                        useEscrowStore().escrow_selected?.account.requestToken.toString(),
                    )?.logoURI ?? 'unknown.png'
                  "
                />
              </div>
            </div>
            <q-icon
              size="md"
              name="swap_vert"
              style="transform: rotate(90deg)"
            />
            <div class="col row justify-center q-gutter-x-xs">
              <p>
                {{
                  format_number(
                    1 / (useEscrowStore().escrow_selected?.account.price ?? 0),
                    10,
                  )
                }}
              </p>
              <div class="row">
                <p>
                  {{
                    useGlobalStore().token_list.find(
                      (t) =>
                        t.address ==
                        useEscrowStore().escrow_selected?.account.depositToken.toString(),
                    )?.symbol
                  }}
                </p>
                <TokenIcon
                  class="q-ml-xs"
                  size="xs"
                  :src="
                    useGlobalStore().token_list.find(
                      (token) =>
                        token.address ==
                        useEscrowStore().escrow_selected?.account.depositToken.toString(),
                    )?.logoURI ?? 'unknown.png'
                  "
                />
              </div>
            </div>
          </div>
        </div>
      </q-btn-group>
    </q-card-section>
    <q-card-section
      v-if="useEscrowStore().escrow_selected?.account.allowPartialFill"
      class="q-gutter-y-sm"
    >
      <BuySellTokenInputElemenet
        side="takes"
        type="take"
        class="full-width"
        :token_amount="amount_to_sell"
        :token_input="token_request_info"
        :disable="!useEscrowStore().escrow_selected?.account.allowPartialFill"
        @amountChange="
          (value) => {
            amount_to_sell = parseFloat(value.toString().replace(',', ''));
            calculate_side('buy', value);
          }
        "
      />
      <!--      <div class="row justify-center">-->
      <!--        <q-icon size="md" name="swap_vert"></q-icon>-->
      <!--      </div>-->

      <BuySellTokenInputElemenet
        side="gives"
        type="take"
        class="full-width"
        :token_amount="amount_to_buy"
        :token_input="token_deposit_info"
        :disable="!useEscrowStore().escrow_selected?.account.allowPartialFill"
        @amountChange="
          (value) => {
            amount_to_buy = parseFloat(value.toString().replace(',', ''));
            calculate_side('sell', value);
          }
        "
      />

      <q-btn-group flat class="full-width q-pa-sm">
        <div class="col">
          <div class="row items-center">
            <q-slider
              class="q-px-sm"
              dense
              v-model="amount_to_buy"
              @update:model-value="(data: any) => calculate_side('sell', data)"
              :disable="
                !useEscrowStore().escrow_selected?.account.allowPartialFill
              "
              :min="0"
              :max="
                (useEscrowStore().escrow_selected?.account.tokensDepositRemaining.toNumber() ??
                  0) * Math.pow(10, -(token_deposit_info?.decimals ?? 0))
              "
              color="blue"
              track-size="10px"
              thumb-color="black"
              markers
            />
          </div>
          <div class="q-px-sm row">
            <q-btn
              :disable="
                !useEscrowStore().escrow_selected?.account.allowPartialFill
              "
              dense
              flat
              class="col"
              label="25%"
              @click="calc_percent_amount(0.25)"
            />
            <q-btn
              :disable="
                !useEscrowStore().escrow_selected?.account.allowPartialFill
              "
              dense
              flat
              class="col"
              label="50%"
              @click="calc_percent_amount(0.5)"
            />
            <q-btn
              :disable="
                !useEscrowStore().escrow_selected?.account.allowPartialFill
              "
              dense
              flat
              class="col"
              label="75%"
              @click="calc_percent_amount(0.75)"
            />
            <q-btn
              :disable="
                !useEscrowStore().escrow_selected?.account.allowPartialFill
              "
              dense
              flat
              class="col"
              label="Max"
              @click="calc_percent_amount(1)"
            />
          </div>
        </div>
      </q-btn-group>
    </q-card-section>

    <q-card-section>
      <q-btn-group flat class="full-width">
        <div class="col">
          <div class="text-center text-h6">Wallet balance changes</div>
          <q-separator />

          <div class="row items-center text-subtitle2 q-gutter-x-sm q-ma-sm">
            <div class="col">
              {{ token_request_info?.symbol }}
            </div>
            <div class="text-subtitle1 text-bold text-red">
              {{}}-{{ amount_to_sell.toFixed(2) }}
            </div>
            <q-avatar size="sm" color="white">
              <img :src="token_request_info?.logoURI ?? 'unknown.png'" />
            </q-avatar>
          </div>
          <div class="row items-center q-gutter-x-sm q-ma-sm">
            <div class="col text-subtitle2">
              {{ token_deposit_info?.symbol }}
            </div>
            <div class="text-subtitle1 text-bold text-green">
              +{{ amount_to_buy.toFixed(2) }}
            </div>
            <q-avatar size="sm" color="white">
              <img :src="token_deposit_info?.logoURI ?? 'unknown.png'" />
            </q-avatar>
          </div>
        </div>
      </q-btn-group>
    </q-card-section>

    <q-card-section class="q-gutter-y-sm">
      <ExchangeEscrowAction :exchange_amount="amount_to_buy" />
      <CancelEscrow
        class="full-width"
        v-if="
          useWallet().publicKey.value?.toString() ==
          useEscrowStore().escrow_selected?.account.maker.toString()
        "
        label="Cancel/Close"
      />
      <div class="col row justify-end q-gutter-sm items-center">
        <p class="text-right text-weight-thin">Fee</p>
        <q-space />

        <p class="text-right text-weight-thin">
          {{ useWhitelistStore().is_whitelisted ? TAKER_FEE / 2 : TAKER_FEE }}
        </p>

        <q-avatar size="xs">
          <img
            src="currencies/SOL.webp

                "
          />
        </q-avatar>
      </div>
    </q-card-section>

    <q-list class="rounded-borders">
      <q-expansion-item
        expand-separator
        icon="history"
        label="Transaction History"
      >
        <q-card>
          <q-card-section>
            <TransactionHistoryElement />
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </q-list>
  </q-card>
</template>

<style scoped lang="sass"></style>
