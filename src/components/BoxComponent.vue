<template>
    <div
        class="text-justify font-mono border border-2 bg-purple-300  transition-colors duration-50 cursor-pointer p-4" :class="disableHover ? '' : 'hover:font-bold hover:bg-orange-200'" >
        <slot></slot>
    </div>
</template>

<script setup>
defineProps({
    disableHover: Boolean
})
</script>

