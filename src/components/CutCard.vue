<!-- A divider between sections: a word on a strip of waves, drawn in when it scrolls into view. -->
<script setup>
defineProps({
  color: { type: String, default: 'ink' }, // ink | paper | accent
  vertical: { type: Boolean, default: false },
});
</script>

<template>
  <div v-reveal class="cut my-8 flex items-center justify-center gap-4" aria-hidden="true">
    <span class="h-[3px] flex-1 border-y border-line"></span>
    <p class="font-display text-2xl tracking-[0.3em]"
      :class="{ 'text-shu': color === 'accent', 'text-gold': color === 'paper', 'text-paper/80': color === 'ink' }">
      <slot />
    </p>
    <span class="h-[3px] flex-1 border-y border-line"></span>
  </div>
</template>
