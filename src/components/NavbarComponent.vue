<!-- The menu bar of the old computer: seal on the left, programs in the middle, the Paris clock on the right -->
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useEpisodes } from '@/composables/episodes';

const { episodes, isActive } = useEpisodes();

// Maxime's local time
const time = ref('--:--');
const updateTime = () => {
  time.value = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Paris', hour: '2-digit', minute: '2-digit' }).format(new Date());
};
let clock;
onMounted(() => { updateTime(); clock = setInterval(updateTime, 10000); });
onBeforeUnmount(() => clearInterval(clock));
</script>

<template>
  <header class="sticky top-0 z-40 border-b border-line bg-ink-3/95 backdrop-blur-sm">
    <div class="mx-auto flex max-w-[1040px] items-center gap-4 px-4 py-2">
      <RouterLink to="/" class="group flex shrink-0 items-center gap-2" aria-label="Maxime — home">
        <span class="hanko h-8 w-8 text-lg group-hover:bg-shu group-hover:text-paper">真</span>
      </RouterLink>

      <nav aria-label="Main" class="no-scrollbar -my-2 min-w-0 flex-1 overflow-x-auto">
        <ul class="flex">
          <li v-for="episode in episodes" :key="episode.path">
            <RouterLink :to="episode.path" :aria-current="isActive(episode) ? 'page' : undefined"
              class="flex flex-col items-center whitespace-nowrap border-x border-transparent px-3 py-2 leading-tight"
              :class="isActive(episode) ? 'border-line bg-ink text-gold' : 'text-paper/80 hover:bg-ink/60 hover:text-paper'">
              <span class="text-sm">{{ episode.jp }}</span>
              <span class="text-[10px] uppercase tracking-widest text-muted">{{ episode.name }}</span>
            </RouterLink>
          </li>
        </ul>
      </nav>

      <p class="hidden shrink-0 gap-3 font-display text-xs md:flex">
        <span><span class="text-muted">Paris</span> {{ time }}</span>
      </p>
    </div>
  </header>
</template>
