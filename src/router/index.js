import { createRouter, createWebHistory } from 'vue-router'
import { posts } from '../content/posts.js'

// Markdown posts from content/blog/
const markdownRoutes = posts.map((post) => ({
  path: `/blog/${post.slug}`,
  name: post.title,
  component: () => import('../views/blog/MarkdownPostView.vue'),
  meta: { jp: post.jp, date: post.date, description: post.description, tags: post.tags, markdown: post.body },
}))

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    // Jumping to a section of the same page (table of contents): scroll right away, below the menu bar
    if (to.hash && to.path === from.path) return { el: to.hash, top: 72, behavior: 'smooth' };
    // Otherwise scroll while the boot screen hides the page (to the section if the link has one)
    const target = savedPosition || (to.hash ? { el: to.hash, top: 72 } : { top: 0 });
    return new Promise((resolve) => setTimeout(() => resolve(target), to.hash ? 450 : 250));
  },
  routes: [
    ...markdownRoutes,
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/HomeView.vue'),
      meta: { ep: 0, jp: 'ようこそ', file: 'START', color: 'ink' },
    },
    {
      path: '/projects',
      name: 'Projects',
      component: () => import('../views/ProjectsView.vue'),
      meta: { ep: 1, jp: '作品集', file: 'WORKS', color: 'accent' },
    },
    {
      path: '/hobbies',
      name: 'Hobbies',
      component: () => import('../views/HobbiesView.vue'),
      meta: { ep: 2, jp: '趣味', file: 'SHELF', color: 'ink' },
    },
    {
      path: '/blog',
      name: 'Blog',
      component: () => import('../views/BlogView.vue'),
      meta: { ep: 3, jp: '日記帳', file: 'NOTES', color: 'paper' },
    },
    {
      path: "/blog/rust-impressions",
      name: "First impressions about Rust",
      component: () => import("../views/blog/RustImpressionsView.vue"),
      meta: { jp: "錆", date: "2026-01-01", description: "I'll talk about my first impressions of Rust here! I tried to implement linear algebra in my first project!", tags: [{label: "rust", color: "bg-rust"}, {label: "programming", color: "bg-green-500"}, {label: "maths", color: "bg-red-500"}] },
    },
    {
      path: "/blog/learning-japanese",
      name: "My experience learning Japanese",
      component: () => import("../views/blog/LearningJapaneseView.vue"),
      meta: { jp: "日本語", date: "2026-01-01", description: "Why I decided to learn Japanese? What have I learned so far? I'll share my experience here!", tags: [{label: "japanese", color: "bg-red-500"}, {label: "language", color: "bg-indigo-500"}] },
    },
    {
      name: "Not Found",
      path: "/:catchAll(.*)",
      redirect: "/",
    },
    {
      name: "Japanese Alphabet",
      path: "/misc/japanese-alphabet",
      component: () => import("../views/misc/JapaneseAlphabetView.vue"),
      meta: { jp: "五十音", description: "Every hiragana and katakana with its pronunciation, plus a listening quiz." },
    }
  ],
})

export default router
