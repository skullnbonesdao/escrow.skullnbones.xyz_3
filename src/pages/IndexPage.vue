<script setup lang="ts">
import { useQuasar } from 'quasar';
import { onMounted } from 'vue';
import { useGlobalStore } from 'stores/globalStore';

onMounted(() => {
  useGlobalStore().showLeftDrawer = false;
  useGlobalStore().showRightDrawer = false;
});
</script>

<template>
  <q-page class="row items-center justify-evenly q-pa-xl">
    <div class="q-gutter-y-xl">
      <div>
        <p class="text-h1">Escrow Service</p>
      </div>
      <div
        :class="
          useQuasar().screen.lt.md ? 'col q-gutter-y-md' : 'row q-gutter-x-md'
        "
      >
        <q-card flat class="col">
          <q-card-section class="text-h4 text-center"
            >Secure Exchange
          </q-card-section>
          <q-separator />
          <q-card-section
            ><p>
              The Escrow service provides a secure environment for transactions,
              holding funds in a safe account until all conditions of the
              agreement are met. This reduces the risk of fraud or non-payment,
              ensuring that buyers receive their purchased goods or services and
              sellers receive their payments.
            </p></q-card-section
          >
        </q-card>
        <q-card flat class="col">
          <q-card-section class="text-h4 text-center"
            >Conditional Release
          </q-card-section>
          <q-separator />
          <q-card-section
            ><p>
              Funds are only released when all the conditions agreed upon by
              both parties in the transaction are fully met. These conditions
              may include exchanged tokens, amounts, or other options. This
              ensures fairness and fulfillment of terms for both the buyer and
              the seller.
            </p></q-card-section
          >
        </q-card>
        <q-card flat class="col">
          <q-card-section class="text-h4 text-center"
            >Third-Party Mediation</q-card-section
          >
          <q-separator />
          <q-card-section
            ><p>
              The escrow service acts as a neutral mediator that holds and
              regulates the payment of the funds required for two parties
              involved in a given transaction. Funds are released for both
              parties immediately.
            </p></q-card-section
          >
        </q-card>
      </div>
      <div>
        <div class="text-h4">by Skull & Bones without buddies and links</div>
      </div>
    </div>
  </q-page>
</template>
