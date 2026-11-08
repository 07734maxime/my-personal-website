<!--
  Title panel at the top of every page: the program's path in the title strip, the Japanese title
  written top to bottom on a paper strip (tanzaku), then the English title and the intro.
-->
<script setup>
import { useEpisodes } from '@/composables/episodes';

defineProps({
  title: { type: String, default: '' },
});

const { card } = useEpisodes();
</script>

<template>
  <header class="win mb-5">
    <div class="win-bar">
      <span class="truncate">{{ card.path }}\{{ card.file }}</span>
      <span class="shrink-0 text-muted">{{ card.part }}</span>
    </div>

    <div class="flex gap-5">
      <span class="tanzaku vertical flex shrink-0 items-start justify-center px-2 py-3 font-display text-2xl leading-none text-ink sm:text-3xl" aria-hidden="true">
        {{ card.jp }}
      </span>
      <div class="flex min-w-0 flex-col justify-center gap-3">
        <h1 class="heading text-2xl sm:text-3xl">{{ title || card.title }}</h1>
        <div v-if="$slots.default" class="leading-relaxed text-paper/90">
          <slot />
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
/* A cream paper strip with a vermillion edge, hung like a tanabata wish */
.tanzaku {
  min-height: 7.5rem;
  background: var(--color-paper);
  border-top: 4px solid var(--color-shu);
  text-shadow: none;
}
</style>
