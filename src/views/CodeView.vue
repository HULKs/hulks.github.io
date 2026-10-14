<script setup>
import { computed, onMounted, onUnmounted, ref } from "vue";
import { Icon } from "@iconify/vue";
import SectionHeading from "@/components/SectionHeading.vue";
import HulkModel from "@/components/HulkModel.vue";
import RepoCard from "@/components/RepoCard.vue";
import code from "@/data/code.json";
import { useGithubRepo } from "@/composables/useGithubRepo.js";
import { formatLastPush } from "@/utils/formatLastPush.js";
import { fadeUp, fadeUpStaggered } from "@/motion/presets";

const { data: repo, loading } = useGithubRepo(code.github.repo);
const now = ref(Date.now());
let relativeTimeInterval;

onMounted(() => {
  relativeTimeInterval = setInterval(() => {
    now.value = Date.now();
  }, 60_000);
});
onUnmounted(() => clearInterval(relativeTimeInterval));

const formatter = new Intl.NumberFormat("en", {
  notation: "compact",
  maximumFractionDigits: 1,
});

const stats = computed(() => {
  const r = repo.value;
  return [
    {
      label: "Stars",
      value: r ? formatter.format(r.stars) : "—",
      icon: "star",
    },
    {
      label: "Forks",
      value: r ? formatter.format(r.forks) : "—",
      icon: "fork",
    },
    {
      label: "Open issues",
      value: r ? formatter.format(r.openIssues) : "—",
      icon: "issue",
    },
    {
      label: "Open PRs",
      value: r ? formatter.format(r.openPullRequests) : "—",
      icon: "pr",
    },
    {
      label: "Language",
      value: r?.language ?? code.github.language,
      icon: "code",
    },
    { label: "License", value: r?.license ?? "—", icon: "license" },
    {
      label: "Last push",
      value: formatLastPush(r?.pushedAt, now.value),
      title: r?.pushedAt
        ? `Last push: ${new Date(r.pushedAt).toLocaleString()}`
        : undefined,
      icon: "clock",
    },
  ];
});

const iconMap = {
  star: "mdi:star-outline",
  fork: "mdi:source-fork",
  issue: "mdi:alert-circle-outline",
  pr: "mdi:source-pull",
  code: "mdi:code-tags",
  license: "mdi:scale-balance",
  clock: "mdi:clock-outline",
};
</script>

<template>
  <section
    v-motion="fadeUp"
    class="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
  >
    <div class="grid gap-10 lg:grid-cols-12 lg:items-center">
      <div class="lg:col-span-6 space-y-5">
        <SectionHeading
          eyebrow="Open Source"
          title="Our code"
          :description="code.intro"
        />
        <div class="flex flex-wrap items-center gap-3 pt-2">
          <a
            :href="code.github.repoUrl"
            target="_blank"
            rel="noopener"
            class="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-700 dark:bg-brand-500 dark:text-ink-950 dark:hover:bg-brand-400"
          >
            <Icon icon="mdi:github" width="16" height="16" aria-hidden="true" />
            HULKs/hulk on GitHub
          </a>
          <a
            :href="code.github.orgUrl"
            target="_blank"
            rel="noopener"
            class="inline-flex items-center gap-2 rounded-lg border border-ink-200 px-4 py-2 text-sm font-medium text-ink-800 transition-colors hover:border-brand-500 hover:text-brand-700 dark:border-ink-700 dark:text-ink-100 dark:hover:border-brand-400 dark:hover:text-brand-300"
          >
            All HULKs repositories
          </a>
        </div>
        <div class="flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-brand-700 dark:text-brand-300">
          <a :href="code.github.docsUrl" class="underline-offset-4 hover:underline">
            Documentation ↗
          </a>
          <a :href="code.github.releasesUrl" target="_blank" rel="noopener" class="underline-offset-4 hover:underline">
            Seasonal releases ↗
          </a>
        </div>

        <dl
          class="flex flex-wrap gap-2 pt-2"
          :aria-busy="loading ? 'true' : 'false'"
        >
          <div
            v-for="(stat, i) in stats"
            :key="stat.label"
            v-motion="fadeUpStaggered(i, 50, 200)"
            class="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white/70 px-3 py-1.5 backdrop-blur-sm dark:border-ink-800 dark:bg-ink-900/70"
            :title="stat.title ?? `${stat.label}: ${stat.value}`"
          >
            <Icon
              :icon="iconMap[stat.icon]"
              width="14"
              height="14"
              class="text-brand-600 dark:text-brand-300"
              aria-hidden="true"
            />
            <dt
              class="font-mono text-[10px] uppercase tracking-widest text-ink-500 dark:text-ink-400"
            >
              {{ stat.label }}
            </dt>
            <dd
              class="font-display text-sm font-semibold text-ink-900 dark:text-white"
            >
              {{ stat.value }}
            </dd>
          </div>
        </dl>
      </div>

      <div class="lg:col-span-6">
        <div class="aspect-square w-full max-w-[520px] mx-auto lg:ml-auto">
          <HulkModel :src="code.model.src" :label="code.model.label" />
        </div>
      </div>
    </div>
  </section>

  <section
    v-motion="fadeUp"
    class="border-y border-ink-200 bg-ink-50 py-12 dark:border-ink-800 dark:bg-ink-900/40 sm:py-20"
  >
    <div class="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Featured repositories"
        title="Where the code lives"
        description="A few of the repositories inside the HULKs GitHub organization."
      />

      <div class="mt-8 grid gap-4 md:grid-cols-2">
        <div
          v-for="(r, i) in code.featuredRepos"
          :key="r.name"
          v-motion="fadeUpStaggered(i, 80)"
          class="min-w-0"
        >
          <RepoCard :repo="r" />
        </div>
      </div>
    </div>
  </section>
</template>
