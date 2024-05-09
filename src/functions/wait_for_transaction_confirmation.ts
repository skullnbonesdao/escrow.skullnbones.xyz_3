import { Connection } from '@solana/web3.js';

export async function waitForTransactionConfirmation(
  connection: Connection,
  signature: string,
  commitment = 'finalized',
) {
  const latestBlockHash = await connection.getLatestBlockhash();

  return await connection.confirmTransaction({
    blockhash: latestBlockHash.blockhash,
    lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
    signature: signature,
  });
}
