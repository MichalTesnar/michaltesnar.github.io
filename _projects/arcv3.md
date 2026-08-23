---
layout: page
title: ARC-AGI-3 with Language and Without
description: Is logical reasoning even possible without massive priors?
img: assets/img/projects/arcv3/Ls20Start.png
importance: 1
related_publications: false
---

I just finished working at [Tufa Labs](https://tufalabs.ai/) for 6 months on [ARC-AGI-3](https://arcprize.org/arc-agi/3), focusing on building LLM harnesses, data collection and analysis and post-training pipelines. In this post, I would like to share my thoughts about the problem. But first I would like to thank the lab, it was my home for half a year, it's a lovely group of people! Big thanks to Ben & Jerome, the ARC Team (Harold, Dries, Jeroen, Stefano, Isaiah) and everyone else in the company. I had a great time, and all the best to you!

## ARC-AGI-3

Now to the topic: ARC-AGI-3, the Abstract Reasoning Corpus for Artificial General Intelligence (version 3) is a benchmark that is generally designed to challenge Large Language Models (LLMs) as the reigning paradigm of artificial intelligence. The problem of assessing intelligence has to do with memorization. Anecdotal example from my bachelors: once a professor re-used an exam from last year for a math subject, just modifying the constants in the exercises, and what should have been a test of my deep understanding of the material turned into a speedrun filling up a sheet of exercises that I have already seen before. You see, I have not had to think much, create deep abstract representations of concepts to be able to predict what steps to use to solve the exercises, rather I just mechanically repeated what I have seen before. It turns out that LLMs are great at just that, but that is not general intelligence, more like general memory. (I think this is still an awesome claim to make. I think it shows how hedonistic the AI researchers really are, the moment we solved memory we quickly adapted our definition of general intelligence to disqualify these solutions).

So how do we test whether some models can truly reason? The answer of ARC-AGI-3 in its [technical paper](https://arxiv.org/abs/2603.24621) is to create puzzles which strip out cultural knowledge and keep only "core priors" -- intuitions that babies would also have about objects and movement as principles behind the functioning of the puzzle. Create interactive puzzles that are completely novel (not copies of previous games with known solutions) which have enough states not to be simply bruteforceable. Let the model do (1) exploration, (2) modelling, (3) goal setting and (4) planning and execution all at the same time. The games have multiple levels, which are not just difficulty progressions of the previous levels, each level introduces a new technique, this means that the model has to adapt to changing circumstances. Finally, to guarantee that true general intelligence can solve the puzzles just let humans solve them and score models on action efficiency with respect to human execution trajectories (technicalities in the paper).

{% include figure.liquid loading="eager" path="assets/img/projects/arcv3/Ls20Human.gif" class="img-fluid rounded z-depth-1 mx-auto d-block" width="300" alt="Gif" %}

The gif above comes from [here](https://docs.arcprize.org/). I invite you to try the tasks [here](https://arcprize.org/tasks/ls20). What you will be playing are the public games: examples that everyone can see, there is also a semi-private set (that can be used to evaluate LLMs over APIs) and a private set, that is only available on the Kaggle leaderboard in a [closed container](https://www.kaggle.com/competitions/arc-prize-2026-arc-agi-3/).

## The Adversarial Benchmark

This idea, as proposed by Francois Chollet is very inspiring. He brought people together in a [foundation](https://arcprize.org/) to deeply think and create material which is hard for LLMs. This got me really excited about the problem. The first results were promising, the frontier LLMs sucked at the challenge. And I thought: that is great, we will finally figure out what is missing from making LLMs the ultimate reasoners. I thought this was the mission to be part of: cause whatever would come out of this, would push the frontier the next step towards AGI. However, I would argue they tried to be too adversarial to LLMs, rather than targeting the core. As a result, they built a benchmark which is adversarial to LLMs in ways which did not turn out to be fundamental:

1. _Input Modality_: the ARC-AGI-3 puzzles are presented as 64x64 grids each with an integer value representing a color. They contain many small (1-2 pixel) features, which have a discrete meaning. Although this can be transferred into text, LLMs are not native with 2D context in text (a newline is just a character). You can pass images into a vision head, but the small pixel-perfect details often get lost. Not unsolvable, but akin to making people run backwards, just awkward ([though seems to be a thing](https://en.wikipedia.org/wiki/Backward_running)).

2. _No Harness / Context Engineering_: [the technical report of ARC-AGI-3](https://arxiv.org/abs/2603.24621) gives only a minimal prompt that can be given to the model. This limits the in-context abilities of the model, as it has to learn to organize all the observations and actions itself. And if you think that this is not a limit, then check out [Symbolica's solution](https://www.symbolica.ai/blog/arc-agi-3) which scored around 36% during the first day after the release on the public data. Not 100% but still a massive score. Other harnesses, like [schema](https://schema-harness.github.io/) have since reached ~100% score.

3. _Long Context_: at the time of publishing, most LLMs would have around 128k token context length (note: tokens <= characters / 3). Solving 6-8 levels of a puzzle with changing rules and seeing all trials and errors and actions can mean a lot more than that for many models. This ties well with the previous point, where maybe it does not really matter.

## Our Solution

Partial results of what I have been doing during my internship you can read on the company blog as we [published it for the first milestone](https://tufalabs.ai/research/duck-harness/). Even though you would think that this LLM-adversarial benchmark would produce other than an LLM-based solution, you would be terribly wrong! It happened that after months of research, we realized that to create something general enough to handle any sort of new puzzle, with completely new techniques, we have to go through language. This creates a universal layer on which you can build other things.

The [technical write-up](https://www.kaggle.com/competitions/arc-prize-2026-arc-agi-3/discussion/717133) contains a couple of interesting tricks and ways to work with the LLMs, however, the idea itself is not very novel. With [Qwen 3.6 27B](https://huggingface.co/Qwen/Qwen3.6-27B), the harness scored 1.21%. The code is [public](https://github.com/Tufalabs/duck-harness).

It was during the [MLST episode at Tufa Labs](https://www.youtube.com/watch?v=Vg6FBKTlfOw) about the broader context of all of this solution which made me reflect on the depth of the solution. I think this is really interesting: how is it that language is enough, why is it enough? And I started analyzing the skills needed to solve ARC-AGI-3.

## Capabilities for Solving ARC

In my mind, there are a couple of fundamental capabilities for solving ARC-AGI-3. Because the task in itself of solving a whole puzzle can be quite daunting, we can break it down into smaller bits (essentially what harnesses and prompt engineering do for language models) which will be more tractable. For each of them, I will try to show how the capabilities are covered by language model in-context learning. Their principles will be demonstrated with Gemini 3 Flash-Lite, which is freely available [online](https://gemini.google.com) as of 19/08/2026.

### 1. Environment Exploration

Say I take a pre-trained model (non-language model) on a game A and I give it a new possible action it can take in a game B. For a model trained solely on game A (if not trained during its deployment), the model will have a problem to even take this new action; however, a language model can do this.

```
> USER: There is an environment, where you can take actions A, B, C, D. You have already taken actions A, B, and D. They did not lead to the solution. Which action will you try now?

> ASSISTANT: You should try **action C** next! Since A, B, and D didn't work out, C is the only remaining option left to test.
```

This may seem very simple, and on surface level it actually is. This is a pretty natural sequence a language model can create. However, teaching this to a machine learning model is not that easy, especially if action C never existed in previous data.

### 2. Compression by Code Golfing

First formally introduced by [Executable World Model](https://arxiv.org/abs/2605.05138), a valid strategy for aggregation of experience of a language model from a coding exercise is through letting the model write code that represents a "world model", a model that pixel perfect generates that replay of the game given the actions. This work even goes a bit further to ask the model to revise the code and make it shorter and less overfitted. This is something like the idea of [Kolmogorov Complexity](https://en.wikipedia.org/wiki/Kolmogorov_complexity) as we compress the experience as the shortest string of code that produces the output (in this case conditioned on the actions).

You can do this in language with the help of priors. Consider the presented input to the model:

```> USER: You observe state action state pairs (1, 1) -> A -> (1, 3), (1, 3) -> B -> (2, 3). Write a Python function world_model(state, action) -> state that produces that experience. Reason to generalize over the principles to make it usable for other states and actions.

```

The model could output any operation that would set the right coordinates: either hardcode change of one coordinate, or hardcode multiplication! However, it added rules for addition, as you can see in the output below.

```> ASSISTANT:
def world_model(state: tuple[int, int], action: str) -> tuple[int, int]:
    y, x = state
    action_effects = {
        'A': (0, 2),  # Action A moves +2 on the x-axis
        'B': (1, 0),  # Action B moves +1 on the y-axis
    }
    if action in action_effects:
        dy, dx = action_effects[action]
        return (y + dy, x + dx)
    return state
```

You might say that this is not surprising! But I think this is quite remarkable, cause it means that language lets us approximate the process of extraction of experience into simple rules while applying priors. Something like the Bayes' rule, but for experience world models. The posterior is your prior, times likelihood divided by evidence: prior is the language model, likelihood is given by the language model on the given context, and evidence is irrelevant.

### 3. Goal Hypothesis

I think this is actually where language models excel. The ARC-AGI-3 games have been built by humans. If you have a model that can absorb everything that a human could ever see, at some point, the model has to think, for example, "this is a maze, I have to go to the end goal". Maze is an abstract concept, there are so many ways a maze can look. However, the [LS20](https://arcprize.org/tasks/ls20) task from the ARC-AGI-3 set (and many others) relies on this idea. This idea is deep in us humans, when we are trying to create puzzles, we implicitly use those goals to model our puzzles. This is where a foundational model shines: it covers the distribution and can broadly respond to datapoints in it.

### 4. Search

Once there is a world model and a goal, what remains is to search for the hypothesized goal in the model. This can be conveniently done with breadth-first-search or other algorithms. Here another useful property of language pops up: we can use it to write a string in a Turing-complete language. With the help of tooling, we can easily search, or perform any other thing we need from our model. We could say that this goes too far. We could definitely disallow the models from outputting strings of executable code, saying that this is cheating. We could ask the (generative language) model to solve the task without that. However, the code itself to run the model is either way a Turing-complete program, so that feels a bit weird.

### 5. Execution & Correction

For the previously presented example about a world model, it is fair to say that what the model created is wrong. What happens when we present the language model with contradicting evidence? The intention here was to move from addition to multiplication.

```
> USER: Suppose you observe (1,3) -> A -> (1,9). How would you update your model?
> ASSISTANT:
def world_model(state: tuple[int, int], action: str) -> tuple[int, int]:
    y, x = state
    action_effects = {
        'A': lambda y, x: (y, x * 3), # Action A scales the x-coordinate by a factor of 3
        'B': lambda y, x: (y + 1, x), # Action B adds 1 to the y-coordinate (pending further observations)
    }
    if action in action_effects:
        return action_effects[action](y, x)
    return state
```

And there you are, language implements (very conveniently) the function to learn from your own mistakes.

These 5 steps, in my opinion, are "all you need" to be able to solve puzzles like ARC, and this is what we also see. The solution that was working from the start was the RGB agent, which turned into the [PRO-LONG](https://arxiv.org/pdf/2607.20064) harness. Idea: take a strong model, give it a log of the game, let it live in its native coding harness, give it interfaces for making actions, and there is your solution. Enough freedom, good interface, and the model can just roll on its own.

## Expressivity of Language

Writing all of this out has really made me appreciate how powerful language is. The initial idea for this write-up was to showcase my simple adaptation of [CompressARC](https://iliao2345.github.io/blog_posts/arc_agi_without_pretraining/arc_agi_without_pretraining.html), which was made for ARC-AGI-1, adapted for ARC-AGI-3-like tasks: from simple observations taken by random actions you can learn a compressive world model, and then you can hypothesize a goal (by pre-training on seeing goals of other games, my argument for that is seeing a professional gamer solve ARC-AGI-3 puzzles, he absolutely obliterated them, I think this is cause a professional gamer is basically a pretrained model for games). When you have that, you can unroll your world model with BFS, and then execute the actions towards a goal. The caveat is you have to build the biases into the network, so this method is not completely without pre-training. This idea can rest in peace here.

Language is extremely powerful. In a language model, we can model processes that help us approximate solutions to very useful tasks. And ARC-AGI-3 shows that this works. Language can be this meta tool where a description of doing a task directly turns into an instruction for doing it. And by writing executable code, we enter the Turing-complete world where, as if from a genie's bottle, we make any wish come true by just writing it down. It makes me wonder: is there any actual limit to language? Is there anything we cannot solve using language?

The [Church-Turing thesis](https://en.wikipedia.org/wiki/Church%E2%80%93Turing_thesis) tells us any function can be calculated by a finite-time deterministic method if and only if it can be calculated by a Turing machine. Leaving the details aside, that tells us that if a language model can produce a Turing-complete string, it can also write a string for any computable function. If you exclude tasks with randomness, self-reference paradoxes, and arbitrary metaphysical claims about human intuition, then to the best of my knowledge there does not seem to exist a concrete task that can be systematically solved by some deterministic physical/intellectual process but cannot be solved by any deterministic program. Meaning: everything can be done by language. We just need the correct priors, model and sampling params.

The question I want to leave this blog on is: is there even a point in having benchmarks? There exists a function that solves them, maybe the one that just deterministically returns the answer to the question given the input question, then there exists a program that can be sampled from a language model. By collecting [all the data](https://www.washingtonpost.com/technology/2026/01/27/anthropic-ai-scan-destroy-books/) and interpolating over it a tiny bit, we can produce all the answers we need, including ARC-AGI-3. The interesting question is only how compressed the model is, how that relates to disentanglement, and therefore generalization. My intuition about the [Fractured Entangled Representation Hypothesis](https://arxiv.org/pdf/2505.11581) tells me that even though the representations in LLMs might be fractured, we learn to engineer the data in a way that helps to disentangle regardless.
