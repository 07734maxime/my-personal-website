<!--
  A favorite in the spotlight, then the rest of the shelf as a wall of covers (names show on hover).
  Covers stay dim until hovered; entries without a cover are drawn as a labeled floppy disk. Entries with a url link out.
-->
<template>
    <div class="flex flex-col gap-5">
        <figure v-if="favorite" class="grid items-center gap-4"
            :class="reversed ? 'sm:grid-cols-[1fr_minmax(0,11rem)]' : 'sm:grid-cols-[minmax(0,11rem)_1fr]'">
            <div class="win w-2/3 sm:w-full" :class="reversed ? 'sm:order-2' : ''">
                <div class="win-bar win-bar-accent"><span>★ FAVORITE</span><span aria-hidden="true">×</span></div>
                <component :is="favorite.url ? 'a' : 'div'" v-bind="linkAttrs(favorite)" class="block">
                    <img v-if="favorite.img && !missing.has(favorite.img)" :src="favorite.img" :alt="favorite.alt" loading="lazy" @error="missing.add(favorite.img)"
                        class="aspect-[3/4] w-full object-cover" />
                    <Floppy v-else :item="favorite" large />
                </component>
            </div>
            <figcaption class="flex flex-col gap-3" :class="reversed ? 'sm:text-right sm:items-end' : ''">
                <span class="kicker text-gold!">Favorite</span>
                <component :is="favorite.url ? 'a' : 'span'" v-bind="linkAttrs(favorite)"
                    class="font-display text-2xl" :class="{ 'hover:text-cyan': favorite.url }">{{ favorite.alt }}</component>
                <span class="text-paper/70">「{{ favorite.note }}」</span>
            </figcaption>
        </figure>

        <div>
            <p class="kicker mb-2">{{ title }} · {{ list.length }} {{ list.length > 1 ? 'items' : 'item' }}</p>
            <ul v-reveal.children class="grid grid-cols-4 gap-1.5 sm:grid-cols-6">
                <li v-for="el in list" :key="el.alt">
                  <component :is="el.url ? 'a' : 'div'" v-bind="linkAttrs(el)" :title="el.alt" class="group block">
                    <div class="overflow-hidden border border-line transition-colors group-hover:border-accent">
                        <img v-if="el.img && !missing.has(el.img)" :src="el.img" :alt="el.alt" loading="lazy" @error="missing.add(el.img)"
                            class="aspect-[3/4] w-full object-cover opacity-70 saturate-50 transition duration-300 group-hover:opacity-100 group-hover:saturate-100" />
                        <Floppy v-else :item="el" />
                    </div>
                  </component>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { h, reactive } from 'vue';

defineProps({
    reversed: {
        type: Boolean,
        default: false
    },
    title: {
        type: String,
        required: true
    },
    favorite: {
        type: Object,
        default: null
    },
    // [{ alt, img?, jp?, url? }]
    list: {
        type: Array,
        required: true
    }
});

// 3.5" floppy: metal shutter at the top, paper label with the title at the bottom
const Floppy = (props) => h('div', { class: 'relative flex aspect-[3/4] w-full flex-col bg-line p-[10%]', 'aria-label': props.item.alt, role: 'img' }, [
    h('div', { class: 'mx-auto h-[22%] w-[55%] bg-muted/70 p-[4%]' }, [h('div', { class: 'ml-auto h-full w-1/4 bg-ink' })]),
    h('div', { class: 'mt-auto flex h-[48%] flex-col justify-between bg-paper p-[8%] text-ink' }, [
        h('span', { class: `font-display leading-tight ${props.large ? 'text-2xl' : 'text-xs'}` }, props.item.jp || props.item.alt),
        h('span', { class: 'border-t border-dashed border-ink/40 pt-0.5 font-display text-[8px] uppercase leading-tight text-ink/60 line-clamp-2' }, props.item.alt),
    ]),
]);
Floppy.props = ['item', 'large'];

// Covers that failed to load (e.g. not downloaded yet) are drawn as a floppy instead
const missing = reactive(new Set());

const linkAttrs = (item) => (item.url ? { href: item.url, target: '_blank', rel: 'noopener noreferrer' } : {});
</script>
