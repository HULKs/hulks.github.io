<script setup>
import { computed } from "vue";
import { Icon } from "@iconify/vue";
import { useGithubRepo } from "@/composables/useGithubRepo.js";

const props = defineProps({
  repo: { type: Object, required: true },
});

const fullName = computed(() => props.repo.url.split("github.com/")[1] ?? ""); // repo full name (owner/repo)
const owner = computed(() => fullName.value.split("/")[0] ?? ""); // repo owner
const name = computed(() => fullName.value.split("/")[1] ?? props.repo.name); // repo name

// custom github composable to fetch repo data from GitHub API
const { data, loading } = useGithubRepo(fullName.value);

const formatter = new Intl.NumberFormat("en", {
  notation: "compact",
  maximumFractionDigits: 1,
});

const language = computed(() => data.value?.language ?? props.repo.language);

// language colors based on GitHub's language color palette
const LANG_COLORS = {
  Rust: "#dea584",
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572a5",
  Go: "#00add8",
  "C++": "#f34b7d",
  C: "#555555",
  Shell: "#89e051",
  Vue: "#41b883",
  HTML: "#e34c26",
  CSS: "#563d7c",
};

const langColor = computed(() => LANG_COLORS[language.value] ?? "#8b949e");
</script>

<template>
  <a
    :href="repo.url"
    target="_blank"
    rel="noopener"
    class="group flex h-full min-w-0 flex-col gap-3 overflow-hidden rounded-lg border border-ink-200 bg-white p-5 shadow-soft transition-colors hover:border-brand-500 dark:border-ink-800 dark:bg-ink-950"
  >
    <div class="flex min-w-0 items-start justify-between gap-3">
      <!-- header -->
      <div class="flex min-w-0 items-center gap-2">
        <Icon
          icon="octicon:repo-16"
          width="16"
          height="16"
          class="shrink-0 text-ink-500 dark:text-ink-400"
          aria-hidden="true"
        />
        <span class="truncate font-mono text-sm">
          <span class="text-ink-500 dark:text-ink-400">{{ owner }}/</span>
          <span
            class="font-semibold text-brand-700 group-hover:underline dark:text-brand-300"
            >{{ name }}</span
          >
        </span>
      </div>
      <!-- need to be public to get data lol -->
      <span
        class="shrink-0 rounded-full border border-ink-200 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-ink-500 dark:border-ink-700 dark:text-ink-400"
      >
        Public
      </span>
    </div>

    <p class="break-words text-sm text-ink-600 dark:text-ink-300">
      {{ repo.description }}
    </p>

    <!-- footer -->
    <div
      class="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1.5 pt-2 text-xs text-ink-500 dark:text-ink-400"
    >
      <span v-if="language" class="inline-flex items-center gap-1.5">
        <span
          class="block h-3 w-3 rounded-full ring-1 ring-inset ring-black/10 dark:ring-white/10"
          :style="{ backgroundColor: langColor }"
          aria-hidden="true"
        ></span>
        {{ language }}
      </span>

      <span
        class="inline-flex items-center gap-1"
        :title="`${data?.stars ?? 0} stargazers`"
      >
        <Icon
          icon="octicon:star-16"
          width="14"
          height="14"
          aria-hidden="true"
        />
        <span :class="{ 'opacity-50': loading }">
          {{ data ? formatter.format(data.stars) : "—" }}
        </span>
      </span>

      <span
        class="inline-flex items-center gap-1"
        :title="`${data?.forks ?? 0} forks`"
      >
        <Icon
          icon="octicon:repo-forked-16"
          width="14"
          height="14"
          aria-hidden="true"
        />
        <span :class="{ 'opacity-50': loading }">
          {{ data ? formatter.format(data.forks) : "—" }}
        </span>
      </span>

      <span
        v-if="data?.license"
        class="inline-flex items-center gap-1"
        :title="`License: ${data.license}`"
      >
        <Icon icon="octicon:law-16" width="14" height="14" aria-hidden="true" />
        {{ data.license }}
      </span>
    </div>
  </a>
</template>
