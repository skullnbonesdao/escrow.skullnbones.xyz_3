<script setup lang="ts">
import { I_Token } from 'stores/interfaces/I_TokenList';
import CustomNumberInput from 'components/input/CustomNumberInput.vue';
import TokenSelectInput from 'components/elements/TokenSelectInput.vue';
import { PropType, ref, watch } from 'vue';
import { useGlobalStore } from 'stores/globalStore';

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
    token_input: {
        type: {} as PropType<I_Token>,
    },
    disable: {
        type: Boolean,
        default: false,
    },
});
const emits = defineEmits(['tokenChange', 'amountChange']);

const token = ref<I_Token>();
if (props.token_input) token.value = props.token_input;
const amount = ref(props.token_amount);

watch(
    () => props.token_amount,
    () => {
        amount.value = props.token_amount;
    }
);

watch(
    () => props.token_input,
    () => {
        token.value = props.token_input;
    }
);

watch(
    () => token.value,
    () => {
        emits('tokenChange', token.value);
    }
);

watch(
    () => amount.value,
    () => {
        emits('amountChange', amount.value);
    }
);
</script>

<template>
    <q-btn-group class="col">
        <div class="col">
            <div class="text-center text-h4 q-my-sm">
                <div class="">
                    {{ props.side?.toUpperCase() }}
                </div>
            </div>
            <TokenSelectInput
                v-if="type != 'take'"
                class="col"
                :init_value="token_input"
                @token_change="(value: I_Token) => (token = value)"
            />
            <CustomNumberInput
                :init_value="props.token_amount"
                :logo-u-r-i="token?.logoURI ?? 'unknown.png'"
                :precision="token?.decimals"
                @valueChange="(value:number) => (amount = value)"
                class="col"
            />
        </div>
    </q-btn-group>
</template>

<style scoped lang="sass"></style>
