<template>
  <div v-html="highlightedCode"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { createHighlighter } from 'shiki';

const props = defineProps({
  code: { type: String, required: true },
  lang: { type: String, default: 'rust' }
});

const highlightedCode = ref('');

onMounted(async () => {
  // On crée l'instance du highlighter
  const highlighter = await createHighlighter({
    themes: ['github-light'],
    langs: ['rust']
  });
  
  // On génère le HTML
  highlightedCode.value = highlighter.codeToHtml(props.code, { 
    lang: props.lang, 
    theme: 'github-light',
  });
});
</script>