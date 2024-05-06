<script setup lang="ts">
import { useGlobalStore } from 'src/stores/globalStore';
import EscrowTable from 'components/tables/EscrowTable.vue';
import { onMounted } from 'vue';

onMounted(() => {
    useGlobalStore().showLeftDrawer = true;
    useGlobalStore().showRightDrawer = false;
});
</script>
<template>
    <q-page class="row">
        <q-scroll-area class="col">
            <EscrowTable v-if="useGlobalStore().is_init" />
        </q-scroll-area>
    </q-page>
</template>
