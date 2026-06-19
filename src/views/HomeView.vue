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
          <li><RouterLink to="/skills">Skills</RouterLink></li>
          <li><RouterLink to="/contact">Contact</RouterLink></li>
          <li><RouterLink to="/blog">Blog</RouterLink></li>
          <li><RouterLink to="/links">Links</RouterLink></li>
          <li><RouterLink to="/resume">Resume</RouterLink></li>
          <li><RouterLink to="/gallery">Gallery</RouterLink></li>
          <li><RouterLink to="/test">Music</RouterLink></li>
          <li><RouterLink to="/contact">Contact</RouterLink></li>
        </ul>
  </section>
  </main>
</template>
