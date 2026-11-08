<!-- 奥付 (okuzuke): the colophon at the back of a Japanese book, with the author's seal stamped on it -->
<template>
  <footer class="mx-auto w-full max-w-[1040px] px-4 pb-10">
    <div class="flex flex-col items-stretch gap-6 sm:flex-row sm:items-end sm:justify-between">
      <p class="font-display text-5xl leading-none text-paper/20 select-none" aria-hidden="true">つづく</p>

      <section class="win relative w-full max-w-md text-sm" aria-label="Colophon">
        <p class="mb-3 border-b border-line pb-2 text-center font-display tracking-[0.4em] text-accent">奥付</p>
        <dl class="grid grid-cols-[4.5rem_1fr] gap-y-1">
          <template v-for="row in rows" :key="row.jp">
            <dt class="text-muted">{{ row.jp }}</dt>
            <dd>{{ row.value }}</dd>
          </template>
          <dt class="text-muted">連絡</dt>
          <dd class="flex flex-wrap gap-x-3">
            <a v-for="link in links" :key="link.label" :href="link.href" class="link"
              v-bind="link.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {}">{{ link.label }}</a>
          </dd>
        </dl>
        <span class="hanko absolute right-4 top-3 h-11 w-11 rotate-[-8deg] text-sm vertical opacity-90" aria-hidden="true">マキシム</span>
      </section>
    </div>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear();

const rows = [
  { jp: '書名', value: 'マキシム電脳 — Maxime\'s homepage' },
  { jp: '著者', value: 'Maxime (0.7734)' },
  { jp: '発行', value: `2025 first edition · ${year} reprint` },
  { jp: '印刷', value: 'Vue · Vite · Tailwind' },
];

const links = [
  { label: 'Email', href: 'mailto:07734maxime@proton.me' },
  { label: 'GitHub', href: 'https://github.com/07734maxime' },
  { label: 'Discord', href: 'https://discord.com/users/680737784730091522' },
  { label: 'Source', href: 'https://github.com/07734maxime/my-personal-website' },
];
</script>
