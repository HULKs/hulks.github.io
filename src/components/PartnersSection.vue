<script setup>
import SectionHeading from "@/components/SectionHeading.vue";
import SponsorLogo from "@/components/SponsorLogo.vue";
import partners from "@/data/partners.json";
</script>

<template>
  <section
    v-reveal
    aria-label="Partners"
    class="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-20 lg:px-8"
  >
    <SectionHeading title="Partners" />
    <ul class="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      <li v-for="partner in partners" :key="partner.name">
        <SponsorLogo :sponsor="partner" variant="detailed" />
      </li>
    </ul>
  </section>
</template>
