<script setup>
import { computed } from "vue";
import { Icon } from "@iconify/vue";

const props = defineProps({
  item: { type: Object, required: true },
});
const emit = defineEmits(["preview"]);

// check if publication item is local pdf
const isLocal = computed(
  () => !!props.item.url && !/^https?:\/\//i.test(props.item.url),
);

// open preview for local pdf
function openPreview() {
  if (isLocal.value) emit("preview", props.item);
}
</script>

<template>
  <article
    class="group relative rounded-lg border border-ink-200 bg-white p-5 transition-colors hover:border-brand-500/60 dark:border-ink-800 dark:bg-ink-900"
  >
    <div
      class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4"
    >
      <div class="min-w-0 space-y-1.5">
        <!-- header -->
        <div class="flex flex-wrap items-start gap-2">
          <h3
            class="font-display text-base font-semibold leading-snug text-ink-900 dark:text-white"
          >
            <button
              v-if="isLocal"
              type="button"
              class="text-left transition-colors hover:text-brand-700 dark:hover:text-brand-300"
              @click="openPreview"
            >
              {{ item.title }}
            </button>
            <span v-else>{{ item.title }}</span>
          </h3>

          <!-- year badge (inline with title on mobile) -->
          <span
            v-if="item.year"
            class="inline-flex shrink-0 items-center rounded-full border border-ink-200 bg-ink-50 px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-wider text-ink-600 sm:hidden dark:border-ink-700 dark:bg-ink-800 dark:text-ink-300"
            >{{ item.year }}</span
          >
        </div>

        <!-- authors -->
        <p class="text-sm text-ink-600 dark:text-ink-300">
          {{ item.authors.join(", ") }}
        </p>

        <!-- note -->
        <p
          v-if="item.note"
          class="font-mono text-[11px] uppercase tracking-widest text-ink-500 dark:text-ink-400"
        >
          {{ item.note }}
        </p>
      </div>

      <!-- actions -->
      <div class="flex flex-wrap items-center gap-2 sm:shrink-0">
        <!-- year badge (hidden on mobile) -->
        <span
          v-if="item.year"
          class="hidden items-center rounded-full border border-ink-200 bg-ink-50 px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-wider text-ink-600 sm:inline-flex dark:border-ink-700 dark:bg-ink-800 dark:text-ink-300"
          >{{ item.year }}</span
        >

        <!-- preview button if local file-->
        <template v-if="isLocal">
          <button
            type="button"
            class="inline-flex items-center gap-2 rounded-lg border border-ink-200 px-3 py-1.5 text-xs font-medium text-ink-800 transition-colors hover:border-brand-500 hover:text-brand-700 dark:border-ink-700 dark:text-ink-100 dark:hover:border-brand-400 dark:hover:text-brand-300"
            :aria-label="`Preview PDF: ${item.title}`"
            @click="openPreview"
          >
            Preview
            <Icon icon="mdi:eye-outline" width="12" height="12" />
          </button>

          <!-- download button -->
          <a
            :href="item.url"
            download
            class="inline-flex h-8 w-8 items-center justify-center rounded-md border border-ink-200 text-ink-600 transition-colors hover:border-brand-500 hover:text-brand-700 dark:border-ink-800 dark:text-ink-300 dark:hover:text-brand-300"
            :aria-label="`Download PDF: ${item.title}`"
            :title="`Download ${item.title}`"
          >
            <Icon icon="mdi:download" width="12" height="12" />
          </a>
        </template>

        <!-- external link if available -->
        <a
          v-else-if="item.url"
          :href="item.url"
          target="_blank"
          rel="noopener"
          class="inline-flex items-center gap-2 rounded-lg border border-ink-200 px-3 py-1.5 text-xs font-medium text-ink-800 transition-colors hover:border-brand-500 hover:text-brand-700 dark:border-ink-700 dark:text-ink-100 dark:hover:border-brand-400 dark:hover:text-brand-300"
          :aria-label="`Open PDF: ${item.title}`"
        >
          PDF
          <Icon icon="mdi:open-in-new" width="12" height="12" />
        </a>
      </div>
    </div>
  </article>
</template>
