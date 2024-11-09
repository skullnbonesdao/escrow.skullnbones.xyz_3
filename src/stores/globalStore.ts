import { defineStore } from 'pinia';
import { I_Token } from 'stores/interfaces/I_TokenList';
import * as token_list_local from './local_tokenlist.json';
import * as snb_tokens from './local_token_list_snb.json';
import { useRPCStore } from 'stores/rpcStore';
import { format } from 'v-money3';
import { useWhitelistStore } from 'stores/whitelistStore';

export const useGlobalStore = defineStore('globalStore', {
  state: () => ({
    showLeftDrawer: false,
    leftDrawerMini: false,
    showRightDrawer: false,

    token_list: token_list_local.tokens as I_Token[],
    added_extra: false,
  }),
  getters: {
    getAsTree(state) {
      const tree: any[] = [];
      state.token_list.forEach((token) => {
        addTokenToTree(tree, token);
      });

      return tree;
    },
  },
  actions: {
    init() {
      useRPCStore().update_connection();
    },
    token_list_add() {
      if (!this.added_extra) {
        console.log('adding...');
        if (useWhitelistStore().is_whitelisted) {
          snb_tokens.tokens.forEach((token) => {
            token_list_local.tokens.push(token);
          });
          this.added_extra = true;
        }
      }
    },
  },
});

function addTokenToTree(tree: any[], token: I_Token) {
  let currentLevel = tree;
  token.tree.forEach((level, index) => {
    // Check if a node with the current level label exists
    const existingNode = currentLevel.find((node) => node.label === level);

    if (existingNode) {
      // If we're at the last level, add the token as a child
      if (index === token.tree.length - 1) {
        existingNode.children.push({
          label: token.symbol,
          avatar: token.logoURI,
          token: token,
        });
      } else {
        // Otherwise, move deeper into the hierarchy
        currentLevel = existingNode.children;
      }
    } else {
      // Create a new node if it doesn't exist
      const newNode = {
        label: level,
        children: [],
      };

      // If we're at the last level, add the token as a child
      if (index === token.tree.length - 1) {
        newNode.children.push({
          label: token.symbol,
          avatar: token.logoURI,
          token: token,
        } as never);
      }

      currentLevel.push(newNode);
      // Move deeper into the newly created node's children
      currentLevel = newNode.children;
    }
  });
}
