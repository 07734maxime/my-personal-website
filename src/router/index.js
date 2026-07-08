import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/projects',
      name: 'Projects',
      component: () => import('../views/ProjectsView.vue'),
    },
    {
      path: '/hobbies',
      name: 'Hobbies',
      component: () => import('../views/HobbiesView.vue'),
    },
    {
      path: '/blog',
      name: 'Blog',
      component: () => import('../views/BlogView.vue'),
    },
    {
      path: "/blog/rust-impressions",
      name: "First impressions about Rust",
      component: () => import("../views/blog/RustImpressionsView.vue"),
      meta: { date: "2023-01-01", description: "I'll talk about my first impressions of Rust here! I tried to implement linear algebra in my first project!", tags: [{label: "rust", color: "bg-rust"}, {label: "programming", color: "bg-green-500"}, {label: "maths", color: "bg-red-500"}] },
    },
    {
      path: "/blog/learning-japanese",
      name: "My experience learning Japanese",
      component: () => import("../views/blog/LearningJapaneseView.vue"),
      meta: { date: "2023-01-02", description: "Why I decided to learn Japanese? What have I learned so far? I'll share my experience here!", tags: [{label: "japanese", color: "bg-red-500"}, {label: "language", color: "bg-indigo-500"}] },
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
    },
    {
      name: "Misc",
      path: "/misc",
      component: () => import("../views/MiscView.vue"),
    }
  ],
})

export default router
