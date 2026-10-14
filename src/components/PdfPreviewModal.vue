<script setup>
import { computed, onBeforeUnmount, ref, watch } from "vue";
import { Icon } from "@iconify/vue";

const props = defineProps({
  open: { type: Boolean, default: false }, // preview modal open state
  url: { type: String, default: "" }, // url for iframe src
  title: { type: String, default: "" },
  downloadUrl: { type: String, default: "" },
});

const emit = defineEmits(["close"]);

const loaded = ref(false);

// url for iframe src
const displayUrl = computed(() =>
  props.url ? `${props.url}#toolbar=1&view=FitH` : "",
);

// url for download link
const download = computed(() => props.downloadUrl || props.url);

let previousOverflow = "";
// lock and unlock scroll when modal is open
function lockScroll() {
  previousOverflow = document.body.style.overflow;
  document.body.style.overflow = "hidden";
}
function unlockScroll() {
  document.body.style.overflow = previousOverflow;
}

// close preview modal on esc
function onKey(e) {
  if (e.key === "Escape") emit("close");
}

// watch for open prop changes to lock/unlock scroll and add/remove keydown listener
watch(
  () => props.open,
  (isOpen) => {
    loaded.value = false;
    if (isOpen) {
      lockScroll();
      window.addEventListener("keydown", onKey);
    } else {
      unlockScroll();
      window.removeEventListener("keydown", onKey);
    }
  },
);

onBeforeUnmount(() => {
  unlockScroll();
  window.removeEventListener("keydown", onKey);
});
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-200"
      leave-active-class="transition-opacity duration-150"
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
    >
      <div
        v-if="open"
        class="fixed inset-0 z-[100] flex flex-col bg-ink-950/80 backdrop-blur-sm"
        role="dialog"
        aria-modal="true"
        :aria-label="title || 'PDF preview'"
        @click.self="$emit('close')"
      >
        <!-- Toolbar -->
        <div
          class="flex flex-wrap items-center gap-3 border-b border-ink-800 bg-ink-950/90 px-4 py-3 text-ink-100 sm:px-6"
        >
          <div class="min-w-0 flex-1">
            <p
              class="font-mono text-[10px] uppercase tracking-widest text-ink-400"
            >
              PDF Preview
            </p>
            <h2
              class="truncate font-display text-sm font-semibold sm:text-base"
            >
              {{ title || "Document" }}
            </h2>
          </div>

          <div class="flex items-center gap-2">
            <a
              v-if="download"
              :href="download"
              target="_blank"
              rel="noopener"
              class="inline-flex items-center gap-2 rounded-lg border border-ink-700 px-3 py-1.5 text-xs font-medium text-ink-100 transition-colors hover:border-brand-500 hover:text-brand-300"
              :aria-label="`Open in new tab: ${title}`"
            >
              Open in new tab
              <Icon icon="mdi:open-in-new" width="12" height="12" />
            </a>
            <a
              v-if="download"
              :href="download"
              download
              class="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-brand-700 dark:bg-brand-500 dark:text-ink-950 dark:hover:bg-brand-400"
              :aria-label="`Download PDF: ${title}`"
            >
              Download
              <Icon icon="mdi:download" width="12" height="12" />
            </a>
            <button
              type="button"
              class="inline-flex h-8 w-8 items-center justify-center rounded-md border border-ink-700 text-ink-100 transition-colors hover:border-brand-400 hover:text-brand-300"
              aria-label="Close preview"
              @click="$emit('close')"
            >
              <Icon icon="mdi:close" width="14" height="14" />
            </button>
          </div>
        </div>

        <!-- Viewer -->
        <div class="relative flex-1 bg-ink-900">
          <div
            v-if="!loaded"
            class="pointer-events-none absolute inset-0 flex items-center justify-center text-ink-400"
          >
            <div
              class="flex items-center gap-3 font-mono text-xs uppercase tracking-widest"
            >
              <span
                class="inline-block h-3 w-3 animate-pulse rounded-full bg-brand-500"
              />
              Loading document…
            </div>
          </div>
          <iframe
            v-if="open && displayUrl"
            :src="displayUrl"
            :title="title || 'PDF preview'"
            class="h-full w-full border-0 bg-white"
            @load="loaded = true"
          />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
