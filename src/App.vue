<script setup>
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <AppHeader />
    <main class="flex-1 pt-16">
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
