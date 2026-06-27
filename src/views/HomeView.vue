<script setup>
import HomeContent from '../components/HomeContent.vue'
</script>

<template>
  <main>
    <HomeContent />
      <section>
      <h2>Navigation</h2>
        <ul>
          <li><RouterLink to="/projects">Projects</RouterLink></li>
          <li><RouterLink to="/hobbies">Hobbies</RouterLink></li>
          <li><RouterLink to="/blog">Blog</RouterLink></li>
        </ul>
  </section>
  <section>
        <h2>Contact</h2>
        <p>Despite not being active on social media, here are ways to get in touch:</p>
        <ul>
          <li><a href="mailto:e07734maxime@proton.me">Mail-me</a></li>
          <li><a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a></li>
          <li><a href="https://discord.com/users/680737784730091522" target="_blank" rel="noopener noreferrer">Discord</a></li>
        </ul>
  </section>
  </main>
</template>
