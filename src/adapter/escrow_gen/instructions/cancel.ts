import {
    AccountMeta,
    PublicKey,
    TransactionInstruction,
} from '@solana/web3.js'; // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from '../programId';

export interface CancelAccounts {
    maker: PublicKey;
    makerAta: PublicKey;
    depositToken: PublicKey;
    makerAtaRequest: PublicKey;
    makerTokenRequest: PublicKey;
    auth: PublicKey;
    vault: PublicKey;
    escrow: PublicKey;
    tokenProgram: PublicKey;
    associatedTokenProgram: PublicKey;
    systemProgram: PublicKey;
}

export function cancel(
    accounts: CancelAccounts,
    programId: PublicKey = PROGRAM_ID
) {
    const keys: Array<AccountMeta> = [
        { pubkey: accounts.maker, isSigner: true, isWritable: true },
        { pubkey: accounts.makerAta, isSigner: false, isWritable: true },
        { pubkey: accounts.depositToken, isSigner: false, isWritable: false },
        {
            pubkey: accounts.makerAtaRequest,
            isSigner: false,
            isWritable: false,
        },
        {
            pubkey: accounts.makerTokenRequest,
            isSigner: false,
            isWritable: false,
        },
        { pubkey: accounts.auth, isSigner: false, isWritable: false },
        { pubkey: accounts.vault, isSigner: false, isWritable: true },
        { pubkey: accounts.escrow, isSigner: false, isWritable: true },
        { pubkey: accounts.tokenProgram, isSigner: false, isWritable: false },
        {
            pubkey: accounts.associatedTokenProgram,
            isSigner: false,
            isWritable: false,
        },
        { pubkey: accounts.systemProgram, isSigner: false, isWritable: false },
    ];
    const identifier = Buffer.from([232, 219, 223, 41, 219, 236, 220, 190]);
    const data = identifier;
    const ix = new TransactionInstruction({ keys, programId, data });
    return ix;
}
