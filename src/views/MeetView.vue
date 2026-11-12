<script setup>
import { Icon } from "@iconify/vue";
import SectionHeading from "@/components/SectionHeading.vue";
import VideoEmbed from "@/components/VideoEmbed.vue";
import meet from "@/data/meet.json";
import events from "@/data/events.json";
import site from "@/data/site.json";
import { fadeUp } from "@/motion/presets";

const rohow = events.find((event) => event.id === "rohow");
</script>

<template>
  <section
    v-motion="fadeUp"
    class="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
  >
    <SectionHeading
      eyebrow="Get involved"
      :title="meet.title"
      description="Join our team and help build the next generation of autonomous humanoid soccer robots."
    />
    <div class="mt-8 max-w-3xl space-y-4 text-base text-ink-600 dark:text-ink-300">
      <p v-for="paragraph in meet.paragraphs" :key="paragraph">{{ paragraph }}</p>
    </div>
    <div class="mt-8 flex flex-wrap gap-3">
      <a
        :href="`mailto:${site.contact.email}`"
        class="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-700 dark:bg-brand-500 dark:text-ink-950 dark:hover:bg-brand-400"
      >
        {{ site.contact.email }}
      </a>
      <a
        :href="meet.bootcampUrl"
        target="_blank"
        rel="noopener"
        class="rounded-lg border border-ink-200 px-4 py-2 text-sm font-medium transition-colors hover:border-brand-500 hover:text-brand-700 dark:border-ink-700 dark:hover:text-brand-300"
      >
        Join the Telegram bootcamp ↗
      </a>
    </div>
    <div class="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-brand-700 dark:text-brand-300">
      <a :href="meet.projectBoardUrl" target="_blank" rel="noopener" class="hover:underline">
        Explore our project board ↗
      </a>
      <a :href="meet.codeUrl" target="_blank" rel="noopener" class="hover:underline">
        Explore our code ↗
      </a>
    </div>
  </section>

  <section class="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6 sm:pb-24 lg:px-8">
    <SectionHeading
      eyebrow="Life at RoboCup"
      title="RoboCup aftermovies"
      description="Get an impression of the competition, our robots, and the people behind them."
    />
    <div class="mt-8 grid gap-6 md:grid-cols-2">
      <VideoEmbed
        v-for="video in meet.videos"
        :key="video.youtubeId"
        :youtube-id="video.youtubeId"
        :title="video.title"
      />
    </div>
  </section>

  <section
    v-if="rohow"
    id="rohow"
    v-reveal
    aria-label="RoHOW"
    class="scroll-mt-16 border-t border-ink-200 bg-ink-50 py-12 dark:border-ink-800 dark:bg-ink-900/40 sm:py-20"
  >
    <div class="mx-auto grid w-full max-w-6xl gap-8 px-4 sm:px-6 md:grid-cols-2 md:items-center lg:gap-12 lg:px-8">
      <div class="space-y-5">
        <SectionHeading eyebrow="Our event" :title="rohow.title" />
        <p class="text-base text-ink-600 dark:text-ink-300">{{ rohow.summary }}</p>
        <a
          v-if="rohow.link"
          :href="rohow.link"
          target="_blank"
          rel="noopener"
          class="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-700 dark:bg-brand-500 dark:text-ink-950 dark:hover:bg-brand-400"
        >
          Visit RoHOW
          <Icon icon="mdi:arrow-top-right" width="16" height="16" aria-hidden="true" />
        </a>
      </div>
      <img
        v-if="rohow.image"
        :src="rohow.image"
        alt="Participants at the Robotic Hamburg Open Workshop at TUHH"
        loading="lazy"
        class="aspect-[3/2] w-full rounded-xl object-cover"
      />
    </div>
  </section>
</template>
