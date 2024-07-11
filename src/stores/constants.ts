import { PublicKey } from '@solana/web3.js';

export const ACCOUNT_COST_ESCROW = 0.0044;
export const MAKER_FEE = 0.001;
export const TAKER_FEE = 0.0006;
export const WHITELISTS = ['Trader'];
export const NULL_ADDRESS = new PublicKey('11111111111111111111111111111111');
export const FEE_ACCOUNT = new PublicKey(
  'feeLpAUDSsYBMwpxvVr5hwwDQE32BcWXRfAd3A6agWx',
);
export const ESCROW_PROGRAM_ID: PublicKey = new PublicKey(
  'esccxeEDYUXQaeMwq1ZwWAvJaHVYfsXNva13JYb2Chs',
);

export const WHITELIST_PROGRAM_ID: PublicKey = new PublicKey(
  'whi5uDPWK4rAE9Sus6hdxdHwsG1hjDBn6kXM6pyqwTn',
);
