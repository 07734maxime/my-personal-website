<script setup>
import { ref } from 'vue';
import { useRouter,useRoute } from 'vue-router';
import { computed } from 'vue';
const router = useRouter();
const blogRoutes = ref(router.getRoutes().filter(route => route.path.startsWith("/blog/")));
const query = ref('');
const filteredRoutes = computed(() => {
  const q = query.value.trim().toLowerCase();
  if (!q) return blogRoutes.value;
  return blogRoutes.value.filter(r => {
    const name = (r.name || '').toString().toLowerCase();
    const desc = ((r.meta && r.meta.description) || '').toString().toLowerCase();
    const tags = (r.meta && r.meta.tags) ? r.meta.tags.map(t => (t.label||t).toString().toLowerCase()).join(' ') : '';
    return name.includes(q) || desc.includes(q) || tags.includes(q);
  });
});

const route = useRoute();

</script>

<template>
  <main class="flex flex-col gap-12">
    <h1 class="highlight-title rotate-2 text-3xl">{{ route.name }}</h1>

    <section class="flex flex-col gap-3">
      <h2 class="text-xl highlight-title -rotate-1">Navigation</h2>
      <div class="flex items-center gap-2">
        <input v-model="query" type="search" placeholder="Search posts..." class="p-2 font-bold bg-orange-200 w-full solid-shadow-3 rotate-1 active:bg-orange-300 hover:bg-orange-300 outline-none" />
      </div>
      <ul class="flex flex-col gap-2 list-none p-0">

        <li v-for="route in filteredRoutes" :key="route.path" :to="route.path"
          class="bg-purple-300 p-2 border border-2 rounded-tr rounded-bl flex flex-col gap-3 solid-shadow-3">
          <ul class="flex gap-2">
            <li v-for="tag in (route.meta && route.meta.tags) || []" :key="tag" :class="tag.color"
              class="select-none cursor-pointer text-white bg-gray-200 text-gray-800 text-xs px-2 py-1 uppercase font-mono font-bold">
              {{ tag.label || tag }}
            </li>

          </ul>
          <div>
            <span class="font-bold font-mono">{{ route.name }}</span>
            <p class="text-gray-700 text-sm">{{ route.meta.description }}</p>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-sm text-gray-500">{{ route.meta.date }}</span>
            <RouterLink :to="route.path"
              class="bg-black p-2 text-white hover:bg-gray-700 w-fit ml-auto font-mono text-sm">Read <i
                class="fas fa-arrow-right"></i></RouterLink>
          </div>
        </li>

          <li class="select-none text-gray-500 border border-dashed border-2 rounded-tr rounded-bl flex items-center justify-center gap-2 h-32">
             <span class="font-bold font-mono text-lg">More soon!</span>
          </li>

      </ul>
    </section>

  </main>
</template>