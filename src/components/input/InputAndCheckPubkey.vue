<script setup lang="ts">
import { ref, watch } from 'vue';
import { PublicKey } from '@solana/web3.js';

const emits = defineEmits(['wallet']);
const recipient_address = ref();
const is_valid = ref(false);

function check_pubkey(pubkey: string): boolean {
    is_valid.value = false;
    try {
        let key = new PublicKey(pubkey);
        is_valid.value = true;

        emits('wallet', key);
    } catch (err) {
        is_valid.value = false;
    }
    return is_valid.value;
}
</script>

<template>
    <q-input
        standout
        class="col-2"
        v-model="recipient_address"
        label="Recipient address"
        type="text"
        :rules="[(val:any) => check_pubkey(val) || 'Invalid PublicKey']"
    />
</template>

<style scoped lang="sass"></style>
