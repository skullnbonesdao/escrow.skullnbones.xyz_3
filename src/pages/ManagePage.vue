<script setup lang="ts">
import { useGlobalStore } from 'stores/globalStore';
import CreateEscrowView from 'components/views/CreateEscrowView.vue';
import { onMounted, ref } from 'vue';
import EditEscrowView from 'components/views/EditEscrowView.vue';

onMounted(() => {
  useGlobalStore().showLeftDrawer = false;
  useGlobalStore().showRightDrawer = false;
});

const tab = ref('create');
</script>

<template>
  <q-page>
    <q-tabs
      v-model="tab"
      inline-label
      class="bg-primary text-white"
      align="justify"
    >
      <q-tab name="create" icon="add_circle" label="Create" to="/mails" />
      <q-tab name="edit" icon="close" label="Cancel" to="/alarms" />
    </q-tabs>
    <div class="row items-center justify-evenly q-ma-sm">
      <CreateEscrowView v-if="tab == 'create'" />
      <EditEscrowView v-if="tab == 'edit'" />
    </div>
  </q-page>
</template>
