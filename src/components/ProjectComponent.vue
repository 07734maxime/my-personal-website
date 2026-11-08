<!-- One project as a row of the file list; the row inverts on hover -->
<script setup>
import { computed } from 'vue';
import { toKanji } from '@/composables/episodes';

const props = defineProps({
  // { name: String, tags: [{ name }], link?: String, status?: String }
  project: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    required: true
  }
});

const number = computed(() => toKanji(props.index));
</script>

<template>
  <component :is="project.link ? 'RouterLink' : 'article'" :to="project.link"
    class="group grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-4 gap-y-2 border-t border-line px-2 py-6 transition-colors duration-300 hover:bg-white/5 sm:grid-cols-[3rem_minmax(0,1fr)_auto]">
    <span class="font-display text-2xl font-extrabold text-accent">{{ number }}</span>

    <div class="flex flex-col gap-2">
      <h3 class="text-xl text-accent">{{ project.name }}</h3>
      <div class="text-paper/70 transition-colors">
        <slot></slot>
      </div>
      <ul class="flex flex-wrap gap-x-3 text-xs uppercase tracking-widest text-muted">
        <li v-for="tag in project.tags" :key="tag.name">{{ tag.name }}</li>
      </ul>
    </div>

    <div class="col-start-2 flex items-start gap-3 text-xs uppercase tracking-widest sm:col-start-3 sm:flex-col sm:items-end sm:pt-2">
      <span v-if="project.status" class="border border-current px-2 py-0.5"
        :class="['Abandoned', 'Discontinued'].includes(project.status) ? 'text-muted line-through' : 'text-accent'">{{ project.status }}</span>
      <span v-if="project.link" class="transition-transform duration-300 group-hover:translate-x-1">Read →</span>
    </div>
  </component>
</template>
