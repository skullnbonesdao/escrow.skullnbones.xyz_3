<template>
  <q-dialog
    v-model="persistent"
    persistent
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card flat class="text-white q-pa-md" style="width: 500px">
      <q-card-section>
        <div class="text-h4 text-center">Settings</div>
      </q-card-section>
      <q-separator />
      <q-card-section class="q-pt-md">
        <q-select
          square
          borderless
          standout
          color="white"
          v-model="useRPCStore().rpc_stored_name"
          :options="RPC_NETWORKS.map((rpc) => rpc.name)"
          label="Select an RPC to use:"
        />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          @click="update_selection()"
          class="full-width"
          color="primary"
          label="Apply"
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from 'vue';
import { useRPCStore } from 'stores/rpcStore';
import { RPC_NETWORKS } from 'stores/interfaces/RPC_Networks';
import { useQuasar } from 'quasar';

const checked = ref(false);
const persistent = ref(true);
const q = useQuasar();

function update_selection() {
  useRPCStore().show_rpc_select = false;
  useRPCStore().update_connection();
  q.notify({
    type: 'positive',
    icon: 'info',
    message: `RPC has been updated to: ${useRPCStore().rpc_stored_name}`,
    timeout: 5000,
  });
}
</script>
