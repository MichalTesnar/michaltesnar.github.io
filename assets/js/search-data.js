// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "about",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-blog",
          title: "blog",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/blog/";
          },
        },{id: "nav-projects",
          title: "projects",
          description: "Selection of things that I did, and I am also proud of.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/projects/";
          },
        },{id: "nav-publications",
          title: "publications",
          description: "What I wrote, and somebody bothered to review.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/publications/";
          },
        },{id: "dropdown-bookshelf",
              title: "bookshelf",
              description: "",
              section: "Dropdown",
              handler: () => {
                window.location.href = "/books/";
              },
            },{id: "dropdown-diary",
              title: "diary",
              description: "",
              section: "Dropdown",
              handler: () => {
                window.location.href = "/diary/";
              },
            },{id: "books-what-is-life",
          title: 'What is Life?',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/what_is_life/";
            },},{id: "books-why-greatness-cannot-be-planned",
          title: 'Why greatness cannot be planned?',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/why_greatness_cannot_be_planned/";
            },},{id: "books-a-thousand-brains-a-new-theory-of-intelligence",
          title: 'A Thousand Brains: A New Theory of Intelligence',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/1000_brains_theory/";
            },},{id: "books-die-vierte-industrielle-revolution",
          title: 'Die Vierte Industrielle Revolution',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/vierte_industrielle_revolution/";
            },},{id: "news-i-created-this-new-blog-from-a-template-from-now-on-i-will-try-to-keep-it-up-to-date-as-a-personal-portfolio-blog-as-well-as-cv-and-publication-list",
          title: 'I created this new blog from a template! From now on I will...',
          description: "",
          section: "News",},{id: "news-right-now-you-should-be-able-to-sign-up-for-a-mailing-list-see-below-you-will-be-notified-on-every-new-blog-post-or-publication",
          title: 'Right now you should be able to sign up for a mailing list...',
          description: "",
          section: "News",},{id: "posts_blog-how-i-misunderstood-academia-realizations-from-transfer-to-eth-zurich",
          title: 'How I Misunderstood Academia: Realizations from Transfer to ETH Zurich',
          description: "Is academia there to teach or to compete?",
          section: "Posts_blog",handler: () => {
              window.location.href = "/blog/2024/eth-review/";
            },},{id: "posts_blog-studying-eth-the-dopamine-detox",
          title: 'Studying @ETH: The Dopamine Detox',
          description: "When studying is not as much fun as it used to be...",
          section: "Posts_blog",handler: () => {
              window.location.href = "/blog/2024/mid-semester-review/";
            },},{id: "posts_blog-why-i-am-quitting-chatgpt-and-why-you-should-too",
          title: 'Why I am Quitting ChatGPT: and Why You Should Too',
          description: "Maybe things that help us also can hurt us.",
          section: "Posts_blog",handler: () => {
              window.location.href = "/blog/2024/quitting-llms/";
            },},{id: "posts_blog-first-exam-season-at-eth-a-collective-hysteria",
          title: 'First Exam Season at ETH: A Collective Hysteria',
          description: "How human fear can make a mountain out of a mole hill.",
          section: "Posts_blog",handler: () => {
              window.location.href = "/blog/2025/collective-hysteria/";
            },},{id: "posts_blog-what-math-do-i-need-for-ai-catch-up-guide-for-rug-ai-undergrads",
          title: 'What Math do I Need for AI? Catch-Up Guide for RUG AI Undergrads...',
          description: "Compression of knowledge of a recent graduate.",
          section: "Posts_blog",handler: () => {
              window.location.href = "/blog/2025/rug-math-guide/";
            },},{id: "posts_blog-the-true-difficulty-of-language-learning-when-things-are-not-the-way-they-seem",
          title: 'The True Difficulty of Language Learning: When Things Are Not The Way They...',
          description: "When it is not just about word to word translations.",
          section: "Posts_blog",handler: () => {
              window.location.href = "/blog/2025/true-difficulty-of-language-learning/";
            },},{id: "posts_blog-moving-to-zurich-a-little-guide-to-attacking-the-housing-market",
          title: 'Moving to Zurich: A Little Guide to Attacking the Housing Market',
          description: "Finding housing on a tight budget is more difficult than it sounds.",
          section: "Posts_blog",handler: () => {
              window.location.href = "/blog/2025/moving-to-zurich/";
            },},{id: "posts_blog-professional-impairment-seeing-your-own-life-through-the-lense-of-artificial-intelligence",
          title: 'Professional Impairment: Seeing Your Own Life Through the Lense of Artificial Intelligence',
          description: "Learning about machine learning makes me learn about myself.",
          section: "Posts_blog",handler: () => {
              window.location.href = "/blog/2025/me-the-ai/";
            },},{id: "posts_blog-dream-sold-to-the-most-ambitious-my-take-on-the-yc-visit-to-eth",
          title: 'Dream Sold to the Most Ambitious: My Take on the YC Visit to...',
          description: "Maybe it is true, maybe not, but they sell it well.",
          section: "Posts_blog",handler: () => {
              window.location.href = "/blog/2026/yc-observations/";
            },},{id: "posts_blog-the-4th-industrial-revolution-how-everything-will-be-automated",
          title: 'The 4th Industrial Revolution: How Everything Will Be Automated',
          description: "Everybody go get tin foil hats. AI is coming!",
          section: "Posts_blog",handler: () => {
              window.location.href = "/blog/2026/4th-revolution/";
            },},{id: "posts_blog-the-difficulties-of-being-a-tourist",
          title: 'The Difficulties of Being a Tourist',
          description: "And why I really do not want to be one ever again...",
          section: "Posts_blog",handler: () => {
              window.location.href = "/blog/2026/tourists/";
            },},{id: "posts_blog-needlesly-clever-when-learned-skills-suddenly-expire",
          title: 'Needlesly Clever: When Learned Skills Suddenly Expire',
          description: "`Claude &#39;give me back my future&#39;`",
          section: "Posts_blog",handler: () => {
              window.location.href = "/blog/2026/claude-future/";
            },},{id: "posts_diary-domov-číslo-čtyři",
          title: 'Domov číslo čtyři',
          description: "A kde žiju teď? A s kým?",
          section: "Posts_diary",handler: () => {
              window.location.href = "/blog/2025/novy-byt/";
            },},{id: "posts_diary-velká-párty",
          title: 'Velká párty',
          description: "Protože studentem asi nebudu navždy",
          section: "Posts_diary",handler: () => {
              window.location.href = "/blog/2025/velka-party/";
            },},{id: "posts_diary-výlet-do-česka",
          title: 'Výlet do Česka',
          description: "Najít si čas na rodinu a kamarády není jednoduché",
          section: "Posts_diary",handler: () => {
              window.location.href = "/blog/2025/vylet-do-ceska/";
            },},{id: "posts_diary-jürgen-schmidhuber-v-curychu",
          title: 'Jürgen Schmidhuber v Curychu',
          description: "Další hvězda a inspirace.",
          section: "Posts_diary",handler: () => {
              window.location.href = "/blog/2025/jsh-has-lost-it/";
            },},{id: "posts_diary-polsko-není-tak-daleko-jak-by-se-člověku-zdálo",
          title: 'Polsko není tak daleko, jak by se člověku zdálo',
          description: "Kulturní schledání za hranicemi",
          section: "Posts_diary",handler: () => {
              window.location.href = "/blog/2025/polsko/";
            },},{id: "posts_diary-výlet-do-mnichova",
          title: 'Výlet do Mnichova',
          description: "Návštěva u bývalého spolužáka",
          section: "Posts_diary",handler: () => {
              window.location.href = "/blog/2025/munich-trip/";
            },},{id: "posts_diary-nové-životní-problémy",
          title: 'Nové životní problémy',
          description: "Jak jsem si myslel, že už mám pro jednou zase hotovo...",
          section: "Posts_diary",handler: () => {
              window.location.href = "/blog/2025/job-market/";
            },},{id: "posts_diary-dreamland",
          title: 'Dreamland',
          description: "Does everybody live in a dreamland?",
          section: "Posts_diary",handler: () => {
              window.location.href = "/blog/2025/dreamland/";
            },},{id: "posts_diary-jungfraujoch",
          title: 'Jungfraujoch',
          description: "Just another week in Switzerland.",
          section: "Posts_diary",handler: () => {
              window.location.href = "/blog/2025/jungfraujoch/";
            },},{id: "posts_diary-vánoce-vánoce-přicházejí",
          title: 'Vánoce Vánoce přicházejí!',
          description: "Time to go home.",
          section: "Posts_diary",handler: () => {
              window.location.href = "/blog/2025/vanoce-prichazeji/";
            },},{id: "posts_diary-new-year",
          title: 'New year!',
          description: "What will it bring?",
          section: "Posts_diary",handler: () => {
              window.location.href = "/blog/2026/new-year/";
            },},{id: "posts_diary-michaldeutsch",
          title: 'Michaldeutsch',
          description: "When you (accidently) start your own dialect.",
          section: "Posts_diary",handler: () => {
              window.location.href = "/blog/2026/michaldeutsch/";
            },},{id: "posts_diary-skiing",
          title: 'Skiing',
          description: "How I once gone skiing, great results.",
          section: "Posts_diary",handler: () => {
              window.location.href = "/blog/2026/skiing/";
            },},{id: "posts_diary-farewells",
          title: 'Farewells',
          description: "Time flies like an arrow.",
          section: "Posts_diary",handler: () => {
              window.location.href = "/blog/2026/farewells/";
            },},{id: "posts_diary-first-work-experiences",
          title: 'First Work Experiences',
          description: "Working is fun.",
          section: "Posts_diary",handler: () => {
              window.location.href = "/blog/2026/work-experience/";
            },},{id: "posts_diary-spontaneous-trip-to-paris",
          title: 'Spontaneous Trip to Paris',
          description: "36 hours in Paris.",
          section: "Posts_diary",handler: () => {
              window.location.href = "/blog/2026/paris/";
            },},{id: "posts_diary-side-quests-and-other-fun",
          title: 'Side Quests and Other Fun',
          description: "Having a bit of free time again is crazy.",
          section: "Posts_diary",handler: () => {
              window.location.href = "/blog/2026/zmitzdrin/";
            },},{id: "posts_diary-backpockets",
          title: 'Backpockets',
          description: "The most undervalued resource of humanity.",
          section: "Posts_diary",handler: () => {
              window.location.href = "/blog/2026/backpockets/";
            },},{id: "posts_diary-relative-poverty-a-personal-record",
          title: 'Relative Poverty: A Personal Record',
          description: "A reminder I want to keep for myself.",
          section: "Posts_diary",handler: () => {
              window.location.href = "/blog/2026/poverty/";
            },},{id: "posts_diary-more-ai",
          title: 'More AI',
          description: "Basically the only thing I think about.",
          section: "Posts_diary",handler: () => {
              window.location.href = "/blog/2026/more-ai/";
            },},{id: "posts_diary-why-i-will-never-be-famous",
          title: 'Why I will never be famous.',
          description: "Cause even if I could, I actually cannot.",
          section: "Posts_diary",handler: () => {
              window.location.href = "/blog/2026/fame-and-anxiety/";
            },},{id: "posts_diary-self-re-invention-innovation-in-every-circumstance",
          title: 'Self-Re-Invention: Innovation in Every Circumstance',
          description: "Cause the yesterday&#39;s me is not the me of today.",
          section: "Posts_diary",handler: () => {
              window.location.href = "/blog/2026/new-is-better/";
            },},{id: "posts_diary-life",
          title: 'Life',
          description: "Goes on.",
          section: "Posts_diary",handler: () => {
              window.location.href = "/blog/2026/life/";
            },},{id: "projects-auto-house",
          title: 'auto-house',
          description: "Agent that finds you housing in the Zürich area.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/auto-house/";
            },},{id: "projects-swiss-german",
          title: 'Swiss German',
          description: "Most beautiful language of the world!",
          section: "Projects",handler: () => {
              window.location.href = "/projects/ch-deutsch/";
            },},{id: "projects-puzzle-solving-with-diffusion",
          title: 'Puzzle Solving with Diffusion',
          description: "Reasoning step by step to solve puzzles of big sizes, and maybe generalize...?",
          section: "Projects",handler: () => {
              window.location.href = "/projects/diffusion/";
            },},{id: "projects-warped-cross-entropy",
          title: 'Warped Cross Entropy',
          description: "Maybe categorical cross entropy is not the only way to go!",
          section: "Projects",handler: () => {
              window.location.href = "/projects/warped-cross-entropy/";
            },},{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%6D%69%63%68%61%6C.%74%65%73%6E%61%72%30%30%37@%67%6D%61%69%6C.%63%6F%6D", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/MichalTesnar", "_blank");
        },
      },{
        id: 'social-linkedin',
        title: 'LinkedIn',
        section: 'Socials',
        handler: () => {
          window.open("https://www.linkedin.com/in/michal-tesnar", "_blank");
        },
      },{
        id: 'social-rss',
        title: 'RSS Feed',
        section: 'Socials',
        handler: () => {
          window.open("/feed.xml", "_blank");
        },
      },{
        id: 'social-scholar',
        title: 'Google Scholar',
        section: 'Socials',
        handler: () => {
          window.open("https://scholar.google.com/citations?user=uDXxG5EAAAAJ", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
