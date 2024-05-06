export type CustomError =
    | AuthBumpError
    | VaultBumpError
    | EscrowBumpError
    | EscrowNotEnoughRemaining
    | EscrowRecipientError
    | EscrowFeeError
    | EscrowMinimumError
    | EscrowPartialFillNotAllowed
    | EscrowTimestampExpired;

export class AuthBumpError extends Error {
    static readonly code = 6000;
    readonly code = 6000;
    readonly name = 'AuthBumpError';
    readonly msg = 'Unable to get auth bump';

    constructor(readonly logs?: string[]) {
        super('6000: Unable to get auth bump');
    }
}

export class VaultBumpError extends Error {
    static readonly code = 6001;
    readonly code = 6001;
    readonly name = 'VaultBumpError';
    readonly msg = 'Unable to get vault bump';

    constructor(readonly logs?: string[]) {
        super('6001: Unable to get vault bump');
    }
}

export class EscrowBumpError extends Error {
    static readonly code = 6002;
    readonly code = 6002;
    readonly name = 'EscrowBumpError';
    readonly msg = 'Unable to get escrow bump';

    constructor(readonly logs?: string[]) {
        super('6002: Unable to get escrow bump');
    }
}

export class EscrowNotEnoughRemaining extends Error {
    static readonly code = 6003;
    readonly code = 6003;
    readonly name = 'EscrowNotEnoughRemaining';
    readonly msg = 'Escrow has not enough funds reamining';

    constructor(readonly logs?: string[]) {
        super('6003: Escrow has not enough funds reamining');
    }
}

export class EscrowRecipientError extends Error {
    static readonly code = 6004;
    readonly code = 6004;
    readonly name = 'EscrowRecipientError';
    readonly msg = 'Wrong recipient input';

    constructor(readonly logs?: string[]) {
        super('6004: Wrong recipient input');
    }
}

export class EscrowFeeError extends Error {
    static readonly code = 6005;
    readonly code = 6005;
    readonly name = 'EscrowFeeError';
    readonly msg = 'Wrong fee account input';

    constructor(readonly logs?: string[]) {
        super('6005: Wrong fee account input');
    }
}

export class EscrowMinimumError extends Error {
    static readonly code = 6006;
    readonly code = 6006;
    readonly name = 'EscrowMinimumError';
    readonly msg = 'Wrong minimim';

    constructor(readonly logs?: string[]) {
        super('6006: Wrong minimim');
    }
}

export class EscrowPartialFillNotAllowed extends Error {
    static readonly code = 6007;
    readonly code = 6007;
    readonly name = 'EscrowPartialFillNotAllowed';
    readonly msg = 'Partial fill is not allowed';

    constructor(readonly logs?: string[]) {
        super('6007: Partial fill is not allowed');
    }
}

export class EscrowTimestampExpired extends Error {
    static readonly code = 6008;
    readonly code = 6008;
    readonly name = 'EscrowTimestampExpired';
    readonly msg = 'Timestamp expired';

    constructor(readonly logs?: string[]) {
        super('6008: Timestamp expired');
    }
}

export function fromCode(code: number, logs?: string[]): CustomError | null {
    switch (code) {
        case 6000:
            return new AuthBumpError(logs);
        case 6001:
            return new VaultBumpError(logs);
        case 6002:
            return new EscrowBumpError(logs);
        case 6003:
            return new EscrowNotEnoughRemaining(logs);
        case 6004:
            return new EscrowRecipientError(logs);
        case 6005:
            return new EscrowFeeError(logs);
        case 6006:
            return new EscrowMinimumError(logs);
        case 6007:
            return new EscrowPartialFillNotAllowed(logs);
        case 6008:
            return new EscrowTimestampExpired(logs);
    }

    return null;
}
