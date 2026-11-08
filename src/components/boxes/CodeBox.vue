<script setup>
import CodeBlock from '@/components/CodeBlock.vue';

defineProps({
  lang: { type: String, default: 'rust' },
  code: { type: String, required: true },
  filename: { type: String, default: '' },
});
</script>

<template>
  <figure class="win">
    <figcaption class="win-bar">
      <span>{{ filename }}</span>
      <span class="uppercase tracking-widest">{{ lang }}</span>
    </figcaption>
    <CodeBlock :lang="lang" :code="code" />
  </figure>
</template>
