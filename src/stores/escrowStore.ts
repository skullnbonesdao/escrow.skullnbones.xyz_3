import { defineStore } from 'pinia';
import { I_Token } from 'stores/interfaces/I_TokenList';
import { Escrow } from 'src/adapter/escrow_gen/accounts';
import { PublicKey } from '@solana/web3.js';
import { useWorkspace } from 'src/adapter/adapterPrograms';
import { useGlobalStore } from 'stores/globalStore';
import { NULL_ADDRESS } from 'stores/constants';
import { useWallet } from 'solana-wallets-vue';
import { useLocalStorage } from '@vueuse/core';

export interface I_Escrows {
  publicKey: PublicKey;
  account: Escrow;
}

export interface NewEscrowState {
  deposit_token: I_Token;
  request_token: I_Token;
  deposit_amount: number;
  request_amount: number;
  only_recipient: boolean;
  recipient_address: string;
  has_expire: boolean;
  closing_timestamp: number;
  allow_partial_fill: boolean;
  only_whitelist: boolean;
  slippage: number;
}

export const useEscrowStore = defineStore('escrowStore', {
  state: () => ({
    is_loading: false,
    sort_direction: 'sell_ppu',
    new_escrow: {
      only_recipient: false,
      has_expire: false,
      allow_partial_fill: true,
      only_whitelist: false,
      slippage: 1,
    } as NewEscrowState,

    escrows: undefined as Array<I_Escrows> | undefined,
    escrows_filtered: undefined as Array<I_Escrows> | undefined,

    escrows_filtered_grouped: {} as Record<string, I_Escrows[]> | undefined,

    escrow_selected: undefined as I_Escrows | undefined,
    filter_cards: {
      filter_string: '',
      treeKeys: useLocalStorage(
        'filter_cards.treeKeys',
        useGlobalStore().token_list.flatMap((t) => t.symbol),
      ),
      filter_type: 'type_public',
      extra_filter: ['self', 'fill_partial', 'fill_full'],
    },
    escrows_cards: {} as
      | Record<string, { buy: I_Escrows[]; sell: I_Escrows[] }>
      | undefined,
  }),
  getters: {},
  actions: {
    async load_all_escrows() {
      this.is_loading = true;
      const data = await useWorkspace()?.pg_escrow.value.account.escrow.all();
      this.escrows = data as unknown as Array<I_Escrows>;
      this.is_loading = false;
    },
    async load_escrow(address: PublicKey) {
      console.log('load_escrow()');
      this.escrow_selected = {
        publicKey: address,
        account: (await useWorkspace()?.pg_escrow.value.account.escrow.fetch(
          address,
        )) as unknown as Escrow,
      };
    },
    apply_filter() {
      //Prepare filter
      const hasFillFull = this.filter_cards.extra_filter.includes('fill_full');
      const hasFillPartial =
        this.filter_cards.extra_filter.includes('fill_partial');
      const hasSelf = this.filter_cards.extra_filter.includes('self');
      const hasFilled = this.filter_cards.extra_filter.includes('filled');

      //treeKey

      //Filter
      const filtered_escrow = this.escrows?.filter((escrow) => {
        const allowPartialFill = escrow.account.allowPartialFill;
        const maker = escrow.account.maker.toString();
        const tokensDepositRemaining =
          escrow?.account.tokensDepositRemaining?.toNumber() ?? 0;
        const tokensDepositInit =
          escrow?.account.tokensDepositInit?.toNumber() ?? 0;
        const recipient = escrow.account.recipient?.toString() ?? '';
        const onlyWhitelist = escrow.account.onlyWhitelist;

        // Filter based on extra_filter
        const isNotPartialFill = hasFillFull || allowPartialFill !== false;
        const isNotFullFill = hasFillPartial || allowPartialFill !== true;
        const isNotSelf =
          hasSelf || maker !== useWallet().publicKey.value?.toString();
        const isNotFilled =
          hasFilled ||
          (tokensDepositRemaining / tokensDepositInit) * 100 > 0.0001;

        // Filter based on filter_type.value
        let passesFilterType = true;
        switch (this.filter_cards.filter_type) {
          case 'type_public': {
            passesFilterType = recipient === NULL_ADDRESS.toString();
            break;
          }
          case 'type_private': {
            passesFilterType =
              recipient === useWallet().publicKey.value?.toString();
            break;
          }
          case 'type_members': {
            passesFilterType = onlyWhitelist === true;
            break;
          }
        }

        // Return the result of all filter conditions
        return (
          isNotPartialFill &&
          isNotFullFill &&
          isNotSelf &&
          isNotFilled &&
          passesFilterType
        );
      });

      let data: any = filtered_escrow?.reduce(
        (acc, item) => {
          const { depositToken, requestToken } = item.account;

          const dToken = useGlobalStore().token_list.find(
            (t) => t.address == depositToken.toString(),
          );

          const rToken = useGlobalStore().token_list.find(
            (t) => t.address == requestToken.toString(),
          );

          // Helper function to initialize the structure if the token is encountered for the first time
          const initializeTokenGroup = (acc: any, tokenSymbol: any) => {
            if (!acc[tokenSymbol]) {
              acc[tokenSymbol] = { buy: [], sell: [] };
            }
          };

          // Group by the deposit token (dToken) for "sell" since escrow is depositing that token
          if (dToken) {
            const dTokenSymbol = dToken.symbol;
            initializeTokenGroup(acc, dTokenSymbol);
            acc[dTokenSymbol].buy.push(item);
          }

          // Group by the request token (rToken) for "buy" since escrow is requesting that token
          if (rToken) {
            const rTokenSymbol = rToken.symbol;
            initializeTokenGroup(acc, rTokenSymbol);
            acc[rTokenSymbol].sell.push(item);
          }

          return acc;
        },
        {} as Record<string, { buy: I_Escrows[]; sell: I_Escrows[] }>,
      );

      if (this.filter_cards.filter_string)
        data = Object.fromEntries(
          Object.entries(data).filter(([tokenSymbol, _]) => {
            const INCLUDES_SYMBOL = tokenSymbol
              .toLowerCase()
              .includes(this.filter_cards.filter_string.toLowerCase());
            const INCLUDES_NAME = useGlobalStore()
              .token_list.find((t) => t.symbol == tokenSymbol)
              ?.name.toLowerCase()
              .includes(this.filter_cards.filter_string.toLowerCase());
            return INCLUDES_SYMBOL || INCLUDES_NAME;
          }),
        );

      this.escrows_cards = data;
      console.log(this.escrows_cards);
      console.log('== UPDATED FILTER');
    },
  },
});
