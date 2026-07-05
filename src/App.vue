<script setup>

import { watch } from 'vue';
import NavbarComponent from './components/NavbarComponent.vue';
import { useRoute } from 'vue-router';
const route = useRoute();

watch(
  () => route.fullPath,
  () => {
    document.title = String(route.meta?.title || route.name || 'App');
  },
  { immediate: true }
);
</script>

<template>
  <NavbarComponent></NavbarComponent>
  <RouterView class="my-24 mx-6 lg:mx-16 lg:w-1/4 lg:mx-auto" />
</template>