<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <section
    class="mx-auto grid min-h-[60vh] w-full max-w-6xl place-items-center px-4 py-16 text-center sm:px-6 sm:py-24 lg:px-8"
  >
    <div class="space-y-4">
      <span
        class="inline-flex items-center justify-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.18em] text-brand-700 dark:text-brand-300 before:block before:h-px before:w-8 before:bg-brand-500 before:content-['']"
        >Error</span
      >
      <h1 class="font-display text-5xl font-bold sm:text-6xl">404</h1>
      <p class="text-ink-600 dark:text-ink-300">
        The page you're looking for doesn't exist.
      </p>
      <RouterLink
        to="/"
        class="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-700 dark:bg-brand-500 dark:text-ink-950 dark:hover:bg-brand-400"
        >Back home</RouterLink
      >
    </div>
  </section>
</template>
