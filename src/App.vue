<template>
  <router-view />
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { useGlobalStore } from 'stores/globalStore';
import { initWorkspace } from 'src/adapter/adapterPrograms';
import { onMounted, watch } from 'vue';
import 'src/css/background.css';
import { useEscrowStore } from 'stores/escrowStore';
import { userTokenStore } from 'stores/userTokenStore';
import { useWallet } from 'solana-wallets-vue';
import { useWhitelistStore } from 'stores/whitelistStore';
import { useRPCStore } from 'stores/rpcStore';

defineOptions({
  name: 'App',
});
useRPCStore();
useGlobalStore();
useGlobalStore().init();

initWorkspace();

onMounted(async () => {
  await useEscrowStore().load_all_escrows();
  useGlobalStore().is_init = true;
});

watch(
  () => useWallet().publicKey.value,
  async () => {
    await userTokenStore().load_token_accounts();
    await useWhitelistStore().prepare_whitelisted();
  },
);

useQuasar().dark.set(true);
</script>
