<script setup lang="ts">
import { useEscrowStore } from 'stores/escrowStore';
import InputAndCheckPubkey from 'components/input/InputAndCheckPubkey.vue';
import InputTimestamp from 'components/input/InputTimestamp.vue';
import { useWhitelistStore } from 'stores/whitelistStore';
</script>

<template>
  <q-expansion-item
    expand-separator
    icon="settings"
    label="Additional settings"
  >
    <q-separator />
    <q-item>
      <div class="col q-gutter-y-sm">
        <div class="row">
          <q-item-section>
            <q-item-label>Direct</q-item-label>
            <q-item-label caption
              >Only a single address/account can fill</q-item-label
            >
          </q-item-section>
          <q-item-section avatar>
            <q-toggle
              color="accent"
              v-model="useEscrowStore().new_escrow.only_recipient"
            />
          </q-item-section>
        </div>
        <InputAndCheckPubkey
          v-if="useEscrowStore().new_escrow.only_recipient"
          @wallet="
            (data: any) =>
              (useEscrowStore().new_escrow.recipient_address = data)
          "
        />
      </div>
    </q-item>
    <q-separator />
    <q-item>
      <div class="col q-gutter-y-sm">
        <div class="row">
          <q-item-section>
            <q-item-label>Expire</q-item-label>
            <q-item-label caption>Set an expire timestamp in UTC</q-item-label>
          </q-item-section>
          <q-item-section avatar>
            <q-toggle
              color="accent"
              v-model="useEscrowStore().new_escrow.has_expire"
            />
          </q-item-section>
        </div>

        <InputTimestamp
          v-if="useEscrowStore().new_escrow.has_expire"
          @timestamp="
            (data) => (useEscrowStore().new_escrow.closing_timestamp = data)
          "
        />
      </div>
    </q-item>
    <q-separator />
    <q-item>
      <q-item-section>
        <q-item-label>Partial-fill</q-item-label>
        <q-item-label caption>Allow exchange of partial amounts</q-item-label>
      </q-item-section>
      <q-item-section avatar>
        <q-toggle
          color="accent"
          v-model="useEscrowStore().new_escrow.allow_partial_fill"
          val="friend"
        />
      </q-item-section>
    </q-item>

    <q-separator v-if="useWhitelistStore().is_whitelisted" />
    <q-item v-if="useWhitelistStore().is_whitelisted">
      <q-item-section>
        <q-item-label>S&B member deal</q-item-label>
        <q-item-label caption>Only whitelisted account can fill</q-item-label>
      </q-item-section>
      <q-item-section avatar>
        <q-toggle
          color="accent"
          v-model="useEscrowStore().new_escrow.only_whitelist"
          :disable="
            useEscrowStore().new_escrow.only_recipient ||
            !useWhitelistStore().is_whitelisted
          "
          val="friend"
        />
      </q-item-section>
    </q-item>
    <q-separator />

    <q-item>
      <div class="col q-gutter-y-sm">
        <q-tooltip
          >In rare cases 'slippage' in exchange amounts can occur. You usually
          even safe to set it to zero. (more info in FAQ)</q-tooltip
        >
        <div class="row">
          <q-item-section>
            <q-item-label>Slippage</q-item-label>
            <q-item-label caption>Due to decimal precision loss</q-item-label>
          </q-item-section>
          <q-item-section avatar class="col-4">
            <q-input
              suffix="milli%"
              dense
              filled
              square
              v-model="useEscrowStore().new_escrow.slippage"
              type="number"
            />
          </q-item-section>
        </div>
      </div>
    </q-item>
  </q-expansion-item>
</template>

<style scoped lang="sass"></style>
