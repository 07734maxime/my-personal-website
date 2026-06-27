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
  <a class="cursor-pointer hover:bg-gray-300 " v-show="route.path !== '/'" @click="goBackParent">...</a>
  <RouterView class="m-16 lg:w-1/3 lg:mx-auto" />
</template>