import { PublicKey } from '@solana/web3.js';
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  createAssociatedTokenAccountInstruction,
  getAssociatedTokenAddress,
  TOKEN_PROGRAM_ID,
} from '@solana/spl-token';
import { useWallet } from 'solana-wallets-vue';
import { useRPCStore } from 'stores/rpcStore';

export async function check_ata_exists(
  mintAddress: PublicKey,
  owner: PublicKey,
) {
  const associatedAddress = await getAssociatedTokenAddress(
    mintAddress,
    owner,
    false, // Do not need the fee payer here, just calculating the address
    TOKEN_PROGRAM_ID,
    ASSOCIATED_TOKEN_PROGRAM_ID, // The associated token program ID
  );

  const accountInfo =
    await useRPCStore().connection.getAccountInfo(associatedAddress);
  if (accountInfo === null) {
    console.log(
      'Associated token account does NOT exist:',
      associatedAddress.toString(),
    );
    return false;
  } else {
    console.log(
      'Associated token account exists:',
      associatedAddress.toString(),
    );
    return true;
  }
}

export function make_ata_instruction(ata: PublicKey, mint: PublicKey) {
  return createAssociatedTokenAccountInstruction(
    useWallet().publicKey.value!,
    ata,
    useWallet().publicKey.value!,
    mint,
  );
}
