import {
    AccountMeta,
    PublicKey,
    TransactionInstruction,
} from '@solana/web3.js'; // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from 'bn.js'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from '@coral-xyz/borsh'; // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from '../programId';

export interface InitializeArgs {
    seed: BN;
    depositAmount: BN;
    requestAmount: BN;
    expireTimestamp: BN;
    allowPartialFill: boolean;
    onlyWhitelist: boolean;
}

export interface InitializeAccounts {
    maker: PublicKey;
    makerAta: PublicKey;
    recipient: PublicKey;
    depositToken: PublicKey;
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

export const layout = borsh.struct([
    borsh.u64('seed'),
    borsh.u64('depositAmount'),
    borsh.u64('requestAmount'),
    borsh.i64('expireTimestamp'),
    borsh.bool('allowPartialFill'),
    borsh.bool('onlyWhitelist'),
]);

export function initialize(
    args: InitializeArgs,
    accounts: InitializeAccounts,
    programId: PublicKey = PROGRAM_ID
) {
    const keys: Array<AccountMeta> = [
        { pubkey: accounts.maker, isSigner: true, isWritable: true },
        { pubkey: accounts.makerAta, isSigner: false, isWritable: true },
        { pubkey: accounts.recipient, isSigner: false, isWritable: false },
        { pubkey: accounts.depositToken, isSigner: false, isWritable: false },
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
    const identifier = Buffer.from([175, 175, 109, 31, 13, 152, 155, 237]);
    const buffer = Buffer.alloc(1000);
    const len = layout.encode(
        {
            seed: args.seed,
            depositAmount: args.depositAmount,
            requestAmount: args.requestAmount,
            expireTimestamp: args.expireTimestamp,
            allowPartialFill: args.allowPartialFill,
            onlyWhitelist: args.onlyWhitelist,
        },
        buffer
    );
    const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len);
    const ix = new TransactionInstruction({ keys, programId, data });
    return ix;
}
