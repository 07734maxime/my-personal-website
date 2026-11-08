<!-- A blog post written in Markdown (content/blog/*.md); the route meta carries its source. -->
<script setup>
import { ref, onMounted, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import PostHeader from '@/components/headers/PostHeader.vue';
import { renderMarkdown } from '@/utils/markdown';

const route = useRoute();
const html = ref('');

onMounted(async () => {
  html.value = await renderMarkdown(route.meta.markdown);
  // The post's sections exist only now: tell the table of contents
  await nextTick();
  window.dispatchEvent(new Event('page-content'));
});
</script>

<template>
  <main class="prose-body flex flex-col gap-5">
    <PostHeader />
    <div class="markdown" v-html="html"></div>
  </main>
</template>
