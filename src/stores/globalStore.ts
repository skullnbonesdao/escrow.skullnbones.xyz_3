import { defineStore } from 'pinia';
import { I_Token } from 'stores/interfaces/I_TokenList';
import * as token_list_local from './local_tokenlist.json';
import { useRPCStore } from 'stores/rpcStore';

export const useGlobalStore = defineStore('globalStore', {
  state: () => ({
    is_init: false,
    showLeftDrawer: false,
    leftDrawerMini: false,
    showRightDrawer: false,
    token_list: token_list_local.tokens as I_Token[],
  }),
  getters: {},
  actions: {
    init() {
      useRPCStore().update_connection();
    },
  },
});
