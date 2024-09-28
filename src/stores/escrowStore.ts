import { defineStore } from 'pinia';
import { I_Token } from 'stores/interfaces/I_TokenList';
import { Escrow } from 'src/adapter/escrow_gen/accounts';
import { PublicKey } from '@solana/web3.js';
import { useWorkspace } from 'src/adapter/adapterPrograms';
import { useGlobalStore } from 'stores/globalStore';
import { NULL_ADDRESS } from 'stores/constants';
import { useWallet } from 'solana-wallets-vue';

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
      treeKeys: ['ATLAS', 'POLIS', 'USDC', 'PURI', 'DACB', 'TKS'],
      by: 'buy',
      filter_type: 'type_public',
      extra_filter: ['self', 'fill_partial', 'fill_full'],
    },
    escrows_cards: {} as Record<string, I_Escrows[]> | undefined,
  }),
  getters: {},
  actions: {
    async load_all_escrows() {
      const data = await useWorkspace()?.pg_escrow.value.account.escrow.all();
      this.escrows = data as unknown as Array<I_Escrows>;
      //this.escrow_selected = this.escrows[0];
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
    async apply_filter() {
      //Prepare filter
      const hasFillFull = this.filter_cards.extra_filter.includes('fill_full');
      const hasFillPartial =
        this.filter_cards.extra_filter.includes('fill_partial');
      const hasSelf = this.filter_cards.extra_filter.includes('self');
      const hasFilled = this.filter_cards.extra_filter.includes('filled');

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
          hasFilled || (tokensDepositRemaining / tokensDepositInit) * 100 > 0;

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

      this.escrows_cards = filtered_escrow?.reduce(
        (acc, item) => {
          const { depositToken, requestToken } = item.account;

          const dToken = useGlobalStore().token_list.find(
            (t) => t.address == depositToken.toString(),
          );

          const rToken = useGlobalStore().token_list.find(
            (t) => t.address == requestToken.toString(),
          );

          let key: any;
          switch (this.filter_cards.by) {
            case 'buy':
              key = `${dToken?.symbol}`;
              break;
            case 'sell':
              key = `${rToken?.symbol}`;
              break;
            default:
              key = `${dToken?.symbol}-${rToken?.symbol}`;
              break;
          }

          // Create a unique key for the combination of depositToken and requestToken

          // If the key doesn't exist in the accumulator, initialize it with an empty array
          if (!acc[key]) {
            acc[key] = [] as any;
          }

          // Push the current item to the respective group
          if (useEscrowStore().filter_cards.treeKeys.includes(key))
            acc[key].push(item);

          return acc;
        },
        {} as Record<string, I_Escrows[]>,
      );
      console.log(this.filter_cards.treeKeys);
      console.log('== UPDATED FILTER');
    },
  },
});
