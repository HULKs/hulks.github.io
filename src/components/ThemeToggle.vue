<script setup>
import { Icon } from "@iconify/vue";
import { useDarkMode } from "@/composables/useDarkMode";

const { isDark, toggle } = useDarkMode();
</script>

<template>
  <button
    type="button"
    class="relative inline-flex h-9 w-9 items-center justify-center rounded-md border border-ink-200 text-ink-700 transition-colors hover:border-brand-500 hover:text-brand-700 dark:border-ink-700 dark:text-ink-200 dark:hover:border-brand-400 dark:hover:text-brand-300"
    :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
    :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
    @click="toggle"
  >
    <Icon
      :icon="isDark ? 'mdi:white-balance-sunny' : 'mdi:weather-night'"
      width="18"
      height="18"
    />
  </button>
</template>
