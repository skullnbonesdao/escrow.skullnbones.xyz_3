import { defineStore } from 'pinia';
import { I_Token } from 'stores/interfaces/I_TokenList';
import { Escrow } from 'src/adapter/escrow_gen/accounts';
import {  PublicKey } from '@solana/web3.js';
import { useWorkspace } from 'src/adapter/adapterPrograms';

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
        new_escrow: {
            only_recipient: false,
            has_expire: false,
            allow_partial_fill: true,
            only_whitelist: false,
            slippage: 1,
        } as NewEscrowState,

      escrows: undefined as Array<I_Escrows> | undefined,
      escrows_filtered: undefined as Array<I_Escrows> | undefined,
      escrow_selected: undefined as I_Escrows | undefined,
    }),
    getters: {},
    actions: {
      async load_all_escrows() {
        const data =
          await useWorkspace()?.pg_escrow.value.account.escrow.all();
        console.log(data);
        this.escrows = data as unknown as Array<I_Escrows>;
      },
      async load_escrow(address: PublicKey) {
        console.log('load_escrow()');
        this.escrow_selected = {
          publicKey: address,
          account:
            (await useWorkspace()?.pg_escrow.value.account.escrow.fetch(
              address
            )) as unknown as Escrow,
        };
      },
    },
});
