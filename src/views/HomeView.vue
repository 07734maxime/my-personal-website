<template>
  <main class="flex flex-col">

    <PageTitle title="Maxime">
      A {{ profile.age }}-year-old apprentice programmer from {{ profile.based_in }}. I study engineering, run {{ profile.os }},
      and I'm learning Japanese, one kana at a time.
    </PageTitle>

    <CutCard color="accent">自己紹介</CutCard>

    <!-- Status screen, RPG style -->
    <section v-reveal class="win">
      <div class="win-bar"><span>STATUS</span><span>LV {{ profile.age }}</span></div>
      <div class="grid gap-6 sm:grid-cols-[auto_1fr] sm:items-start">
        <img src="/assets/img/avatar.png" alt="Maxime's avatar" width="160" height="160"
          class="pixel aspect-square w-32 border-2 border-paper object-cover sm:w-40" />
        <dl class="grid grid-cols-[7rem_1fr] font-display text-sm">
          <template v-for="row in profileRows" :key="row.label">
            <dt class="py-1.5 text-muted">{{ row.label }}</dt>
            <dd class="py-1.5">{{ row.value }}</dd>
          </template>
          <dt class="py-1.5 text-muted">Local time</dt>
          <dd class="py-1.5"><span class="text-gold">{{ time.h }}<span class="blink">:</span>{{ time.m }}</span> <span class="text-muted">Paris</span></dd>
          <dt class="py-1.5 text-muted">Sanity</dt>
          <dd class="flex flex-wrap items-center gap-2 py-1.5">
            <span class="flex h-3 w-32 gap-0.5 border border-paper p-0.5" aria-hidden="true">
              <span v-for="n in 10" :key="n" class="flex-1" :class="n <= 7 ? 'bg-cyan' : ''"></span>
            </span>
            <span class="text-xs text-muted">70/100 (read Saya no Uta)</span>
          </dd>
        </dl>
      </div>
    </section>

    <!-- About -->
    <section v-reveal.children class="prose-body flex flex-col gap-5">
      <SectionTitle>About me</SectionTitle>
      <p>
        I'm currently studying engineering, and I'd like to specialize in computer science because it's what I'm
        passionate about.
      </p>
      <p>
        It's not the only thing I love though. I rarely play video games these days, and I'm trying to quit competitive
        ones, but I still love single-player and indie games, especially the strange and unsettling kind.
        You'll find them in <RouterLink to="/hobbies" class="link">Hobbies</RouterLink>.
      </p>
      <p>
        I also love anime, manga, light novels and visual novels. I don't have much time for them lately, but they still
        hold a special place in my heart. I'd like to visit Japan one day, so I'm learning Japanese.
      </p>
      <p class="font-display text-4xl text-gold">はじめまして！<span class="blink">_</span></p>
    </section>

    <!-- This website -->
    <section v-reveal.children class="prose-body flex flex-col gap-5">
      <SectionTitle>This website</SectionTitle>
      <p>
        A personal project to have a place where I can share my interests and hobbies with the world.
        Its source code is <a href="https://github.com/07734maxime/my-personal-website" target="_blank" rel="noopener noreferrer" class="link">on GitHub</a>.
      </p>
      <ul class="flex flex-wrap gap-x-6 gap-y-2 text-xs uppercase tracking-widest text-muted">
        <li v-for="tech in techList" :key="tech.name">
          <a :href="tech.url" target="_blank" rel="noopener noreferrer" class="transition-colors hover:text-accent">{{ tech.name }}</a>
        </li>
      </ul>
    </section>
  </main>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import SectionTitle from '@/components/SectionTitle.vue';
import PageTitle from '@/components/PageTitle.vue';
import CutCard from '@/components/CutCard.vue';
import { profile } from '@/content';

// Values come from content/profile.yaml
const profileRows = [
  { label: 'Name', value: profile.name },
  { label: 'Age', value: profile.age },
  { label: 'Based in', value: profile.based_in },
  { label: 'Class', value: profile.class },
  { label: 'OS', value: profile.os },
  { label: 'Learning', value: profile.learning },
];

const techList = [
  { name: 'Vue', url: 'https://vuejs.org/' },
  { name: 'Vite', url: 'https://vite.dev/' },
  { name: 'Tailwind CSS', url: 'https://tailwindcss.com/' },
  { name: 'Shiki', url: 'https://shiki.style/' },
  { name: 'KaTeX', url: 'https://katex.org/' },
];

const time = ref({ h: '--', m: '--' });
const updateTime = () => {
  const [h, m] = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Paris', hour: '2-digit', minute: '2-digit' })
    .format(new Date()).split(':');
  time.value = { h, m };
};
let clock;
onMounted(() => { updateTime(); clock = setInterval(updateTime, 10000); });
onBeforeUnmount(() => clearInterval(clock));
</script>
