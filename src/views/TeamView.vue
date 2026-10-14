<script setup>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import SectionHeading from "@/components/SectionHeading.vue";
import MemberGroup from "@/components/MemberGroup.vue";
import CountryFlag from "@/components/CountryFlag.vue";
import team from "@/data/team.json";
import teamHistory from "@/data/team-history.json";
import { fadeUp, fadeUpStaggered } from "@/motion/presets";

const currentYear = (team.season.match(/\d{4}/) || [])[0] ?? "";

const seasons = teamHistory.seasons.map((season) =>
  season.year === currentYear
    ? { ...season, label: team.season, groups: team.groups }
    : season,
);

function locationFor(season) {
  if (season.event) return season.event;
  return season.label?.split(" | ")[1] ?? season.label ?? "";
}

const route = useRoute();
const router = useRouter();
const selectedYear = computed(() =>
  seasons.some((season) => season.year === route.query.season)
    ? route.query.season
    : currentYear,
);
const selectedSeason = computed(
  () =>
    seasons.find((season) => season.year === selectedYear.value) ?? seasons[0],
);

function selectYear(year) {
  if (!seasons.some((season) => season.year === year)) return;
  router.replace({ name: "team", query: { ...route.query, season: year } });
  document.getElementById("team-top")?.scrollIntoView({ behavior: "smooth" });
}
</script>

<template>
  <section
    id="team-top"
    v-motion="fadeUp"
    class="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
  >
    <SectionHeading
      eyebrow="The People"
      :title="selectedSeason.label"
      description="A cross-disciplinary team of students and researchers working together on humanoid robotics — from firmware to high-level behavior."
    >
      <template #title>
        {{ selectedSeason.label }}
        <CountryFlag :country-code="selectedSeason.countryCode" class="ml-2" />
      </template>
    </SectionHeading>

    <div class="mt-6 flex flex-wrap gap-1.5">
      <button
        v-for="season in seasons"
        :key="season.year"
        type="button"
        class="rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-widest transition-colors"
        :class="
          selectedYear === season.year
            ? 'border-brand-500 bg-brand-500/10 text-brand-700 dark:text-brand-300'
            : 'border-ink-200 text-ink-600 hover:border-brand-500/60 dark:border-ink-800 dark:text-ink-300'
        "
        @click="selectYear(season.year)"
      >
        {{ season.year }}
      </button>
    </div>

    <figure
      v-if="selectedSeason.photo"
      class="mt-8 mx-auto max-w-2xl overflow-hidden rounded-2xl border border-ink-200 bg-ink-100 dark:border-ink-800 dark:bg-ink-900"
    >
      <img
        :src="selectedSeason.photo"
        :alt="`${selectedSeason.label} — team photo`"
        loading="lazy"
        class="h-auto w-full object-cover"
      />
    </figure>
  </section>

  <section
    class="mx-auto mb-4 w-full max-w-6xl space-y-12 px-4 sm:space-y-14 sm:px-6 lg:px-8"
  >
    <MemberGroup
      v-for="group in selectedSeason.groups"
      :key="selectedSeason.year + '-' + group.id"
      :group="group"
    />
  </section>

  <section
    v-motion="fadeUp"
    class="border-t border-ink-200 bg-ink-50 py-12 dark:border-ink-800 dark:bg-ink-900/40 sm:py-20"
  >
    <div class="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Team History"
        title="Where we have competed"
        description="A short timeline of team seasons and RoboCup appearances — click a year to view that team."
      />
      <ol class="mt-10 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        <li
          v-for="(history, i) in seasons"
          :key="history.year"
          v-motion="fadeUpStaggered(i, 40)"
        >
          <button
            type="button"
            class="flex w-full items-center justify-between rounded-lg border bg-white px-4 py-3 text-left text-sm transition-colors dark:bg-ink-900"
            :class="
              selectedYear === history.year
                ? 'border-brand-500/60 ring-1 ring-brand-500/20'
                : 'border-ink-200 hover:border-brand-500/60 dark:border-ink-800'
            "
            @click="selectYear(history.year)"
          >
            <span
              class="font-mono text-xs uppercase tracking-widest text-ink-500 dark:text-ink-400"
            >
              {{ history.year }}
            </span>
            <span class="ml-4 flex min-w-0 items-center gap-2 font-medium">
              <CountryFlag :country-code="history.countryCode" :width="20" :height="15" />
              <span class="truncate">{{ locationFor(history) }}</span>
            </span>
            <span
              v-if="history.year === currentYear"
              class="ml-3 inline-flex items-center rounded-full border border-brand-500/60 bg-brand-500/10 px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-wider text-brand-700 dark:text-brand-300"
            >
              Current
            </span>
          </button>
        </li>
      </ol>
    </div>
  </section>
</template>
