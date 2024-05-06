<script setup lang="ts">
import { format_address } from '../../functions/format_address';

import { computed } from 'vue';
import { copy_to_clipboard } from 'src/functions/copy_to_clipboard';
import { useGlobalStore } from 'stores/globalStore';
import EscrowStateElement from 'components/elements/EscrowStateElement.vue';

const remaining_percentage = computed(() => {
    return (
        ((useGlobalStore().escrow_selected?.account.tokensDepositRemaining.toNumber() ??
            0) /
            (useGlobalStore().escrow_selected?.account.tokensDepositInit.toNumber() ??
                0)) *
        100
    );
});
</script>

<template>
    <div class="col q-gutter-y-md">
        <q-separator />
        <div class="row items-center">
            <p class="text-h6 col">State</p>
            <p class="q-mr-sm">{{ remaining_percentage.toFixed(1) }}%</p>
            <EscrowStateElement :escrow="useGlobalStore().escrow_selected" />
        </div>
        <q-separator />
        <div class="col q-gutter-y-sm">
            <div class="row">
                <div class="col text-weight-light text-no-wrap">Escrow:</div>
                <strong class="style-right">{{
                    format_address(
                        useGlobalStore().escrow_selected?.publicKey.toString() ??
                            ''
                    )
                }}</strong>
                <q-icon
                    flat
                    class="q-pl-xs"
                    size="xs"
                    name="content_copy"
                    @click="
                        copy_to_clipboard(
                            useGlobalStore().escrow_selected?.publicKey.toString() ??
                                ''
                        )
                    "
                />
            </div>

            <div class="row">
                <div class="col text-weight-light text-no-wrap">Maker:</div>
                <strong class="style-right">{{
                    format_address(
                        useGlobalStore().escrow_selected?.account.maker.toString() ??
                            ''
                    )
                }}</strong>
                <q-icon
                    flat
                    class="q-pl-xs"
                    size="xs"
                    name="content_copy"
                    @click="
                        copy_to_clipboard(
                            useGlobalStore().escrow_selected?.account.maker.toString() ??
                                ''
                        )
                    "
                />
            </div>

            <div class="row">
                <div class="col text-weight-light text-no-wrap">Deposited:</div>
                <strong class="col-9 text-right">{{
                    format_address(
                        useGlobalStore().escrow_selected?.account?.depositToken?.toString() ??
                            ''
                    )
                }}</strong>
                <q-icon
                    flat
                    class="q-pl-xs"
                    size="xs"
                    name="content_copy"
                    @click="
                        copy_to_clipboard(
                            useGlobalStore().escrow_selected?.account.depositToken.toString() ??
                                ''
                        )
                    "
                />
            </div>

            <div class="row">
                <div class="col text-weight-light text-no-wrap">Request:</div>
                <strong class="col-9 text-right">{{
                    format_address(
                        useGlobalStore().escrow_selected?.account?.requestToken?.toString() ??
                            ''
                    )
                }}</strong>
                <q-icon
                    flat
                    class="q-pl-xs"
                    size="xs"
                    name="content_copy"
                    @click="
                        copy_to_clipboard(
                            useGlobalStore().escrow_selected?.account.requestToken.toString() ??
                                ''
                        )
                    "
                />
            </div>

            <div class="row">
                <div class="col text-weight-light text-no-wrap">
                    Deposit amount:
                </div>
                <strong class="col-9 text-right">
                    {{
                        (useGlobalStore().escrow_selected?.account?.tokensDepositInit.toNumber() ??
                            0) *
                        10 **
                            -(
                                useGlobalStore().token_list?.find(
                                    (token) =>
                                        token.address ==
                                        useGlobalStore().escrow_selected?.account.depositToken.toString()
                                )?.decimals ?? 0
                            )
                    }}
                </strong>
            </div>

            <div class="row">
                <div class="col text-weight-light text-no-wrap">
                    Remaining amount:
                </div>
                <strong class="col-9 text-right">
                    {{
                        (useGlobalStore().escrow_selected?.account?.tokensDepositRemaining.toNumber() ??
                            0) *
                        10 **
                            -(
                                useGlobalStore().token_list?.find(
                                    (token) =>
                                        token.address ==
                                        useGlobalStore().escrow_selected?.account.depositToken.toString()
                                )?.decimals ?? 0
                            )
                    }}
                </strong>
            </div>

            <div class="row">
                <div class="col text-weight-light text-no-wrap">Price:</div>
                <strong class="col-9 text-right">{{
                    useGlobalStore().escrow_selected?.account.price
                }}</strong>
            </div>

            <div class="row">
                <div class="col text-weight-light text-no-wrap">Recipient:</div>
                <q-badge
                    outline
                    :label="
                        !useGlobalStore().escrow_selected?.account
                            ?.onlyRecipient
                            ? 'any'
                            : format_address(
                                  useGlobalStore().escrow_selected?.account?.recipient.toString() ??
                                      ''
                              )
                    "
                >
                </q-badge>
            </div>

            <div class="row">
                <div class="col text-weight-light text-no-wrap">
                    Partial fill:
                </div>

                <q-badge
                    outline
                    :label="
                        useGlobalStore().escrow_selected?.account
                            ?.allowPartialFill
                            ? 'yes'
                            : 'no'
                    "
                    :color="
                        useGlobalStore().escrow_selected?.account
                            ?.allowPartialFill
                            ? 'purple'
                            : 'grey'
                    "
                />
            </div>

            <div class="row">
                <div class="col text-weight-light text-no-wrap">Public</div>
                <q-badge
                    outline
                    class=""
                    :label="
                        useGlobalStore().escrow_selected?.account?.onlyWhitelist
                            ? 'no'
                            : 'yes'
                    "
                    :color="
                        useGlobalStore().escrow_selected?.account?.onlyWhitelist
                            ? 'yellow'
                            : 'green'
                    "
                />
            </div>

            <div class="row">
                <div class="col text-weight-light text-no-wrap">
                    Expire timestamp
                </div>

                <q-badge
                    outline
                    class=""
                    :label="
                        useGlobalStore().escrow_selected?.account?.expireTimestamp.toNumber() !=
                        0
                            ? useGlobalStore().escrow_selected?.account?.expireTimestamp.toNumber()
                            : 'never'
                    "
                    :color="
                        useGlobalStore().escrow_selected?.account?.expireTimestamp.toNumber() !=
                        0
                            ? 'yellow'
                            : 'grey'
                    "
                />
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss"></style>
