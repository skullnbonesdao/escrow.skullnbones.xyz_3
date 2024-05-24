<script setup lang="ts">
import { I_Token } from 'stores/interfaces/I_TokenList';
import CustomNumberInput from 'components/input/CustomNumberInput.vue';
import TokenSelectInput from 'components/input/TokenSelectInput.vue';
import { computed, PropType, ref, watch } from 'vue';
import { useGlobalStore } from 'stores/globalStore';
import { userTokenStore } from '../../stores/userTokenStore';
import accept = chrome.socket.accept;
import { format_number } from 'src/functions/format_number';

const props = defineProps({
  token_amount: {
    type: Number,
    default: 0,
  },
  side: {
    type: String,
    default: 'sell',
  },
  type: {
    type: String || undefined,
    default: undefined,
  },
  token_input: {},
  disable: {
    type: Boolean,
    default: false,
  },
});
const emits = defineEmits(['tokenChange', 'amountChange']);

const token = ref<I_Token>();
if (props.token_input) token.value = props.token_input as I_Token;
const amount = ref(props.token_amount);

const available_amount = computed(() => {
  let account = userTokenStore().accounts.find(
    (acc) => acc.account.data.parsed.info.mint == token.value?.address,
  );

  let value = account?.account.data.parsed.info.tokenAmount.uiAmount;

  let decimals = account?.account.data.parsed.info.tokenAmount.decimals;

  if (value) return format_number(value, decimals);
  else return '-';
});

watch(
  () => props.token_amount,
  () => {
    amount.value = props.token_amount;
  },
);

watch(
  () => props.token_input,
  () => {
    token.value = props.token_input as I_Token;
  },
);

watch(
  () => token.value,
  () => {
    if (!token.value) amount.value = 0;
    emits('tokenChange', token.value);
  },
);

watch(
  () => amount.value,
  () => {
    emits('amountChange', amount.value);
  },
);
</script>

<template>
  <q-btn-group class="col" flat>
    <div class="col">
      <div class="text-center text-h4 q-my-sm">
        <div class="">
          {{ props.side?.toUpperCase() }}
        </div>
      </div>

      <TokenSelectInput
        v-if="type != 'take'"
        class="col"
        :show_only_available="side == 'offer'"
        :init_value="token_input"
        @token_change="(value: I_Token) => (token = value)"
      />

      <div
        class="text-weight-thin row q-ma-xs"
        @click="amount = available_amount as number"
      >
        <q-tooltip>'Click' to apply 100% </q-tooltip>
        <div>Available:</div>
        <div class="col text-right">
          {{ available_amount }}
        </div>
      </div>

      <CustomNumberInput
        :mint="token?.address ?? ''"
        :side="side"
        :init_value="amount"
        :logo-u-r-i="token?.logoURI ?? 'unknown.png'"
        :precision="token?.decimals"
        @valueChange="(value: number) => (amount = value)"
        class="col"
      />
    </div>
  </q-btn-group>
</template>

<style scoped lang="sass"></style>
