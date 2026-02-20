const assetPath = (fileName) => `${process.env.PUBLIC_URL || ''}/${fileName}`;

export const portfolioData = {
  intro: {
    name: "Nate Maffly",
    headline:
      "Software engineer focused on data, systems, and AI. ",
    subheadline:
      "Built deliberately",
    links: {
      github: "https://github.com/nmaffly",
      linkedin: "https://www.linkedin.com/in/nathaniel-maffly-390235268/",
      email: "ncmaffly@ucdavis.edu"
    }
  },

  projects: [
    {
      id: "scoutai",
      title: "SCOUTAI",
      thumbnail: assetPath("scoutAI_demo_thumbnail.png"),
      thumbnailVideo: assetPath("scoutAI_loop.mp4"),
      thumbnailVideoStart: "end", // "start" or "end"
      thumbnailVideoDuration: 6, // seconds to play
      demoVideo: assetPath("scoutAI_loop.mp4"),
      impact:
        "Coaches have access to stats, but little guidance - I wanted to build something that gave coaches live insights in real time.",
      how:
        "Analytics dashboard built for UC Davis Men's Basketball, with integrated chatbot and visualization updates.",
      tags: ["Python", "SQL", "Multi-Agent LLMs", "Analytics"],
      details: [
        "Project manager for ScoutAI (Aggie Sports Analytics), owning Git workflows and PR reviews to keep a multi-contributor team aligned.",
        "Led the development of LangChain/LangGraph multi-agent orchestration that routes natural-language questions into SQL queries or direct answers.",
        "Worked directly with UC Davis men's basketball coaches to gather requirements and iterate on features.",
        "Presented ScoutAI to industry professionals at the Aggie Sports Analytics Case Competition."
      ],
      stack: ["Flask", "LangChain", "LangGraph", "SQLite", "React", "OpenAI"],
      links: {
        github: "https://github.com/AggieSportsAnalytics/ScoutAI",
        live: null
      }
    },
    {
      id: "rhythmoji",
      title: "RHYTHMOJI",
      thumbnail: assetPath("rhythmoji_thumbnail.png"),
      thumbnailVideo: assetPath("rhythmoji_demo.mp4"),
      thumbnailVideoStart: "start", // "start" or "end"
      thumbnailVideoDuration: 2.2, // seconds to play
      demoVideo: assetPath("rhythmoji_demo.mp4"),
      why:
        "They say music is a window to the soul, so I wanted to build a way to capture it in a fun and shareable way.",
      how:
        "Your music taste mapped into a lego-like generative avatar.",
      tags: ["JavaScript", "Spotify API", "Generative AI", "Full Stack"],
      details: [
        "Integrated Spotify OAuth and listening history into a full-stack React + Express app that " + 
        "turns music-taste inputs into a personalized avatar experience with a guided creation flow and SPA routing.",

        "Implemented a pipeline that ingests user music preferences, structures them into prompts," + 
        "and generates avatar assets + text via OpenAI/Gemini.",

        "Modeled user profiles and Rhythmoji metadata in Supabase (auth + storage), with resilient" + 
        "fallbacks when asset persistence fails.",

        "Implemented animated landing visuals (arc-transformed Swiper rows + warp background) with " + 
        "responsive behavior for mobile."
      ],
      stack: ["React", "Node.js","Express", "Supabase", "OpenAI/Gemini"],
      links: {
        github: "https://github.com/rishitx/rhythmoji-app/tree/dev",
        live: null
      }
    },
    {
      id: "wavelength",
      title: "WAVELENGTH",
      thumbnail: assetPath("wavelength_thumbnail.png"),
      thumbnailVideo: assetPath("wavelength_demo.mp4"),
      thumbnailVideoStart: "end", // "start" or "end"
      thumbnailVideoDuration: 5, // seconds to play
      demoVideo: assetPath("wavelength_demo.mp4"),
      why:
        "Discovering music through friends felt more meaningful than purely algorithmic recommendations.",
      how:
        "Real-time web app for collaborative music discovery and sharing.",
      tags: ["Python", "Spotify API", "Startup", "Web App"],
      details: [
        "Pitched Wavelength at PLASMA Demo Day and won $5,000 for the Mentor's Choice Award.",

        "Designed and implemented the backend in Flask with Spotify API integration and a " + 
        " database layer using SQLAlchemy.",

        "Deployed the application on AWS EC2 Instance, ensuring efficient performance, scalability and live user-interactions.",

        "Co-organized and executed a proof-of-concept event in collaboration with a local Davis art gallery/shop, " + 
        "attracting over 40 participants and collecting valuable feedback to enhance the app's functionality and user experience."
      ],
      stack: ["Flask", "Spotify API", "Flask-SQLAlchemy"],
      links: {
        github: "https://github.com/nmaffly/Wavelength",
        live: null
      }
    },
    {
      id: "wordle",
      title: "WORDLE SOLVER",
      thumbnail: assetPath("wordlesmith_thumbnail.png"),
      thumbnailVideo: assetPath("wordle_demo.mp4"),
      thumbnailVideoStart: "start", // "start" or "end"
      thumbnailVideoDuration: 5, // seconds to play
      demoVideo: assetPath("wordle_demo.mp4"),
      why:
        "I love Wordle and coding, so I built and evaluated a data‑driven, algorithmic solver that sits right at the intersection of both.",
      how:
        "Heuristic-based solver that ranks optimal guesses using feedback constraints.",
      tags: ["Algorithms", "Python", "Java"],
      details: [
        "Built a Python/Flask Wordle solver web app end-to-end, wiring session-based game state, " +
        "input validation, and UI rendering to deliver real-time guess recommendations. ",

        "Designed a scoring engine that combines positional and overall letter-frequency statistics" +
        "with Wordle feedback filtering to rank candidate words efficiently.",

        "Implemented elimination-guess logic to maximize information gain when solution space is large, " +
        "then narrowed to common-word ordering as constraints tighten.",

        "Evaluated solver performance on the official answer list using NumPy/Pandas scripts, " +
        "achieving 99% solved under 6 guesses with a 3.8 average."
      ],
      stack: ["Flask", "Numpy", "Pandas", "HTML/CSS"],
      links: {
        github: "https://github.com/nmaffly/WordleSolver",
        live: "https://wordle-smith-2f51e2cdfd4e.herokuapp.com/"
      }
    },
    {
      id: "courtcheck",
      title: "COURTCHECK",
      thumbnail: assetPath("courtcheck_thumbnail.png"),
      thumbnailVideo: assetPath("courtcheck_demo.mp4"),
      thumbnailVideoStart: "start", // "start" or "end"
      thumbnailVideoDuration: 5, // seconds to play
      demoVideo: assetPath("courtcheck_demo.mp4"),
      why:
        "Collegiate tennis matches are often played without referees, so I wanted to build a system that could automatically ground insights in what actually happened on court and present it clearly.",
      how:
        "Computer vision model that detects tennis court boundaries and ball movement.",
      tags: ["Python", "Computer Vision", "Machine Learning"],
      details: [
        "Integrated YOLO-based player detection, TrackNet-style ball tracking, and Detectron2 court detection into a single pipeline",
        "Generated annotated output videos with tracked ball path and player bounding boxes.",
        "Trained on tennis match footage with 20k+ labeled frames using OpenCVAT and Roboflow workflows.",
        "Presented at the Aggie Sports Analytics Case Competition and won 2nd place."
      ],
      stack: ["PyTorch", "OpenCV", "TrackNet", "YOLO", "Roboflow"],
      links: {
        github: "https://github.com/nmaffly/CourtCheck",
        live: null
      }
    },
    {
      id: "microservices",
      title: "DISTRIBUTED MICROSERVICES BACKEND",
      why:
        "I wanted hands-on experience with building and operating backend systems under load.",
      how:
        "Go-based microservices architecture using gRPC, Docker, and Kubernetes.",
      tags: ["Go", "gRPC", "Kubernetes", "Distributed Systems"],
      details: [
        "Built multiple services communicating via gRPC APIs",
        "Implemented caching and storage modules to support service workloads",
        "Used load testing to identify bottlenecks and validate system behavior",
        "Gained practical experience with deployment and scaling in Kubernetes"
      ],
      links: {
        github: null,
        live: null
      }
    }
  ],

  experience: [
    {
      id: "internship",
      role: "DATA ENGINEERING INTERN",
      org: "Columbia Bank",
      dates: "Summer 2025",
      summary:
        "Production data pipelines and business-facing analytics",
      details: [
        "Built and maintained Python-based data pipelines",
        "Worked with SQL databases to support analytics and reporting",
        "Focused on reliability and downstream usability of data",
        "Collaborated with full-time engineers in a production environment"
      ]
    },
    {
      id: "research",
      role: "RESEARCH ASSISTANT",
      org: "MIND Institute — UC Davis",
      dates: "Jul 2024 - Apr 2025",
      summary:
        "Neuronal signal processing and data analysis under experimental constraints",
      details: [
        "Developed Python pipelines for analyzing neuronal and stimulation data",
        "Worked with noisy and incomplete experimental datasets",
        "Collaborated with graduate students on experimental design and analysis",
        "Presented tools and findings at lab meetings"
      ]
    },
    {
      id: "aggie-analytics",
      role: "PROJECT MANAGER / DEVELOPER",
      org: "Aggie Sports Analytics",
      dates: "Feb 2024 - Present",
      summary:
        "Shipping analytics projects with a team and real deadlines",
      details: [
        "Led and coordinated student teams on sports analytics projects",
        "Balanced technical implementation with scope and product direction",
        "Acted as a bridge between developers and non-technical stakeholders",
        "Contributed directly as a developer on multiple projects"
      ]
    }
  ]
};
