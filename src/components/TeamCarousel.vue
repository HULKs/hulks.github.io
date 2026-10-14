<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref } from "vue";
import { Icon } from "@iconify/vue";

const props = defineProps({
  members: { type: Array, required: true },
  autoplay: { type: Boolean, default: true },
  intervalMs: { type: Number, default: 4000 },
});

const track = ref(null); // ref to track element
const canPrev = ref(false); // is previous button enabled
const canNext = ref(false); // is next button enabled
let timer = null;

// check if the track can scroll left or right and update the button states
function updateButtons() {
  const el = track.value;
  if (!el) return;
  canPrev.value = el.scrollLeft > 4;
  canNext.value = el.scrollLeft + el.clientWidth < el.scrollWidth - 4;
}

// scroll track by one card width the given direction (-1 left, 1 right)
function scrollByCard(direction) {
  const el = track.value;
  if (!el) return;
  const card = el.querySelector("[data-carousel-item]");
  const step = card
    ? card.getBoundingClientRect().width + 24
    : el.clientWidth * 0.8;
  el.scrollBy({ left: direction * step, behavior: "smooth" });
}

// increment carousel by one card, or reset to start if at end
function advance() {
  const el = track.value;
  if (!el) return;
  if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 4) {
    el.scrollTo({ left: 0, behavior: "smooth" });
  } else {
    scrollByCard(1);
  }
}

// timer for auto rotate
function startTimer() {
  if (!props.autoplay || timer) return;
  timer = setInterval(advance, props.intervalMs);
}

// stop auto rotate timer when user interacts with carousel
function stopTimer() {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
}

onMounted(async () => {
  await nextTick();
  updateButtons(); // init button states
  track.value?.addEventListener("scroll", updateButtons, { passive: true }); // event listener for update button states on scroll
  window.addEventListener("resize", updateButtons); // event listener for update button states on resize
  startTimer(); // start auto rotate timer
});

onUnmounted(() => {
  track.value?.removeEventListener("scroll", updateButtons); // cleanup event listener
  window.removeEventListener("resize", updateButtons); // cleanup event listener
  stopTimer(); // cleanup timer
});

const items = computed(() => props.members);
</script>

<template>
  <div
    class="relative"
    @mouseenter="stopTimer"
    @mouseleave="startTimer"
    @focusin="stopTimer"
    @focusout="startTimer"
  >
    <div
      ref="track"
      class="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-2 pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
    >
      <article
        v-for="member in items"
        :key="member.name"
        data-carousel-item
        class="group flex w-[85%] shrink-0 snap-start flex-col overflow-hidden rounded-xl border border-ink-200 bg-white shadow-soft transition-colors hover:border-brand-500/50 hover:shadow-lg sm:w-[55%] md:w-[42%] lg:w-[30%] dark:border-ink-800 dark:bg-ink-900"
      >
        <!-- Portrait -->
        <div
          class="relative aspect-[4/3] w-full overflow-hidden bg-brand-100 dark:bg-ink-800"
        >
          <img
            v-if="member.avatar"
            :src="member.avatar"
            :alt="member.name"
            loading="lazy"
            class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04] rounded-t-lg"
            onerror="this.style.display = 'none'"
          />

          <!-- role badge overlay if member has role -->
          <div
            class="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 to-transparent"
            aria-hidden="true"
          ></div>
          <span
            v-if="member.role"
            class="absolute left-3 top-3 rounded-full bg-brand-600/90 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-white shadow-soft"
          >
            {{ member.role }}
          </span>
        </div>

        <!-- bottom info block -->
        <div class="flex flex-1 flex-col gap-1.5 p-4">
          <h3
            class="font-display text-base font-semibold text-ink-900 dark:text-white"
          >
            {{ member.name }}
          </h3>
          <p v-if="member.study" class="text-xs text-ink-500 dark:text-ink-400">
            {{ member.study }}
          </p>

          <div
            class="mt-auto flex flex-wrap items-center gap-3 pt-2 text-xs text-ink-500 dark:text-ink-400"
          >
            <a
              v-if="member.github"
              :href="`https://github.com/${member.github}`"
              target="_blank"
              rel="noopener"
              class="inline-flex items-center gap-1.5 hover:text-brand-700 dark:hover:text-brand-300"
            >
              <Icon
                icon="mdi:github"
                width="14"
                height="14"
                aria-hidden="true"
              />
              {{ member.github }}
            </a>
            <a
              v-if="member.email"
              :href="`mailto:${member.email}`"
              class="inline-flex items-center gap-1.5 hover:text-brand-700 dark:hover:text-brand-300"
            >
              <Icon
                icon="mdi:email-outline"
                width="14"
                height="14"
                aria-hidden="true"
              />
              Email
            </a>
          </div>
        </div>
      </article>
    </div>

    <!-- scroll left button -->
    <button
      type="button"
      class="absolute left-2 top-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full border border-ink-200 bg-white/90 text-ink-700 shadow-soft backdrop-blur transition hover:border-brand-500 hover:text-brand-700 disabled:pointer-events-none disabled:opacity-0 dark:border-ink-700 dark:bg-ink-900/80 dark:text-ink-200 dark:hover:text-brand-300"
      aria-label="Previous team members"
      :disabled="!canPrev"
      @click="scrollByCard(-1)"
    >
      <Icon icon="mdi:chevron-left" width="18" height="18" />
    </button>

    <!-- scroll right button -->
    <button
      type="button"
      class="absolute right-2 top-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full border border-ink-200 bg-white/90 text-ink-700 shadow-soft backdrop-blur transition hover:border-brand-500 hover:text-brand-700 disabled:pointer-events-none disabled:opacity-0 dark:border-ink-700 dark:bg-ink-900/80 dark:text-ink-200 dark:hover:text-brand-300"
      aria-label="Next team members"
      :disabled="!canNext"
      @click="scrollByCard(1)"
    >
      <Icon icon="mdi:chevron-right" width="18" height="18" />
    </button>
  </div>
</template>
