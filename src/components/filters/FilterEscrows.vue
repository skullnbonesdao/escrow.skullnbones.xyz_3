<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { NULL_ADDRESS } from 'stores/constants';
import { useWallet } from 'solana-wallets-vue';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import { useGlobalStore } from 'stores/globalStore';
import TokenSelectInput from 'components/input/TokenSelectInput.vue';
import { I_Token } from 'stores/interfaces/I_TokenList';
import { useEscrowStore } from 'stores/escrowStore';

const filter_type = ref('type_public');
const extra_filter = ref(['self', 'fill_partial', 'fill_full']);
const filter_buy = ref();
const filter_sell = ref();
const r = useRouter();

const disable_input = computed(() => {
  return r.currentRoute.value.path == '/manage';
});

watch(
  () => useEscrowStore().escrows,
  () => {
    apply_filter();
  },
);

apply_filter();

watch(
  () => filter_type.value,
  () => {
    apply_filter();
  },
);

watch(
  () => extra_filter.value,
  () => {
    apply_filter();
  },
);

watch(
  () => filter_buy.value,
  () => {
    apply_filter();
  },
);

watch(
  () => filter_sell.value,
  () => {
    apply_filter();
  },
);

watch(
  () => useEscrowStore().sort_direction,
  () => {
    apply_filter();
  },
);

function apply_filter() {
  useEscrowStore().escrows_filtered = useEscrowStore().escrows?.filter(
    (escrow) => {
      switch (filter_type.value) {
        case 'type_public': {
          if (escrow.account.recipient.toString() == NULL_ADDRESS.toString()) {
            return true;
          }
          break;
        }
        case 'type_private': {
          if (
            escrow.account.recipient.toString() ==
            useWallet().publicKey.value?.toString()
          ) {
            return true;
          }
          break;
        }
        case 'type_members': {
          if (escrow.account.onlyWhitelist) {
            return true;
          }
          break;
        }
      }
    },
  );

  if (!extra_filter.value.some((filter) => filter == 'fill_full')) {
    useEscrowStore().escrows_filtered =
      useEscrowStore().escrows_filtered?.filter(
        (escrow) => escrow.account.allowPartialFill != false,
      );
  }
  //Filter partial
  if (!extra_filter.value.some((filter) => filter == 'fill_partial')) {
    useEscrowStore().escrows_filtered =
      useEscrowStore().escrows_filtered?.filter(
        (escrow) => escrow.account.allowPartialFill != true,
      );
  }

  //Filter self
  if (!extra_filter.value.some((filter) => filter == 'self')) {
    useEscrowStore().escrows_filtered =
      useEscrowStore().escrows_filtered?.filter(
        (escrow) =>
          escrow.account.maker.toString() !=
          useWallet().publicKey.value?.toString(),
      );
  }

  //Filter empty/filled
  if (!extra_filter.value.some((filter) => filter == 'filled')) {
    useEscrowStore().escrows_filtered =
      useEscrowStore().escrows_filtered?.filter(
        (escrow) => escrow.account.tokensDepositRemaining.toNumber() != 0,
      );
  }

  if (filter_buy.value) {
    useEscrowStore().escrows_filtered =
      useEscrowStore().escrows_filtered?.filter(
        (escrow) =>
          escrow.account.depositToken.toString() ==
          filter_buy.value.address.toString(),
      );
  }

  if (filter_sell.value) {
    useEscrowStore().escrows_filtered =
      useEscrowStore().escrows_filtered?.filter(
        (escrow) =>
          escrow.account.requestToken.toString() ==
          filter_sell.value.address.toString(),
      );
  }

  switch (useEscrowStore().sort_direction) {
    case 'buy_ppu':
      useEscrowStore().escrows_filtered =
        useEscrowStore().escrows_filtered?.sort((a, b) => {
          if (1 / a.account.price < 1 / b.account.price) {
            return -1;
          } else if (1 / a.account.price > 1 / b.account.price) {
            return 1;
          }
          return 0;
        });
      break;
    case 'sell_ppu':
      useEscrowStore().escrows_filtered =
        useEscrowStore().escrows_filtered?.sort((a, b) => {
          if (a.account.price < b.account.price) {
            return -1;
          } else if (a.account.price > b.account.price) {
            return 1;
          }
          return 0;
        });
      break;
  }
}
</script>

<template>
  <q-separator />
  <q-card flat>
    <q-card-section
      :class="useQuasar().screen.lt.md ? 'row q-gutter-x-md' : 'col'"
    >
      <div class="col-2 text-overline">Filter Side</div>

      <q-btn-group class="" flat>
        <div class="row">
          <q-btn square unelevated flat class="col-2 bg-sell" label="SELL" />

          <TokenSelectInput
            dense="true"
            filter="filter_zero"
            class="col"
            @token_change="(value: I_Token) => (filter_sell = value)"
          />
        </div>
      </q-btn-group>

      <q-btn-group flat>
        <div class="row">
          <q-btn square unelevated flat class="col-2 bg-buy" label="BUY" />
          <TokenSelectInput
            dense="true"
            class="col"
            @token_change="(value: I_Token) => (filter_buy = value)"
          />
        </div>
      </q-btn-group>
    </q-card-section>
    <q-separator />
    <q-card-section :class="useQuasar().screen.lt.md ? 'row' : 'col'">
      <div class="col-2 text-overline">Offer Type</div>

      <div class="col">
        <q-list>
          <q-item tag="label" v-ripple>
            <q-item-section>
              <q-item-label>Public Offers</q-item-label>
              <q-item-label caption
                >Offers can be filled by any recipient</q-item-label
              >
            </q-item-section>
            <q-item-section avatar>
              <q-radio v-model="filter_type" val="type_public" color="accent" />
            </q-item-section>
          </q-item>
          <q-item tag="label" v-ripple>
            <q-item-section>
              <q-item-label>Private Offers</q-item-label>
              <q-item-label caption
                >Offer can only be filled by the specified
                recipient</q-item-label
              >
            </q-item-section>
            <q-item-section avatar>
              <q-radio
                v-model="filter_type"
                val="type_private"
                color="accent"
              />
            </q-item-section>
          </q-item>

          <q-item tag="label" v-ripple>
            <q-item-section>
              <q-item-label>S&B Member Offers</q-item-label>
              <q-item-label caption
                >Offers can only be filled by members</q-item-label
              >
            </q-item-section>
            <q-item-section avatar>
              <q-radio
                v-model="filter_type"
                val="type_members"
                color="accent"
              />
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </q-card-section>
    <q-separator />
    <q-card-section :class="useQuasar().screen.lt.md ? 'row' : 'col'">
      <div class="col-2 text-overline">Fill Type</div>
      <div class="col">
        <q-list>
          <q-item tag="label" v-ripple>
            <q-item-section>
              <q-item-label>One-Time Fill</q-item-label>
              <q-item-label caption
                >Offer can only be taken as a whole</q-item-label
              >
            </q-item-section>
            <q-item-section avatar>
              <q-checkbox
                :disable="disable_input"
                v-model="extra_filter"
                val="fill_full"
                color="accent"
              />
            </q-item-section>
          </q-item>
          <q-item tag="label" v-ripple>
            <q-item-section>
              <q-item-label>Partial Fill</q-item-label>
              <q-item-label caption>Offer can be filled partially</q-item-label>
            </q-item-section>
            <q-item-section avatar>
              <q-checkbox
                :disable="disable_input"
                v-model="extra_filter"
                val="fill_partial"
                color="accent"
              />
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </q-card-section>
    <q-separator />

    <q-card-section :class="useQuasar().screen.lt.md ? 'row' : 'col'">
      <div class="col-2 text-overline">Options</div>
      <div class="col">
        <q-list>
          <q-item tag="label" v-ripple>
            <q-item-section>
              <q-item-label>Show mine</q-item-label>
              <q-item-label caption>Show self created Offers</q-item-label>
            </q-item-section>
            <q-item-section avatar>
              <q-checkbox
                :disable="disable_input"
                v-model="extra_filter"
                val="self"
                color="accent"
              />
            </q-item-section>
          </q-item>
          <q-item tag="label" v-ripple>
            <q-item-section>
              <q-item-label>Show filled</q-item-label>
              <q-item-label caption
                >Show offers that are 100% filled</q-item-label
              >
            </q-item-section>
            <q-item-section avatar>
              <q-checkbox
                :disable="disable_input"
                v-model="extra_filter"
                val="filled"
                color="accent"
              />
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </q-card-section>
  </q-card>
</template>

<style scoped lang="sass"></style>
