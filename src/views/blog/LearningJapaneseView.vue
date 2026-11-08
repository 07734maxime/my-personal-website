<template>
  <main v-reveal.children class="prose-body flex flex-col gap-5">
    <PostHeader />

    <p class="text-xl! text-paper!">From a simple idea to a concrete project, I will relate my path of learning Japanese.
      Thankfully I've always had ease to learn languages, but I've never used my potential except for English.
      This, combined with my interest in Japanese culture, made me start learning the language.
    </p>

    <SectionTitle>Context</SectionTitle>

    <p>My plan started when I was 15. I basically gave up really really fast, even though
      I haven't forgotten this idea. 5 years later, I've really started learning Japanese.
    </p>

    <p>How is this language structured? Basically, Japanese uses 3 different writing systems:</p>

    <ul class="grid grid-cols-3 border border-line">
      <li v-for="(system, i) in writingSystems" :key="system.romaji"
        class="group flex flex-col items-center gap-2 bg-ink-2 px-2 py-6 transition-colors hover:bg-white/5"
        :class="i > 0 ? 'border-l border-line' : ''">
        <span class="font-display text-3xl font-extrabold sm:text-4xl">{{ system.jp }}</span>
        <span class="kicker">{{ system.romaji }}</span>
      </li>
    </ul>

    <p>
      Hiragana and Katakana are both made of 46 basic characters, and share the same sounds.
      The difference is that Hiragana is used for native Japanese words, while Katakana is used for foreign words.
      Kanji, on the other hand, are Chinese characters that have been adopted into the Japanese writing system.
    </p>

    <div class="overflow-x-auto border border-line bg-ink-2">
      <table class="w-full border-collapse text-center">
        <thead>
          <tr class="border-b border-line text-xs uppercase tracking-widest text-muted">
            <th class="p-3"></th>
            <th v-for="v in vowels" :key="v" class="p-3 font-normal">{{ v }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in vowelRows" :key="row.label" class="border-b border-line last:border-0">
            <th class="p-3 text-left text-xs font-normal uppercase tracking-widest text-muted">{{ row.label }}</th>
            <td v-for="c in row.chars" :key="c" class="p-3 text-xl" :class="row.label === 'Romaji' ? 'text-base text-paper/60' : 'font-display'">{{ c }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <AboutBox>
      I've made a page so you can explore the full Japanese alphabet and test yourself:
      <RouterLink class="link" to="/misc/japanese-alphabet">Japanese Alphabet →</RouterLink>
    </AboutBox>

    <SectionTitle>How is learning Japanese?</SectionTitle>

    <p>In <a href="https://www.youtube.com/watch?v=tkFOBx6j0l8" target="_blank" rel="noopener noreferrer" class="link italic">two words</a>: really hard.</p>

    <p>Unironically, what makes Japanese hard is not even the writing system. It's very easy to learn. Same for grammar,
      it's not that complicated either. They use a SOV (Subject-Object-Verb) system.
      What makes Japanese really, really difficult is vocabulary: there are no Latin roots to lean on.
    </p>

    <p>When you learn Japanese, there is something called the <a class="link" href="https://www.jlpt.jp/" target="_blank" rel="noopener noreferrer">Japanese-Language Proficiency Test</a>, also called <em>JLPT</em>.
      It's basically a test to measure your Japanese language skills, as a foreigner. This test is divided into several levels, starting from N5 (beginner) to N1 (advanced).
    </p>

    <figure class="border border-line bg-ink-2 p-5">
      <figcaption class="kicker mb-4">JLPT progress</figcaption>
      <ol class="grid grid-cols-5 gap-1">
        <li v-for="level in ['N5', 'N4', 'N3', 'N2', 'N1']" :key="level" class="flex flex-col gap-2">
          <span class="h-1.5" :class="level === 'N5' ? 'bg-accent' : 'bg-line'"></span>
          <span class="text-xs" :class="level === 'N5' ? 'text-accent' : 'text-muted'">{{ level }}</span>
        </li>
      </ol>
      <p class="mt-4 text-sm">Currently preparing for <span class="text-accent">N5</span>. Going well before my break — first time learning something this slowly.</p>
    </figure>

    <CutCard color="accent">漢字</CutCard>

    <SectionTitle>Let's talk about Kanji</SectionTitle>

    <p>Kanji are used to represent ideas and concepts, rather than sounds.
      This means that each Kanji character has a specific meaning, and you have to learn both the reading and the meaning of each character.
      Also, most Kanji characters have two readings, the <em>On'yomi</em> (<span class="font-display">音読み</span>) and the <em>Kun'yomi</em> (<span class="font-display">訓読み</span>).
      On'yomi is the reading of the Kanji character when it is used in a compound word, while Kun'yomi is the reading of the Kanji character when it is used alone.
      If you don't understand how Kanji can be useful, I'll show you a pretty simple example:
    </p>

    <ul class="grid gap-px border border-line bg-line sm:grid-cols-2">
      <li v-for="kanji in kanjiExample" :key="kanji.char" class="group flex items-center gap-5 bg-ink-2 p-5">
        <span class="font-display text-6xl font-extrabold transition-colors group-hover:text-accent">{{ kanji.char }}</span>
        <span class="flex flex-col gap-1">
          <span class="text-sm text-muted">shi</span>
          <span>{{ kanji.meaning }}</span>
        </span>
      </li>
    </ul>

    <SectionTitle>Japanese Grammar</SectionTitle>

    <p>
      Japanese grammar is actually not that hard once you get the hang of it. It's all about understanding the SOV system,
      and how to "conjugate" verbs. I think the best thing to do is to train
      regularly, and try to understand the logic behind all that instead of rote memorizing.
    </p>

    <SectionTitle>What I've Learned</SectionTitle>
    <UncompleteBox>More coming soon</UncompleteBox>
  </main>
</template>

<script setup>
import AboutBox from '@/components/boxes/AboutBox.vue';
import PostHeader from '@/components/headers/PostHeader.vue';
import SectionTitle from '@/components/SectionTitle.vue';
import UncompleteBox from '@/components/boxes/UncompleteBox.vue';
import CutCard from '@/components/CutCard.vue';

const writingSystems = [
  { jp: 'ひらがな', romaji: 'Hiragana' },
  { jp: 'カタカナ', romaji: 'Katakana' },
  { jp: '漢字', romaji: 'Kanji' },
];

const vowels = ['a', 'i', 'u', 'e', 'o'];
const vowelRows = [
  { label: 'Hiragana', chars: ['あ', 'い', 'う', 'え', 'お'] },
  { label: 'Katakana', chars: ['ア', 'イ', 'ウ', 'エ', 'オ'] },
  { label: 'Romaji', chars: vowels },
];

const kanjiExample = [
  { char: '知', meaning: 'The concept of "knowing"' },
  { char: '死', meaning: 'The concept of "death"' },
];
</script>
