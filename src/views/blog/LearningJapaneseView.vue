<template>
    <main class="flex flex-col gap-3">
        <h1 class="highlight-title rotate-1 text-3xl">{{ route.name }}</h1>
        <AboutBox>
            You will need to have suitable fonts installed to properly display Japanese characters.
        </AboutBox>
            <p>From a simple idea to a concrete project, I will relate my path of learning Japanese.
                First of all, you may wonder why would I want to learn Japanese ? Well, there is no reason.
                I have ease to learn languages, but it was never used except for English, and I wanted to learn once a non-latin / non-germanic language.
                This combined with my interest with Japanese culture made me start learning.
            </p>
        <h2 class="highlight-title -rotate-1" >Context</h2>
            <p>My plan to learn Japanese started when I was 15. Although I did not know where to start, so I basically gave up really really fast, even though
                I haven't forgotten this idea. Time flew by, I'm not 20. It's been 5 years, and I just continually thanks my old me about for not forgetting.
                Thus, I've really started learning Japanese this year, in 2026. Even if this was probably not optimal, due to my lack of time caused by my studies,
                I was and I am still that motivated to learn Japanese. I'm aiming to reach a good level in Japanese, thus I'll be able to communicate
                with Japanese people, read books, watch movies and anime without subtitles.
            </p>
            <p>I'm too lazy to make another section for that, so I'll explain here how Japanese is actually structured.
                Basically, Japanese uses 3 differents writing systems, which are <span class="italic">Hiragana</span> (<span class="font-bold">ひらがな</span>), <span class="italic">Katakana</span> (<span class="font-bold">カタカナ</span>) and <span class="italic">Kanji</span> (<span class="font-bold">漢字</span>). Hiragana and Katakana are phonetic alphabets,
                while Kanji are ideograms (they represent meanings rather than sounds). <span class="underline">If you're confused about Kanji, just accept it, and you'll understand it later, trust me.</span>
            </p>
            <p>
                Let's now talk about the alphabet itself. Hiragana and Katakana are both made of 46 basic characters, which represent the same sounds.
                The main difference is that Hiragana is used for native Japanese words, while Katakana is used for foreign words.
                Kanji, on the other hand, are Chinese characters that have been adopted into the Japanese writing system.
                There are thousands of Kanji characters, but you only need to know a few hundred to be able to read and write in Japanese.
            </p>
            <table class="border-collapse border border-gray-400">
                <thead>
                    <tr>
                        <th class="border border-gray-400 px-3 py-2"></th>
                        <th class="border border-gray-400 px-3 py-2">a</th>
                        <th class="border border-gray-400 px-3 py-2">i</th>
                        <th class="border border-gray-400 px-3 py-2">u</th>
                        <th class="border border-gray-400 px-3 py-2">e</th>
                        <th class="border border-gray-400 px-3 py-2">o</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th class="border border-gray-400 px-3 py-2">Hiragana</th>
                        <td class="border border-gray-400 px-3 py-2">あ</td>
                        <td class="border border-gray-400 px-3 py-2">い</td>
                        <td class="border border-gray-400 px-3 py-2">う</td>
                        <td class="border border-gray-400 px-3 py-2">え</td>
                        <td class="border border-gray-400 px-3 py-2">お</td>
                    </tr>
                    <tr>
                        <th class="border border-gray-400 px-3 py-2">Katakana</th>
                        <td class="border border-gray-400 px-3 py-2">ア</td>
                        <td class="border border-gray-400 px-3 py-2">イ</td>
                        <td class="border border-gray-400 px-3 py-2">ウ</td>
                        <td class="border border-gray-400 px-3 py-2">エ</td>
                        <td class="border border-gray-400 px-3 py-2">オ</td>
                    </tr>
                    <tr>
                        <th class="border border-gray-400 px-3 py-2">Romaji</th>
                        <td class="border border-gray-400 px-3 py-2">a</td>
                        <td class="border border-gray-400 px-3 py-2">i</td>
                        <td class="border border-gray-400 px-3 py-2">u</td>
                        <td class="border border-gray-400 px-3 py-2">e</td>
                        <td class="border border-gray-400 px-3 py-2">o</td>
                    </tr>
                </tbody>
            </table>
            <p class="italic">This is actually the first time of my life I'm creating a table in HTML, who really uses tables?</p>
            <p>This table shows the basic hiragana, katakana, and romaji characters for the vowels a, i, u, e, and o.
                You may have deduced that this is not the complete alphabet, and you're right. There are also consonants that can be combined with these vowels to form syllables.
                You can use consonants like k, s, t, n, h, m, y, r, and w to form syllables like ka (<span class="font-bold">か</span>), shi (<span class="font-bold">し</span>), tsu (<span class="font-bold">つ</span>), ne (<span class="font-bold">ね</span>), ho (<span class="font-bold">ほ</span>)...
            </p>
            <AboutBox>
                I've created a page so you can explore the full Japanese alphabet. If you want to learn more,
                <RouterLink class="bg-orange-200 hover:underline" to="/stuff/japanese-alphabet">click here</RouterLink>
            </AboutBox>
        <h2 class="highlight-title rotate-0.5">How is learning Japanese?</h2>
            <p>In <a href="https://www.youtube.com/watch?v=tkFOBx6j0l8" target="_blank" class="hover:underline italic no-underline text-black">two words</a>: really hard.</p>
            <p>Unironically, what makes Japanese hard is not even the writing system. It's very easy to learn, and pronunciation is really straightforward, even a 2-year-old can learn it.
                Japanese grammar is also not that complicated, it's basically a SOV system : subject-object-verb. It can be complex the first time when you always used a SVO system as I,
                but it's not that tough to get used to it. What makes Japanse really, really difficult is vocabulary.
            </p>
            <p>
                As a latin-language speaker, all the words you know are based on Latin roots,
                and you can easily deduce the meaning of a word you don't know by looking at its root.
                    In Japanese, there is no such thing, and you have to learn every single word by heart. This is really frustrating because this makes you stuck at the simple sentences,
                    and you can't really express yourself in a complex way.
            </p>
            <hr class="my-6" />
            <p>When you learn Japanese, there is something called <a href="https://www.jlpt.jp/" target="_blank">Japanese-Language Proficiency Test</a>, also called <span class="italic"> JLPT </span>.
            It's basically a test to measure your Japanese language skills, as a foreigner. This test is divided into several levels, starting from N5 (beginner) to N1 (advanced).
            <span class="text-red-600">Currently, I'm preparing for the JLPT N5.</span> I'd say before my break, it was going well, but this is the first time
            that I'm really slow to learn something.</p>
        <h2 class="highlight-title -rotate-1">Let's talk about Kanji</h2>
            <p>As said previously, Kanji are used to represent ideas and concepts, rather than sounds.
                This means that each Kanji character has a specific meaning, and you have to learn both the reading and the meaning of each character.
                Also, there is two readings for each Kanji character, the <span class="italic">On'yomi</span> (<span class="font-bold">音読み</span>) and the <span class="italic">Kun'yomi</span> (<span class="font-bold"> 訓読み</span>).
                On'yomi is the reading of the Kanji character when it is used in a compound word, while Kun'yomi is the reading of the Kanji character when it is used alone.
                If you don't understand how can Kanji be useful, I'll show you a pretty simple example:
                <ul>
                    <li><span class="font-bold">知らない</span> (<span class="italic">shiranai</span>) literally means "I don't know". Here, the <span class="font-bold">知</span> Kanji represents the concept of "knowing", so context can be deduced easily with this one. </li>
                    <li><span class="font-bold">死</span> (<span class="italic">shi</span>) literally means "death". Here, the <span class="font-bold">死</span> Kanji represents the concept of "death", so context can be deduced easily with this one. </li>
                </ul>
                <p>As you may have noticed, Japanese have a lot of common sounds for different words, different meanings, so Kanji are there to represent the different meaning through an image, an idea to exactly deduce the context of the conversation.</p>
            </p>
        <h2 class="highlight-title -rotate-1">Japanese Grammar</h2>
        <p>
            Japanese grammar is actually not that hard once you get the hang of it. As said earlier,
            it's all bout understanding the SOV system, and how to "conjugate" verbs (because this is reammy easy). I think the best thing to do is to train
            regularly, and try to understand the logic behind all that instead of learning by heart.

        </p>
        <h2 class="highlight-title rotate-1">What I've Learned</h2>
        <p>To be continued...</p>
    </main>
</template>

<script setup>
import AboutBox from '@/components/boxes/AboutBox.vue';
import { useRoute } from 'vue-router';
import { onMounted, onUnmounted } from 'vue';
import DefaultBox from '@/components/boxes/DefaultBox.vue';
const route = useRoute();

// add a body class when this view is mounted so we can style the navbar only for this view
onMounted(() => document.body.classList.add('view-learning-japanese'))
onUnmounted(() => document.body.classList.remove('view-learning-japanese'))
</script>

<!-- <style scoped>
main {
  background-color: #ffaeb6; /* light gray background */
  background-image:
    linear-gradient(to right, #ca838a 1px, transparent 1px),
    linear-gradient(to bottom, #ca838a 1px, transparent 1px);
  background-size: 5rem 5rem; /* size of the squares */
}
</style> -->