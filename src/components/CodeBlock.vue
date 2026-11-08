<!-- CodeBlock.vue -->
<script setup>
import { ref, onMounted } from 'vue';
import { getHighlighter } from '@/utils/highlighter';

const props = defineProps({
  lang: { type: String, default: 'rust' },
  code: { type: String, required: true }
});

const highlightedCode = ref('');

onMounted(async () => {
  const highlighter = await getHighlighter([props.lang]);
  highlightedCode.value = highlighter.codeToHtml(props.code, {
    lang: props.lang,
    theme: 'github-dark',
  });
});
</script>

<template>
  <div class="max-w-full min-w-0" v-html="highlightedCode"></div>
</template>
