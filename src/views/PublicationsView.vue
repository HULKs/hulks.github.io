<script setup>
import { computed, ref } from "vue";
import { Icon } from "@iconify/vue";
import SectionHeading from "@/components/SectionHeading.vue";
import PublicationItem from "@/components/PublicationItem.vue";
import PdfPreviewModal from "@/components/PdfPreviewModal.vue";
import ContactCta from "@/components/ContactCta.vue";
import publications from "@/data/publications.json";
import { fadeUp, fadeUpStaggered } from "@/motion/presets";

const activeKind = ref("all");
const kinds = ["all", ...Object.keys(publications.theses.legend)];

const filteredTheses = computed(() =>
  activeKind.value === "all"
    ? publications.theses.items
    : publications.theses.items.filter(
        (theses) => theses.kind === activeKind.value,
      ),
);

const previewItem = ref(null);
const previewOpen = computed(() => previewItem.value !== null);

function isLocalUrl(url) {
  return !!url && !/^https?:\/\//i.test(url);
}

function openPreview(item) {
  if (!isLocalUrl(item?.url)) return;
  previewItem.value = item;
}
function closePreview() {
  previewItem.value = null;
}
</script>

<template>
  <section
    v-motion="fadeUp"
    class="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
  >
    <SectionHeading
      eyebrow="Research Output"
      title="Publications"
      description="Peer-reviewed papers, team research reports, posters, and student theses produced by our members."
    />
  </section>

  <section
    class="mx-auto w-full max-w-6xl space-y-14 px-4 pb-16 sm:px-6 sm:pb-24 lg:px-8"
  >
    <div
      v-for="cat in publications.categories"
      :key="cat.id"
      v-motion="fadeUp"
      class="space-y-5"
    >
      <div class="flex items-baseline justify-between">
        <h3 class="font-display text-2xl font-bold">{{ cat.label }}</h3>
        <span
          class="font-mono text-xs uppercase tracking-widest text-ink-500 dark:text-ink-400"
        >
          {{ cat.items.length }} entries
        </span>
      </div>
      <div class="grid gap-3">
        <PublicationItem
          v-for="(p, i) in cat.items"
          :key="p.title"
          v-motion="fadeUpStaggered(i, 60)"
          :item="p"
          @preview="openPreview"
        />
      </div>
    </div>

    <!-- Theses -->
    <div v-motion="fadeUp" class="space-y-5">
      <div class="flex flex-wrap items-baseline justify-between gap-4">
        <h3 class="font-display text-2xl font-bold">Theses</h3>
        <div class="flex flex-wrap gap-1.5">
          <button
            v-for="kind in kinds"
            :key="kind"
            type="button"
            class="rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-widest transition-colors"
            :class="
              activeKind === kind
                ? 'border-brand-500 bg-brand-500/10 text-brand-700 dark:text-brand-300'
                : 'border-ink-200 text-ink-600 hover:border-brand-500/60 dark:border-ink-800 dark:text-ink-300'
            "
            @click="activeKind = kind"
          >
            {{
              kind === "all"
                ? "All"
                : `${kind} · ${publications.theses.legend[kind]}`
            }}
          </button>
        </div>
      </div>

      <!-- Mobile: compact list -->
      <ul class="space-y-3 md:hidden">
        <li
          v-for="theses in filteredTheses"
          :key="'m-' + theses.title + theses.year"
          class="rounded-lg border border-ink-200 bg-white p-3 dark:border-ink-800 dark:bg-ink-900"
        >
          <div class="flex items-start justify-between gap-2">
            <span
              class="inline-flex items-center rounded-full border border-brand-500/40 bg-brand-500/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-brand-700 dark:text-brand-300"
            >
              {{ theses.kind }}
            </span>
            <span
              class="shrink-0 font-mono text-[11px] uppercase tracking-widest text-ink-500 dark:text-ink-400"
            >
              {{ theses.year }}
            </span>
          </div>
          <div class="mt-2 text-sm font-medium text-ink-900 dark:text-white">
            <button
              v-if="isLocalUrl(theses.url)"
              type="button"
              class="text-left transition-colors hover:text-brand-700 dark:hover:text-brand-300"
              @click="openPreview(theses)"
            >
              {{ theses.title }}
            </button>
            <span v-else>{{ theses.title }}</span>
          </div>
          <p
            v-if="theses.author"
            class="mt-0.5 text-xs text-ink-500 dark:text-ink-400"
          >
            {{ theses.author }}
          </p>
          <div
            v-if="theses.url"
            class="mt-3 flex flex-wrap items-center gap-1.5"
          >
            <template v-if="isLocalUrl(theses.url)">
              <button
                type="button"
                class="inline-flex items-center gap-1 rounded-md border border-ink-200 px-2 py-1 font-mono text-[11px] uppercase tracking-widest text-ink-600 transition-colors hover:border-brand-500 hover:text-brand-700 dark:border-ink-800 dark:text-ink-300 dark:hover:text-brand-300"
                :aria-label="`Preview PDF: ${theses.title}`"
                @click="openPreview(theses)"
              >
                <Icon icon="mdi:eye-outline" width="12" height="12" />
                Preview
              </button>
              <a
                :href="theses.url"
                download
                class="inline-flex items-center gap-1 rounded-md border border-ink-200 px-2 py-1 font-mono text-[11px] uppercase tracking-widest text-ink-600 transition-colors hover:border-brand-500 hover:text-brand-700 dark:border-ink-800 dark:text-ink-300 dark:hover:text-brand-300"
                :aria-label="`Download PDF: ${theses.title}`"
              >
                <Icon icon="mdi:download" width="12" height="12" />
                Download
              </a>
            </template>
            <a
              v-else
              :href="theses.url"
              target="_blank"
              rel="noopener"
              class="inline-flex items-center gap-1 rounded-md border border-ink-200 px-2 py-1 font-mono text-[11px] uppercase tracking-widest text-ink-600 transition-colors hover:border-brand-500 hover:text-brand-700 dark:border-ink-800 dark:text-ink-300 dark:hover:text-brand-300"
              :aria-label="`Open PDF: ${theses.title}`"
            >
              <Icon icon="mdi:open-in-new" width="12" height="12" />
              PDF
            </a>
          </div>
        </li>
      </ul>

      <!-- Desktop: full table -->
      <div
        class="hidden overflow-hidden rounded-xl border border-ink-200 md:block dark:border-ink-800"
      >
        <table class="w-full text-left text-sm">
          <thead
            class="bg-ink-50 text-xs uppercase tracking-widest text-ink-500 dark:bg-ink-900 dark:text-ink-400"
          >
            <tr>
              <th class="w-16 px-3 py-2.5 font-mono sm:px-4 sm:py-3">Kind</th>
              <th class="px-3 py-2.5 font-mono sm:px-4 sm:py-3">Title</th>
              <th
                class="hidden px-3 py-2.5 font-mono sm:px-4 sm:py-3 md:table-cell"
              >
                Author
              </th>
              <th class="w-20 px-3 py-2.5 text-right font-mono sm:px-4 sm:py-3">
                Year
              </th>
              <th class="w-28 px-3 py-2.5 text-right font-mono sm:px-4 sm:py-3">
                PDF
              </th>
            </tr>
          </thead>
          <tbody
            class="divide-y divide-ink-100 bg-white dark:divide-ink-800 dark:bg-ink-950"
          >
            <tr
              v-for="theses in filteredTheses"
              :key="theses.title + theses.year"
              class="align-top"
            >
              <td class="px-3 py-2.5 sm:px-4 sm:py-3">
                <span
                  class="inline-flex items-center rounded-full border border-brand-500/40 bg-brand-500/10 px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-wider text-brand-700 dark:text-brand-300"
                >
                  {{ theses.kind }}
                </span>
              </td>
              <td class="px-3 py-2.5 sm:px-4 sm:py-3">
                <div class="font-medium text-ink-900 dark:text-white">
                  <button
                    v-if="isLocalUrl(theses.url)"
                    type="button"
                    class="text-left transition-colors hover:text-brand-700 dark:hover:text-brand-300"
                    @click="openPreview(theses)"
                  >
                    {{ theses.title }}
                  </button>
                  <span v-else>{{ theses.title }}</span>
                </div>
                <div
                  class="mt-0.5 text-xs text-ink-500 dark:text-ink-400 md:hidden"
                >
                  {{ theses.author }}
                </div>
              </td>
              <td
                class="hidden px-3 py-2.5 text-ink-600 dark:text-ink-300 sm:px-4 sm:py-3 md:table-cell"
              >
                {{ theses.author }}
              </td>
              <td
                class="px-3 py-2.5 text-right font-mono text-ink-500 dark:text-ink-400 sm:px-4 sm:py-3"
              >
                {{ theses.year }}
              </td>
              <td class="px-3 py-2.5 text-right sm:px-4 sm:py-3">
                <div
                  v-if="isLocalUrl(theses.url)"
                  class="inline-flex items-center gap-1"
                >
                  <button
                    type="button"
                    class="inline-flex items-center gap-1 rounded-md border border-ink-200 px-2 py-1 font-mono text-[11px] uppercase tracking-widest text-ink-600 transition-colors hover:border-brand-500 hover:text-brand-700 dark:border-ink-800 dark:text-ink-300 dark:hover:text-brand-300"
                    :aria-label="`Preview PDF: ${theses.title}`"
                    @click="openPreview(theses)"
                  >
                    <Icon icon="mdi:eye-outline" width="12" height="12" />
                  </button>
                  <a
                    :href="theses.url"
                    download
                    class="inline-flex items-center gap-1 rounded-md border border-ink-200 px-2 py-1 font-mono text-[11px] uppercase tracking-widest text-ink-600 transition-colors hover:border-brand-500 hover:text-brand-700 dark:border-ink-800 dark:text-ink-300 dark:hover:text-brand-300"
                    :aria-label="`Download PDF: ${theses.title}`"
                  >
                    <Icon icon="mdi:download" width="12" height="12" />
                  </a>
                </div>
                <a
                  v-else-if="theses.url"
                  :href="theses.url"
                  target="_blank"
                  rel="noopener"
                  :aria-label="`Open PDF: ${theses.title}`"
                  class="inline-flex items-center gap-1 rounded-md border border-ink-200 px-2 py-1 font-mono text-[11px] uppercase tracking-widest text-ink-600 transition-colors hover:border-brand-500 hover:text-brand-700 dark:border-ink-800 dark:text-ink-300 dark:hover:text-brand-300"
                >
                  PDF
                  <Icon icon="mdi:open-in-new" width="12" height="12" />
                </a>
                <span
                  v-else
                  class="font-mono text-[11px] text-ink-400 dark:text-ink-600"
                >
                  —
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="font-mono text-xs text-ink-500 dark:text-ink-400">
        <span
          v-for="(label, key) in publications.theses.legend"
          :key="key"
          class="mr-4"
        >
          <strong class="text-ink-700 dark:text-ink-200">{{ key }}</strong> —
          {{ label }}
        </span>
      </p>
    </div>

    <!-- contact us -->
    <ContactCta
      title="Looking for a thesis topic?"
      description="If you are interested in writing a thesis in the context of our project, write an e-mail (in English or German). We supervise topics across the full research stack of humanoid robotics."
    />
  </section>

  <PdfPreviewModal
    :open="previewOpen"
    :url="previewItem?.url ?? ''"
    :download-url="previewItem?.url ?? ''"
    :title="previewItem?.title ?? ''"
    @close="closePreview"
  />
</template>
