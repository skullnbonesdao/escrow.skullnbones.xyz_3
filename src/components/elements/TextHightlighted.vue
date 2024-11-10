<template>
  <div>
    <!-- Use v-html to render the highlighted address -->
    <span v-if="!search">{{ text }}</span>
    <span v-else v-html="highlighted"></span>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true,
    },
    search: {
      type: String,
      required: true,
    },
  },
  computed: {
    highlighted() {
      if (!this.search) return this.address;

      // Escape the needle to safely use in regex (in case of special characters)
      const escapedNeedle = this.search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

      // Create a regular expression to find all occurrences of the needle
      const regex = new RegExp(`(${escapedNeedle})`, 'gi');

      // Replace matched text with a highlighted span
      return this.text.replace(
        regex,
        '<span style="color: coral; font-weight: bold;">$1</span>',
      );
    },
  },
};
</script>

<style scoped></style>
