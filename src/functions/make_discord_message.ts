import { table } from 'table';
import { useGlobalStore } from 'stores/globalStore';
import { useEscrowStore } from 'stores/escrowStore';

export function make_discord_message() {
  const header =
    '# [' +
    (useGlobalStore().token_list.find(
      (token) =>
        token.address ==
        useEscrowStore().escrow_selected?.account.requestToken.toString(),
    )?.symbol ?? '???') +
    ' -> ' +
    (useGlobalStore().token_list.find(
      (token) =>
        token.address ==
        useEscrowStore().escrow_selected?.account.depositToken.toString(),
    )?.symbol ?? '???') +
    '](' +
    'https://escrow2.skullnbones.xyz/#/view/' +
    useEscrowStore().escrow_selected?.publicKey.toString() +
    ') :link:';

  const table_data = [
    ['Side', 'ASSET', 'Total', 'Price per Unit'],

    [
      'Takes',
      useGlobalStore().token_list.find(
        (token) =>
          token.address ==
          useEscrowStore().escrow_selected?.account.requestToken.toString(),
      )?.symbol ?? '???',

      ((useEscrowStore().escrow_selected?.account.price ?? 0) *
        (useEscrowStore().escrow_selected?.account.tokensDepositInit.toNumber() ??
          0)) /
        10 **
          (useGlobalStore().token_list.find(
            (t) =>
              t.address.toString() ==
              useEscrowStore().escrow_selected?.account.depositToken.toString(),
          )?.decimals ?? 0),

      '[' +
        (useGlobalStore().token_list.find(
          (token) =>
            token.address ==
            useEscrowStore().escrow_selected?.account.requestToken.toString(),
        )?.symbol ?? '???') +
        '/' +
        (useGlobalStore().token_list.find(
          (token) =>
            token.address ==
            useEscrowStore().escrow_selected?.account.depositToken.toString(),
        )?.symbol ?? '???') +
        '] ' +
        useEscrowStore().escrow_selected?.account.price.toFixed(5),
    ],
    [
      'Gives',
      useGlobalStore().token_list.find(
        (token) =>
          token.address ==
          useEscrowStore().escrow_selected?.account.depositToken.toString(),
      )?.symbol ?? '???',

      (useEscrowStore().escrow_selected?.account.tokensDepositInit.toNumber() ??
        0) /
        10 **
          (useGlobalStore().token_list.find(
            (t) =>
              t.address.toString() ==
              useEscrowStore().escrow_selected?.account.depositToken.toString(),
          )?.decimals ?? 0),

      '[' +
        (useGlobalStore().token_list.find(
          (token) =>
            token.address ==
            useEscrowStore().escrow_selected?.account.depositToken.toString(),
        )?.symbol ?? '???') +
        '/' +
        (useGlobalStore().token_list.find(
          (token) =>
            token.address ==
            useEscrowStore().escrow_selected?.account.requestToken.toString(),
        )?.symbol ?? '???') +
        '] ' +
        (1 / (useEscrowStore().escrow_selected?.account.price ?? 0)).toFixed(5),
    ],
  ];

  return header + '\n' + '```\n' + table(table_data) + '```';
}
