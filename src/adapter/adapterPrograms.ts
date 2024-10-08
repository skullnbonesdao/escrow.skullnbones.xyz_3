import { computed, ComputedRef } from 'vue';
import { AnchorWallet, useAnchorWallet } from 'solana-wallets-vue';
import { Connection, PublicKey } from '@solana/web3.js';
import { AnchorProvider, Program } from '@coral-xyz/anchor';
import { ESCROW_PROGRAM_ID, WHITELIST_PROGRAM_ID } from 'stores/constants';
import { Escrow } from 'src/adapter/escrow_gen/accounts';
import { EscrowService, IDL as IDLESCROW } from './escrow_service';
import { IDL as IDLWHITELIST, Whitelist } from './whitelist';
import { useRPCStore } from 'stores/rpcStore';

const preflightCommitment = 'processed';
const commitment = 'confirmed';

export interface EscrowAccounts {
  publicKey: PublicKey;
  account: Escrow;
}

let workspace: {
  wallet: AnchorWallet | undefined;
  connection: Connection;
  provider: ComputedRef<AnchorProvider>;
  pg_escrow: ComputedRef<Program<EscrowService>>;
  pg_whitelist: ComputedRef<Program<Whitelist>>;
} | null = null;
export const useWorkspace = () => workspace;

export const initWorkspace = () => {
  /* eslint-disable  @typescript-eslint/no-non-null-assertion */
  const wallet: AnchorWallet = useAnchorWallet().value!;

  const connection = useRPCStore().connection as Connection;
  const provider = computed(
    () =>
      new AnchorProvider(connection, wallet, {
        preflightCommitment,
        commitment,
      }),
  );
  const pg_escrow = computed(
    () =>
      new Program<EscrowService>(IDLESCROW, ESCROW_PROGRAM_ID, provider.value),
  );

  const pg_whitelist = computed(
    () =>
      new Program<Whitelist>(
        IDLWHITELIST,
        WHITELIST_PROGRAM_ID,
        provider.value,
      ),
  );

  console.info('Workspace adapter initialized!');

  workspace = {
    wallet,
    connection,
    provider,
    pg_escrow,
    pg_whitelist,
  };
};
