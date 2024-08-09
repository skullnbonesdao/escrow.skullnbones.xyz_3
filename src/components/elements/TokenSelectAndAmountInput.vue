<script setup lang="ts">
import { Money } from 'v-money3';
import { computed, ref, watch } from 'vue';
import { I_Token } from 'stores/interfaces/I_TokenList';
import TokenSelectInput from 'components/input/TokenSelectInput.vue';
import { watchDebounced } from '@vueuse/core';
import { userTokenStore } from 'stores/userTokenStore';
import { format_number } from 'src/functions/format_number';

const props = defineProps(['label', 'token', 'amountIn']);
const emits = defineEmits(['amountChange']);
const amount = ref();

watch(
  () => props.amountIn,
  () => (amount.value = props.amountIn),
);

const amountFormat = computed(() => {
  return {
    decimal: '.',
    thousands: ',',
    prefix: '',
    suffix: '',
    precision: props.token?.decimals,
    masked: true,
  };
});

const available_amount = computed(() => {
  let account = userTokenStore().accounts.find(
    (acc) =>
      acc.account.data.parsed.info.mint.toString() ==
      props.token?.address.toString(),
  );

  let value = account?.account.data.parsed.info.tokenAmount.uiAmount;

  let decimals = account?.account.data.parsed.info.tokenAmount.decimals;

  if (value) return format_number(value, decimals);
  else return '-';
});

watchDebounced(
  () => amount.value,
  () => {
    emits('amountChange', amount.value);
  },
);
</script>

<template>
  <div class="row">
    <q-field
      square
      class="col"
      filled
      v-model="amount"
      :label="props.label ?? 'Amount'"
    >
      <template v-slot:control="{ id, floatingLabel, modelValue, emitValue }">
        <money
          :id="id"
          class="q-field__input text-right"
          :model-value="modelValue"
          @update:model-value="emitValue"
          v-bind="amountFormat"
          v-show="floatingLabel"
        />
      </template>
    </q-field>
  </div>
</template>

<style scoped lang="sass"></style>
