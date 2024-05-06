import { Connection, PublicKey } from '@solana/web3.js';
import BN from 'bn.js'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from '@coral-xyz/borsh'; // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from '../programId';

export interface EscrowFields {
    maker: PublicKey;
    depositToken: PublicKey;
    requestToken: PublicKey;
    tokensDepositInit: BN;
    tokensDepositRemaining: BN;
    price: number;
    seed: BN;
    authBump: number;
    vaultBump: number;
    escrowBump: number;
    expireTimestamp: BN;
    recipient: PublicKey;
    onlyRecipient: boolean;
    onlyWhitelist: boolean;
    allowPartialFill: boolean;
}

export interface EscrowJSON {
    maker: string;
    depositToken: string;
    requestToken: string;
    tokensDepositInit: string;
    tokensDepositRemaining: string;
    price: number;
    seed: string;
    authBump: number;
    vaultBump: number;
    escrowBump: number;
    expireTimestamp: string;
    recipient: string;
    onlyRecipient: boolean;
    onlyWhitelist: boolean;
    allowPartialFill: boolean;
}

export class Escrow {
    readonly maker: PublicKey;
    readonly depositToken: PublicKey;
    readonly requestToken: PublicKey;
    readonly tokensDepositInit: BN;
    readonly tokensDepositRemaining: BN;
    readonly price: number;
    readonly seed: BN;
    readonly authBump: number;
    readonly vaultBump: number;
    readonly escrowBump: number;
    readonly expireTimestamp: BN;
    readonly recipient: PublicKey;
    readonly onlyRecipient: boolean;
    readonly onlyWhitelist: boolean;
    readonly allowPartialFill: boolean;

    static readonly discriminator = Buffer.from([
        31, 213, 123, 187, 186, 22, 218, 155,
    ]);

    static readonly layout = borsh.struct([
        borsh.publicKey('maker'),
        borsh.publicKey('depositToken'),
        borsh.publicKey('requestToken'),
        borsh.u64('tokensDepositInit'),
        borsh.u64('tokensDepositRemaining'),
        borsh.f64('price'),
        borsh.u64('seed'),
        borsh.u8('authBump'),
        borsh.u8('vaultBump'),
        borsh.u8('escrowBump'),
        borsh.i64('expireTimestamp'),
        borsh.publicKey('recipient'),
        borsh.bool('onlyRecipient'),
        borsh.bool('onlyWhitelist'),
        borsh.bool('allowPartialFill'),
    ]);

    constructor(fields: EscrowFields) {
        this.maker = fields.maker;
        this.depositToken = fields.depositToken;
        this.requestToken = fields.requestToken;
        this.tokensDepositInit = fields.tokensDepositInit;
        this.tokensDepositRemaining = fields.tokensDepositRemaining;
        this.price = fields.price;
        this.seed = fields.seed;
        this.authBump = fields.authBump;
        this.vaultBump = fields.vaultBump;
        this.escrowBump = fields.escrowBump;
        this.expireTimestamp = fields.expireTimestamp;
        this.recipient = fields.recipient;
        this.onlyRecipient = fields.onlyRecipient;
        this.onlyWhitelist = fields.onlyWhitelist;
        this.allowPartialFill = fields.allowPartialFill;
    }

    static async fetch(
        c: Connection,
        address: PublicKey,
        programId: PublicKey = PROGRAM_ID
    ): Promise<Escrow | null> {
        const info = await c.getAccountInfo(address);

        if (info === null) {
            return null;
        }
        if (!info.owner.equals(programId)) {
            throw new Error("account doesn't belong to this program");
        }

        return this.decode(info.data);
    }

    static async fetchMultiple(
        c: Connection,
        addresses: PublicKey[],
        programId: PublicKey = PROGRAM_ID
    ): Promise<Array<Escrow | null>> {
        const infos = await c.getMultipleAccountsInfo(addresses);

        return infos.map((info) => {
            if (info === null) {
                return null;
            }
            if (!info.owner.equals(programId)) {
                throw new Error("account doesn't belong to this program");
            }

            return this.decode(info.data);
        });
    }

    static decode(data: Buffer): Escrow {
        if (!data.slice(0, 8).equals(Escrow.discriminator)) {
            throw new Error('invalid account discriminator');
        }

        const dec = Escrow.layout.decode(data.slice(8));

        return new Escrow({
            maker: dec.maker,
            depositToken: dec.depositToken,
            requestToken: dec.requestToken,
            tokensDepositInit: dec.tokensDepositInit,
            tokensDepositRemaining: dec.tokensDepositRemaining,
            price: dec.price,
            seed: dec.seed,
            authBump: dec.authBump,
            vaultBump: dec.vaultBump,
            escrowBump: dec.escrowBump,
            expireTimestamp: dec.expireTimestamp,
            recipient: dec.recipient,
            onlyRecipient: dec.onlyRecipient,
            onlyWhitelist: dec.onlyWhitelist,
            allowPartialFill: dec.allowPartialFill,
        });
    }

    toJSON(): EscrowJSON {
        return {
            maker: this.maker.toString(),
            depositToken: this.depositToken.toString(),
            requestToken: this.requestToken.toString(),
            tokensDepositInit: this.tokensDepositInit.toString(),
            tokensDepositRemaining: this.tokensDepositRemaining.toString(),
            price: this.price,
            seed: this.seed.toString(),
            authBump: this.authBump,
            vaultBump: this.vaultBump,
            escrowBump: this.escrowBump,
            expireTimestamp: this.expireTimestamp.toString(),
            recipient: this.recipient.toString(),
            onlyRecipient: this.onlyRecipient,
            onlyWhitelist: this.onlyWhitelist,
            allowPartialFill: this.allowPartialFill,
        };
    }

    static fromJSON(obj: EscrowJSON): Escrow {
        return new Escrow({
            maker: new PublicKey(obj.maker),
            depositToken: new PublicKey(obj.depositToken),
            requestToken: new PublicKey(obj.requestToken),
            tokensDepositInit: new BN(obj.tokensDepositInit),
            tokensDepositRemaining: new BN(obj.tokensDepositRemaining),
            price: obj.price,
            seed: new BN(obj.seed),
            authBump: obj.authBump,
            vaultBump: obj.vaultBump,
            escrowBump: obj.escrowBump,
            expireTimestamp: new BN(obj.expireTimestamp),
            recipient: new PublicKey(obj.recipient),
            onlyRecipient: obj.onlyRecipient,
            onlyWhitelist: obj.onlyWhitelist,
            allowPartialFill: obj.allowPartialFill,
        });
    }
}
