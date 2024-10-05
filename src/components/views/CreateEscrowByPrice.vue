<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { Money } from 'v-money3';
import TokenSelectAndAmountInput from 'components/elements/TokenSelectAndAmountInput.vue';
import { I_Token } from 'stores/interfaces/I_TokenList';
import TokenSelectInput from 'components/input/TokenSelectInput.vue';
import { useEscrowStore } from 'stores/escrowStore';
import TokensAvailable from 'components/elements/TokensAvailable.vue';
import { useWallet } from 'solana-wallets-vue';
import { userTokenStore } from 'stores/userTokenStore';

const orderType = ref('buy');

const price = ref();
const asset_token = ref<I_Token>();
const price_token = ref<I_Token>();
const asset_amount = ref<number>(0);
const price_amount = ref<number>(0);

onMounted(() => {
  useEscrowStore().new_escrow.deposit_amount = 0;
  useEscrowStore().new_escrow.request_amount = 0;
  userTokenStore().load_token_accounts();
});

watch(
  () => [
    orderType.value,
    asset_token.value,
    price_token.value,
    asset_amount.value,
    price_amount.value,
  ],
  () => {
    switch (orderType.value) {
      case 'buy':
        if (asset_token.value)
          useEscrowStore().new_escrow.request_token = asset_token.value!;
        if (price_token.value)
          useEscrowStore().new_escrow.deposit_token = price_token.value!;
        if (asset_amount.value)
          useEscrowStore().new_escrow.request_amount = asset_amount.value!;
        if (price_amount.value)
          useEscrowStore().new_escrow.deposit_amount =
            price_amount.value! * asset_amount.value!;
        break;
      case 'sell':
        if (asset_token.value)
          useEscrowStore().new_escrow.deposit_token = asset_token.value!;
        if (price_token.value)
          useEscrowStore().new_escrow.request_token = price_token.value!;
        if (asset_amount.value)
          useEscrowStore().new_escrow.deposit_amount = asset_amount.value!;
        if (price_amount.value)
          useEscrowStore().new_escrow.request_amount =
            price_amount.value! * asset_amount.value!;
        break;
    }
  },
);
</script>

<template>
  <div class="col items-center q-gutter-y-md">
    <div class="border">
      <div class="text-h4 text-center bg-primary">SIDE</div>
      <q-tabs
        class="col"
        v-model="orderType"
        :active-bg-color="orderType == 'buy' ? 'buy' : 'sell'"
      >
        <q-tab label="BUY" name="buy"></q-tab>
        <q-tab label="SELL" name="sell"></q-tab>
      </q-tabs>
    </div>

    <div>
      <div class="text-h4 text-center bg-primary">ASSET</div>
      <TokenSelectInput
        label="Asset"
        :init_value="0"
        @token_change="(value: I_Token) => (asset_token = value)"
      />
      <TokenSelectAndAmountInput
        class="col"
        :label="`Amount to ${orderType}`"
        :token="asset_token"
        :amount-in="asset_amount"
        @amountChange="
          (value) => {
            asset_amount = parseFloat(value.toString().replaceAll(',', ''));
          }
        "
      />

      <TokensAvailable
        @amountClick="(amount) => (asset_amount = amount)"
        :token="asset_token"
      />
    </div>

    <div>
      <div class="text-h4 text-center bg-primary">Price</div>
      <TokenSelectInput
        label="Pair"
        :init_value="0"
        @token_change="(value: I_Token) => (price_token = value)"
      />
      <TokenSelectAndAmountInput
        class="col"
        label="Price per Unit"
        :token="price_token"
        :amount-in="price_amount"
        @amountChange="
          (value) => {
            price_amount = parseFloat(value.toString().replaceAll(',', ''));
          }
        "
      />
      <TokensAvailable
        @amountClick="(amount) => (price_amount = amount)"
        :token="price_token"
      />
    </div>
  </div>
</template>

<style scoped lang="sass"></style>
