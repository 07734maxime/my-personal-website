<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import NavbarComponent from './components/NavbarComponent.vue';
import SideWidgets from './components/SideWidgets.vue';
import SiteFooter from './components/SiteFooter.vue';
import TitleFlash from './components/TitleFlash.vue';

const route = useRoute();

// Bumped once a page has finished entering, so the sidebar can read its sections
const pageKey = ref(0);

watch(
  () => route.fullPath,
  () => {
    const name = String(route.meta?.title || route.name || '');
    document.title = name && name !== 'Home' ? `${name} — Maxime` : 'Maxime — 0.7734';
  },
  { immediate: true }
);
</script>

<template>
  <NavbarComponent />

  <div class="mx-auto grid w-full max-w-[1040px] gap-6 px-4 pt-8 pb-10 lg:grid-cols-[230px_minmax(0,1fr)]">
    <RouterView v-slot="{ Component, route: viewRoute }">
      <Transition name="page" mode="out-in" appear @after-enter="pageKey++">
        <component :is="Component" :key="viewRoute.path" class="min-w-0 lg:col-start-2 lg:row-start-1" />
      </Transition>
    </RouterView>
    <SideWidgets :page-key="pageKey" class="lg:col-start-1 lg:row-start-1 lg:sticky lg:top-16 lg:self-start" />
  </div>

  <SiteFooter />

  <TitleFlash />
</template>
