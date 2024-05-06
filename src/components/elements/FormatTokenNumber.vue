<script setup lang="ts">
import { computed, ref } from 'vue';
import { useGlobalStore } from 'stores/globalStore';
import { format } from 'v-money3';

const props = defineProps(['mint', 'amount']);

const config = computed(() => {
    return {
        debug: false,
        masked: false,
        prefix: '',
        suffix: '',
        thousands: ',',
        decimal: '.',
        precision:
            useGlobalStore().token_list.find((t) => t.address == props.mint)
                ?.decimals ?? 0,
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
    };
});

// const value = computed(() => {
//     return format(props.amount, config);
// });
</script>

<template>
    <p class="text-body1">
        {{ format(props.amount, config) }}
    </p>
</template>

<style scoped lang="sass"></style>
