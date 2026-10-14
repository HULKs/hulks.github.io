<script setup>
import { computed } from "vue";
import { Icon } from "@iconify/vue";

const props = defineProps({
  sponsor: { type: Object, required: true },
  variant: { type: String, default: "detailed" },
});

const host = computed(() => {
  try {
    return new URL(props.sponsor.url).host.replace(/^www\./, "");
  } catch {
    return "";
  }
});

function hostname(url) {
  try {
    return new URL(url).host.replace(/^www\./, "");
  } catch {
    return url;
  }
}
</script>

<template>
  <a
    :href="sponsor.url"
    target="_blank"
    rel="noopener"
    :title="sponsor.name"
    :aria-label="sponsor.name"
    class="group flex h-full flex-col overflow-hidden rounded-xl border border-ink-200 bg-white transition-all hover:-translate-y-0.5 hover:border-brand-500/70 hover:shadow-lg dark:border-ink-800 dark:bg-ink-900 dark:hover:border-brand-400/70"
  >
    <div
      :class="[
        'flex items-center justify-center bg-white p-6',
        variant === 'detailed' ? 'h-36' : 'h-28',
      ]"
    >
      <img
        v-if="sponsor.logo"
        :src="sponsor.logo"
        :alt="`${sponsor.name} logo`"
        loading="lazy"
        class="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
      />
      <span v-else class="font-display text-lg font-semibold text-ink-800">
        {{ sponsor.name }}
      </span>
    </div>

    <div
      v-if="variant === 'detailed'"
      class="flex flex-1 flex-col border-t border-ink-100 p-5 dark:border-ink-800"
    >
      <div class="flex items-start justify-between gap-3">
        <span
          class="font-display text-base font-semibold text-ink-900 dark:text-white"
        >
          {{ sponsor.name }}
        </span>
        <Icon
          icon="mdi:arrow-top-right"
          width="16"
          height="16"
          class="mt-0.5 shrink-0 text-ink-400 transition-colors group-hover:text-brand-600 dark:group-hover:text-brand-300"
        />
      </div>
      <p
        v-if="sponsor.description"
        class="mt-1.5 text-sm text-ink-600 dark:text-ink-300"
      >
        {{ sponsor.description }}
      </p>
      <span
        v-if="host"
        class="mt-auto pt-4 font-mono text-[11px] uppercase tracking-widest text-ink-500 dark:text-ink-400"
      >
        {{ host }}
      </span>
    </div>
  </a>
</template>
