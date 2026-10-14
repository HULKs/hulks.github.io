<script setup>
import { computed } from "vue";
import SectionHeading from "@/components/SectionHeading.vue";
import SponsorLogo from "@/components/SponsorLogo.vue";
import ContactCta from "@/components/ContactCta.vue";
import sponsors from "@/data/sponsors.json";
import { fadeUp, fadeUpStaggered } from "@/motion/presets";

const totalSponsors = computed(() =>
  sponsors.tiers.reduce((n, t) => n + t.sponsors.length, 0),
);

function variantFor(tier) {
  const hasAnyDescription = tier.sponsors.some((s) => s.description);
  return hasAnyDescription ? "detailed" : "compact";
}

function gridClassesFor(tier) {
  return variantFor(tier) === "detailed"
    ? "grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
    : "grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4";
}
</script>

<template>
  <!-- Intro -->
  <section
    v-motion="fadeUp"
    class="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
  >
    <div class="grid gap-10 lg:grid-cols-12 lg:items-end">
      <div class="lg:col-span-8 space-y-4">
        <SectionHeading
          eyebrow="Partners"
          title="Sponsors & Supporters"
          :description="sponsors.intro"
        />
      </div>
      <dl
        class="lg:col-span-4 grid grid-cols-2 gap-4 rounded-2xl border border-ink-200 bg-white p-5 dark:border-ink-800 dark:bg-ink-900"
      >
        <div>
          <dt
            class="font-mono text-[11px] uppercase tracking-widest text-ink-500 dark:text-ink-400"
          >
            Partners
          </dt>
          <dd class="mt-1 font-display text-2xl font-bold">
            {{ totalSponsors }}
          </dd>
        </div>
        <div>
          <dt
            class="font-mono text-[11px] uppercase tracking-widest text-ink-500 dark:text-ink-400"
          >
            Tiers
          </dt>
          <dd class="mt-1 font-display text-2xl font-bold">
            {{ sponsors.tiers.length }}
          </dd>
        </div>
      </dl>
    </div>
  </section>

  <!-- Tiers -->
  <section
    class="mx-auto w-full max-w-6xl space-y-12 px-4 pb-12 sm:space-y-16 sm:px-6 sm:pb-20 lg:px-8"
  >
    <div
      v-for="tier in sponsors.tiers"
      :key="tier.label"
      v-motion="fadeUp"
      class="space-y-6"
    >
      <div
        class="flex items-baseline justify-between border-b border-ink-200 pb-3 dark:border-ink-800"
      >
        <h3 class="font-display text-2xl font-bold sm:text-3xl">
          {{ tier.label }}
        </h3>
        <span
          class="font-mono text-xs uppercase tracking-widest text-ink-500 dark:text-ink-400"
        >
          {{ tier.sponsors.length }}
          {{ tier.sponsors.length === 1 ? "partner" : "partners" }}
        </span>
      </div>

      <div :class="gridClassesFor(tier)">
        <SponsorLogo
          v-for="(sponsor, i) in tier.sponsors"
          :key="sponsor.name"
          v-motion="fadeUpStaggered(i, 70)"
          :sponsor="sponsor"
          :variant="variantFor(tier)"
        />
      </div>
    </div>
  </section>

  <!-- contact us -->
  <section
    class="border-t border-ink-200 bg-ink-50 py-12 dark:border-ink-800 dark:bg-ink-900/40 sm:py-20"
  >
    <div class="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
      <ContactCta
        title="Interested in supporting the HULKs?"
        description="We are always happy to talk with new partners about how we can build a collaboration that supports both our research and your goals — from RoboCup travel to student projects and joint publications."
      />
    </div>
  </section>
</template>
