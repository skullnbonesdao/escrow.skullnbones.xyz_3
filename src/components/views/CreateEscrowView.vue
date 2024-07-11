<script setup lang="ts">
import { I_Token } from 'stores/interfaces/I_TokenList';
import TokenIcon from 'components/elements/TokenIcon.vue';
import BuySellTokenInputElemenet from 'components/elements/BuySellTokenInputElemenet.vue';

import { useEscrowStore } from 'stores/escrowStore';
import EscrowConfigList from 'components/elements/EscrowConfigList.vue';
import CreateEscrowAction from 'components/actions/CreateEscrowAction.vue';
import { ACCOUNT_COST_ESCROW, MAKER_FEE } from '../../stores/constants';
import { useWhitelistStore } from '../../stores/whitelistStore';
import { format_number } from '../../functions/format_number';
</script>

<template>
  <q-card style="max-width: 600px" bordered>
    <q-card-section class="q-gutter-y-xs">
      <p class="text-center text-h4 text-uppercase">Create Escrow</p>
    </q-card-section>

    <q-separator />

    <q-card-section class="row q-gutter-x-md">
      <BuySellTokenInputElemenet
        side="offer"
        :token_input="useEscrowStore().new_escrow.deposit_token"
        :token_amount="useEscrowStore().new_escrow.deposit_amount"
        @tokenChange="
          (value: I_Token) =>
            (useEscrowStore().new_escrow.deposit_token = value)
        "
        @amountChange="
          (value: number) =>
            (useEscrowStore().new_escrow.deposit_amount = parseFloat(
              value.toString().replace(',', ''),
            ))
        "
      />

      <BuySellTokenInputElemenet
        side="request"
        :token_input="useEscrowStore().new_escrow.request_token"
        :token_amount="useEscrowStore().new_escrow.request_amount"
        @tokenChange="
          (value: I_Token) =>
            (useEscrowStore().new_escrow.request_token = value)
        "
        @amountChange="
          (value: number) =>
            (useEscrowStore().new_escrow.request_amount = parseFloat(
              value.toString().replace(',', ''),
            ))
        "
      />
    </q-card-section>

    <q-separator />
    <q-card-section>
      <q-btn-group flat class="row full-width items-center">
        <div class="col-2 text-h6 text-center">Price</div>

        <div class="col q-mr-sm">
          <div class="row items-center">
            <q-space />
            <div class="col row justify-center">
              <p>
                1
                {{ useEscrowStore().new_escrow.deposit_token?.symbol }}
              </p>
              <TokenIcon
                class="q-ml-xs"
                size="xs"
                :src="
                  useEscrowStore().new_escrow.deposit_token?.logoURI ??
                  'unknown.png'
                "
              />
            </div>

            <q-icon
              size="md"
              name="swap_vert"
              style="transform: rotate(90deg)"
            />
            <div class="col row justify-end">
              <div>
                {{
                  format_number(
                    parseFloat(
                      useEscrowStore()
                        .new_escrow.request_amount?.toString()
                        .replace(',', ''),
                    ) /
                      parseFloat(
                        useEscrowStore()
                          .new_escrow.deposit_amount?.toString()
                          .replace(',', ''),
                      ),
                    9,
                  )
                }}
                {{ useEscrowStore().new_escrow.request_token?.symbol }}
              </div>
              <TokenIcon
                class="q-ml-xs"
                size="xs"
                :src="
                  useEscrowStore().new_escrow.request_token?.logoURI ??
                  'unknown.png'
                "
              />
            </div>
          </div>
          <div class="row items-center">
            <q-space />
            <div class="col row justify-center">
              <div>
                1
                {{ useEscrowStore().new_escrow.request_token?.symbol }}
              </div>
              <TokenIcon
                class="q-ml-xs"
                size="xs"
                :src="
                  useEscrowStore().new_escrow.request_token?.logoURI ??
                  'unknown.png'
                "
              />
            </div>
            <q-icon
              size="md"
              name="swap_vert"
              style="transform: rotate(90deg)"
            />
            <div class="col row justify-end">
              <div>
                {{
                  format_number(
                    parseFloat(
                      useEscrowStore()
                        .new_escrow.deposit_amount?.toString()
                        .replace(',', ''),
                    ) /
                      parseFloat(
                        useEscrowStore()
                          .new_escrow.request_amount?.toString()
                          .replace(',', ''),
                      ),
                    9,
                  )
                }}

                {{ useEscrowStore().new_escrow.deposit_token?.symbol }}
              </div>
              <TokenIcon
                class="q-ml-xs"
                size="xs"
                :src="
                  useEscrowStore().new_escrow.deposit_token?.logoURI ??
                  'unknown.png'
                "
              />
            </div>
          </div>
        </div>
      </q-btn-group>
    </q-card-section>
    <q-separator />

    <q-card-section class="q-pa-none"> <EscrowConfigList /> </q-card-section>

    <q-separator />

    <q-card-section>
      <q-btn-group flat class="full-width">
        <div class="col q-gutter-y-xs q-gutter-x-sm">
          <div class="text-left text-h6">Wallet balance changes</div>

          <div class="col row justify-end q-gutter-sm items-center">
            <p class="text-right text-weight-thin">Selling-Token</p>

            <q-space />

            <p class="text-bold text-red">
              -{{ useEscrowStore().new_escrow.deposit_amount }}
              {{ useEscrowStore().new_escrow.deposit_token?.symbol }}
            </p>

            <q-avatar size="xs" color="white">
              <img
                width="100px"
                :src="
                  useEscrowStore().new_escrow.deposit_token?.logoURI ??
                  'unknown.png'
                "
              />
            </q-avatar>
          </div>
          <div class="col row justify-end q-gutter-sm items-center">
            <p class="text-right text-weight-thin">Buying-Token</p>
            <q-space />
            <p class="text-right text-weight-thin">(after fulfilment)</p>
            <q-space />

            <p class="text-weight-thin text-yellow-14">
              +{{ useEscrowStore().new_escrow.request_amount }}
              {{ useEscrowStore().new_escrow.request_token?.symbol }}
            </p>

            <q-avatar size="xs" color="white">
              <img
                width="100px"
                :src="
                  useEscrowStore().new_escrow.request_token?.logoURI ??
                  'unknown.png'
                "
              />
            </q-avatar>
          </div>
        </div>
      </q-btn-group>
    </q-card-section>
    <q-separator />
    <q-card-section class="">
      <CreateEscrowAction />
      <div class="col row justify-end q-gutter-sm items-center q-mt-sm">
        <p class="text-right text-weight-thin">Accounts (recoverable) + Fee</p>
        <q-space />

        <p class="text-right text-weight-thin">
          {{ ACCOUNT_COST_ESCROW }} +
          {{ useWhitelistStore().is_whitelisted ? MAKER_FEE / 2 : MAKER_FEE }}
        </p>

        <q-avatar size="xs">
          <img
            src="currencies/SOL.webp

                "
          />
        </q-avatar>
      </div>
    </q-card-section>
  </q-card>
</template>

<style scoped></style>
