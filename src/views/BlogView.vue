<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import PageTitle from '@/components/PageTitle.vue';
import UncompleteBox from '@/components/boxes/UncompleteBox.vue';

const router = useRouter();
const posts = router.getRoutes()
  .filter(route => route.path.startsWith("/blog/"))
  .sort((a, b) => (b.meta.date || '').localeCompare(a.meta.date || ''));

const query = ref('');
const filteredPosts = computed(() => {
  const q = query.value.trim().toLowerCase();
  if (!q) return posts;
  return posts.filter(r => {
    const name = String(r.name || '').toLowerCase();
    const desc = String(r.meta.description || '').toLowerCase();
    const tags = (r.meta.tags || []).map(t => t.label.toLowerCase()).join(' ');
    return name.includes(q) || desc.includes(q) || tags.includes(q);
  });
});
</script>

<template>
  <main>
    <PageTitle>Notes on what I'm learning: programming, maths, Japanese.</PageTitle>

    <section>
    <label class="mb-4 flex items-center gap-3 border-b border-line pb-2 focus-within:border-accent">
      <span class="shrink-0 whitespace-nowrap text-xs text-accent">検索</span>
      <input v-model="query" type="search" placeholder="Search posts, tags…"
        class="w-full bg-transparent py-2 text-lg outline-none placeholder:text-muted" />
    </label>

    <TransitionGroup tag="ul" name="list" class="relative flex flex-col">
      <li v-for="post in filteredPosts" :key="post.path" class="border-t border-line">
        <RouterLink :to="post.path"
          class="group grid gap-x-6 gap-y-2 px-2 py-6 transition-colors duration-300 hover:bg-white/5 sm:grid-cols-[7rem_1fr]">
          <time :datetime="post.meta.date" class="text-xs text-muted pt-2">{{ post.meta.date }}</time>
          <div class="flex flex-col gap-2">
            <h2 class="text-xl text-accent">{{ post.name }}</h2>
            <p class="text-paper/70">{{ post.meta.description }}</p>
            <ul class="flex flex-wrap gap-x-3 text-xs uppercase tracking-widest text-accent">
              <li v-for="tag in post.meta.tags || []" :key="tag.label">#{{ tag.label }}</li>
            </ul>
          </div>
        </RouterLink>
      </li>

      <li key="__more" class="border-t border-line pt-6">
        <UncompleteBox>{{ filteredPosts.length ? "More posts soon" : "No results found" }}</UncompleteBox>
      </li>
    </TransitionGroup>
    </section>
  </main>
</template>
