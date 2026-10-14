<script setup>
import { Icon } from "@iconify/vue";

defineProps({
  event: { type: Object, required: true },
});
</script>

<template>
  <article
    class="group flex flex-col overflow-hidden rounded-xl border border-ink-200 bg-white shadow-soft transition-colors hover:border-brand-500/50 hover:shadow-lg dark:border-ink-800 dark:bg-ink-900"
  >
    <!-- Image and tags section -->
    <div
      class="relative aspect-[16/10] overflow-hidden bg-ink-100 dark:bg-ink-800"
    >
      <img
        v-if="event.image"
        :src="event.image"
        :alt="event.title"
        loading="lazy"
        class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div class="absolute left-3 top-3 flex flex-wrap gap-1.5">
        <span
          v-for="tag in event.tags"
          :key="tag"
          class="inline-flex items-center rounded-full border border-ink-200 bg-white/85 px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-wider text-ink-600 backdrop-blur dark:border-ink-700 dark:bg-ink-900/85 dark:text-ink-300"
        >
          {{ tag }}
        </span>
      </div>
    </div>
    <!-- Content section -->
    <div class="flex flex-1 flex-col gap-3 p-6">
      <div
        class="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-ink-500 dark:text-ink-400"
      >
        <span>{{ event.date }}</span>
        <span aria-hidden="true">·</span>
        <span>{{ event.location }}</span>
      </div>
      <h3
        class="font-display text-xl font-semibold text-ink-900 dark:text-white"
      >
        {{ event.title }}
      </h3>
      <p
        v-if="event.highlight"
        class="text-sm font-medium text-brand-700 dark:text-brand-300"
      >
        {{ event.highlight }}
      </p>
      <p class="text-sm text-ink-600 dark:text-ink-300">
        {{ event.summary }}
      </p>
      <a
        v-if="event.link"
        :href="event.link"
        target="_blank"
        rel="noopener"
        class="mt-auto inline-flex items-center gap-1.5 pt-2 font-mono text-xs uppercase tracking-widest text-brand-700 hover:underline dark:text-brand-300"
      >
        Learn more
        <Icon icon="mdi:arrow-top-right" width="12" height="12" />
      </a>
    </div>
  </article>
</template>
