<script setup>
import { computed } from "vue";
import SectionHeading from "@/components/SectionHeading.vue";
import press from "@/data/press.json";
import { fadeUp, fadeUpStaggered } from "@/motion/presets";

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function formatMonthYear(year, month) {
  return `${MONTH_NAMES[month - 1]} ${year}`;
}

function formatFullDate(iso) {
  if (!iso) return "";
  const [year, month, day] = iso.split("-").map(Number);
  if (!day) return formatMonthYear(year, month);
  return `${day} ${MONTH_NAMES[month - 1]} ${year}`;
}

const groupedPress = computed(() => {
  const items = [...(press.pressReview ?? [])].sort((a, b) =>
    a.date < b.date ? 1 : a.date > b.date ? -1 : 0,
  );
  const groups = new Map();
  for (const item of items) {
    const [year, month] = item.date.split("-").map(Number);
    const key = `${year}-${String(month).padStart(2, "0")}`;
    if (!groups.has(key)) {
      groups.set(key, {
        key,
        year,
        month,
        label: formatMonthYear(year, month),
        items: [],
      });
    }
    groups.get(key).items.push(item);
  }
  return Array.from(groups.values());
});
</script>

<template>
  <section
    v-motion="fadeUp"
    class="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
  >
    <SectionHeading eyebrow="Media" title="Press" :description="press.intro" />
    <p
      class="mt-4 font-mono text-xs uppercase tracking-widest text-ink-500 dark:text-ink-400"
    >
      Press contact:
      <a
        :href="`mailto:${press.pressContact}`"
        class="text-brand-700 underline-offset-4 hover:underline dark:text-brand-300"
        >{{ press.pressContact }}</a
      >
    </p>
  </section>

  <section
    v-if="press.logos"
    v-motion="fadeUp"
    class="mx-auto w-full max-w-6xl px-4 pb-10 sm:px-6 sm:pb-16 lg:px-8"
  >
    <SectionHeading
      eyebrow="Brand"
      title="Logos"
      description="Download the HULKs wordmark for editorial use. Please do not modify the logo."
    />
    <div
      class="mt-8 grid gap-6 rounded-xl border border-ink-200 bg-white p-4 sm:p-6 md:grid-cols-12 dark:border-ink-800 dark:bg-ink-900"
    >
      <div
        class="md:col-span-5 flex items-center justify-center rounded-lg bg-ink-50 p-5 sm:p-8 dark:bg-ink-950"
      >
        <img
          :src="press.logos.preview"
          :alt="`${press.logos.name} logo`"
          class="max-h-32 w-auto object-contain"
          loading="lazy"
        />
      </div>
      <div class="md:col-span-7 flex flex-col justify-center space-y-4">
        <div>
          <p class="mt-1 text-sm text-ink-600 dark:text-ink-300">
            Available in vector and raster formats.
          </p>
        </div>
        <div class="flex flex-wrap gap-3">
          <a
            v-for="download in press.logos.downloads"
            :key="download.format"
            :href="download.url"
            target="_blank"
            rel="noopener"
            download
            class="inline-flex items-center gap-2 rounded-lg border border-ink-200 px-4 py-2 text-sm font-medium text-ink-800 transition-colors hover:border-brand-500 hover:text-brand-700 dark:border-ink-700 dark:text-ink-100 dark:hover:border-brand-400 dark:hover:text-brand-300"
          >
            <span class="font-mono text-xs uppercase tracking-wider">{{
              download.format
            }}</span>
            <span aria-hidden="true">↓</span>
          </a>
        </div>
      </div>
    </div>
  </section>

  <section
    class="mx-auto w-full max-w-6xl space-y-12 px-4 pb-16 sm:px-6 sm:pb-24 lg:px-8"
  >
    <SectionHeading
      eyebrow="Archive"
      title="Press review"
      description="A chronological collection of articles, interviews and features about the HULKs."
    />
    <div
      v-for="(group, gi) in groupedPress"
      :key="group.key"
      v-motion="fadeUpStaggered(gi, 60)"
      class="space-y-4"
    >
      <h3
        class="font-mono text-xs uppercase tracking-[0.18em] text-brand-700 dark:text-brand-300"
      >
        {{ group.label }}
      </h3>
      <ul class="space-y-3">
        <li
          v-for="item in group.items"
          :key="`${item.date}-${item.url}`"
          class="group grid gap-2 rounded-xl border border-ink-200 bg-white p-4 md:grid-cols-12 md:items-start dark:border-ink-800 dark:bg-ink-900"
        >
          <div class="md:col-span-3 flex items-center gap-3">
            <span
              class="font-mono text-xs uppercase tracking-widest text-ink-500 dark:text-ink-400"
            >
              {{ formatFullDate(item.date) }}
            </span>
          </div>
          <div class="md:col-span-9 space-y-1">
            <p
              class="font-mono text-[11px] uppercase tracking-wider text-ink-500 dark:text-ink-400"
            >
              {{ item.source }}
            </p>
            <a
              :href="item.url"
              target="_blank"
              rel="noopener"
              class="font-display text-base font-medium text-ink-900 underline-offset-4 hover:text-brand-700 hover:underline dark:text-white dark:hover:text-brand-300"
            >
              {{ item.title }}
            </a>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>
