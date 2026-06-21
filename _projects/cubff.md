---
layout: page
title: Computational Evolution
description:
img: assets/img/projects/cubff/brain_tree.png
importance: 1
related_publications: false
---

What if life and intelligence are not at all random, but rather inevitable? This is the stunning conclusion of the book [What is Intelligence?](https://whatisintelligence.antikythera.org/) by Blaise Aguera y Arcas. Lately, it has been reforming the way I perceive intelligence in general. This book is the sequel of the [What is Life?](https://mitpress.mit.edu/9780262554091/what-is-life/) (which I [reviewed last year](https://michaltesnar.github.io/books/what_is_life/)), it expands by explaining that intelligence is prediction of the environment and itself. However, the headline experiment stays essentially the same: "_simple computation enables replication_", which is also the conclusion of the paper [Computational Life: How Well-formed,
Self-replicating Programs Emerge from Simple
Interaction](https://arxiv.org/pdf/2406.19108), from which I will be citing here.

# Life Experiment

Let's take this experiment apart, cause the beautiful thing about this is shows that with computation you can make alive things from dead things. For this, define a minimal programming language, BFF, with two heads. This is then executed left to right: the second head is a write head so that the program can write over itself.

```
< head0 = head0 - 1
> head0 = head0 + 1
{ head1 = head1 - 1
} head1 = head1 + 1
- tape[head0] = tape[head0] - 1
+ tape[head0] = tape[head0] + 1
. tape[head1] = tape[head0]
, tape[head0] = tape[head1]
[ if (tape[head0] == 0): jump forwards to matching ] command.
] if (tape[head0] != 0): jump backwards to matching [ command.
```

We start with random instructions on the tapes, call two of them A and B. Then we merge them, execute them and split them, put them back to the soup.

```
A + B -> split(exec(AB)) = A' + B'
```

where we take random ordering for A and B. Notably A is either first or second taken by random, but does not take both positions.

The headline finding: if you do this long enough, you will get replicating programs out. _That is CRAZY!_ You start with random bytes, you can evolve bytes that replicate themselves. Blaise says that this is not that surprising: what you get out is exactly what replicates. The model biases us to see this. The bigger finding discussed in the book is that _this is what life is about_: thermodynamics supplies computation and what stays are structures that are dynamically stable = reproduce, i.e. life. Wow! This usually comes in explosions: you see nothing, until there are some replicators, and then you see many replicators very suddenly!

{% include figure.liquid loading="eager" path="assets/img/projects/cubff/paper_fig.png" class="img-fluid rounded z-depth-1" width="700" alt="Transition in the paper." %}

By extension, in "What is Intelligence", it is argued that intelligence is ability to predict your environment and yourself. This helps you replicate, and that is why we develop it.

# Assymetry

What I do not like about the experiment is the assymetry, which is noted in the paper itself. As the programs are executed from left to right, it is rather that the first program copies itself over the other, not even giving the other program a chance, causing it to act as "food" (F in the Equation 5, also below) and hence get consumed.

```
S + F -> split(exec(SF)) = 2*S
```

I was replicating these experiments, and this is exactly what we find. I tracked the bytes that go from the A part of the string to the B part, and vice versa (given where heads are, and which way do the writes apply). And we can see that we copy mostly from A to B, in this order, especially when the number of operations explodes (the transition on the paper). You can see this on the plot below.

{% include figure.liquid loading="eager" path="assets/img/projects/cubff/firstmover_log.png" class="img-fluid rounded z-depth-1" width="700" alt="Bytes copied A→B vs B→A per epoch on a log scale: the A→B flow dominates and spikes at emergence" %}

To satisfy my rightiousness, I had to change the experiment: we duplicate the number of operations, each string gets to be first and second.

```
A + B -> split(exec(AB)) = A' + B', keep B'
C + A -> split(exec(CA)) = C' + A', keep A'
```

Same experiment, two nice properties:

- Keeping the B' means we keep the substrate that A has copied onto. If A did not modify B, then B remains and A dies. Vice versa, if A replicated, then B is eliminated, and A lives on in B'.
- Each program gets the chance to get replicated in each round, so it is not "you died by random" cause I did not sample you, but rather, you died cause I you did not replicate.

Most importantly, redoing the experiments still shows that this works! We still get replication!

{% include figure.liquid loading="eager" path="assets/img/projects/cubff/symmetric_replication.png" class="img-fluid rounded z-depth-1" width="700" alt="Symmetric pairing seed 4: self-replicators spike to ~120k as Brotli size collapses, showing replication still emerges" %}

I previously made two attempts at creating replication, neither of which worked:

- Concatenate A + B, but put the instruction pointer randomly onto the tape. This does not produce life. The programs do not wrap around. I guess this makes sense, our DNA does neither.
- Using two instruction pointers, one at the beggining of A, and one at the beginning of B, then doing interleaved execution. This also did not show life.

# Main Open Question

The whole book: what is intelligence talks about how life gives raise to intelligence through prediction. That can be justified by prediction having utility for replication, as mentioned before. If you can predict what others do, they won't eat you (like the tapes in the example above). However, it is not clear how we could support this conclusion with a computational experiment. We would need a tape to be conditioned on another tap. There is essentially no utility for it in this setup, if you are A just copy yourself over B, and you are finished. Ignoring B is the winning strategy, cause if you just overwrite it, it will do nothing.

For development of intelligence in this simulation, we would need a multistep environment, where you can get utility of predicting your opponents moves. An example of this would be an instance where you would need to predict what your opponent does on some tape (which does not modify you). Then if you can predict your opponent, but they cannot predict you, then you get to replicate onto them (if you can). It is not clear how we would do this. Generally, we would need some sort of 'test-time scaling' idea where we could do a lot more compuation using the program before the computation.

If you have any idea how to do this, or if there is any relevant literature, then let me know.
