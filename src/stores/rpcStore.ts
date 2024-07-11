import { defineStore } from 'pinia';
import { Connection } from '@solana/web3.js';
import { RPC_NETWORKS } from 'stores/interfaces/RPC_Networks';
import { useLocalStorage } from '@vueuse/core';

export const useRPCStore = defineStore('rpcStore', {
  state: () => ({
    rpc_stored_name: useLocalStorage('rpc_store_0', RPC_NETWORKS[0].name),
    rpc_selected:
      RPC_NETWORKS.find((rpc) =>
        rpc.name.includes(useLocalStorage('rpc_store_0', RPC_NETWORKS[0].name)),
      ) ?? RPC_NETWORKS[0],
    connection: {} as Connection,
  }),
  actions: {
    update_connection() {
      console.log('RPC is set to: ' + this.rpc_selected.name);
      this.connection = new Connection(this.rpc_selected.url, {
        commitment: 'confirmed',
      });
    },
  },
});
