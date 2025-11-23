---
layout: page
title: auto-house
description: Agent that finds you housing in the Zürich area.
img: assets/img/projects/autohouse/autohouse.png
importance: 2
category: fun
related_publications: false
---

I would like to quickly share a project that I have worked during last Spring. You see, finding housing for international students in notoriously difficult: our budget are tight, we do not speak the local language and we do not want to travel too far to get to the uni every day. This means that you have to spend days on end digging into website with offers for housing. What I would resort to (usually) is having a template message ready, that I can paste to the website. However, I would frequently overlook the details the posting was asking about (e.g. what is your favorite movie). We live in the era when large language models can do just about anything for you: so why not respond to those postings and tune your responses to them?

First thing that has led me to work on this project was finding out how ridiculously easy it is to use LLMs from programming languages like Python. As you can find on in [Gemini Docs](https://ai.google.dev/gemini-api/docs/quickstart) all you need is a free Google account, which gives you and API key with which you can just do:
```python
from google import genai
client = genai.Client()
response = client.models.generate_content(
    model="gemini-2.5-flash", contents="Explain how AI works in a few words"
)
print(response.text)
```
And that is it! This is all you need, and suddenly you can use the most powerful models right there in your code. With the free API [Google gives you](https://ai.google.dev/gemini-api/docs/rate-limits) (depending on the model, here looking at the mentioned `gemini-2.5-flash`) 10 request per minute, 250 000 tokens per minute and 250 requests per day. For a small project which only you will use, this is more than enough.

Now all we need to do is:
1. Describe to the AI who we are and what we want,
2. read the websites and find relevant offers,
3. let LLMs create responses to posting based on that information,
4. send that information through the website.

Thanks to the simple Google API we have the LLM integration already, and the rest of the project was just about reading the website information, compiling it for the AI and sending through the website back using [Selenium](https://www.selenium.dev/documentation/). I have never done this before, and it was a lot of fun to do. I have worked mainly on three sites, which are popular among students of the ETH:
- [Zimmer- und Wohnungsvermittlung Universität/ETH Zürich](https://www.wohnen.ethz.ch/)
- [Flatfox.ch](https://flatfox.ch/c/en/)
- [WGZimmer.ch](https://www.wgzimmer.ch/home.html)
The last one of these deserves a highlight, since they are trying to protect the website against automation, and if they think you are a bot they will not let you send requests. To get around this, I recommend [undetectable drivers for Selenium](https://pypi.org/project/undetected-chromedriver/). Also letting the agent work not in headless state (i.e. let it have its own actual browser window) helps a lot to avoid websites blocking you.

Overall, this was a great learning experience to get started with the Google API and create something fun. However, I have to sadly conclude that regardless of all the prompt engineering I have done the models still seem to conform too much to the requirements of the posting to seem likeable. Whatever the posting will mention, the LLM will like it: Supermarket is close? The LLM loves it, and says you have to walk. Supermarket is very far? LLM loves it too, and says you like to walk a lot. This does not make it feel genuine, it is just trying too hard. This is what I also felt when I asked my friends what they thought about the project, the LLM answers were not aunthentic enough, which also leads to low success rates when applying for housing.

On the other hand, for posting with less attention (sublets and such) this tool would work really well, and it saves time, as it could easily apply to a posting per minute (until running out of the free quota).

If you are interested in learning more or using the project yourself, just take a look at the repository found at [GitHub](https://github.com/michalTesnar/auto-house).
