import {
    AccountMeta,
    PublicKey,
    TransactionInstruction,
} from '@solana/web3.js'; // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from 'bn.js'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from '@coral-xyz/borsh'; // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from '../programId';

export interface ExchangeArgs {
    amount: BN;
}

export interface ExchangeAccounts {
    maker: PublicKey;
    makerReceiveAta: PublicKey;
    depositToken: PublicKey;
    taker: PublicKey;
    takerAta: PublicKey;
    takerReceiveAta: PublicKey;
    requestToken: PublicKey;
    auth: PublicKey;
    vault: PublicKey;
    escrow: PublicKey;
    tokenProgram: PublicKey;
    associatedTokenProgram: PublicKey;
    systemProgram: PublicKey;
    fee: PublicKey;
    whitelistProgram: PublicKey;
    whitelist: PublicKey;
    entry: PublicKey;
}

export const layout = borsh.struct([borsh.u64('amount')]);

export function exchange(
    args: ExchangeArgs,
    accounts: ExchangeAccounts,
    programId: PublicKey = PROGRAM_ID
) {
    const keys: Array<AccountMeta> = [
        { pubkey: accounts.maker, isSigner: false, isWritable: true },
        { pubkey: accounts.makerReceiveAta, isSigner: false, isWritable: true },
        { pubkey: accounts.depositToken, isSigner: false, isWritable: false },
        { pubkey: accounts.taker, isSigner: true, isWritable: true },
        { pubkey: accounts.takerAta, isSigner: false, isWritable: true },
        { pubkey: accounts.takerReceiveAta, isSigner: false, isWritable: true },
        { pubkey: accounts.requestToken, isSigner: false, isWritable: false },
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
        { pubkey: accounts.fee, isSigner: false, isWritable: true },
        {
            pubkey: accounts.whitelistProgram,
            isSigner: false,
            isWritable: false,
        },
        { pubkey: accounts.whitelist, isSigner: false, isWritable: false },
        { pubkey: accounts.entry, isSigner: false, isWritable: false },
    ];
    const identifier = Buffer.from([47, 3, 27, 97, 215, 236, 219, 144]);
    const buffer = Buffer.alloc(1000);
    const len = layout.encode(
        {
            amount: args.amount,
        },
        buffer
    );
    const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len);
    const ix = new TransactionInstruction({ keys, programId, data });
    return ix;
}
