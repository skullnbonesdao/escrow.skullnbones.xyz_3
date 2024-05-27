<script setup lang="ts">
import { onMounted } from 'vue';
import { MAKER_FEE, TAKER_FEE } from '../stores/constants';
import { useGlobalStore } from 'stores/globalStore';
import { useQuasar } from 'quasar';

onMounted(() => {
  useGlobalStore().showLeftDrawer = false;
  useGlobalStore().showRightDrawer = false;
});
</script>

<template>
  <q-page
    class="row justify-center"
    :class="useQuasar().screen.lt.md ? '' : 'q-pa-md'"
  >
    <div class="q-gutter-y-md">
      <q-card flat class="col">
        <q-card-section class="text-center">
          <div class="text-h3">Frequently Asked Questions</div>
        </q-card-section>
      </q-card>

      <q-card flat class="q-gutter-y-md" style="max-width: 750px">
        <q-card-section class="">
          <div class="text-h4">How to create an offer?</div>
          <div>
            Under <b>MANAGE/CREATE</b> you can create a new offer. To create an
            offer for the asset you need to provide 2 tokens.
            <br />
            <br />
            1. The token you want to offer <br />
            2. the token you want in exchange <br />
            3. Set the amounts for both tokens and continue if needed in the
            <b>advanced section</b>.
          </div>
        </q-card-section>
        <q-separator />
        <q-card-section class="">
          <div class="text-h4">How to take an offer?</div>
          <div class="">
            Under <b>VIEW</b> you can take an offer by filtering using the
            filter on the left. You can take an offer by clicking on a row or
            the icon on the right. A new sidebar will one on the right and you
            can provide the amount you want to take if its partial fill or just
            click the button below the token amounts.
          </div>
        </q-card-section>
        <q-separator />
        <q-card-section class="">
          <div class="text-h4">How to close or cancel an offer?</div>
          <div>
            Under <b>MANAGE/VIEW CREATED</b> or
            <b>MANAGE/VIEW CLOSE FILLED</b> you can close your offer and recover
            the SOL needed for the escrow account creation.
          </div>
        </q-card-section>
        <q-separator />
        <q-card-section class="">
          <div class="text-h4">Advanced offer options explained</div>
          <div>
            <b>Direct:</b><br />Used for direct trades with a peer so no other
            can fill that order<br />
            <br />
            <b>Expire:</b><br />Whenever a escrow should only be exchangeable
            for a limited timespan<br />
            <br />
            <b>Partial/Full-FIll:</b><br />
            Decide whether the taker of an offer can fill that order by 100% or
            by any percentage of that (only limited by slippage and token
            decimals)<br />
            <br />
            <b>Member Deal:</b><br />
            This option enables private listing to a group here S&B Members<br />
            <br />
            <b>Slippage:</b><br />Defines how many correct decimals are required
            for token decimal rounding. Example: 0.9999 will get accepted as 1
            by the program if the token decimal is 0 and the slippage is set to
            1%/1000 - Slippage can also be set to 0 but may can not get
            filled!<br />
          </div>
        </q-card-section>
        <q-separator />
        <q-card-section class="">
          <div class="text-h4">When do I get my exchanged tokens?</div>
          <div>
            Every asset exchange happens immediately for both exchanging
            parties. Which means that once a order gets filled partially or
            fully both parties get the tokens they requested there is no need to
            claim you asset. (To recover the account fee the creator can close
            the account in Manage/Close section
          </div>
        </q-card-section>
        <q-separator />
        <q-card-section class="">
          <div class="text-h4">What are the account costs?</div>
          <div>
            The account costs for creating the escrow are at around 0.0044 SOL
          </div>
        </q-card-section>
        <q-separator />
        <q-card-section class="">
          <div class="text-h4">Why is there a fee?</div>
          <div>
            1. To cover costs for deployment/updates and new features<br />
            2. Disincentivize using BOTs and constant list and delist of offers.
            <br />
            3. Potentially pay for an official audit.<br />
          </div>
        </q-card-section>
        <q-separator />
        <q-card-section class="">
          <div class="text-h4">What are the fees?</div>
          <div>
            <b>MAKE:</b>
            {{ MAKER_FEE }} SOL<br />

            <b>TAKE:</b>
            {{ TAKER_FEE }} SOL<br />
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<style scoped lang="sass"></style>
