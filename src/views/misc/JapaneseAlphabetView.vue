<script setup>
import { ref, computed } from 'vue';
import AboutBox from '@/components/boxes/AboutBox.vue';
import PageTitle from '@/components/PageTitle.vue';

const layout = ref('hiragana');
const mode = ref('chart'); // 'chart' | 'quiz'
const switchLayout = (newLayout) => { layout.value = newLayout; };

const rows = [
  [{ hiragana: 'あ', katakana: 'ア', romaji: 'a' }, { hiragana: 'い', katakana: 'イ', romaji: 'i' }, { hiragana: 'う', katakana: 'ウ', romaji: 'u' }, { hiragana: 'え', katakana: 'エ', romaji: 'e' }, { hiragana: 'お', katakana: 'オ', romaji: 'o' }],
  [{ hiragana: 'か', katakana: 'カ', romaji: 'ka' }, { hiragana: 'き', katakana: 'キ', romaji: 'ki' }, { hiragana: 'く', katakana: 'ク', romaji: 'ku' }, { hiragana: 'け', katakana: 'ケ', romaji: 'ke' }, { hiragana: 'こ', katakana: 'コ', romaji: 'ko' }],
  [{ hiragana: 'さ', katakana: 'サ', romaji: 'sa' }, { hiragana: 'し', katakana: 'シ', romaji: 'shi' }, { hiragana: 'す', katakana: 'ス', romaji: 'su' }, { hiragana: 'せ', katakana: 'セ', romaji: 'se' }, { hiragana: 'そ', katakana: 'ソ', romaji: 'so' }],
  [{ hiragana: 'た', katakana: 'タ', romaji: 'ta' }, { hiragana: 'ち', katakana: 'チ', romaji: 'chi' }, { hiragana: 'つ', katakana: 'ツ', romaji: 'tsu' }, { hiragana: 'て', katakana: 'テ', romaji: 'te' }, { hiragana: 'と', katakana: 'ト', romaji: 'to' }],
  [{ hiragana: 'な', katakana: 'ナ', romaji: 'na' }, { hiragana: 'に', katakana: 'ニ', romaji: 'ni' }, { hiragana: 'ぬ', katakana: 'ヌ', romaji: 'nu' }, { hiragana: 'ね', katakana: 'ネ', romaji: 'ne' }, { hiragana: 'の', katakana: 'ノ', romaji: 'no' }],
  [{ hiragana: 'は', katakana: 'ハ', romaji: 'ha' }, { hiragana: 'ひ', katakana: 'ヒ', romaji: 'hi' }, { hiragana: 'ふ', katakana: 'フ', romaji: 'fu' }, { hiragana: 'へ', katakana: 'ヘ', romaji: 'he' }, { hiragana: 'ほ', katakana: 'ホ', romaji: 'ho' }],
  [{ hiragana: 'ま', katakana: 'マ', romaji: 'ma' }, { hiragana: 'み', katakana: 'ミ', romaji: 'mi' }, { hiragana: 'む', katakana: 'ム', romaji: 'mu' }, { hiragana: 'め', katakana: 'メ', romaji: 'me' }, { hiragana: 'も', katakana: 'モ', romaji: 'mo' }],
  [{ hiragana: 'や', katakana: 'ヤ', romaji: 'ya' }, null, { hiragana: 'ゆ', katakana: 'ユ', romaji: 'yu' }, null, { hiragana: 'よ', katakana: 'ヨ', romaji: 'yo' }],
  [{ hiragana: 'ら', katakana: 'ラ', romaji: 'ra' }, { hiragana: 'り', katakana: 'リ', romaji: 'ri' }, { hiragana: 'る', katakana: 'ル', romaji: 'ru' }, { hiragana: 'れ', katakana: 'レ', romaji: 're' }, { hiragana: 'ろ', katakana: 'ロ', romaji: 'ro' }],
  [{ hiragana: 'わ', katakana: 'ワ', romaji: 'wa' }, null, null, null, { hiragana: 'を', katakana: 'ヲ', romaji: 'wo' }],
  [{ hiragana: 'ん', katakana: 'ン', romaji: 'n' }, null, null, null, null],
];

const alphabet = rows.flat();
const kana = alphabet.filter(Boolean);

const play = (char) => new Audio(`/audio/${char.romaji}.mp3`).play().catch(() => {});

// Chart: the tapped card pops while its sound plays
const popping = ref(null);
const playKana = (char) => {
  if (!char) return;
  popping.value = null;
  requestAnimationFrame(() => (popping.value = char.romaji));
  play(char);
};

// Quiz: hear a sound, pick the matching character
const quiz = ref({ answer: null, choices: [], picked: [], solved: false });
const score = ref({ good: 0, total: 0, streak: 0, best: 0 });

const shuffle = (list) => [...list].sort(() => Math.random() - 0.5);

const nextQuestion = () => {
  const answer = kana[Math.floor(Math.random() * kana.length)];
  const others = shuffle(kana.filter(k => k !== answer)).slice(0, 3);
  quiz.value = { answer, choices: shuffle([answer, ...others]), picked: [], solved: false };
  play(answer);
};

const pick = (choice) => {
  const q = quiz.value;
  if (q.solved || q.picked.includes(choice)) return;
  q.picked.push(choice);

  if (choice === q.answer) {
    q.solved = true;
    // Only a first-try answer counts as good
    const firstTry = q.picked.length === 1;
    score.value.total++;
    if (firstTry) {
      score.value.good++;
      score.value.streak++;
      score.value.best = Math.max(score.value.best, score.value.streak);
    }
    setTimeout(nextQuestion, 900);
  } else {
    score.value.streak = 0;
  }
};

const choiceState = (choice) => {
  const q = quiz.value;
  if (!q.picked.includes(choice)) return 'idle';
  return choice === q.answer ? 'right' : 'wrong';
};

const switchMode = (newMode) => {
  mode.value = newMode;
  if (newMode === 'quiz' && !quiz.value.answer) nextQuestion();
};

const accuracy = computed(() => score.value.total ? Math.round(score.value.good / score.value.total * 100) : 0);
</script>

<template>
  <main>
    <PageTitle>Every hiragana and katakana with its pronunciation. When you think you know them, try the quiz.</PageTitle>

    <div v-reveal class="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div class="flex border border-line text-xs uppercase tracking-widest" role="group" aria-label="Script">
        <button v-for="script in ['hiragana', 'katakana']" :key="script" type="button"
          class="cursor-pointer px-4 py-2 transition-colors first:border-r first:border-line"
          :class="layout === script ? 'bg-paper text-ink' : 'text-muted hover:text-paper'"
          :aria-pressed="layout === script" @click="switchLayout(script)">
          {{ script === 'hiragana' ? 'あ' : 'ア' }} {{ script }}
        </button>
      </div>
      <div class="flex border border-line text-xs uppercase tracking-widest" role="group" aria-label="Mode">
        <button v-for="m in ['chart', 'quiz']" :key="m" type="button"
          class="cursor-pointer px-4 py-2 transition-colors first:border-r first:border-line"
          :class="mode === m ? 'bg-accent text-paper' : 'text-muted hover:text-paper'"
          :aria-pressed="mode === m" @click="switchMode(m)">{{ m }}</button>
      </div>
    </div>

    <AboutBox v-reveal="100" hideTitle class="mb-8">
      <template v-if="mode === 'chart'">Tap a character to hear how it's pronounced.</template>
      <template v-else>Listen to the sound, then pick the matching character. Only first tries count!</template>
    </AboutBox>

    <Transition name="page" mode="out-in">
      <ul v-if="mode === 'chart'" key="chart" v-reveal.children class="grid grid-cols-5 gap-px border border-line bg-line">
        <li v-for="(char, index) in alphabet" :key="index" class="bg-ink">
          <button v-if="char" type="button" @click="playKana(char)" :aria-label="`Play ${char.romaji}`"
            :class="{ pop: popping === char.romaji }" @animationend="popping = null"
            class="group flex h-full w-full cursor-pointer select-none flex-col items-center justify-center gap-1 py-4 transition-colors hover:bg-white/5 sm:py-6">
            <Transition name="flip" mode="out-in">
              <span :key="layout" class="font-display text-3xl font-extrabold sm:text-4xl">{{ char[layout] }}</span>
            </Transition>
            <span class="text-xs text-muted group-hover:text-accent">{{ char.romaji }}</span>
          </button>
        </li>
      </ul>

      <section v-else key="quiz" class="flex flex-col gap-8 border border-line bg-ink-2 p-5 sm:p-8">
        <div class="flex justify-between text-xs uppercase tracking-widest text-muted">
          <span>Score <span class="text-paper">{{ score.good }}/{{ score.total }}</span> ({{ accuracy }}%)</span>
          <span>
            Streak <span :key="score.streak" class="inline-block text-accent" :class="{ pop: score.streak > 0 }">{{ score.streak }}</span>
            · best {{ score.best }}
          </span>
        </div>

        <button type="button" @click="play(quiz.answer)"
          class="mx-auto flex cursor-pointer items-center gap-3 border border-accent px-6 py-4 text-sm uppercase tracking-widest transition-colors hover:bg-accent">
          <span aria-hidden="true">▶</span> Play the sound again
        </button>

        <Transition name="page" mode="out-in">
          <ul :key="quiz.answer?.romaji" class="grid grid-cols-2 gap-px border border-line bg-line">
            <li v-for="choice in quiz.choices" :key="choice.romaji">
              <button type="button" @click="pick(choice)" :disabled="quiz.solved && choiceState(choice) === 'idle'"
                class="flex w-full cursor-pointer flex-col items-center gap-1 py-6 font-display text-5xl font-extrabold transition-colors disabled:cursor-default disabled:opacity-30"
                :class="{
                  'bg-ink hover:bg-white/5': choiceState(choice) === 'idle',
                  'bg-paper text-ink pop': choiceState(choice) === 'right',
                  'bg-accent/30 text-paper/50 shake line-through': choiceState(choice) === 'wrong',
                }">
                {{ choice[layout] }}
                <span v-if="choiceState(choice) !== 'idle'" class="text-xs font-normal">{{ choice.romaji }}</span>
              </button>
            </li>
          </ul>
        </Transition>

        <button type="button" @click="nextQuestion" class="mx-auto cursor-pointer text-xs uppercase tracking-widest text-muted hover:text-paper">
          ↻ Skip
        </button>
      </section>
    </Transition>
  </main>
</template>
