<script setup>
import { computed, ref } from "vue";
import { Icon } from "@iconify/vue";

const props = defineProps({
  youtubeId: { type: String, required: true },
  title: { type: String, default: "YouTube video" },
});

const activated = ref(false);

// preload the thumbnail image for better performance
const thumbnail = computed(
  () => `https://i.ytimg.com/vi/${props.youtubeId}/hqdefault.jpg`,
);

// url for the iframe
const embedUrl = computed(
  () =>
    `https://www.youtube-nocookie.com/embed/${props.youtubeId}?autoplay=1&rel=0`,
);

// url for the watch page
const watchUrl = computed(
  () => `https://www.youtube.com/watch?v=${props.youtubeId}`,
);
</script>

<template>
  <div
    class="relative aspect-video w-full overflow-hidden rounded-2xl border border-ink-200 bg-ink-900 shadow-soft dark:border-ink-800"
  >
    <iframe
      v-if="activated"
      class="absolute inset-0 h-full w-full"
      :src="embedUrl"
      :title="title"
      loading="lazy"
      referrerpolicy="strict-origin-when-cross-origin"
      allow="
        accelerometer;
        autoplay;
        clipboard-write;
        encrypted-media;
        gyroscope;
        picture-in-picture;
        web-share;
      "
      allowfullscreen
    ></iframe>
    <button
      v-else
      type="button"
      class="group absolute inset-0 h-full w-full"
      :aria-label="`Play video: ${title}`"
      @click="activated = true"
    >
      <img
        :src="thumbnail"
        :alt="title"
        loading="lazy"
        class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
      />
      <span
        class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/40"
        aria-hidden="true"
      ></span>
      <span
        class="absolute left-1/2 top-1/2 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-brand-600 text-white shadow-soft transition-transform duration-300 group-hover:scale-110"
        aria-hidden="true"
      >
        <Icon icon="mdi:play" width="28" height="28" />
      </span>
      <span
        class="absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-[0.22em] text-white/80"
      >
        Play · YouTube
      </span>
    </button>
    <a
      v-if="!activated"
      :href="watchUrl"
      target="_blank"
      rel="noopener"
      class="absolute bottom-4 right-4 font-mono text-[10px] uppercase tracking-[0.22em] text-white/80 hover:text-white"
    >
      Open on YouTube ↗
    </a>
  </div>
</template>
