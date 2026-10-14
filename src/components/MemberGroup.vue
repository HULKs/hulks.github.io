<script setup>
import MemberCard from "@/components/MemberCard.vue";
import { fadeUp, fadeUpStaggered } from "@/motion/presets";

defineProps({
  group: { type: Object, required: true },
});
</script>

<template>
  <section v-motion="fadeUp" class="space-y-6">
    <!-- header -->
    <div class="flex items-baseline justify-between gap-4">
      <div>
        <h3
          class="font-display text-2xl font-bold text-ink-900 dark:text-white"
        >
          {{ group.label }}
        </h3>
        <p
          v-if="group.description"
          class="mt-1 max-w-2xl text-sm text-ink-600 dark:text-ink-400"
        >
          {{ group.description }}
        </p>
      </div>
      <span
        class="font-mono text-xs uppercase tracking-widest text-ink-500 dark:text-ink-400"
      >
        {{ group.members.length }} members
      </span>
    </div>

    <!-- members grid -->
    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <MemberCard
        v-for="(m, i) in group.members"
        :key="m.name"
        v-motion="fadeUpStaggered(i, 60)"
        :member="m"
      />
    </div>
  </section>
</template>
