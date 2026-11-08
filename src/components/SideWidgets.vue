<!--
  The left column: a table of contents built from the section titles of the page on screen
  (the one being read is highlighted), and a few plain facts.
-->
<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue';
import { profile } from '@/content';

const props = defineProps({
  // Changes every time a new page has finished entering
  pageKey: { type: Number, default: 0 },
});

// Where a title counts as "being read": just under the sticky menu bar
const READ_LINE = 96;

const sections = ref([]);
const current = ref(null);
let titles = [];

const slugify = (text) => 's-' + (text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'section');

const collect = () => {
  titles = [...document.querySelectorAll('main .section-title')];
  const used = new Set();
  sections.value = titles.map((el) => {
    let id = slugify(el.textContent);
    while (used.has(id)) id += '-';
    used.add(id);
    el.id = id;
    return { id, label: el.textContent.trim() };
  });
  update();
};

// The current section is the last title above the read line (the last one once the page bottom is reached)
let frame = 0;
const update = () => {
  cancelAnimationFrame(frame);
  frame = requestAnimationFrame(() => {
    if (!titles.length) return (current.value = null);
    const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
    if (atBottom) return (current.value = titles.at(-1).id);
    const passed = titles.filter((el) => el.getBoundingClientRect().top <= READ_LINE);
    current.value = (passed.at(-1) ?? titles[0]).id;
  });
};

watch(() => props.pageKey, collect, { flush: 'post' });
onMounted(() => {
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  // Pages that render their content late (Markdown posts) announce it
  window.addEventListener('page-content', collect);
});
onBeforeUnmount(() => {
  cancelAnimationFrame(frame);
  window.removeEventListener('scroll', update);
  window.removeEventListener('resize', update);
  window.removeEventListener('page-content', collect);
});

// Values come from content/profile.yaml
const facts = [
  { label: 'Learning', value: profile.learning },
  { label: 'Running', value: profile.os },
  { label: 'Based in', value: profile.based_in },
];
</script>

<template>
  <aside class="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
    <nav v-if="sections.length" class="win hidden lg:block" aria-label="On this page">
      <div class="win-bar"><span>目次 · contents</span><span class="text-muted">{{ sections.length }}</span></div>
      <ol class="flex flex-col gap-1 text-sm">
        <li v-for="(s, i) in sections" :key="s.id">
          <RouterLink :to="{ hash: `#${s.id}` }" class="flex gap-2 hover:text-gold"
            :class="current === s.id ? 'text-gold' : 'text-paper/75'"
            :aria-current="current === s.id ? 'location' : undefined">
            <span class="w-4 shrink-0 text-shu">{{ current === s.id ? '▶' : i + 1 }}</span>
            <span>{{ s.label }}</span>
          </RouterLink>
        </li>
      </ol>
    </nav>

    <section class="win">
      <div class="win-bar"><span>プロフィール · profile</span></div>
      <dl class="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-sm">
        <template v-for="row in facts" :key="row.label">
          <dt class="text-muted">{{ row.label }}</dt><dd>{{ row.value }}</dd>
        </template>
      </dl>
    </section>
  </aside>
</template>
