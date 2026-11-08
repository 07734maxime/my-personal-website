<!-- A side note, in a small system dialog -->
<template>
    <aside class="border-2 border-cyan/60 bg-ink-2 px-5 py-4 text-sm leading-relaxed text-paper/80 shadow-[4px_4px_0_0_#000]">
        <p v-if="!hideTitle" class="mb-2 font-display text-xs uppercase tracking-[0.2em] text-cyan">ⓘ {{ title }}</p>
        <slot></slot>
    </aside>
</template>

<script setup>

defineProps({
    title: {
        type: String,
        default: 'Note'
    },
    hideTitle: {
        type: Boolean,
        default: false
    }
});

</script>
