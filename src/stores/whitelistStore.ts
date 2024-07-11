import { defineStore } from 'pinia';
import { PublicKey } from '@solana/web3.js';
import { useWorkspace } from 'src/adapter/adapterPrograms';
import { WHITELIST_PROGRAM_ID, WHITELISTS } from 'stores/constants';
import { useWallet } from 'solana-wallets-vue';

export const useWhitelistStore = defineStore('whitelistStore', {
  state: () => ({
    whitelist_account: {} as PublicKey | undefined,
    entry_account: {} as PublicKey | undefined,
    is_whitelisted: false,
  }),
  getters: {},
  actions: {
    async prepare_whitelisted() {
      try {
        const whitelists =
          await useWorkspace()?.pg_whitelist.value.account.whitelist.all();

        this.whitelist_account = whitelists?.find(
          (w) => w.account.name == WHITELISTS[0],
        )?.publicKey;

        const [whitelistEntry, entryBump] = PublicKey.findProgramAddressSync(
          [
            useWallet().publicKey.value!.toBytes(),
            this.whitelist_account!.toBytes(),
          ],
          WHITELIST_PROGRAM_ID,
        );

        this.entry_account = whitelistEntry;

        const entry =
          await useWorkspace()?.pg_whitelist.value.account.whitelistEntry.fetch(
            whitelistEntry,
          );

        if (entry) this.is_whitelisted = true;
      } catch (err) {
        this.is_whitelisted = false;
        //console.log(err);
      }
    },
  },
});
