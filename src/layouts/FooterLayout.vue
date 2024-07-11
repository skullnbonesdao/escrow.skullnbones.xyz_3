<script setup lang="ts">
import { copy_to_clipboard } from 'src/functions/copy_to_clipboard';
import { format_address } from 'src/functions/format_address';
import { version } from 'src/../package.json';
import { useRPCStore } from 'stores/rpcStore';

const v = version;
</script>

<template>
  <q-separator />
  <q-toolbar>
    <q-toolbar-title class="row items-center">
      <div class="col">
        <q-img src=" sa-powered_by_the_people.png" width="100px" />
      </div>
      <div
        class="col text-subtitle2 text-center"
        style="font-size: 10px"
        @click="
          copy_to_clipboard('budkxEapRhWjRYXSEurLjyT9jpsd92y1smqMYzSBgTC')
        "
      >
        <div>Support this project:</div>
        <div>
          {{ format_address('budkxEapRhWjRYXSEurLjyT9jpsd92y1smqMYzSBgTC') }}
        </div>
      </div>

      <div class="col row items-center">
        <div class="col text-right text-subtitle2">v{{ v }}</div>
        <q-btn
          dense
          flat
          square
          class="q-ml-sm"
          icon="settings"
          @click="useRPCStore().show_rpc_select = true"
        />
      </div>
    </q-toolbar-title>
  </q-toolbar>
</template>

<style scoped lang="sass"></style>
