<script setup lang="ts">
import { useWallet, WalletMultiButton } from 'solana-wallets-vue';
</script>

<template>
    <div
        v-if="!useWallet().publicKey.value"
        class="row justify-center bg-secondary"
    >
        <WalletMultiButton dark />
    </div>

    <q-btn v-else dense color="secondary" icon="highlight_off">
        <q-tooltip> Cancel/Close escrow </q-tooltip>
    </q-btn>
</template>

<style scoped lang="sass"></style>
