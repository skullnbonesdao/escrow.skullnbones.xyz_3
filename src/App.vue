<template>
    <router-view />
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { useGlobalStore } from 'stores/globalStore';
import { initWorkspace } from 'src/adapter/adapterPrograms';
import { onMounted } from 'vue';
import 'src/css/background.css'
import { useEscrowStore } from 'stores/escrowStore';


defineOptions({
    name: 'App',
});

useGlobalStore();
useGlobalStore().init();

initWorkspace();

onMounted(async () => {
    await useEscrowStore().load_all_escrows();
    useGlobalStore().is_init = true;
});
useQuasar().dark.set(true);
</script>
