<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useGlobalStore } from 'stores/globalStore';
import BuySellTokenInputElemenet from 'components/elements/BuySellTokenInputElemenet.vue';
import EscrowDetails from 'components/elements/EscrowDetails.vue';
import ExchangeEscrowAction from 'components/actions/ExchangeEscrowAction.vue';
import { useEscrowStore } from 'stores/escrowStore';
import { I_Token } from 'stores/interfaces/I_TokenList';
import { ACCOUNT_COST_ESCROW, MAKER_FEE, TAKER_FEE } from 'stores/constants';
import { useWhitelistStore } from 'stores/whitelistStore';

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

const amount_to_buy_comp = computed(() => {
  return parseInt(
    (
      (useEscrowStore().escrow_selected?.account.tokensDepositRemaining.toNumber() ??
        0) * Math.pow(10, -(token_deposit_info.value?.decimals ?? 0))
    ).toFixed(2),
  );
});

watch(
  () => amount_to_buy_comp.value,
  () => {
    calculate_side('sell', amount_to_buy.value);
  },
);

const amount_to_buy = ref<number>(amount_to_buy_comp.value);
const amount_to_sell = ref(0);
calculate_side('sell', amount_to_buy.value);

watch(
  () => useEscrowStore().escrow_selected,
  () => {
    amount_to_buy.value = amount_to_buy_comp.value;
    calculate_side('sell', amount_to_buy.value);
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
  <q-card flat class="">
    <q-list class="">
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

    <q-card-section class="">
      <q-btn-group class="full-width q-pa-sm">
        <div class="row full-width items-center">
          <div class="text-h6">Price</div>

          <div class="col">
            <div class="row q-gutter-x-sm">
              <div class="col text-right items-center">
                {{
                  useEscrowStore().escrow_selected?.account.price.toFixed(10) ??
                  0
                }}
              </div>

              <q-avatar size="xs" color="white">
                <q-img
                  :src="
                    useGlobalStore().token_list.find(
                      (token) =>
                        token.address ==
                        useEscrowStore().escrow_selected?.account.requestToken.toString(),
                    )?.logoURI ?? 'unknown.png'
                  "
                />
              </q-avatar>
            </div>
            <div class="row q-gutter-x-sm">
              <div class="col text-right items-center">
                {{
                  (
                    1 / (useEscrowStore().escrow_selected?.account.price ?? 0)
                  ).toFixed(10)
                }}
              </div>
              <q-avatar size="xs" color="white">
                <q-img
                  :src="
                    useGlobalStore().token_list.find(
                      (token) =>
                        token.address ==
                        useEscrowStore().escrow_selected?.account.depositToken.toString(),
                    )?.logoURI ?? 'unknown.png'
                  "
                />
              </q-avatar>
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
        side="Takes"
        type="take"
        class="full-width"
        :token_amount="amount_to_sell"
        :token_input="token_request_info"
        :disable="!useEscrowStore().escrow_selected?.account.allowPartialFill"
        @amountChange="
          (value) => {
            amount_to_sell = value;
            calculate_side('buy', value);
          }
        "
      />
      <div class="row justify-center">
        <q-icon size="md" name="swap_vert"></q-icon>
      </div>

      <BuySellTokenInputElemenet
        side="gives"
        type="take"
        class="full-width"
        :token_amount="amount_to_buy"
        :token_input="token_deposit_info"
        :disable="!useEscrowStore().escrow_selected?.account.allowPartialFill"
        @amountChange="
          (value) => {
            amount_to_buy = value;
            calculate_side('sell', value);
          }
        "
      />

      <q-btn-group class="full-width q-pa-sm">
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
      <q-btn-group class="full-width">
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
              +{{ Math.trunc(amount_to_buy).toFixed(2) }}
            </div>
            <q-avatar size="sm" color="white">
              <img :src="token_deposit_info?.logoURI ?? 'unknown.png'" />
            </q-avatar>
          </div>
        </div>
      </q-btn-group>
    </q-card-section>

    <q-card-section class="">
      <ExchangeEscrowAction :exchange_amount="amount_to_buy" />
      <div class="col row justify-end q-gutter-sm items-center q-mt-sm">
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
  </q-card>
</template>

<style scoped lang="sass"></style>
