<script setup>
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useRoute } from "vue-router";
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";

const route = useRoute();
const scrolled = ref(false);

function onScroll() {
  scrolled.value = window.scrollY > window.innerHeight * 0.1;
}

onMounted(() => {
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
});

onUnmounted(() => {
  window.removeEventListener("scroll", onScroll);
});

const isHome = computed(() => route.path === "/");
const headerVisible = computed(() => !isHome.value || scrolled.value);
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <AppHeader
      class="transition-all duration-300 ease-out"
      :class="
        headerVisible
          ? 'translate-y-0 opacity-100'
          : 'pointer-events-none -translate-y-full opacity-0'
      "
    />
    <main class="flex-1" :class="{ 'pt-16': !isHome }">
      <RouterView v-slot="{ Component, route }">
        <transition
          mode="out-in"
          enter-active-class="transition-[opacity,transform] duration-200 ease-out"
          leave-active-class="transition-[opacity,transform] duration-200 ease-out"
          enter-from-class="opacity-0 translate-y-1"
          leave-to-class="opacity-0 -translate-y-1"
        >
          <div :key="route.path">
            <component :is="Component" />
          </div>
        </transition>
      </RouterView>
    </main>
    <AppFooter />
  </div>
</template>
