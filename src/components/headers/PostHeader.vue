<script setup>
import { useRoute } from 'vue-router';
import PageTitle from '@/components/PageTitle.vue';
import ReadingProgress from '@/components/ReadingProgress.vue';
const route = useRoute();
</script>

<template>
  <ReadingProgress />
  <RouterLink to="/blog" class="kicker mb-6 w-fit transition-colors hover:text-accent">← Back to the blog</RouterLink>
  <PageTitle />
  <div class="-mt-8 mb-10 flex flex-wrap items-center gap-x-4 gap-y-2 border-y border-line py-3 text-xs uppercase tracking-[0.25em] text-muted">
    <time :datetime="route.meta.date" class="font-mono tracking-normal">{{ route.meta.date }}</time>
    <span v-for="tag in route.meta.tags" :key="tag.label" class="text-accent">#{{ tag.label }}</span>
  </div>
</template>
