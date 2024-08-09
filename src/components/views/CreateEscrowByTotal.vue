<script setup lang="ts">
import { ref, watch } from 'vue';
import { Money } from 'v-money3';
import TokenSelectAndAmountInput from 'components/elements/TokenSelectAndAmountInput.vue';
import { I_Token } from 'stores/interfaces/I_TokenList';
import TokenSelectInput from 'components/input/TokenSelectInput.vue';
import TokensAvailable from 'components/elements/TokensAvailable.vue';
import { useEscrowStore } from 'stores/escrowStore';

const orderType = ref('buy');

const price = ref();
const deposit_token = ref<I_Token>();
const request_token = ref<I_Token>();
</script>

<template>
  <div class="col items-center q-gutter-y-md">
    <div class="col">
      <div class="text-h4 text-center bg-primary">OFFER</div>

      <TokenSelectInput
        label="Offer"
        :init_value="0"
        @token_change="
          (value: I_Token) =>
            (useEscrowStore().new_escrow.deposit_token = value)
        "
      />
      <TokenSelectAndAmountInput
        class="col"
        :label="`Amount`"
        :token="useEscrowStore().new_escrow.deposit_token"
        :amount-in="useEscrowStore().new_escrow.deposit_amount"
        @amountChange="
          (value) => {
            useEscrowStore().new_escrow.deposit_amount = parseFloat(
              value.toString().replaceAll(',', ''),
            );
          }
        "
      />
      <TokensAvailable
        @amountClick="
          (amount) => (useEscrowStore().new_escrow.deposit_amount = amount)
        "
        :token="useEscrowStore().new_escrow.deposit_token"
      />
    </div>

    <div class="col">
      <div class="text-h4 text-center bg-primary">REQUEST</div>

      <TokenSelectInput
        label="Request"
        :init_value="0"
        @token_change="
          (value: I_Token) =>
            (useEscrowStore().new_escrow.request_token = value)
        "
      />
      <TokenSelectAndAmountInput
        class="col"
        label="Amount"
        :token="useEscrowStore().new_escrow.request_token"
        :amount-in="useEscrowStore().new_escrow.request_amount"
        @amountChange="
          (value) => {
            useEscrowStore().new_escrow.request_amount = parseFloat(
              value.toString().replaceAll(',', ''),
            );
          }
        "
      />
      <TokensAvailable
        @amountClick="
          (amount) => (useEscrowStore().new_escrow.request_amount = amount)
        "
        :token="useEscrowStore().new_escrow.request_token"
      />
    </div>
  </div>
</template>

<style scoped lang="sass"></style>
