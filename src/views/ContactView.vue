<script setup>
import { Icon } from "@iconify/vue";
import SectionHeading from "@/components/SectionHeading.vue";
import site from "@/data/site.json";
import { fadeUp, fadeUpStaggered } from "@/motion/presets";
</script>

<template>
  <section
    v-motion="fadeUp"
    class="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
  >
    <SectionHeading
      eyebrow="Find us"
      title="Contact"
      description="Get in touch — whether you are a prospective team member, a research partner, or curious press."
    />
  </section>

  <section
    v-motion="fadeUpStaggered(0, 80)"
    class="mx-auto w-full max-w-6xl px-4 pb-8 sm:px-6 sm:pb-12 lg:px-8"
  >
    <div
      class="relative overflow-hidden rounded-xl border border-ink-200 bg-white p-5 shadow-soft transition-colors sm:p-8 lg:p-10 dark:border-ink-800 dark:bg-ink-900"
    >
      <div class="relative grid gap-6 md:grid-cols-12 md:items-center">
        <div class="md:col-span-8 space-y-3">
          <span
            class="inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.18em] text-brand-700 dark:text-brand-300 before:block before:h-px before:w-8 before:bg-brand-500 before:content-['']"
            >Write to us</span
          >
          <h3 class="font-display text-2xl font-bold sm:text-3xl">
            Send us an e-mail
          </h3>
          <p
            class="max-w-2xl text-sm text-ink-600 dark:text-ink-300 sm:text-base"
          >
            Fastest response for anything about the team, competitions, or
            press. Just drop us a line — we usually reply within a few days.
          </p>
        </div>
        <div class="md:col-span-4 flex flex-col gap-3 md:items-end">
          <a
            :href="`mailto:${site.contact.email}`"
            class="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-700 dark:bg-brand-500 dark:text-ink-950 dark:hover:bg-brand-400"
          >
            {{ site.contact.email }}
            <Icon icon="mdi:arrow-top-right" width="16" height="16" />
          </a>
        </div>
      </div>
    </div>
  </section>

  <section
    class="mx-auto grid w-full max-w-6xl gap-6 px-4 pb-16 sm:px-6 sm:pb-24 md:grid-cols-2 lg:px-8"
  >
    <div
      v-motion="fadeUpStaggered(1, 100)"
      class="rounded-xl border border-ink-200 bg-white p-6 shadow-soft transition-colors dark:border-ink-800 dark:bg-ink-900"
    >
      <span
        class="inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.18em] text-brand-700 dark:text-brand-300 before:block before:h-px before:w-8 before:bg-brand-500 before:content-['']"
        >Lab</span
      >
      <p class="mt-3 font-display text-lg font-semibold">
        {{ site.location.lab }}
      </p>
      <p class="text-sm text-ink-600 dark:text-ink-300">
        {{ site.location.city }}, {{ site.location.country }}
      </p>
      <a
        :href="site.location.mapUrl"
        target="_blank"
        rel="noopener"
        class="mt-4 inline-flex items-center gap-2 rounded-lg border border-ink-200 px-4 py-2 text-sm font-medium text-ink-800 transition-colors hover:border-brand-500 hover:text-brand-700 dark:border-ink-700 dark:text-ink-100 dark:hover:border-brand-400 dark:hover:text-brand-300"
      >
        Open in Maps
        <Icon icon="mdi:arrow-top-right" width="14" height="14" />
      </a>
    </div>

    <div
      v-motion="fadeUpStaggered(2, 100)"
      class="rounded-xl border border-ink-200 bg-white p-6 shadow-soft transition-colors dark:border-ink-800 dark:bg-ink-900"
    >
      <span
        class="inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.18em] text-brand-700 dark:text-brand-300 before:block before:h-px before:w-8 before:bg-brand-500 before:content-['']"
        >Social</span
      >
      <ul class="mt-3 space-y-2 text-sm">
        <li v-for="social in site.socials" :key="social.name">
          <a
            class="text-brand-700 underline-offset-4 hover:underline dark:text-brand-300"
            :href="social.url"
            target="_blank"
            rel="noopener"
          >
            {{ social.name }} · {{ social.handle }}
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>
