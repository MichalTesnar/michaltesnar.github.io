---
layout: post
title: What Math do I Need for AI? Catch-Up Guide for RUG AI Undergrads
date: 2025-03-15 14:00:00
description: Compression of knowledge of a recent graduate.
categories: guides
---

## Introduction
"So why did you choose Groningen?" A question that I have been asked multiple times after disclosing I study or studied there. The answer was "There is a unique program in AI." Now, almost a year after finishing the program I am reflecting more and more about what the program gave me. More and more I come to realize how much breadth was explored, learning about philosophy, cognitive psychology, and biology of the brain is not what most CS undergrads can flex with. However, as the field of machine learning is not stopping to grow, I myself as a student of that program had found out that the depth of the knowledge is insufficient to gain a deep understanding of the material at hand, to read papers and maybe even contribute to the research in a meaningful way. I mean, test yourself right now.

### Linear regression
(Sorry I broke LaTeX, working on fixing it, hopefully you can still orient yourself here.)

The simplest model in ML for modeling relations relates targets `y` (an n-dimensional vector) with design matrix `X` (an n by d matrix) through vector `β` (a d-dimensional vector) with some Gaussian noise `w` added.


y = X * β + w


We can see that `β̂ = (X<sup>T</sup> * X)<sup>-1</sup> * X<sup>T</sup> * y` is an unbiased estimator of `β` using `E[w] = 0`:


E[(X<sup>T</sup> * X)<sup>-1</sup> * X<sup>T</sup> * y] = E[(X<sup>T</sup> * X)<sup>-1</sup> * X<sup>T</sup> * (X * β + w)] = (X<sup>T</sup> * X)<sup>-1</sup> * X<sup>T</sup> * X * β = β


Finally, `β̂` is also the least-squares estimator, for which we can prove this error bound.


E[|| β̂ - β ||<sup>2</sup>] = σ<sup>2</sup> * (d / n)


*Remark:* The least squares is a convex function so there is a unique minimum which can be found in polynomial time using gradient descent.

### Wait what?

So, how did reading this feel? No, I am not trying to discourage you here and gatekeep machine learning knowledge from you! This is literally taken from the first chapter of my [master's course](https://lecturenotes.cope.ethz.ch/alg4ds/spring25/A001/home.html), and except for the last theorem I have not left out any extra explanations.

When I was in my second year taking *Introduction to Machine Learning*, I was not able to read this fluently and make sense out of it. I am putting this mildly, cause I do not want to presume what your level is, maybe you are just fine. But I was genuinely intimidated when I saw the closed form solution for linear regression. God, I had no clue what those weird brackets ($\| \cdot \|$) really meant, and that double $\mathbb{E}$ somebody told me was an *expectation*. The expression *gradient descent* I knew from pictures of colorful loss landscapes but did not know what it really was and *polynomial time* was not really my biggest friend either.

The truth is in ML, as in any other branch, math is just a language we use to describe abstract objects we talk about (If you want to get philosophical I recommend reading [The unreasonable effectiveness of mathematics in the natural sciences by Wigner](https://www.maths.ed.ac.uk/~v1ranick/papers/wigner.pdf)).

If you want to understand what it is really about you need to get fluent in this language. It takes some time, but it is worth it (my journey is far from done, but I am way further than I was in my first year of BSc AI). To help you on the journey, you can enroll in any of the BSc Mathematics courses. They have great tradition and are (mostly well taught). Here, I establish a list of courses that are relevant, and I try to give a bit of context why (in my humble opinion).

## Essential Tier

These courses will help you obtain sufficient mathematical dexterity (credits to Andrei Girjoaba for this naming) to read mathematical texts and understand the ideas behind them. For your convenience I have added links to Ocasys, where you can view more information.

__IMPORTANT DISCLAIMER__: THESE COURSES DO NOT COVER THE SAME STUFF AS THE COURSES IN AI CURRICULUM CALLED 'FOR AI'. I cannot understate this, you will be challenged way more. Even if you passed 'Linear Algebra and Multivariable Calculus for AI' with a 10, you will get challenged in both Linear Algebra and Calculus for Math. This is true especially for Statistics for Math, which covers completely different things than AI Statistics.

- [__Linear Algebra I__](https://ocasys.rug.nl/current/catalog/course/WBMA020-05): Essential for understanding spectral decomposition and the idea of subspaces. This is needed for understanding dimensionality reduction techniques like PCA, which are at the core of machine learning. As a plus, this course is introductory and it teaches proof techniques such as proof by contradiction, which is useful if you haven't done that in the past.
- [__Linear Algebra II__](https://ocasys.rug.nl/current/catalog/course/WBMA035-05): Essential for understanding singular value decomposition, which is also one of the essential mathematical tools. The latest example of usage is in understanding vanishing and exploding gradients phenomena of RNNs.
- [__Calculus II__](https://ocasys.rug.nl/current/catalog/course/WBMA029-05): Gradient is one of the main topics. This will be your best friend if you ever want to train a neural net. Hand in hand with it goes chain rule. If you do not trust me it is important, try to explain backpropagation without it. (You might want to take [__Calculus I__](https://ocasys.rug.nl/current/catalog/course/WBMA003-05) before if you do not trust yourself too much with your math skills, I have not done it myself and managed, but honestly I still struggle a bit with things like Fourier Series that are treated there)
- [__Probability Theory__](https://ocasys.rug.nl/current/catalog/course/WBMA046-05): Expectation, variance, probability distribution. Trust me, this is a must. The notions are not that difficult once profoundly understood, but this hard course is definitely worth the pain. Highly recommended.
- [__Statistics__](https://ocasys.rug.nl/current/catalog/course/WBMA009-05): ML is just Stats on steroids. Estimators play the main role in this course. The word likelihood finally started making sense to me in this course too. Finally, you also get insight into p-values and confidence intervals. Priceless.
- (Editor's Pick) [__Analysis__](https://ocasys.rug.nl/current/catalog/course/WBMA012-05): Alef Sterk is one of the best lecturers that I have encountered so far, and even though this course does not directly contribute to ML understanding I still recommend it cause it gives you a stronger basis. You get better at proving and in mathematical thinking.

## Pro Tier

This is the list of courses 'I wish I have done'. These are more advanced (=mostly 2nd year math) courses that give you background insight into what is going on in ML. They are not essential, but check them out and if any of the theory seems appealing then certainly go for it. They are all relevant for different areas of ML.

- [__Probability and Measure__](https://ocasys.rug.nl/current/catalog/course/WBMA024-05): If you want to go more into depth into Probability Theory, this is a course that you want. This gives you the technical background for that (didn't take this one).
- [__Introduction to Optimization__](https://ocasys.rug.nl/current/catalog/course/WBMA054-05): Keyword *gradient descent*. Optimization is key for training neural nets. This course goes a wee bit too deep, but the first half is definitely relevant.
- [__Functional Analysis__](http://ocasys.rug.nl/current/catalog/course/WBMA033-05): AKA Linear Algebra III, teaches you more about linear operators and functionals. Very good stuff. Also by Alef Sterk.
- [__Dynamical Systems__](https://ocasys.rug.nl/current/catalog/course/WBMA031-05): Recurrent neural networks are modeling dynamical systems, this course will help you appreciate that better (didn't take this one).
- [__Metric and Topological Spaces__](https://ocasys.rug.nl/current/catalog/course/WBMA036-05): Reinforcement Learning needs this. Without fixed point theorem, how does the fact that Bellman operator is a contraction help you? (Didn't take this one).
- [__Multivariable Analysis__](https://ocasys.rug.nl/current/catalog/course/WBMA022-05): Keyword *manifold*, these mythical mathematical objects pop up in learning theory from time to time. Maybe it is a stretch, but could also come in handy (didn't take this one).

## Closing

Doing mathematics is like eating vegetables. I am not saying you have to do it, some people do without it and they are doing just fine. But it certainly helps, and I think that if you read into some papers before and after taking the courses that I suggest, you will have a completely different experience with them! (And passing courses like 'Neural Networks' will be a breeze.)

And no, these courses will neither teach you that you should normalize your input when training a neural net nor explain what torch dataloader is. Anyway, let me know if this was helpful and if you have courses that you would like to add to the list or if you completely disagree with my perspective.

And do not forget, if you have any questions the study advisors usually know the best, and they are very helpful, so do not hesitate to talk to them. Personally, they have helped a whole lot during my studies!