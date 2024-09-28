import { I_Escrows } from 'stores/escrowStore';
import { Escrow } from 'src/adapter/escrow_gen/accounts';
import { useGlobalStore } from 'stores/globalStore';

export function getPriceByPairName(escrow: Escrow, name: string): number {
  const pair_mint = useGlobalStore().token_list.find((t) => t.name === name)
    ?.address;

  if (pair_mint == escrow.requestToken.toString()) return escrow.price;
  else return 1 / escrow.price;
}
