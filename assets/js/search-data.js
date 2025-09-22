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
        },{id: "nav-cv",
          title: "cv",
          description: "The places I have been to, and things that I have done there.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "nav-publications",
          title: "publications",
          description: "What I wrote, and somebody bothered to review.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/publications/";
          },
        },{id: "post-domov-číslo-čtyři",
        
          title: "Domov číslo čtyři",
        
        description: "A kde žiju teď? A s kým?",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/novy-byt/";
          
        },
      },{id: "post-moving-to-zurich-a-little-guide-to-attacking-the-housing-market",
        
          title: "Moving to Zurich: A Little Guide to Attacking the Housing Market",
        
        description: "Finding housing on a tight budget is more difficult than it sounds.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/moving-to-zurich/";
          
        },
      },{id: "post-the-true-difficulty-of-language-learning-when-things-are-not-the-way-they-seem",
        
          title: "The True Difficulty of Language Learning: When Things Are Not The Way They...",
        
        description: "When it is not just about word to word translations.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/true-difficulty-of-language-learning/";
          
        },
      },{id: "post-what-math-do-i-need-for-ai-catch-up-guide-for-rug-ai-undergrads",
        
          title: "What Math do I Need for AI? Catch-Up Guide for RUG AI Undergrads...",
        
        description: "Compression of knowledge of a recent graduate.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/rug-math-guide/";
          
        },
      },{id: "post-first-exam-season-at-eth-a-collective-hysteria",
        
          title: "First Exam Season at ETH: A Collective Hysteria",
        
        description: "How human fear can make a mountain out of a mole hill.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/collective-hysteria/";
          
        },
      },{id: "post-why-i-am-quitting-chatgpt-and-why-you-should-too",
        
          title: "Why I am Quitting ChatGPT: and Why You Should Too",
        
        description: "Maybe things that help us also can hurt us.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2024/quitting-llms/";
          
        },
      },{id: "post-studying-eth-the-dopamine-detox",
        
          title: "Studying @ETH: The Dopamine Detox",
        
        description: "When studying is not as much fun as it used to be...",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2024/mid-semester-review/";
          
        },
      },{id: "post-how-i-misunderstood-academia-realizations-from-transfer-to-eth-zurich",
        
          title: "How I Misunderstood Academia: Realizations from Transfer to ETH Zurich",
        
        description: "Is academia there to teach or to compete?",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2024/eth-review/";
          
        },
      },{id: "books-the-godfather",
          title: 'The Godfather',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/the_godfather/";
            },},{id: "news-i-created-this-new-blog-from-a-template-from-now-on-i-will-try-to-keep-it-up-to-date-as-a-personal-portfolio-blog-as-well-as-cv-and-publication-list",
          title: 'I created this new blog from a template! From now on I will...',
          description: "",
          section: "News",},{id: "projects-auto-house",
          title: 'auto-house',
          description: "Agent that finds you housing in the Zürich area.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/auto-house/";
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
