<script setup lang="ts">
import { useGlobalStore } from 'stores/globalStore';
import CreateEscrowView from 'components/views/CreateEscrowView.vue';
import { onMounted, ref } from 'vue';
import EditEscrowView from 'components/views/EditEscrowView.vue';
import { useQuasar } from 'quasar';

onMounted(() => {
  useGlobalStore().showLeftDrawer = false;
  useGlobalStore().showRightDrawer = false;
});

const tab = ref('create');
</script>

<template>
  <q-page>
    <q-tabs v-model="tab" class="bg-dark text-white" align="justify">
      <q-tab name="create" icon="add_circle" label="Create" />
      <q-tab name="edit" icon="design_services" label="Manage" />
    </q-tabs>
    <div
      class="row items-center justify-evenly"
      :class="useQuasar().screen.lt.md ? '' : 'q-pa-md'"
    >
      <CreateEscrowView v-if="tab == 'create'" />
      <EditEscrowView v-if="tab == 'edit'" />
    </div>
  </q-page>
</template>
