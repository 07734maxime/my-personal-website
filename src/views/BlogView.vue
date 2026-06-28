<template>
  <main class="blog-view">
    <section class="hero">
      <h1>My personal blog</h1>
      <p>Basically, this is same as hobby page but with more developed content, more explanations and more depth. I may
        eventually expand it to include things that
        are not present on other pages. Do you think it's worth to make an API for this blog? I don't really know, it's
        manually updated for now, and I don't want it
        to be overkill.
      </p>
    </section>

    <section>
      <h2>Navigation</h2>
      <ul class="flex flex-col gap-2 list-none p-0">
        <RouterLink to="/blog/rust-impressions">
          <li class="bg-neutral-200 p-3 hover:border-red-500 border hover:bg-gray-300">

            My first impressions about Rust
            <p class="m-0 text-red italic">Warning: Algebra jumpscare</p>
          </li>
        </RouterLink>
        <RouterLink to="/blog/learning-japanese">
          <li class="bg-neutral-200 p-3 hover:border-red-500 border hover:bg-gray-300">Learning japanese</li>
        </RouterLink>
        <RouterLink to="/blog/yume-nikki">
          <li class="bg-neutral-200 p-3 hover:border-red-500 border hover:bg-gray-300">yumenikki.txt</li>
        </RouterLink>
      </ul>
    </section>
  </main>
</template>