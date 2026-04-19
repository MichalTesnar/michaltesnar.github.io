---
layout: page
title: Puzzle Solving with Diffusion
description: "Reasoning step by step to solve puzzles of big sizes, and maybe generalize...?"
img: assets/img/projects/diffusion/main.png
importance: 1
category: fun
related_publications: false
---

In the Fall semester of 2025 I did a project under supervision of [Joel Mathys](https://disco.ethz.ch/members/jmathys) in the [Distributed Computing Group](https://disco.ethz.ch/) at ETH. I like the work they did on [extrapolative reasoning](https://www.research-collection.ethz.ch/server/api/core/bitstreams/893385b9-2ab5-4669-b075-c6e08b9bdf1f/content) so I was intrigued and wanted to contribute. Although I believe that intelligence is somehow autoregressive (generally about predicting the future), I do not think that LLMs are the best way to go about it, due to the sequential nature of the generation. Diffusion with its correcting mechanisms feels like a more natural process to me than just pure next token prediction. So I wanted to know more.

## How can diffusion solve puzzles?

You might be familiar with diffusion models from the context of image generation, and that is exactly the right way to think about it in this context too: we can generate a solution to a puzzle the way we generate images. Additionally, we condition the solution on the constraints of the puzzle, and the given setting, and we have a solver! Put unsolved puzzle in, get a solved one out.

In our case, we focus on the Tents puzzle from the PUZZLES Benchmark, taking this from my report:

> "A number is assigned to each row and each column, which indicates how many ’tent’ cells should be placed there. Each ’tent’ has to be placed next to a ’tree’. No two tents are adjacent, not even diagonally. Sometimes, a tree is adjacent to more than just its own tents, but it is always orthogonally adjacent to its own tent (i.e. sharing a side with it). The rest of the cells are filled with ’grass’. Importantly, this puzzle features a unique solution."

You can see an example of this below. The visualization also shows conflicts, but we do not need to discuss those at the moment.

<div class="row">
    <div class="col-sm-4 mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/projects/diffusion/puzzle_unsolved.png" class="img-fluid rounded z-depth-1" alt="Unsolved puzzle" %}
    </div>
    <div class="col-sm-4 mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/projects/diffusion/puzzle_solved.png" class="img-fluid rounded z-depth-1" alt="Solved puzzle" %}
    </div>
    <div class="col-sm-4 mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/projects/diffusion/puzzle_wrong.png" class="img-fluid rounded z-depth-1" alt="Wrong puzzle solution" %}
    </div>
</div>

## Extrapolate!!!

If you heard something about _deep learning_ you know it can approximate complex functions, so if we give it enough samples which show unsolved puzzles and their respective solutions, it will eventually find a good predictor. However, this is not the goal. The goal here is to look at what happens if a model trained on small examples, in our case 5x5 grids, now has to solve a puzzle on a 6x6 grid. Can it do it? Humans wouldn't struggle for a minute, the rules generalize exactly as you would expect, but models will. The questions are, why and what can we do about it.

As input and output contain the same number of parts, it is natural to use a transformer encoder. To encode the relative positions of input tokens, we can use rotational embeddings. We stack a couple layers like this, and as outputs are one of 4 classes (empty, grass, tree, tent) we can train end-to-end using cross entropy. Final metric? How many puzzles can we fully solve, something I refer to as _instance accuracy_.

The careful reader has noticed: this has nothing to do with diffusion. True, or at least not yet. This is just straight one-shot prediction, or as I will call it for the rest of the post _encoder_ model. During inference, however, we can use this model to mimic diffusion. To do that, we let the model solve cell by cell. We first let the model predict on all cells, however, we then look at the highest logit (most confident prediction), consider that a turn that the model has played on the puzzle, and insert that back to the starting grid. Notice that now the input changes: we have already solved one cell. Sequentially, we can decode step by step. Once again, is this diffusion? Well, yes, for more theoretical explanation why this is equivalent, please check the [full report](full_text.pdf). During training, we additionally include partially unsolved examples, which makes the model aware of information from partial solutions. And there we are, a diffusion model for solving puzzles!

## Axis of Extrapolation

You can think of how many parts of the puzzle have already been solved, you can think of addition of noise as "corruption". This gives us two axes of extrapolation: _corruption_ (what noise level was I trained on, and how do I do on others) and _size_ (what size was I trained on, and how well can I predict on all sizes). Just to check that we cannot just easily generalize, let us train the model on 5x5 puzzles on different noise levels and see how much we can predict on other sizes...! In this case, we are using the simple encoder inference, the model is not trained on partially solved puzzles.

{% include figure.liquid loading="eager" path="assets/img/projects/diffusion/noise_generalization.svg" class="img-fluid rounded z-depth-1" width="900" alt="Noise Generalization" %}

As we can see, for 0% corruption, we can trivially generalize. This means that the puzzle has no noise at all, so the task is just to copy input onto the output. This generalizes perfectly over sizes. This also gives us a nice outcome to verify that our method works. If this would not generalize, we would be in big trouble. With that out of the way, if you look at just about any other level of corruption, we can see that this does not generalize. Especially at high level of corruption, we are not able to solve anything. This motivates the step-wise decoding procedure described above. We can work ourselves, step-by-step from the difficult mode of high corruption, and into the easy mode of almost no noise! Let's see how to do it.

## Generalization Tricks

If you just let this train on 5x5 puzzles as described above, you will struggle. There is a bit of magic sauce that one has to add.

#### Feature Representation

Deep Learning is great, but it is even greater if you meet it halfway with where its strengths are. The grid is initially represented as a graph with extra nodes that are connected to each row and column, adding the number of tents needed to be there. We call it the _meta_ node. This means that the transformer has to learn to attend to this node. This is fundamentally fine, however, if you keep changing size of the puzzle, it is not immediately obvious where this meta node should be placed in the input sequence and how it should be encoded using rotational encoding. A simple fix is to remove these meta nodes altogether, and just add this information about how many are in a row and how many are in a column directly to the node itself.

#### Random RoPE Cutting

If you add rotational positional encoding (RoPE) onto a 5x5 grid and train on those, the model will never learn the rotational encoding of nodes that are 6 away from each other (what should the angle be?). Therefore while training, we can take a 10x10 grid (the biggest size up to which we will be training) and take a subcut of it of size 5x5. Then we can add those encodings onto the vectors.

#### Ensembling

This is by far my favorite. A 10x10 grid contains multiple 5x5 grids. So why not use the model learned on 5x5 grids, predict on each 5x5 subgrid of the 10x10 grid, average these predictions and take that as the final prediction, and continue decoding? This is mostly inspired by [this paper](https://arxiv.org/abs/2012.10658) which shows that similar technique can work really well.

## Results

As expected, with just a simple ensemble model, you will not get far.

{% include figure.liquid loading="eager" path="assets/img/projects/diffusion/heatmap_final_['full_instance_accuracy'].svg" class="img-fluid rounded z-depth-1" width="900" alt="Final Results" %}

There is very little if any generalization at all. At 4x4 we still do pretty well, as that requires no generalization. However, after 6x6 we do pretty terribly. What if we train a model on uniformly corrupted data, so that we can learn all the steps that need to be done during the solution. Additionally, we slap all those fancy tricks on top and voilà!

{% include figure.liquid loading="eager" path="assets/img/projects/diffusion/heatmap_final_['cut_up_full_instance_accuracy'].svg" class="img-fluid rounded z-depth-1" width="900" alt="Improved Results" %}

That works a lot better. You can see the difference compared to the above.

{% include figure.liquid loading="eager" path="assets/img/projects/diffusion/gain_analysis_final_['full_instance_accuracy', 'cut_up_full_instance_accuracy'].svg" class="img-fluid rounded z-depth-1" width="900" alt="Comparison" %}

So did we win? Not at all. As we can see, we are certainly not generalizing onto higher sizes. There now seems to be a gradual drop-off... That is when my time for this project ran out. I had exams, and other business to attend. Could we have done better? Yes, but for 6 ECTS I am happy with the result.

## Why cannot diffusion models generalize?

Although I am happy with the result of how far we pushed the model, I am not happy with the result overall. How come we did not generalize? Isn't the all-powerful transformer like the best architecture that will bring us AGI? RIGHT? Right, there are a couple of leap-of-faith assumptions in the approach (actually logits are certainly not well calibrated confidence scores), and certainly plenty of mistakes. However, I think there is a more fundamental problem, and it hints towards the fundamental reason why LLMs are so good. But one by one.

This actually hit me after I have presented the research to the DISCO group. They were also surprised that it did not generalize, and so was the professor. Two days after, I wanted to submit my paper and I came up with a theory based on what I remember from computational complexity. I sent it to the prof and my supervisor. They never responded, so take it with a grain of salt.

> I will be assuming P!=NP, and I will show that a transformer architecture that generalizes does not exist. By contraposition, we therefore get that if I were to show you generalization in the above, we could have concluded P=NP.

> The 'tents' puzzle is NP-complete (constraint satisfaction problem). This means that worst case, we need some super-polynomial amount of compute to solve the puzzle given the input size. However, the amount of compute in a fixed transformer architecture (even with multiple inference/decoding steps) grows polynomially in the size of the input and the number of steps taken. Therefore, there DOES NOT EXIST a transformer which could complete the task given unbounded extrapolation domain. That is, we can always find a point where the architecture starts failing by just scaling the input size sufficiently, the worst case output takes non-polynomial time to compute. This is what we see in the results for 9x9 and 10x10.

> Consider the following example grid, and try to resolve whether there is a tent in the top left corner. The top row is empty/tree/empty/tree/empty/tree/empty. Rest of grid is empty, but the row specifies there should be only 3 tents. The rest of the grid is empty, except for the row for one column, which has a tent in it, and the rows around it specify where. To resolve the top row, one first needs to place this bottom tent and then propagate that information onto the top row. This shows that solving the top left cell is a difficult constraint satisfaction problem, which can be adversarially scaled to make up an example which needs more and more compute. As we cannot trust the logits of the model to help us decide with confidence and do the solution step by step, the complexity certainly grows with the grid as the problem is not local.

WOW! What a blast! Suddenly we see that what we set out to do, is basically impossible. However, you might be thinking, how come LLMs do so well, solving difficult problems, which are certainly NP-hard/complete or whatever (given a finite context window, i.e. finite expressive power)? My answer to this is simple.

_Language._

Large can be many things, models are cool, but the language is what makes LLMs so special. We publish everything online these days and this lets the LLMs crunch all the words they need. With that, they can learn to do deduction and convey meaning effectively. Shoutout to the guys back in the days who started speaking and writing, hella nice. Without it, we would not have gotten there. Cause you can follow exactly the same mental exercise above about any auto-regressive model with a bounded architecture. At any step you do some polynomial calculation, and move on again. The bigger the model and the better it is trained the more computation you get out of it each step and you can approximate a more difficult problem. However, the secret sauce remains the language. You produce tokens that the rest of the language model can be conditioned on, but most importantly, you produce sequences that are meaningful in real life beyond just their latent representation. If you learn to model the high-order-polynomial sequences with high utility, you will get something interesting out of it. But you are never solving natively NP problems in a finite polynomial inference.

Or if so, we have a lot more to discuss than just the success of LLMs.

## Additional Material

To finalize my project, I have done a [presentation](presentation.pdf) for the research group. Finally, I was graded on my [write up](full_text.pdf), which contains all the details. Writing has made me realize how bad I got at scientific writing, but oh well. The cleaned-up code you can find at [GitHub](https://www.github.com/MichalTesnar/diffusion-puzzle-solving).
