import { defineStore } from 'pinia';
import { I_Token } from 'stores/interfaces/I_TokenList';

import * as token_list_local from './local_tokenlist.json';
import { Escrow } from 'src/adapter/escrow_gen/accounts';
import { Connection, PublicKey } from '@solana/web3.js';
import { RPC_NETWORKS } from 'stores/interfaces/RPC_Networks';
import { useWorkspace } from 'src/adapter/adapterPrograms';

export const useWhitelistStore = defineStore('whitelistStore', {
    state: () => ({
        is_whitelisted: false,
    }),
    getters: {},
    actions: {},
});
