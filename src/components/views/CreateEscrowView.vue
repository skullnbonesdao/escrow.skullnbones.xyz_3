<script setup lang="ts">
import { I_Token } from 'stores/interfaces/I_TokenList';
import TokenIcon from 'components/elements/TokenIcon.vue';
import BuySellTokenInputElemenet from 'components/elements/BuySellTokenInputElemenet.vue';

import { useEscrowStore } from 'stores/escrowStore';
import EscrowConfigList from 'components/elements/EscrowConfigList.vue';
import CreateEscrow from 'components/actions/CreateEscrowAction.vue';
import CreateEscrowAction from 'components/actions/CreateEscrowAction.vue';
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
            (useEscrowStore().new_escrow.deposit_amount = value)
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
            (useEscrowStore().new_escrow.request_amount = value)
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

            <q-icon size="md" name="arrow_right_alt" />
            <div class="col row justify-end">
              <div>
                {{
                  (
                    parseFloat(
                      useEscrowStore()
                        .new_escrow.request_amount?.toString()
                        .replace(',', ''),
                    ) /
                    parseFloat(
                      useEscrowStore()
                        .new_escrow.deposit_amount?.toString()
                        .replace(',', ''),
                    )
                  ).toFixed(9)
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
            <q-icon size="md" name="arrow_right_alt" />
            <div class="col row justify-end">
              <div>
                {{
                  (
                    parseFloat(
                      useEscrowStore()
                        .new_escrow.deposit_amount?.toString()
                        .replace(',', ''),
                    ) /
                    parseFloat(
                      useEscrowStore()
                        .new_escrow.request_amount?.toString()
                        .replace(',', ''),
                    )
                  ).toFixed(9)
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
      <q-btn-group flat class="full-width q-pa-sm">
        <div class="col">
          <div class="text-left text-h6">Wallet balance changes</div>

          <div class="col row justify-end q-gutter-sm">
            <q-space />

            <p class="text-bold text-red">
              -{{ useEscrowStore().new_escrow.deposit_amount }}
              {{ useEscrowStore().new_escrow.deposit_token?.symbol }}
            </p>

            <q-avatar size="xs" color="white">
              <img
                :src="
                  useEscrowStore().new_escrow.deposit_token?.logoURI ??
                  'unknown.png'
                "
              />
            </q-avatar>
          </div>
        </div>
      </q-btn-group>
    </q-card-section>
    <q-separator />
    <q-card-section>
      <CreateEscrowAction />
    </q-card-section>
  </q-card>
</template>

<style scoped></style>
