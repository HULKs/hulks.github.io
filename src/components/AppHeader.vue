<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";
import { Icon } from "@iconify/vue";
import ThemeToggle from "@/components/ThemeToggle.vue";
import site from "@/data/site.json";

// state for mobile menu
const open = ref(false);
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-40 border-b border-ink-200/70 bg-white/80 backdrop-blur-md dark:border-ink-800/70 dark:bg-ink-950/70"
  >
    <div
      class="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:gap-6 sm:px-6 lg:px-8"
    >
      <!-- left section -->
      <RouterLink
        to="/"
        class="flex items-center gap-3 group"
        @click="open = false"
      >
        <img
          src="/bighulk.png"
          alt="HULKs logo"
          class="h-9 w-9 rounded-lg object-contain shadow-soft transition-transform group-hover:-rotate-3"
        />
        <span class="flex flex-col leading-tight">
          <span class="font-display text-lg font-bold tracking-tight"
            >HULKs</span
          >
          <span
            class="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-500 dark:text-ink-400"
          >
            TUHH · Robotics
          </span>
        </span>
      </RouterLink>

      <!-- middle section -->
      <nav class="hidden items-center gap-1 lg:flex">
        <RouterLink
          v-for="item in site.nav"
          :key="item.to"
          :to="item.to"
          class="rounded-md px-3 py-2 text-sm font-medium text-ink-600 transition-colors hover:text-ink-900 dark:text-ink-300 dark:hover:text-white"
          active-class="!text-brand-700 dark:!text-brand-300"
        >
          {{ item.name }}
        </RouterLink>
      </nav>

      <!-- right section -->
      <div class="flex items-center gap-2">
        <ThemeToggle />

        <!-- mobile menu toggle button -->
        <button
          type="button"
          class="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-md border border-ink-200 text-ink-700 hover:border-brand-500 dark:border-ink-700 dark:text-ink-200"
          :aria-expanded="open"
          aria-label="Toggle navigation"
          @click="open = !open"
        >
          <Icon
            :icon="open ? 'mdi:close' : 'mdi:menu'"
            width="18"
            height="18"
          />
        </button>
      </div>
    </div>

    <!-- mobile menu -->
    <div
      v-if="open"
      class="border-t border-ink-200 bg-white lg:hidden dark:border-ink-800 dark:bg-ink-950"
    >
      <nav
        class="mx-auto flex w-full max-w-6xl flex-col px-4 py-3 sm:px-6 lg:px-8"
      >
        <RouterLink
          v-for="item in site.nav"
          :key="item.to"
          :to="item.to"
          class="rounded-md px-3 py-2.5 text-sm font-medium text-ink-700 hover:bg-ink-100 dark:text-ink-200 dark:hover:bg-ink-800"
          active-class="!text-brand-700 dark:!text-brand-300"
          @click="open = false"
        >
          {{ item.name }}
        </RouterLink>
      </nav>
    </div>
  </header>
</template>
