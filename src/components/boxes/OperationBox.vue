<script setup>
defineProps({
  title: { type: String, required: true }
});
</script>

<template>
  <li class="grid gap-2 border border-line bg-ink-2 p-4 sm:grid-cols-[12rem_1fr] sm:items-center">
    <div class="flex flex-col gap-1">
      <span class="kicker">{{ title }}</span>
      <slot name="formula" />
    </div>
    <div class="overflow-x-auto">
      <slot name="result" />
    </div>
  </li>
</template>
