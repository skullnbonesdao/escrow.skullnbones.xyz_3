<script setup lang="ts">
import { computed, PropType, ref } from 'vue';
import { userTokenStore } from 'stores/userTokenStore';
import { format_number } from 'src/functions/format_number';
const props = defineProps(['token']);
const emits = defineEmits(['amountClick']);
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
</script>

<template>
  <div
    @click="() => emits('amountClick', available_amount)"
    class="row text-weight-light q-mx-sm q-mt-xs"
  >
    <div class="col">Available:</div>
    <div>{{ available_amount }}</div>
  </div>
</template>

<style scoped lang="sass"></style>
