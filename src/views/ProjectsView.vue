<template>
  <main>
    <RouterLink to="/">...</RouterLink>
    <h1>My Projects</h1>
    <h2>From newest to oldest</h2>
    <section>
      <div>
        <h3>Initialization to Rust</h3>
        <p>My first project in Rust! I had no experience with the language before starting this project, thus I tried to implement algebriac operations to matrix.
          How did I do it? I created a Matrix struct, and implemented elementary operations such as row swapping, sum of rows, and scalar multiplication (TBA).
          My goal here is to implement the Gauss-Jordan elimination algorithm, and then use it to solve systems of linear equations.
          What I would also like is to implement tools related to linear algebra, such as the determinant, the inverse of a matrix and indexed families.
        </p>
      </div>
      <div>
        <h3>This website</h3>
        <p>
          This is the website you are currently viewing, and I made it with Vue.js.
          I wanted to make a website to showcase my projects and to talk about my hobbies.
          This website was initially different, and only oriented about showcasing my projects, but I wanted to make it more personal, and thus I added pages about my hobbies.
        </p>
      </div>
      <div>
        <h3>Yepi</h3>
        <p>
          This project is abandoned.
          The goal there was to make an API to regroup unreleased songs from artists, and to make a website to showcase them.
          I wanted to make it because I was tired of downloading unreleased songs from artists on the internet, and I wanted to make a website to showcase them.
          I gave up on this project because I was doubting about the legality of it, and the ratio of work to the result was too high for me to continue it.
        </p>
      </div>
      <div>
        <h3>Unnamed Project</h3>
        <p>
          This is an unnamed project that I started but never completed.
          The idea was to create a simple web application using Electron to manage colors.
          I wanted to make an app with a fast color picker, extracting colors from images, and a color palette generator.
          Sadly, time made me abandon this project, and I never completed it.
        </p>
      </div>
    </section>
    <h2>School Projects</h2>
    <p>I put these one here because they are related to my academic work, and ideas behind them were not by me.</p>
    <section>
      <div>
        <h3>S101</h3>
        <p>
          Creation of a "Pac-Man" type game using C++.
          This one was is my favorite : even though it was hard to make, I learned a lot about C++ and how to use it to create a simple shell game.
        </p>
      </div>
      <div>
        <h3>R102</h3>
        <p>
          A simple HTML/CSS website to showcase albums and songs from music band. Had no better idea for this project, but it was cool to create.
        </p>
      </div>
      <div>
        <h3>S102</h3>
        <p>
          This project was about implementing voting systems using C++. I implemented the Borda count, the two-round system, and the one-round system.
          Not really fun to make but was useful to learn about how C++ works and how to implement algorithms in it.
        </p>
      </div>
    </section>
  </main>
</template>
