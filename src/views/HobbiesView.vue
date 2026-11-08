<script setup>
import PageTitle from '@/components/PageTitle.vue';
import SectionTitle from '@/components/SectionTitle.vue';
import HobbyBox from '@/components/boxes/HobbyBox.vue';
import CutCard from '@/components/CutCard.vue';

import { reactive } from 'vue';
import { hobbies } from '@/content';

// Lists come from content/hobbies.yaml
const { animanga, novels, games, music } = hobbies;

// Covers that failed to load (not downloaded yet) are replaced by a note
const missing = reactive(new Set());
</script>

<template>
  <main>
    <PageTitle>
      What I watch, read, play and listen to. Mostly strange, sometimes dark, always memorable.
    </PageTitle>

    <section v-reveal class="flex flex-col gap-4">
      <SectionTitle>Anime, manga &amp; light novels</SectionTitle>
      <HobbyBox title="Shelf" :favorite="animanga.favorite" :list="animanga.shelf" />
      <HobbyBox v-if="animanga.next.length" title="Up next" :list="animanga.next" />
      <p class="text-sm text-muted">
        My full list is on <a class="link" href="https://myanimelist.net/animelist/maxime07734" target="_blank" rel="noopener noreferrer">MyAnimeList</a>
        (even though it's outdated).
      </p>
    </section>

    <CutCard color="accent">ノベルゲーム</CutCard>

    <section v-reveal class="flex flex-col gap-4">
      <SectionTitle>Visual novels</SectionTitle>
      <p class="text-paper/80">
        Proud visual novel enjoyer. I've only finished a couple so far, but the backlog is getting serious.
      </p>
      <HobbyBox title="Read" :list="novels.read" />
      <HobbyBox v-if="novels.backlog.length" title="Backlog" :list="novels.backlog" />
    </section>

    <CutCard color="ink">夢日記</CutCard>

    <section v-reveal class="flex flex-col gap-4">
      <SectionTitle>Video games</SectionTitle>
      <HobbyBox reversed title="Shelf" :favorite="games.favorite" :list="games.shelf" />
      <p class="text-sm text-muted">
        Basically anything that feels like a bad dream: Yume Nikki-likes, Silent Hill, RPG Maker horror.
      </p>
    </section>

    <CutCard color="paper" vertical>音楽</CutCard>

    <section v-reveal class="flex flex-col gap-6">
      <SectionTitle>Music</SectionTitle>
      <p class="text-paper/70">I honestly listen to all kinds of music. Currently on rotation:</p>
      <ol class="win">
        <li class="win-bar"><span>♪ PLAYLIST.M3U</span><span>{{ music.playlist.length }} tracks</span></li>
        <li v-for="(album, i) in music.playlist" :key="album.alt" class="border-b-2 border-dotted border-line last:border-0">
          <a :href="album.url" target="_blank" rel="noopener noreferrer"
            class="group flex items-center gap-4 px-3 py-2 hover:bg-white/5">
            <span class="w-6 font-display text-xs text-muted group-hover:text-accent">{{ String(i + 1).padStart(2, '0') }}</span>
            <img v-if="album.img && !missing.has(album.img)" class="h-12 w-12 object-cover saturate-50 group-hover:saturate-100" :src="album.img" alt="" loading="lazy"
              @error="missing.add(album.img)" />
            <span v-else class="flex h-12 w-12 items-center justify-center bg-ink-3 text-xl text-gold" aria-hidden="true">♪</span>
            <span class="flex flex-col">
              <span class="font-display text-lg leading-tight">{{ album.alt }}</span>
              <span class="text-xs text-muted">{{ album.artist }}</span>
            </span>
            <span class="ml-auto hidden font-display text-xs text-accent group-hover:inline" aria-hidden="true">▶ PLAY</span>
          </a>
        </li>
      </ol>
      <p class="text-paper/70">
        I also love soundtracks and calm, ambient stuff, the kind you put on to work or fall asleep.
        C418's <a class="link" href="https://music.apple.com/fr/album/minecraft-volume-alpha/1867885113" target="_blank" rel="noopener noreferrer">Minecraft – Volume Alpha</a>
        is the perfect example.
      </p>
    </section>
  </main>
</template>
