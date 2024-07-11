<script setup lang="ts">
defineProps({
  src: {
    type: String,
    default: 'unknown.png',
  },
  size: {
    type: String,
    default: 'md',
  },
});
</script>

<template>
  <q-avatar :size="size" color="white">
    <img :src="src" />
  </q-avatar>
</template>

<style scoped></style>
