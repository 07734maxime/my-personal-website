<template>
  <span v-html="renderedFormula"></span>
</template>

<script setup>
import { computed } from 'vue';
import katex from 'katex';
import 'katex/dist/katex.min.css'; // N'oublie pas d'importer le CSS !

const props = defineProps({
  formula: { type: String, required: true },
  displayMode: { type: Boolean, default: false } // Pour les équations centrées
});

const renderedFormula = computed(() => {
  return katex.renderToString(props.formula, {
    displayMode: props.displayMode,
    throwOnError: false
  });
});
</script>