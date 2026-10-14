<script setup>
import { RouterLink } from "vue-router";
import { Icon } from "@iconify/vue";
import site from "@/data/site.json";

// get current year
const year = new Date().getFullYear();

// map social media icons
const socialIcons = {
  GitHub: "mdi:github",
  Instagram: "mdi:instagram",
  LinkedIn: "mdi:linkedin",
  Twitter: "mdi:twitter",
  X: "simple-icons:x",
  YouTube: "mdi:youtube",
  Mastodon: "mdi:mastodon",
  Discord: "mdi:discord",
};

// get social media icon for given name
function iconFor(name) {
  return socialIcons[name] || "mdi:web";
}
</script>

<template>
  <footer
    class="border-t border-ink-200 bg-ink-50 dark:border-ink-800 dark:bg-ink-950"
  >
    <div
      class="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 sm:px-6 sm:py-14 md:grid-cols-4 md:gap-6 lg:px-8"
    >
      <!-- left section -->
      <div class="md:col-span-2 space-y-3">
        <div class="flex items-center gap-3">
          <img
            src="/bighulk.png"
            alt="HULKs logo"
            class="h-9 w-9 rounded-lg object-contain"
          />
          <span class="font-display text-lg font-bold">HULKs</span>
        </div>
        <p class="max-w-md text-sm text-ink-600 dark:text-ink-400">
          {{ site.description }}
        </p>
        <p class="font-mono text-xs text-ink-500 dark:text-ink-500">
          {{ site.location.lab }} · {{ site.location.city }},
          {{ site.location.country }}
        </p>
      </div>

      <!-- middle section -->
      <div>
        <h4
          class="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-ink-500 dark:text-ink-400"
        >
          Navigate
        </h4>
        <ul class="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
          <li v-for="item in site.nav" :key="item.to">
            <RouterLink
              :to="item.to"
              class="text-ink-700 transition-colors hover:text-brand-700 dark:text-ink-300 dark:hover:text-brand-300"
            >
              {{ item.name }}
            </RouterLink>
          </li>
        </ul>
      </div>

      <!-- right section -->
      <div>
        <h4
          class="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-ink-500 dark:text-ink-400"
        >
          Contact & Social
        </h4>
        <ul class="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
          <li class="min-w-0">
            <a
              class="inline-flex max-w-full items-center gap-2 text-brand-700 underline-offset-4 hover:underline dark:text-brand-300"
              :href="`mailto:${site.contact.email}`"
              :title="site.contact.email"
            >
              <Icon icon="mdi:email-outline" class="h-4 w-4 shrink-0" />
              <span class="truncate">{{ site.contact.email }}</span>
            </a>
          </li>
          <li v-for="social in site.socials" :key="social.name" class="min-w-0">
            <a
              class="inline-flex max-w-full items-center gap-2 text-brand-700 underline-offset-4 hover:underline dark:text-brand-300"
              :href="social.url"
              target="_blank"
              rel="noopener"
              :title="`${social.name} · ${social.handle}`"
            >
              <Icon :icon="iconFor(social.name)" class="h-4 w-4 shrink-0" />
              <span class="truncate">{{ social.handle }}</span>
            </a>
          </li>
        </ul>
      </div>
    </div>

    <div class="border-t border-ink-200 dark:border-ink-800">
      <div
        class="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-2 px-4 py-6 text-xs text-ink-500 dark:text-ink-500 sm:px-6 md:flex-row md:items-center lg:px-8"
      >
        <span class="font-mono"
          >© {{ year }} HULKs · {{ site.university }}</span
        >
        <div class="flex items-center gap-4 font-mono">
          <RouterLink
            class="hover:text-brand-700 dark:hover:text-brand-300"
            to="/imprint"
            >Imprint</RouterLink
          >
        </div>
      </div>
      <div
        class="mx-auto w-full max-w-6xl px-4 pb-6 text-center font-mono text-xs text-ink-500 dark:text-ink-500 sm:px-6 lg:px-8"
      >
        created with ❤️ by
        <a
          class="hover:text-brand-700 dark:hover:text-brand-300"
          href="https://soerenpriess.de/"
          target="_blank"
          rel="noopener"
          >Sören</a
        >
      </div>
    </div>
  </footer>
</template>
