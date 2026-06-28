<template>
    <main>
        <h1>My first impressions about Rust</h1>
        <p>As someone who used a lot of high-level languages, Rust was kinda surprising in its approach to memory
            management and performance.
            I can't lie, Rust is really hard to understand. I had to read a lot of documentation and watch a lot of
            videos to understand how it works,
            and even then, I still have a lot to learn.
        </p>
        <p>Given that I'm following engineering studies, I've decided to apply what I've learned this year with Rust (my
            school is using Python instead, but this is too easy)</p>
        <h2>My first Rust project: implementing Linear Algebra</h2>
        <p>Title explains all. My goal here is to implement a simple linear algebra library in Rust, including :</p>
        <ul>
            <li>Vector spaces and subspaces</li>
            <li>Linear independence and spanning families</li>
            <li>Basis and dimensions</li>
            <li>Rank theorem</li>
            <li>Row echelon form</li>
            <li>Matrix inversion</li>
            <li>Linear maps and transformations</li>
            <li>Kernel and image</li>
            <li>Polynomials</li>
        </ul>
        <p>Currently, I'm implementing Gaussian elimination, and matrix inversion. I'm planning to extend it with
            determinant calculation, so I'll update this as I progress.</p>
        <h3>Matrix</h3>
            <h4>Definition</h4>
                <p>First of all, let's define the <Latex formula="A_{i,j}" :displayMode="false"></Latex> Matrix with <Latex
                        formula="\{(i, j) \in \{1, \dots, n\}^2 \mid i = j\}" :displayMode="false"></Latex>. We admit that <Latex formula="i = j" :displayMode="false"></Latex> to simplify the notation :</p>
                <Latex
                    formula="A = \begin{pmatrix} a_{11} & a_{12} & \cdots & a_{1j} \\ a_{21} & a_{22} & \cdots & a_{2j} \\ \vdots & \vdots & \ddots & \vdots \\ a_{i1} & a_{i2} & \cdots & a_{ij} \end{pmatrix}"
                    :displayMode="true" />
                <p>Implementing a vector of a vector is not straightforward in Rust : so I'm using a flat vector <code>Vec&lt;f64&gt;</code> instead to represent it.</p>
                <p>Thus, the matrix is represented as a flat vector of size <Latex formula="m" :displayMode="false"></Latex>, enough to store a square matrix in a single vector.</p>
                <p>I needed then to establish a mapping between the 2D indices and the 1D index in the flat vector, so I converted the 2D indices to a 1D index using the formula <Latex formula="k = i \times n + i" :displayMode="false"></Latex>.</p>
                
                <p>Thus, I created the following <code>struct</code> :</p>
                <CodeBlock code="struct Matrix {
    data: Vec<f64>,
    n: usize,
}" language="rust" />
                <p>Take acknowledge that all the functions are implemented inside of the <code>impl Matrix</code> block.</p>
        
            <h4>Elementary operations</h4>
                <p>Now that I have a matrix, I can implement elementary operations on it. The elementary operations are :</p>
                <ul>
                    <li>Row swapping</li>
                    <li>Row multiplication by a scalar</li>
                    <li>Row addition</li>
                </ul>
                <p>These operations are implemented as methods of the <code>Matrix</code> struct, and they are used to implement the Gaussian elimination algorithm.</p>
                <ul>
                    <li>I've first of all created a function <code>get_row</code> to retrieve a specific row from the matrix. I will use this function to implement the elementary operations.</li>
                    <li>The row swapping function (<Latex formula="L_1 \longleftrightarrow L_2" :displayMode="false"></Latex>) simply calls the <code>get_row</code> function to retrieve two rows and then swaps them.</li>
                    <li>The row multiplication by a scalar function (<Latex formula="L_i \leftarrow \alpha \cdot L_i" :displayMode="false"></Latex>) calls the <code>get_row</code> function to retrieve a row and then multiplies each element by the scalar.</li>
                    <li>The row addition function (<Latex formula="L_i \leftarrow L_i + \alpha L_j" :displayMode="false"></Latex>) calls the <code>get_row</code> function to retrieve two rows and then adds them together.</li>
                </ul>

                <p>Let's take an example to illustrate how these operations work. Consider the following matrix:</p>
                <Latex
                    formula="A = \begin{pmatrix} 1 & 2 & 3 \\ 4 & 5 & 6 \\ 7 & 8 & 9 \end{pmatrix}"
                    :displayMode="true" />
                <p>We can perform the following operations on this matrix:</p>
                <ul>
                    <li>Swap the first and second rows:</li>
                    <Latex
                        formula="A \sim \begin{pmatrix} 4 & 5 & 6 \\ 1 & 2 & 3 \\ 7 & 8 & 9 \end{pmatrix}"
                        :displayMode="true" />
                    <li>Multiply the second row by 2:</li>
                    <Latex
                        formula="A \sim \begin{pmatrix} 4 & 5 & 6 \\ 2 & 4 & 6 \\ 7 & 8 & 9 \end{pmatrix}"
                        :displayMode="true" />
                    <li>Add 3 times the first row to the third row:</li>
                    <Latex
                        formula="A \sim \begin{pmatrix} 4 & 5 & 6 \\ 2 & 4 & 6 \\ 19 & 23 & 27 \end{pmatrix}"
                        :displayMode="true" />
                </ul>
                <p>These operations are the building blocks for the Gaussian elimination algorithm, which I will implement soon.</p>
            <article class="bg-neutral-200 p-3 border-red-500 border">
                <h3>To Do</h3>
                <ul>
                    <li>Implement the Gaussian elimination algorithm</li>
                    <li>Implement determinant calculation
                        <ul>
                            <li>Implement the determinant calculation using the Gaussian elimination algorithm</li>
                            <li>Implement the determinant calculation using the Laplace expansion (cofactor expansion)</li>
                        </ul>
                    </li>
                    <li>Implement matrix inversion
                        <ul>
                            <li>Implement the matrix inversion using the Gaussian elimination algorithm</li>
                            <li>Implement the matrix inversion using the adjugate matrix and determinant</li>
                            <li>Implement matrix inversion using the characteristic polynomial (Cayley-Hamilton theorem)</li>
                        </ul>
                    </li>
                    <li>I'll see for more features if I have time and motivation</li>
                    <li>Optimize the code for better performance</li>
                </ul>
            </article>
            <h3>What do I think?</h3>
            <p>Honestly, Rust is very frustrating when you always used high-level languages. However, I feel like I can get used to it with practice, thus progressing.
                Maybe using maths to learn Rust was not the best idea, but I would not have learned it otherwise, and practicing like that may improve my maths skills and my programming skills at the same time.   
            </p>
            <p>I could've write something more efficient though, but I had no idea how.</p>
    </main>
</template>

<script setup>
import Latex from '@/components/Latex.vue';
import CodeBlock from '@/components/CodeBlock.vue';
</script>