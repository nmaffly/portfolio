const assetPath = (fileName) => {
  const basePath = process.env.PUBLIC_URL || '/portfolio';
  return `${basePath}/${fileName}`;
};


export const portfolioData = {
  intro: {
    name: "Nate Maffly",
    headline:
      "Engineer who builds systems that turn raw data into usable intelligence.",
    subheadline:
      "(also a hiker, hooper, and music-lover)",
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
      thumbnailVideoStart: "end",
      thumbnailVideoDuration: 6,
      demoVideo: assetPath("scoutAI_loop.mp4"),

      impact:
        "Built a multi-agent LLM system that translates natural-language basketball questions into grounded, real-time performance insights.",

      how:
        "AI-powered analytics platform for UC Davis Men's Basketball combining structured SQL data with LangGraph-based agent orchestration and dynamic visualizations.",

      tags: ["Python", "SQL", "Multi-Agent LLMs", "Analytics"],

      details: [
        "Architected LangChain/LangGraph multi-agent system that routes user questions into SQL queries, reasoning agents, or direct responses based on intent.",
        
        "Built backend services (Flask + SQLite) to support real-time query execution and synchronized visualization updates within the dashboard.",
        
        "Worked directly with UC Davis Men's Basketball coaches to gather requirements and iterate on query logic and feature design.",
        
        "Led project execution as Project Manager, coordinating contributors and maintaining technical direction across the team."
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
      logo: assetPath("columbia_logo.png"),
      dates: "Summer 2025",
      summary:
        "Built automation and data integrity systems during enterprise migration from SQL Server to Snowflake",

      overview:
        "Worked on production ETL workflows during Columbia Bank's migration from on-prem SQL Server to Snowflake, focusing on automation, data integrity, and operational visibility.",

      whatIBuilt: [
        "Architected a Python pipeline that parsed ServiceNow incident text and reconciled it with structured Snowflake error logs using fuzzy string matching.",

        "Designed JavaScript-based validation scripts deployed via Azure Data Factory and Snowflake stored procedures to detect schema mismatches and enforce QA checks during ETL runs.",

        "Developed a real-time Snowflake dashboard exposing pipeline health, job status, and migration progress for internal stakeholders."
      ],

      impact: [
        "Reduced monthly incident triage time from 10+ hours to 10 minutes (~98% reduction).",

        "Improved reliability and traceability of ETL conversion jobs during enterprise cloud migration."
      ],

      stack: ["Python", "JavaScript", "SQL", "Snowflake", "Azure Data Factory", "ServiceNow"]
    },

    {
      id: "research",
      role: "RESEARCH ASSISTANT",
      org: "MIND Institute — UC Davis",
      logo: assetPath("mind_logo.png"),
      dates: "Jul 2024 - Apr 2025",
      summary:
        "Designed neuronal stimulation experiments and built custom signal-processing pipelines for electrophysiology analysis",

      overview:
        "Designed and executed a neuronal stimulation experiment, building custom signal-processing pipelines to analyze electrophysiology recordings under controlled stimulation conditions.",

      whatIBuilt: [
        "Identified the electrical footprint of a target neuron and stimulated it across varying directions, distances, and amplitudes to measure response behavior.",

        "Engineered a Python-based signal processing pipeline to extract pre- and post-stimulation firing rates, spike amplitudes, and response metrics from raw electrophysiology recordings.",

        "Developed artifact filtering techniques to remove stimulation shock noise while preserving true neuronal spike activity.",

        "Built visualization tools to compare neuronal responses across experimental conditions and parameter sweeps."
      ],
      impact: [
        "Created a structured experimental workflow enabling systematic analysis of directional stimulation effects on neuronal firing behavior.",

        "Presented findings to graduate researchers and the PI, informing discussion on future experimental design and stimulation protocols."
      ],
      stack: ["Python", "NumPy", "SciPy", "Matplotlib", "Signal Processing"]
    },

    {
      id: "aggie-sports-analytics",
      role: "PROJECT MANAGER / BOARD MEMBER",
      org: "Aggie Sports Analytics — UC Davis",
      logo: assetPath("asa_logo.png"),
      dates: "2024 - 2025",

      summary:
        "Led AI and ML-driven sports analytics initiatives and helped shape the technical direction of a student-run analytics organization",

      overview:
        "Served as Project Manager and Board Member for Aggie Sports Analytics, overseeing applied AI and data-driven sports projects while coordinating technical contributors and stakeholder engagement.",

      whatIBuilt: [
        "Led cross-functional teams developing analytics systems for competitive sports, defining project scope, technical milestones, and delivery timelines.",

        "Interviewed and selected new members, contributing to organizational growth and maintaining high technical standards across project teams.",

        "Organized workshops and technical events to promote applied AI, data analytics, and sports technology within the UC Davis community.",

        "Coordinated stakeholder demos and presentations, including showcasing projects to the UC Davis Men's Basketball team."
      ],

      impact: [
        "Strengthened organizational structure and execution across multiple AI and analytics initiatives.",

        "Bridged engineering teams with athletic stakeholders, validating real-world applications of student-built analytics tools."
      ],

      stack: [
        "Leadership", "Project Management", "Technical Strategy", "Stakeholder Communication", "Team Development", "Git"]
    }
  ]
};
