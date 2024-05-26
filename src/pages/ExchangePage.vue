<script setup lang="ts">
import { useGlobalStore } from 'src/stores/globalStore';
import EscrowTable from 'components/tables/EscrowTable.vue';
import { computed, onMounted } from 'vue';
import { useEscrowStore } from '../stores/escrowStore';
import { useQuasar } from 'quasar';
import FilterEscrows from 'components/filters/FilterEscrows.vue';

onMounted(() => {
  useGlobalStore().showLeftDrawer = true;
  useGlobalStore().showRightDrawer = false;
});
</script>
<template>
  <q-page class="row">
    <q-scroll-area
      class="col"
      :class="useQuasar().screen.lt.md ? '' : 'q-ma-xs'"
    >
      <q-list v-if="useQuasar().screen.lt.md" bordered class="bg-dark">
        <q-expansion-item expand-separator icon="search" label="Filters">
          <FilterEscrows />
        </q-expansion-item>
      </q-list>
      <EscrowTable v-if="useGlobalStore().is_init" />
    </q-scroll-area>
  </q-page>
</template>
