import { defineStore } from 'pinia';
import { I_Token } from 'stores/interfaces/I_TokenList';

import * as token_list_local from './local_tokenlist.json';
import { Escrow } from 'src/adapter/escrow_gen/accounts';
import { Connection, PublicKey } from '@solana/web3.js';
import { RPC_NETWORKS } from 'stores/interfaces/RPC_Networks';
import { useWorkspace } from 'src/adapter/adapterPrograms';


export const useGlobalStore = defineStore('globalStore', {
    state: () => ({
        is_init: false,
        rpc_selected: RPC_NETWORKS[0],
        connection: {} as Connection,
        showLeftDrawer: false,
        showRightDrawer: false,
        token_list: token_list_local.tokens as I_Token[],

    }),
    getters: {},
    actions: {
        init() {
            this.update_connection();
        },
        update_connection() {
            console.log('RPC is set to: ' + this.rpc_selected.url);
            this.connection = new Connection(this.rpc_selected.url, {
                commitment: 'confirmed',
            });
        },

    },
});
