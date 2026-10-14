<script setup>
import { computed, ref } from "vue";
import { RouterLink } from "vue-router";
import { Icon } from "@iconify/vue";
import HeroSection from "@/components/HeroSection.vue";
import SectionHeading from "@/components/SectionHeading.vue";
import EventCard from "@/components/EventCard.vue";
import TeamCarousel from "@/components/TeamCarousel.vue";
import VideoEmbed from "@/components/VideoEmbed.vue";
import events from "@/data/events.json";
import sponsors from "@/data/sponsors.json";
import site from "@/data/site.json";
import team from "@/data/team.json";

const allSponsors = sponsors.tiers.flatMap((tier) => tier.sponsors);

const carouselMembers = computed(() => {
  const selectedIds = site.teamCarousel?.groups ?? [];
  const groups = selectedIds.length
    ? team.groups.filter((group) => selectedIds.includes(group.id))
    : team.groups;
  return groups.flatMap((group) => group.members);
});

const EVENTS_INITIAL = 4;
const showAllEvents = ref(false);
const visibleEvents = computed(() =>
  showAllEvents.value ? events : events.slice(0, EVENTS_INITIAL),
);
const hasMoreEvents = computed(() => events.length > EVENTS_INITIAL);
</script>

<template>
  <HeroSection />

  <section
    v-reveal
    class="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-20 lg:px-8"
  >
    <div class="grid gap-10 lg:grid-cols-12 lg:items-center">
      <div class="lg:col-span-6 space-y-5">
        <SectionHeading
          :eyebrow="site.about.eyebrow"
          :title="site.about.title"
        />
        <p
          v-for="(paragraph, i) in site.about.paragraphs"
          :key="i"
          class="text-base text-ink-600 dark:text-ink-300 sm:text-lg"
        >
          {{ paragraph }}
        </p>
      </div>

      <div class="lg:col-span-6">
        <VideoEmbed
          :youtube-id="site.video.youtubeId"
          :title="site.video.title"
        />
      </div>
    </div>
  </section>

  <!-- Team carousel -->
  <section
    v-reveal
    class="border-y border-ink-200 bg-ink-50 py-12 dark:border-ink-800 dark:bg-ink-900/40 sm:py-20"
  >
    <div class="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
      <div
        class="flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
      >
        <SectionHeading
          :eyebrow="site.teamCarousel.eyebrow"
          :title="site.teamCarousel.title"
          :description="site.teamCarousel.description"
        />
        <RouterLink
          to="/team"
          class="inline-flex items-center gap-2 self-start rounded-lg border border-ink-200 px-4 py-2 text-sm font-medium text-ink-800 transition-colors hover:border-brand-500 hover:text-brand-700 md:self-auto dark:border-ink-700 dark:text-ink-100 dark:hover:border-brand-400 dark:hover:text-brand-300"
        >
          Full team roster
        </RouterLink>
      </div>

      <div class="mt-10">
        <TeamCarousel :members="carouselMembers" />
      </div>
    </div>
  </section>

  <!-- events -->
  <section
    v-reveal
    class="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-20 lg:px-8"
  >
    <SectionHeading
      eyebrow="Latest Milestones"
      title="Competitions & Events"
      description="From RoboCups to community workshops — a look at where our robots and researchers have been most recently."
    />

    <div class="mt-10 grid gap-6 md:grid-cols-2">
      <EventCard
        v-for="(event, i) in visibleEvents"
        :key="event.id"
        v-reveal="{ delay: i * 90 }"
        :event="event"
      />
    </div>

    <!-- load more events -->
    <div v-if="hasMoreEvents" class="mt-10 flex justify-center">
      <button
        type="button"
        class="inline-flex items-center gap-2 rounded-lg border border-ink-200 px-4 py-2 text-sm font-medium text-ink-800 transition-colors hover:border-brand-500 hover:text-brand-700 dark:border-ink-700 dark:text-ink-100 dark:hover:border-brand-400 dark:hover:text-brand-300"
        :aria-expanded="showAllEvents"
        @click="showAllEvents = !showAllEvents"
      >
        {{ showAllEvents ? "Show less" : "Show more" }}
        <Icon
          icon="mdi:chevron-down"
          width="14"
          height="14"
          class="ml-1 transition-transform"
          :class="{ 'rotate-180': showAllEvents }"
          aria-hidden="true"
        />
      </button>
    </div>
  </section>

  <!-- Sponsors -->
  <section
    v-reveal
    class="border-y border-ink-200 bg-ink-50 py-12 dark:border-ink-800 dark:bg-ink-900/40 sm:py-20"
  >
    <div class="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
      <div
        class="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"
      >
        <div>
          <span
            class="inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.18em] text-brand-700 dark:text-brand-300 before:block before:h-px before:w-8 before:bg-brand-500 before:content-['']"
            >Support</span
          >
          <h3 class="mt-2 font-display text-2xl font-bold sm:text-3xl">
            Supported by
          </h3>
          <p class="mt-1 text-sm text-ink-500 dark:text-ink-400">
            Industry partners, supporters and academic backers of the HULKs.
          </p>
        </div>
        <RouterLink
          to="/contact"
          class="inline-flex items-center gap-2 self-start rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-700 sm:self-auto dark:bg-brand-500 dark:text-ink-950 dark:hover:bg-brand-400"
        >
          Get in touch
        </RouterLink>
      </div>
      <ul
        class="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5"
      >
        <li
          v-for="(sponsor, i) in allSponsors"
          :key="sponsor.name"
          v-reveal="{ delay: i * 60 }"
        >
          <a
            :href="sponsor.url"
            target="_blank"
            rel="noopener"
            :title="sponsor.name"
            :aria-label="sponsor.name"
            class="flex h-24 w-full items-center justify-center rounded-lg border border-ink-200 bg-white p-2 transition-colors hover:border-brand-500 sm:h-28 dark:border-ink-800"
          >
            <img
              v-if="sponsor.logo"
              :src="sponsor.logo"
              :alt="`${sponsor.name} logo`"
              loading="lazy"
              class="max-h-full max-w-full object-contain"
            />
            <span
              v-else
              class="text-center font-display text-sm font-semibold text-ink-700"
            >
              {{ sponsor.name }}
            </span>
          </a>
        </li>
      </ul>
    </div>
  </section>

  <!-- Find us -->
  <section v-reveal class="border-t border-ink-200 dark:border-ink-800">
    <div
      class="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-6 px-4 py-10 sm:px-6 sm:py-14 md:flex-row md:items-center lg:px-8"
    >
      <div>
        <span
          class="inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.18em] text-brand-700 dark:text-brand-300 before:block before:h-px before:w-8 before:bg-brand-500 before:content-['']"
          >Find us</span
        >
        <p class="mt-2 font-display text-xl font-semibold">
          {{ site.location.lab }}, {{ site.location.city }}
        </p>
        <a
          class="mt-1 inline-block text-sm text-brand-700 underline-offset-4 hover:underline dark:text-brand-300"
          :href="`mailto:${site.contact.email}`"
        >
          {{ site.contact.email }}
        </a>
      </div>
      <a
        :href="site.location.mapUrl"
        target="_blank"
        rel="noopener"
        class="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-700 dark:bg-brand-500 dark:text-ink-950 dark:hover:bg-brand-400"
      >
        Open in Maps
        <Icon icon="mdi:arrow-top-right" width="16" height="16" />
      </a>
    </div>
  </section>
</template>
