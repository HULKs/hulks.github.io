<script setup>
import { computed } from "vue";
import { Icon } from "@iconify/vue";
import flags from "@/assets/country-flags.json";

const props = defineProps({
  countryCode: { type: String, required: true },
  width: { type: Number, default: 28 },
  height: { type: Number, default: 21 },
});

const flag = computed(() => {
  const icon = flags.icons[`${props.countryCode}-4x3`];
  return icon ? { width: flags.width, height: flags.height, ...icon } : null;
});
</script>

<template>
  <Icon
    v-if="flag"
    :icon="flag"
    :width="width"
    :height="height"
    class="inline-block shrink-0 rounded-sm align-middle ring-1 ring-ink-200 dark:ring-ink-700"
    aria-hidden="true"
  />
</template>
