<script setup>
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

const goBackParent = () => {
  const pathParts = route.path.split('/').filter(Boolean);
  pathParts.pop()
  
  const parentPath = '/' + pathParts.join('/');
  router.push(parentPath);
};

</script>

<template>
  <a class="fixed top-0 left-0 p-2 hover:border-b hover:border-r cursor-pointer hover:bg-gray-300 " v-show="route.path !== '/'" @click="goBackParent">...</a>
  <RouterView class="mt-16 m-6 lg:m-16 lg:w-1/3 lg:mx-auto" />
  <p class="fixed top-0 right-0 p-2 bg-neutral-200 m-0 border-l border-b ">~{{ route.path }}</p>
</template>