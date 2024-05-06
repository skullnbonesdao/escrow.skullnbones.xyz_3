import { PublicKey } from '@solana/web3.js';
import { useGlobalStore } from 'stores/globalStore';

export async function amount2ui(mint: PublicKey, amount: number) {
  return amount * Math.pow(10, -(await getDecimals(mint)));
}

export async function ui2amount(mint: PublicKey, amount: number) {
  return amount * Math.pow(10, await getDecimals(mint));
}

export async function getDecimals(mint: PublicKey) {
  const decimals =
    useGlobalStore().token_list.find(
      (token) => token.address == mint.toString(),
    )?.decimals ?? 0;

  if (decimals == 0) {
    return (await useGlobalStore().connection.getParsedAccountInfo(mint)).value
      ?.data.parsed.info.decimals;
  }
  return decimals;
}
