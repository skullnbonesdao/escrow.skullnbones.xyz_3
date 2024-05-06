<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { format } from 'v-money3';
import TokenIcon from 'components/elements/TokenIcon.vue';

const props = defineProps({
  init_value: {
    type: Number,
    default: 0,
  },
  precision: {
    type: Number,
    default: 2,
  },
  logoURI: {
    type: String,
    default: 'unknown.png',
  },
});

const emits = defineEmits(['valueChange']);

const config = ref({
  debug: false,
  masked: false,
  prefix: '',
  suffix: '',
  thousands: ',',
  decimal: '.',
  precision: props.precision,
  disableNegative: true,
  disabled: false,
  min: null,
  max: null,
  allowBlank: false,
  minimumNumberOfCharacters: 0,
  modelModifiers: {
    number: false,
  },
  shouldRound: true,
  focusOnRight: false,
});

watch(
  () => props.init_value,
  () => {
    value.value = parseFloat(props.init_value.toString()).toFixed(
      config.value.precision,
    );
  },
);

watch(
  () => props.precision,
  () => {
    config.value.precision = props.precision;
  },
);

const value = ref(
  parseFloat(props.init_value.toString()).toFixed(config.value.precision),
);
const value_formatted = computed({
  // getter
  get() {
    return format(value.value, config.value);
  },
  // setter
  set(newValue) {
    let valueString = parseFloat(newValue.toString()).toFixed(
      config.value.precision,
    );

    value.value = valueString;
    console.log(format(value.value, config.value));
    emits('valueChange', format(value.value, config.value));
  },
});
</script>

<template>
  <q-input
    :disable="logoURI.includes('unknown')"
    debounce="1000"
    filled
    square
    reverse-fill-mask
    v-model="value_formatted"
    input-class="text-right"
    label="Amount"
  >
    <template v-slot:append>
      <TokenIcon size="sm" :src="logoURI" />
    </template>
  </q-input>
</template>
