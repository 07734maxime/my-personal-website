<script setup>
import Latex from '@/components/Latex.vue';

defineProps({
  label: { type: String, default: 'LaTeX' }
});
</script>

<template>
  <figure class="relative overflow-x-auto border border-line bg-ink-2 px-4 py-2">
    <Latex :displayMode="true"><slot /></Latex>
    <figcaption class="absolute bottom-2 right-3 text-[10px] uppercase tracking-widest text-muted">{{ label }}</figcaption>
  </figure>
</template>
