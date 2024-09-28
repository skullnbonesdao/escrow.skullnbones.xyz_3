import { defineStore } from 'pinia';
import { I_Token } from 'stores/interfaces/I_TokenList';
import * as token_list_local from './local_tokenlist.json';
import { useRPCStore } from 'stores/rpcStore';
import { format } from 'v-money3';

export const useGlobalStore = defineStore('globalStore', {
  state: () => ({
    is_init: false,
    showLeftDrawer: false,
    leftDrawerMini: false,
    showRightDrawer: false,
    token_list: token_list_local.tokens as I_Token[],
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
          label: token.name,
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
