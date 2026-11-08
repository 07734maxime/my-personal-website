<script setup>
import PageTitle from '@/components/PageTitle.vue';
import SectionTitle from '@/components/SectionTitle.vue';
import ProjectComponent from '@/components/ProjectComponent.vue';
import CutCard from '@/components/CutCard.vue';

import { projects } from '@/content';

// Lists come from content/projects.yaml
const { personal, school } = projects;
</script>

<template>
  <main>
    <PageTitle>
      Some of my personal and school projects. Finished, unfinished, and honestly abandoned. I'll add more as I go along.
    </PageTitle>

    <section>
      <SectionTitle>Personal</SectionTitle>
      <div v-reveal.children class="mt-6 border-b border-line">
        <ProjectComponent v-for="(project, i) in personal" :key="project.name" :project="project" :index="i + 1">
          {{ project.description }}
        </ProjectComponent>
      </div>
    </section>

    <CutCard color="ink">学校</CutCard>

    <section>
      <SectionTitle>School</SectionTitle>
      <p class="mt-2 mb-6 text-sm text-muted">Related to my academic work. The ideas behind them weren't mine.</p>
      <div v-reveal.children class="border-b border-line">
        <ProjectComponent v-for="(project, i) in school" :key="project.name" :project="project" :index="i + 1">
          {{ project.description }}
        </ProjectComponent>
      </div>
    </section>
  </main>
</template>
