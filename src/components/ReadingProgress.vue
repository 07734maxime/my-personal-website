<!-- Thin bar at the top of the screen showing how far through the post you are -->
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const progress = ref(0);
let frame = 0;

const update = () => {
  cancelAnimationFrame(frame);
  frame = requestAnimationFrame(() => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.value = max > 0 ? Math.min(1, window.scrollY / max) : 0;
  });
};

onMounted(() => {
  update();
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
});

onBeforeUnmount(() => {
  cancelAnimationFrame(frame);
  window.removeEventListener('scroll', update);
  window.removeEventListener('resize', update);
});
</script>

<template>
  <div class="fixed top-0 inset-x-0 h-0.5 z-[60] pointer-events-none" aria-hidden="true">
    <div class="h-full bg-accent origin-left" :style="{ scale: `${progress} 1` }"></div>
  </div>
</template>
