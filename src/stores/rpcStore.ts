import { defineStore } from 'pinia';
import { Connection } from '@solana/web3.js';
import { RPC_NETWORKS } from 'stores/interfaces/RPC_Networks';

export const useRPCStore = defineStore('rpcStore', {
  state: () => ({
    rpc_selected: RPC_NETWORKS[0],
    connection: {} as Connection,
  }),
  getters: {},
  actions: {
    update_connection() {
      console.log('RPC is set to: ' + this.rpc_selected.name);
      this.connection = new Connection(this.rpc_selected.url, {
        commitment: 'confirmed',
      });
    },
  },
});
