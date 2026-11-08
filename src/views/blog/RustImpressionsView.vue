<template>
    <main v-reveal.children class="prose-body flex flex-col gap-5">

        <PostHeader />

        <p class="text-xl! text-paper!">
            As someone who used a lot of high-level languages, Rust was kinda surprising in its approach to memory
            management and performance. I had to read the doc for a long time to start understanding how it works.
        </p>

        <SectionTitle>My first Rust project</SectionTitle>

        <p>Implementing a simple linear algebra library, including: vector spaces, linear
            independence, rank theorem, row echelon form, matrix inversion...</p>

        <SectionTitle>Matrix Definition</SectionTitle>

        <p>
            First of all, let's define a square matrix
            <Latex :displayMode="false">A = (a_{i,j})</Latex>
            of size <Latex :displayMode="false">n</Latex>, with
            <Latex :displayMode="false">(i, j) \in \{1, \dots, n\}^2</Latex>:
        </p>

        <LatexBox :displayMode="true">A = \begin{pmatrix} a_{11} & a_{12} & \cdots & a_{1n} \\ a_{21} & a_{22} & \cdots
            & a_{2n} \\ \vdots & \vdots & \ddots & \vdots \\ a_{n1} & a_{n2} & \cdots & a_{nn} \end{pmatrix}</LatexBox>


        <p>Implementing a vector of a vector is not straightforward in Rust : I'm using a flat vector
            <CodeText>Vec&lt;f64&gt;</CodeText> instead to represent the matrix.
        </p>


        <p>
            I needed then to establish a mapping between the 2D indices and the 1D index in the flat vector,
            so I used the formula <Latex :displayMode="false">k = i \times n + j</Latex>.
        </p>

        <p>Thus, I created the following <CodeText>struct</CodeText>.</p>


        <CodeBox lang="rust" filename="matrix.rs" :code="`struct Matrix {
  data: Vec<f64>,
  n: usize
}`" />

        <p>Note that all the functions are implemented inside of the <CodeText>impl Matrix</CodeText> block.</p>



        <SectionTitle>Elementary operations</SectionTitle>

        <p>Let's implement the elementary operations on our matrix. Consider the following matrix :
        </p>

        <LatexBox :displayMode="true">A = \begin{pmatrix} 1 & 2 & 3 \\ 4 & 5 & 6 \\ 7 & 8 & 9 \end{pmatrix}</LatexBox>


        <p>We can perform the following operations on this matrix (all of these operations are
            independent):</p>

        <ul class="flex flex-col gap-3">
            <OperationBox title="Row swapping">
                <template #formula>
                    <Latex :displayMode="false">L_1 \longleftrightarrow L_2</Latex>
                </template>
                <template #result>
                    <Latex :displayMode="true">A \sim \begin{pmatrix} 4 & 5 & 6 \\ 1 & 2 & 3 \\ 7 & 8 & 9 \end{pmatrix}
                    </Latex>
                </template>
            </OperationBox>

            <OperationBox title="Row multiplication by a scalar">
                <template #formula>
                    <Latex :displayMode="false">L_i \leftarrow 2L_i</Latex>
                </template>
                <template #result>
                    <Latex :displayMode="true">A \sim \begin{pmatrix} 1 & 2 & 3 \\ 8 & 10 & 12 \\ 7 & 8 & 9
                        \end{pmatrix}</Latex>
                </template>
            </OperationBox>
        </ul>

        <p>These operations are fundamental to linear algebra and are used in the Gaussian elimination
            algorithm.</p>

        <CutCard color="accent">行列</CutCard>

        <SectionTitle>Let's code!</SectionTitle>

        <UncompleteBox>I'll explain the process of implementing these operations in Rust - more coming soon...</UncompleteBox>





        <SectionTitle>What's next?</SectionTitle>


        <AboutBox title="TODO.txt">
            <ul class="list-disc marker:text-accent pl-5 space-y-2 leading-relaxed">
                <li>Implement the Gaussian elimination algorithm</li>
                <li>Implement determinant calculation
                    <ul class="list-[circle] marker:text-muted pl-5 mt-2 space-y-1.5 text-sm text-paper/70">
                        <li>Implement the determinant calculation using the Gaussian elimination algorithm</li>
                        <li>Implement the determinant calculation using the Laplace expansion (cofactor expansion)</li>
                    </ul>
                </li>
                <li>Implement matrix inversion
                    <ul class="list-[circle] marker:text-muted pl-5 mt-2 space-y-1.5 text-sm text-paper/70">
                        <li>Implement the matrix inversion using the Gaussian elimination algorithm</li>
                        <li>Implement the matrix inversion using the adjugate matrix and determinant</li>
                        <li>Implement matrix inversion using the characteristic polynomial (Cayley-Hamilton theorem)</li>
                    </ul>
                </li>
                <li>I'll see for more features if I have time and motivation</li>
                <li>Optimize the code for better performance</li>
            </ul>
        </AboutBox>



        <SectionTitle>My Thoughts</SectionTitle>
        <p>Honestly, Rust is very frustrating when you've always used high-level languages. However, I
            feel like I can
            get used to it with practice, thus progressing.
            Maybe using maths to learn Rust was not the best idea, but I would not have learned it otherwise, and
            practicing like that may improve my maths skills and my programming skills at the same time.
        </p>
        <p>I could've written something more efficient though, but I had no idea how.</p>
    </main>
</template>

<script setup>

import AboutBox from '@/components/boxes/AboutBox.vue';
import SectionTitle from '@/components/SectionTitle.vue';
import CodeBox from '@/components/boxes/CodeBox.vue';
import Latex from '@/components/Latex.vue';
import LatexBox from '@/components/boxes/LatexBox.vue';
import OperationBox from '@/components/boxes/OperationBox.vue';
import PostHeader from '@/components/headers/PostHeader.vue';
import CodeText from '@/components/text/CodeText.vue';
import UncompleteBox from '@/components/boxes/UncompleteBox.vue';
import CutCard from '@/components/CutCard.vue';

</script>