<script setup>
import { RouterLink } from "vue-router";
import { Icon } from "@iconify/vue";
import site from "@/data/site.json";
import { enterUp, enterUpStaggered } from "@/motion/presets";

// scroll to next section on click
function scrollNext() {
  window.scrollTo({
    top: window.innerHeight,
    behavior: "smooth",
  });
}
</script>

<template>
  <section
    class="relative flex min-h-[calc(100vh_-_4rem)] w-full flex-col overflow-hidden border-b border-ink-200 dark:border-ink-800"
  >
    <!-- Decorative background -->
    <div
      class="absolute inset-0 bg-grid-light bg-grid dark:bg-grid-dark"
      aria-hidden="true"
    ></div>

    <div
      class="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-4 pb-16 pt-12 sm:px-6 sm:pb-24 sm:pt-16 lg:gap-10 lg:px-8 lg:pt-20"
    >
      <div class="grid gap-8 lg:grid-cols-12 lg:items-end">
        <div class="lg:col-span-8 space-y-5">
          <!-- top left -->
          <div v-motion="enterUp(0)" class="flex items-center gap-4">
            <div
              class="inline-flex h-12 w-12 items-center justify-center sm:h-14 sm:w-14 lg:h-16 lg:w-16 [filter:drop-shadow(1px_0_0_#000)_drop-shadow(-1px_0_0_#000)_drop-shadow(0_1px_0_#000)_drop-shadow(0_-1px_0_#000)] dark:[filter:drop-shadow(0_6px_20px_rgba(15,174,74,0.35))]"
            >
              <img
                src="/bighulk.png"
                alt="HULKs logo"
                class="h-[90%] w-[90%] object-contain"
              />
            </div>
            <div class="flex flex-col leading-tight">
              <span
                class="font-display text-2xl font-bold tracking-tight text-ink-900 dark:text-white sm:text-3xl lg:text-6xl"
                >HULKs</span
              >
              <span
                class="inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.18em] text-brand-700 dark:text-brand-300 before:block before:h-px before:w-8 before:bg-brand-500 before:content-['']"
              >
                RoboCup HSL Team
              </span>
            </div>
          </div>

          <!-- main heading -->
          <h1
            v-motion="enterUp(150)"
            class="font-display text-3xl font-bold leading-[1.1] tracking-tight text-ink-900 dark:text-white sm:text-5xl sm:leading-[1.05] lg:text-6xl"
          >
            Programming autonomous humanoid robots
            <span class="text-brand-600 dark:text-brand-400">at TUHH.</span>
          </h1>
        </div>

        <!-- right description -->
        <div class="lg:col-span-4 space-y-5 lg:pb-2">
          <p
            v-motion="enterUp(300)"
            class="text-base text-ink-600 dark:text-ink-300"
          >
            {{ site.description }}
          </p>
          <div
            v-motion="enterUp(420)"
            class="flex flex-wrap items-center gap-3"
          >
            <RouterLink
              to="/code"
              class="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-700 dark:bg-brand-500 dark:text-ink-950 dark:hover:bg-brand-400"
            >
              Explore the code
              <Icon icon="mdi:arrow-right" width="16" height="16" />
            </RouterLink>
            <RouterLink
              to="/team"
              class="inline-flex items-center gap-2 rounded-lg border border-ink-200 px-4 py-2 text-sm font-medium text-ink-800 transition-colors hover:border-brand-500 hover:text-brand-700 dark:border-ink-700 dark:text-ink-100 dark:hover:border-brand-400 dark:hover:text-brand-300"
              >Meet the team</RouterLink
            >
          </div>
        </div>
      </div>

      <!-- hero image -->
      <figure
        v-motion="enterUp(550)"
        class="group relative min-h-[280px] flex-1 overflow-hidden rounded-2xl border border-ink-200 bg-ink-900 shadow-soft dark:border-ink-800"
      >
        <img
          :src="site.hero.image"
          :alt="site.hero.alt"
          class="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.02]"
          loading="eager"
          fetchpriority="high"
        />

        <div
          class="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/50 to-transparent"
          aria-hidden="true"
        ></div>
        <div
          class="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-black/75 via-black/25 to-transparent"
          aria-hidden="true"
        ></div>

        <figcaption
          v-motion="enterUp(750)"
          class="absolute left-5 top-5 flex items-center gap-2 text-white sm:left-6 sm:top-6"
        >
          <span
            class="font-mono text-[10px] uppercase tracking-[0.22em] text-white/85 sm:text-xs"
          >
            {{ site.hero.caption }}
          </span>
        </figcaption>

        <div
          class="absolute inset-x-0 bottom-0 flex justify-end p-3 sm:p-6 lg:p-8"
        >
          <dl class="grid grid-cols-2 gap-2 text-white sm:grid-cols-4 sm:gap-3">
            <div
              v-for="(stat, i) in site.stats"
              :key="stat.label"
              v-motion="enterUpStaggered(i, 90, 850)"
              class="rounded-lg border border-white/15 bg-white/10 p-2.5 backdrop-blur-md sm:p-3"
            >
              <dt
                class="font-mono text-[10px] uppercase tracking-widest text-white/70"
              >
                {{ stat.label }}
              </dt>
              <dd class="mt-1 font-display text-base font-bold sm:text-lg">
                {{ stat.value }}
              </dd>
            </div>
          </dl>
        </div>
      </figure>
    </div>

    <!-- scroll down button -->
    <button
      v-motion="enterUp(1300)"
      type="button"
      class="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-ink-500 transition-colors hover:text-brand-600 sm:flex dark:text-ink-400 dark:hover:text-brand-400"
      aria-label="Scroll to content"
      @click="scrollNext"
    >
      <span class="font-mono text-[10px] uppercase tracking-[0.22em]"
        >Scroll</span
      >
      <span
        class="flex h-10 w-6 justify-center rounded-full border border-current pt-1.5"
      >
        <span
          class="block h-2 w-1 animate-bounce rounded-full bg-current"
        ></span>
      </span>
    </button>
  </section>
</template>
