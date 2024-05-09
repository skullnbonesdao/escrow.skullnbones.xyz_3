import { defineStore } from 'pinia';
import { I_Token } from 'stores/interfaces/I_TokenList';

import * as token_list_local from './local_tokenlist.json';
import { Escrow } from 'src/adapter/escrow_gen/accounts';
import {
  AccountInfo,
  Connection,
  ParsedAccountData,
  PublicKey,
} from '@solana/web3.js';
import { RPC_NETWORKS } from 'stores/interfaces/RPC_Networks';
import { useWorkspace } from 'src/adapter/adapterPrograms';
import { useWallet } from 'solana-wallets-vue';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { useGlobalStore } from 'stores/globalStore';

export interface I_Account {
  pubkey: PublicKey;
  account: AccountInfo<ParsedAccountData>;
}

export const userTokenStore = defineStore('userTokenStore', {
  state: () => ({
    accounts: [] as I_Account[],
  }),
  actions: {
    async load_token_accounts() {
      if (useWallet().publicKey.value) {
        this.accounts = (
          await useGlobalStore().connection.getParsedTokenAccountsByOwner(
            useWallet().publicKey.value!,
            {
              programId: TOKEN_PROGRAM_ID,
            },
          )
        ).value;
      }
    },
  },
});

export function get_token_amount_wallet(mint: string) {
  const acc = userTokenStore().accounts.find(
    (acc) => acc.account.data.parsed.info.mint.toString() == mint,
  );
  if (acc) return acc.account.data.parsed.info.tokenAmount.uiAmount;
  else return 0;
}
