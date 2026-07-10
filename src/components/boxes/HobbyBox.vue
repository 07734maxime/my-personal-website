<template>
    <section class="flex flex-col gap-4 bg-purple-300 border border-2 rounded solid-shadow-5">
        <hgroup class="flex justify-between items-center border-b p-2">
            <div>
                <i class="fa fa-heart text-red-500"></i>
            </div>
            <span class="font-mono px-2">My favorite</span>
        </hgroup>

        <div :class="reversed ? 'flex-row-reverse' : 'flex-row'" class="cursor-pointer hover:scale-99 duration-150 transition-all m-2 flex gap-4 justify-center lg:justify-around items-center border border-2 p-2 rounded bg-white solid-shadow-3">
            <img :src="favorite.img" :alt="favorite.alt"
                class="aspect-[3/4] object-cover rounded border border-2 w-full lg:w-1/3" />
            <div class="flex flex-col ">
                <span class="font-mono">{{ favorite.alt }}</span>
                <span class="text-sm text-gray-600">{{  favorite.note }}</span>
            </div>
        </div>

        <hgroup class="flex justify-between items-center border-b border-t p-2">
            <span class="font-mono px-2">{{ title }}</span>
            <div>
                <i class="fa fa-book"></i>
            </div>
        </hgroup>

        <ul class="m-2 grid grid-cols-2 lg:grid-cols-4 auto-rows-max gap-2 ">
            <li v-for="el in list" :key="el.alt" class="cursor-pointer hover:scale-99 duration-150 transition-all bg-white p-2 border border-2 rounded solid-shadow-3">
                <img :src="el.img" :alt="el.alt"
                    class="aspect-[3/4] w-full object-cover rounded outline outline-2 outline-black" />
                <span class="w-full text-center">{{ el.alt }}</span>
            </li>

        </ul>

    </section>

</template>

<script setup>

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
        required: true
    },
    list: {
        type: Array,
        required: true
    }
});

</script>