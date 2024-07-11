import { defineStore } from 'pinia';
import { AccountInfo, ParsedAccountData, PublicKey } from '@solana/web3.js';
import { useWallet } from 'solana-wallets-vue';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { useRPCStore } from 'stores/rpcStore';

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
          await useRPCStore().connection.getParsedTokenAccountsByOwner(
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
