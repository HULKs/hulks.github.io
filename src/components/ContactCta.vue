<script setup>
import { Icon } from "@iconify/vue";
import { fadeUp } from "@/motion/presets";

defineProps({
  eyebrow: { type: String, default: "Get involved" },
  title: { type: String, required: true },
  description: { type: String, required: true },
  buttonLabel: { type: String, default: "Get in touch" },
});
</script>

<template>
  <div
    v-motion="fadeUp"
    class="rounded-2xl border border-brand-500/30 bg-brand-500/5 p-5 dark:bg-brand-500/10 sm:p-8"
  >
    <div class="relative grid gap-6 md:grid-cols-12 md:items-center">
      <div class="md:col-span-8 space-y-3">
        <span
          class="inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.18em] text-brand-700 dark:text-brand-300 before:block before:h-px before:w-8 before:bg-brand-500 before:content-['']"
        >
          {{ eyebrow }}
        </span>
        <h3 class="font-display text-2xl font-bold sm:text-3xl">
          {{ title }}
        </h3>
        <p
          class="max-w-2xl text-sm text-ink-700 dark:text-ink-300 sm:text-base"
        >
          {{ description }}
        </p>
      </div>
      <div class="md:col-span-4 flex flex-col gap-3 md:items-end">
        <RouterLink
          :to="{ name: 'contact' }"
          class="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-700 dark:bg-brand-500 dark:text-ink-950 dark:hover:bg-brand-400"
        >
          {{ buttonLabel }}
          <Icon icon="mdi:arrow-top-right" width="16" height="16" />
        </RouterLink>
      </div>
    </div>
  </div>
</template>
