<script setup lang="ts">
import { ref, watch } from 'vue';
import { useEscrowStore } from 'stores/escrowStore';
import axios from 'axios';
import { format_address } from 'src/functions/format_address';

let api_data = ref();

async function fetch_data() {
  let url = `https://api.helius.xyz/v0/addresses/${useEscrowStore().escrow_selected?.publicKey.toString()}/transactions?api-key=${
    import.meta.env.VITE_HELIUS_API_KEY
  }`;

  console.log(url);
  api_data.value = await axios.get(url);
}

watch(
  () => useEscrowStore().escrow_selected?.publicKey,
  async () => {
    if (useEscrowStore().escrow_selected?.publicKey.toString().length)
      await fetch_data();
  },
);

const columns = [
  {
    align: 'left',
    name: 'from',
    label: 'From',
    field: 'fromUserAccount',
    sortable: true,
    format: (val) => `${format_address(val)}`,
  },
  {
    align: 'left',
    name: 'to',
    label: 'To',
    field: 'toUserAccount',
    sortable: true,
    format: (val) => `${format_address(val)}`,
  },

  {
    align: 'left',
    name: 'Mint',
    label: 'Mint',
    field: 'mint',
    sortable: true,
    format: (val) => `${format_address(val)}`,
  },
  {
    name: 'amount',
    label: 'Amount',
    field: 'tokenAmount',
    sortable: true,
    format: (val) => `${val}`,
  },
];
</script>

<template>
  <div class="col">
    <div v-if="!api_data?.data.length" class="row">
      <q-spinner class="col" color="primary" size="3em" :thickness="10" />
    </div>
    <q-table
      v-else
      flat
      hide-bottom
      :rows="api_data?.data[0].tokenTransfers"
      :columns="columns"
      row-key="index"
      virtual-scroll
      :pagination="{
        rowsPerPage: 0,
      }"
      :rows-per-page-options="[0]"
    />
  </div>
</template>

<style scoped lang="sass"></style>
