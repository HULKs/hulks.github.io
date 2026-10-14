<script setup>
defineProps({
  eyebrow: { type: String, default: "" },
  title: { type: String, required: true },
  description: { type: String, default: "" },
  align: { type: String, default: "left" },
});
</script>

<template>
  <header :class="['space-y-3', align === 'center' ? 'text-center' : '']">
    <span
      v-if="eyebrow"
      class="inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.18em] text-brand-700 dark:text-brand-300 before:block before:h-px before:w-8 before:bg-brand-500 before:content-['']"
      >{{ eyebrow }}</span
    >
    <h2
      class="font-display text-3xl font-bold tracking-tight text-ink-900 dark:text-white sm:text-4xl"
    >
      {{ title }}
    </h2>
    <p
      v-if="description"
      :class="[
        'text-base text-ink-600 dark:text-ink-400',
        align === 'center' ? 'mx-auto max-w-2xl' : 'max-w-2xl',
      ]"
    >
      {{ description }}
    </p>
  </header>
</template>
