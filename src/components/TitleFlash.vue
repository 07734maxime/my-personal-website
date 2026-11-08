<!--
  A short boot screen on every page change: the program's file name loads, a progress bar fills,
  then the screen cuts to the page.
-->
<script setup>
import { ref, watch } from 'vue';
import { useEpisodes } from '@/composables/episodes';

const { card, route } = useEpisodes();

const DURATION = 600;

const flashKey = ref(0);
const visible = ref(false);
let timer;

watch(
  () => route.path,
  () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    clearTimeout(timer);
    visible.value = true;
    flashKey.value++;
    timer = setTimeout(() => (visible.value = false), DURATION);
  },
);
</script>

<template>
  <div v-if="visible" :key="flashKey" aria-hidden="true"
    class="fixed inset-0 z-[90] flex items-center justify-center bg-black p-8 font-display text-paper pointer-events-none select-none">
    <div class="flex w-full max-w-md flex-col gap-3 text-sm">
      <p class="text-muted">{{ card.path }}&gt; <span class="text-paper">{{ card.file }}</span></p>
      <p class="text-5xl sm:text-7xl">{{ card.jp }}</p>
      <p>Loading <span class="text-gold">{{ card.title }}</span>…</p>
      <div class="h-4 border-2 border-paper p-0.5">
        <div class="bar h-full bg-accent"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bar {
  animation: load 480ms steps(10) both;
}
@keyframes load {
  from { width: 0; }
  to { width: 100%; }
}
</style>
