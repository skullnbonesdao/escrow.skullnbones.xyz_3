<script setup lang="ts">
import { useGlobalStore } from 'src/stores/globalStore';

import { onMounted, ref } from 'vue';
import { useQuasar } from 'quasar';
import FilterEscrows2 from 'components/filters/FilterEscrows2.vue';
import EscrowCards2 from 'components/tables/EscrowCards2.vue';
import { useEscrowStore } from 'stores/escrowStore';

onMounted(() => {
  useGlobalStore().showLeftDrawer = true;
  useGlobalStore().showRightDrawer = false;
});

const barStyle = ref({
  right: '2px',
  borderRadius: '9px',
  backgroundColor: 'none',
  width: '8px',
  opacity: 0.2,
});

const thumbStyle = ref({
  right: '0px',
  borderRadius: '0px',
  backgroundColor: '#888',
  width: '5px',
  opacity: 1,
});
</script>
<template>
  <q-page class="row">
    <q-scroll-area
      :thumb-style="thumbStyle"
      :bar-style="barStyle"
      visible
      class="col"
    >
      <q-list v-if="useQuasar().screen.lt.md" bordered class="bg-dark">
        <q-expansion-item expand-separator icon="search" label="Filters">
          <FilterEscrows2 />
        </q-expansion-item>
      </q-list>
      <div
        v-if="
          useEscrowStore().is_loading || useEscrowStore().escrows_cards === {}
        "
        class="row items-center q-ma-xl justify-center"
      >
        <q-spinner-gears color="primary" size="25em" />
      </div>
      <EscrowCards2 v-else />
    </q-scroll-area>
  </q-page>
</template>
<style>
/* width */
::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: none;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
