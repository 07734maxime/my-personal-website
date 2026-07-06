<script setup>

import { watch } from 'vue';
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
  <div class="py-12 px-6 lg:mx-16 lg:w-1/4 lg:mx-auto" >
    <RouterView />
  </div>
</template>
