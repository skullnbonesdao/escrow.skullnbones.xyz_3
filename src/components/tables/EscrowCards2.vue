<script setup lang="ts">
import { useGlobalStore } from 'stores/globalStore';
import { computed, ref, watch } from 'vue';
import TokenIcon from 'components/elements/TokenIcon.vue';
import { get_token_imageURL_form_mint } from 'src/functions/get_token_imageURL_form_mint';
import { useWallet } from 'solana-wallets-vue';
import EscrowStateElement from 'components/elements/EscrowStateElement.vue';
import { get_token_name_from_mint } from '../../functions/get_token_name_from_mint';
import FormatTokenNumber from 'components/elements/FormatTokenNumber.vue';
import { useRoute, useRouter } from 'vue-router';
import CancelEscrow from 'components/actions/CancelEscrowAction.vue';
import { I_Escrows, useEscrowStore } from 'stores/escrowStore';
import { useQuasar } from 'quasar';
import { copy_to_clipboard } from 'src/functions/copy_to_clipboard';
import { userTokenStore } from 'stores/userTokenStore';
import { format_address } from 'src/functions/format_address';
import {
  get_price_by_side,
  getPriceByMintSide,
  getPriceByPairName,
} from 'src/functions/get_price_by_side';
import { Escrow } from 'src/adapter/escrow_gen/accounts';
import { PublicKey } from '@solana/web3.js';
import { format_number } from '../../functions/format_number';
import { I_Token } from 'stores/interfaces/I_TokenList';
import TokenSelectInput from 'components/input/TokenSelectInput.vue';
import EscrowCardInner from 'components/tables/EscrowCardInner.vue';
import { watchDebounced } from '@vueuse/core';

const decimals = 9;

const sort_tab = ref('buy_name');
const is_mobile = ref(useQuasar().screen.lt.md);

const current_path = useRoute().path;

function group_rows(
  data: I_Escrows[] | undefined,
  by: 'buy' | 'sell' | '3',
): Record<string, I_Escrows[]> | undefined {
  if (!data) return;
  const groupedData = data?.reduce(
    (acc, item) => {
      const { depositToken, requestToken } = item.account;

      const dToken = useGlobalStore().token_list.find(
        (t) => t.address == depositToken.toString(),
      );

      const rToken = useGlobalStore().token_list.find(
        (t) => t.address == requestToken.toString(),
      );

      let key;
      if (by == 'buy') {
        key = `${dToken?.symbol}`;
      } else if (by == 'sell') {
        key = `${rToken?.symbol}`;
      } else if (by == '3') {
        key = `${dToken?.symbol}-${rToken?.symbol}`;
      }

      // Create a unique key for the combination of depositToken and requestToken

      // If the key doesn't exist in the accumulator, initialize it with an empty array
      if (!acc[key]) {
        acc[key] = [] as any;
      }

      // Push the current item to the respective group
      acc[key].push(item);

      return acc;
    },
    {} as Record<string, I_Escrows[]>,
  );

  return groupedData;
}

const router = useRouter();

function make_take_view(escrow: I_Escrows) {
  if (!is_mobile.value) {
    if (useEscrowStore().escrow_selected == escrow) {
      useGlobalStore().showRightDrawer = false;
      useEscrowStore().escrow_selected = undefined;
      return;
    }

    useEscrowStore().escrow_selected = escrow;

    if (current_path.includes('exchange')) {
      useGlobalStore().showRightDrawer = true;
    }
  } else router.push(`/details/${escrow.publicKey.toString()}`);
}

function total_amount(
  escrows: I_Escrows[],
  symbol: string,
  side: 'buy' | 'sell' = 'buy',
): string {
  let mint = new PublicKey(
    useGlobalStore().token_list.find((token) => token.symbol == symbol)
      ?.address ?? '',
  );
  let value = escrows
    .flatMap((escrow) => {
      if (escrow.account.depositToken == mint)
        if (side == 'buy')
          return escrow.account.tokensDepositRemaining.toNumber();
        else return 1 / escrow.account.tokensDepositRemaining.toNumber();
      else {
        if (side == 'sell')
          return (
            escrow.account.price *
            escrow.account.tokensDepositRemaining *
            10 **
              -useGlobalStore().token_list.find(
                (token) =>
                  token.address == escrow.account.depositToken.toString(),
              )?.decimals
          );
        else
          return (
            escrow.account.tokensDepositRemaining *
            10 **
              -useGlobalStore().token_list.find(
                (token) =>
                  token.address == escrow.account.depositToken.toString(),
              )?.decimals
          );
      }
    })
    .reduce((acc, curr) => acc + curr, 0) as number;
  return format_number(value, 0);
}

function lowest_prices(escrows: I_Escrows[], symbol: string) {
  if (escrows.length == 0) return;
  return escrows.map((escrow) => {
    return [escrow.account.price, 1 / escrow.account.price];
  });
}

const data = computed(() => useEscrowStore().escrows_cards);
</script>

<template>
  <q-card flat square>
    <q-card-section class="row q-gutter-x-sm">
      <q-btn
        v-if="useGlobalStore().showLeftDrawer == false"
        flat
        square
        icon="chevron_right"
        @click="useGlobalStore().showLeftDrawer = true"
      />
      <q-input
        class="col"
        filled
        square
        debounce="500"
        label="Search"
        placeholder="Name | Symbol"
        v-model="useEscrowStore().filter_cards.filter_string"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </q-card-section>
  </q-card>
  <div
    v-if="Object.keys(useEscrowStore().escrows_cards || {}).length"
    class="q-mt-xs q-gutter-y-xs"
  >
    <q-card
      square
      flat
      v-for="[groupKey, groupValue] of Object.entries(data!)"
      :key="groupKey"
    >
      <q-expansion-item>
        <template v-slot:header>
          <q-item-section avatar class="row items-center q-gutter-x-sm">
            <q-badge
              color="transparent"
              outline
              class="col text-center q-pa-sm bg-primary"
              ><div style="width: 100px" class="row items-center q-gutter-x-sm">
                <div class="col q-gutter-y-xs">
                  <TokenIcon
                    class=""
                    size="sm"
                    :src="
                      get_token_imageURL_form_mint(
                        useGlobalStore().token_list.find(
                          (t) => t.symbol == groupKey,
                        )?.address,
                      )
                    "
                  />

                  <div class="text-white">{{ groupKey }}</div>
                </div>
              </div>
            </q-badge>
          </q-item-section>
          <q-item-section>
            <div class="row items-center q-gutter-x-sm">
              <div class="col text-h6 text-left">
                {{
                  useGlobalStore().token_list.find((t) => t.symbol == groupKey)
                    ?.name
                }}
              </div>
              <div class="q-gutter-x-xs">
                <q-badge color="buy">
                  <q-icon name="tag" />
                  <div>{{ groupValue['buy'].length }}</div>
                </q-badge>
                <q-badge color="sell">
                  <q-icon name="tag" />
                  <div>{{ groupValue['sell'].length }}</div>
                </q-badge>
              </div>
            </div>
          </q-item-section>
        </template>
        <EscrowCardInner :group-key="groupKey" :group-value="groupValue" />
      </q-expansion-item>
    </q-card>
  </div>

  <div class="col text-center" v-else>
    <h5>No Escrows found</h5>
    <h6>You may need to check your filter settings</h6>
  </div>
</template>
