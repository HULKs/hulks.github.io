<script setup>
import { Icon } from "@iconify/vue";

defineProps({
  member: { type: Object, required: true },
});
</script>

<template>
  <article
    class="flex flex-col items-start gap-4 rounded-xl border border-ink-200 bg-white p-6 shadow-soft transition-colors hover:border-brand-500/50 hover:shadow-lg dark:border-ink-800 dark:bg-ink-900"
  >
    <div class="flex w-full items-start gap-4">
      <div
        class="relative h-20 w-20 shrink-0 overflow-hidden rounded-full bg-ink-100 ring-1 ring-ink-200 dark:bg-ink-800 dark:ring-ink-700"
      >
        <img
          v-if="member.avatar"
          :src="member.avatar"
          :alt="member.name"
          loading="lazy"
          class="h-full w-full object-cover"
          onerror="this.style.visibility = 'hidden'"
        />
        <Icon
          v-else
          icon="mdi:account"
          class="h-full w-full text-ink-300 dark:text-ink-600"
          aria-hidden="true"
        />
      </div>
      <div class="min-w-0 flex-1">
        <h3
          class="font-display text-base font-semibold text-ink-900 break-words dark:text-white"
        >
          {{ member.name }}
        </h3>
        <p
          v-if="member.role"
          class="text-xs font-medium text-brand-700 break-words dark:text-brand-300"
        >
          {{ member.role }}
        </p>
        <p
          v-if="member.study"
          class="mt-0.5 text-xs text-ink-500 break-words dark:text-ink-400"
        >
          {{ member.study }}
        </p>
      </div>
    </div>

    <div
      class="flex flex-wrap items-center gap-3 text-xs text-ink-500 dark:text-ink-400"
    >
      <a
        v-if="member.github"
        :href="`https://github.com/${member.github}`"
        target="_blank"
        rel="noopener"
        class="inline-flex items-center gap-1 hover:text-brand-700 dark:hover:text-brand-300"
      >
        <Icon icon="mdi:github" width="14" height="14" aria-hidden="true" />
        {{ member.github }}
      </a>
      <a
        v-if="member.email"
        :href="`mailto:${member.email}`"
        class="inline-flex items-center gap-1 hover:text-brand-700 dark:hover:text-brand-300"
      >
        <Icon
          icon="mdi:email-outline"
          width="14"
          height="14"
          aria-hidden="true"
        />
        email
      </a>
      <a
        v-if="member.phone"
        :href="`tel:${member.phone.replace(/\s+/g, '')}`"
        class="inline-flex items-center gap-1 hover:text-brand-700 dark:hover:text-brand-300"
      >
        <Icon
          icon="mdi:phone-outline"
          width="14"
          height="14"
          aria-hidden="true"
        />
        {{ member.phone }}
      </a>
    </div>
  </article>
</template>
