<script setup lang="ts">
import { ref, watch } from 'vue';
import { PublicKey } from '@solana/web3.js';

const emits = defineEmits(['timestamp']);

const is_valid = ref(false);
const date = ref();

watch(
    () => date.value,
    () => emits('timestamp', Date.parse(date.value) / 1000)
);
</script>

<template>
    <div class="row q-gutter-x-sm" style="max-width: 800px">
        <q-date
            flat
            class="col"
            v-model="date"
            mask="YYYY-MM-DD HH:mm"
            color="primary"
        />
        <q-time
            flat
            class="col-4"
            v-model="date"
            mask="YYYY-MM-DD HH:mm"
            color="primary"
        />
    </div>
</template>

<style scoped lang="sass"></style>
