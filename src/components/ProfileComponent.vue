<template>
    <section
        class="p-4 text-white flex justify-center gap-4 flex-col bg-gradient-to-r from-violet-400 to-purple-400 rounded-sm select-none outline outline-offset-2 outline-2 outline-purple-500">

        <div class="profile-infos flex items-center gap-4">
            <img src="/assets/img/avatar.png" alt="Avatar" class=" h-24 rounded-full border border-gray-300" />
            <div class="font-mono flex flex-col">
                <span class="text-shadow-lg text-shadow-orange-300/50">Maxime</span>
                <span class="text-xs hover:underline text-shadow-orange-300/50">0.7734</span>
            </div>
        </div>

        <article>
            <ul class="flex justify-center gap-4">
                <li v-for="(link, i) in links" :key="link.name">
                    <a :href="link.url" target="_blank" rel="noopener noreferrer"
                        class="p-2 rounded-sm bg-white text-black border border-black border-2 transition-colors duration-50"
                        :class="i % 2 == 0 ? 'hover:bg-orange-200' : 'hover:bg-amber-300'">
                        <i :class="link.icon"></i>
                    </a>
                </li>
            </ul>
        </article>
    </section>
</template>

<script setup>

const links = [{
    name: "Envelope",
    url: "mailto:e07734maxime@proton.me",
    icon: "fas fa-envelope"
}, {
    name: "GitHub",
    url: "https://github.com/07734maxime",
    icon: "fab fa-github"
}, {
    name: "Discord",
    url: "https://discord.com/users/680737784730091522",
    icon: "fab fa-discord"
}]

</script>