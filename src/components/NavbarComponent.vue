<template>
  <nav class="border border-2 p-1 flex justify-center m-3 bg-violet-300 font-mono text-center solid-shadow-3">

    <ul class="flex gap-4">
      <li v-for="link in navLinks" :key="link.name" class="relative group">
        <RouterLink :to="link.path" v-slot="{ href, navigate, isActive }">
          <a class="p-0.5"  :href="href" @click="navigate" :class="[isActive ? 'bg-orange-200' : '', !isActive ? 'hover:bg-purple-400' : '', '']">
            {{ link.name }}
          </a>
        </RouterLink>
      </li>
    </ul>

  </nav>
</template>


<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const navLinks = router.getRoutes().filter(r => {
  const segments = r.path.split('/').filter(Boolean);
  return r.redirect === undefined && (r.path === '/' || segments.length === 1);
}).map(r => ({
  name: r.path === '/' ? 'Home' : (r.meta?.title || r.name),
  path: r.path
}));


</script>