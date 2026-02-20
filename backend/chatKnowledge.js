// Knowledge base for portfolio RAG chatbot (embedded)
// Design goals:
// - Fewer, higher-signal entries (one per project/experience)
// - Structured fields so the model can answer role vs architecture vs impact cleanly
// - Consistent contact + fallback

const knowledgeBase = [
  {
    id: "profile",
    category: "profile",
    title: "Nate Maffly — Overview",
    aliases: ["about", "bio", "who are you", "introduction"],
    keywords: ["nate", "maffly", "about", "bio", "overview", "profile"],
    data: {
      summary:
        "Nate builds analytics tools with real users. He focuses on projects that turn data into decisions rather than chasing features that do not matter.",
      interests:
        "He is especially interested in sports analytics and music-driven products, and he has built LLM-powered systems that answer questions grounded in real data.",
      approach:
        "He prototypes quickly, tests with users when possible, and optimizes for clarity over cleverness."
    }
  },

  // -------------------------
  // Projects
  // -------------------------
  {
    id: "project-scoutai",
    category: "project",
    title: "ScoutAI",
    aliases: ["scout ai", "basketball chatbot", "coach dashboard", "aggie sports analytics scoutai"],
    keywords: ["scoutai", "basketball", "analytics", "coaches", "dashboard", "langchain", "sql", "sqlite"],
    data: {
      overview:
        "ScoutAI is a basketball analytics system built with Aggie Sports Analytics. It allows coaches to ask natural-language questions about team and player performance and receive grounded insights paired with automatically updated visualizations.",
      myRole:
        "Nate served as Project Manager, leading a team of five developers. He coordinated Git workflows and pull requests and led development of the LangChain-based LLM orchestration layer.",
      architecture:
        "ScoutAI routes coaching questions through a multi-step workflow. Statistical questions are converted into SQL queries over a structured SQLite database, and the results are synthesized into clear coach-facing insights designed to stay grounded in actual query results.",
      validation:
        "The team met directly with UC Davis Men's Basketball coaches and iterated based on real scouting and game-prep feedback. The system evolved around comparisons and insights coaches actually care about."
    }
  },

  {
    id: "project-rhythmoji",
    category: "project",
    title: "Rhythmoji",
    aliases: ["lego avatar app", "music avatar", "y2k music app"],
    keywords: ["rhythmoji", "music", "social app", "avatar", "lego", "y2k", "node", "react", "supabase", "postgres"],
    data: {
      overview:
        "Rhythmoji is a Y2K-inspired music social app where users create collectible LEGO-style avatars from their music taste. Users input favorite songs and artists, and the app generates a unique avatar through AI. It includes a social feed for discovering other users' Rhythmojis and upcoming artist content.",
      collaboration:
        "Nate built Rhythmoji with his friend Rishit Das.",
      architecture:
        "The app uses a Node.js/Express REST API backend and a React/Vite frontend with a Y2K-inspired UI. Data is stored in a PostgreSQL database on Supabase using JSONB for semi-structured music data, with authentication, storage, and Row Level Security policies.",
      aiPipeline:
        "The AI pipeline uses OpenAI GPT-4 to generate creative fashion descriptions from music inputs, Google Gemini for image generation, Sharp for image processing, and ML-based background removal."
    }
  },

  {
    id: "project-wavelength",
    category: "project",
    title: "Wavelength",
    aliases: ["plasma project", "spotify discovery app", "music compatibility app"],
    keywords: ["wavelength", "music", "discovery", "spotify", "oauth", "flask", "mysql", "sqlalchemy", "plasma", "demo day"],
    data: {
      overview:
        "Wavelength is a collaborative music discovery web app built around the idea that discovering music through friends can feel more meaningful than purely algorithmic recommendations. Users connect their Spotify accounts to generate a profile and compare taste with others.",
      myRole:
        "Nate was a technical lead on a team of four (two co-founders and two developers). He designed and implemented most of the backend, focusing on the database layer and Spotify OAuth integration.",
      architecture:
        "Wavelength uses a Flask backend with Spotify OAuth (Spotipy) to authenticate users and access listening data. It persists user profiles and derived listening statistics using SQLAlchemy with a MySQL database, with schema changes managed through migrations.",
      traction:
        "The team developed Wavelength as part of PLASMA, the UC Davis startup accelerator. They pitched at Demo Day and won $5,000 for the Mentor's Choice Award, and hosted a live proof-of-concept event with more than 50 participants to gather direct user feedback."
    }
  },

  {
    id: "project-wordle-smith",
    category: "project",
    title: "Wordle Smith",
    aliases: ["wordle solver", "wordle smith", "wordle assistant"],
    keywords: ["wordle", "solver", "flask", "python", "heroku", "frequency", "heuristics"],
    data: {
      overview:
        "Wordle Smith is Nate's Wordle solver built in Python with a Flask UI. It recommends guesses by combining letter-frequency scoring with Wordle feedback filtering.",
      myRole:
        "Nate built the project end-to-end, including the web app, solver logic, and evaluation scripts.",
      techStack:
        "Python, Flask, NumPy, Pandas, Gunicorn, HTML/CSS, and Heroku for deployment.",
      architecture:
        "Words are scored by overall and positional letter frequency, filtered after each guessusing green/yellow/gray constraints, and supplemented with elimination guesses that test high-value unused letters.",
      deployment:
        "The app is deployed on Heroku using a Procfile + Gunicorn runtime.",
      evaluation:
        "The solver is tested on official answer sets to measure average guesses and tune strategy thresholds. The algorithm is able to solve 99% of official wordle puzzles in under 6 guesses, with an average guess count of 3.8."
    }
  },

  {
    id: "project-courtcheck",
    category: "project",
    title: "CourtCheck — Tennis Court + Ball Tracking",
    aliases: ["courtcheck", "tennis tracking", "court detection", "ball tracking", "aggie sports analytics courtcheck"],
    keywords: ["courtcheck", "tennis", "computer vision", "yolo", "tracknet", "detectron2", "opencv", "pytorch", "sports analytics"],
    data: {
      overview:
        "CourtCheck is a computer vision system built for Aggie Sports Analytics to detect tennis court boundaries and track ball movement.The integrated system reported ~95% accuracy for court boundary and ball tracking. It was presented at the annual case competition and won 2nd place.",
      approach:
        "The project combines multiple models: YOLO-based detection for players, a TrackNet-style model for ball tracking, and Detectron2 for court boundary detection, then integratestheir outputs into a single pipeline.",
      implementation:
        "The main pipeline builds a video from frames, runs ball tracking with a custom CNN (BallTrackerNet), removes outliers and interpolates missing ball positions, runs player detection with a YOLO model, overlays detections, and exports an annotated output video.",
      dataAndTraining:
        "Training used tennis match footage with annotations for players, ball, and court keypoints, created with tools like OpenCVAT and Roboflow.",
    }
  },


  // -------------------------
  // Experience
  // -------------------------
  {
    id: "experience-mind-institute",
    category: "experience",
    title: "UC Davis MIND Institute — Computational Neuroscience Research Assistant",
    aliases: ["mind institute", "neuroscience", "mea", "neurons", "stimulation assay"],
    keywords: ["mind institute", "uc davis", "research", "neurons", "stimulation", "python", "pipeline", "mea", "spikes"],
    data: {
      overview:
        "Nate worked as a Computational Neuroscience Research Assistant at the UC Davis MIND Institute, contributing to neuronal stimulation assay research focused on how single neurons respond to different stimulation parameters.",
      responsibilities:
        "He built and maintained Python-based data analysis pipelines to process multi-electrode array (MEA) recordings in support of ongoing experiments conducted by graduate researchers.",
      technicalContributions:
        "The pipeline processed high-frequency spike recordings and stimulation data. He developed algorithms to filter artifact spikes caused by electrical stimulation, isolate true neuronal activity, and compute and visualizeresponse metrics.",
      experimentation:
        "He also helped design and conduct experiments varying stimulation amplitude, directionality, and distance, and presented findings and tool improvements during lab meetings."
    }
  },

  {
    id: "experience-asa",
    category: "experience",
    title: "Aggie Sports Analytics — Project Manager & Developer",
    aliases: ["asa", "sports analytics club", "aggie sports analytics"],
    keywords: ["aggie sports analytics", "asa", "project manager", "sports", "analytics", "git", "sprints", "code review"],
    data: {
      overview:
        "Nate is a Project Manager and Developer at Aggie Sports Analytics, a student organization that builds data-driven tools for sports teams focused on real performance and decision-making problems.",
      leadership:
        "As a Project Manager, he led a team of five developers. He coordinated scope, managed Git workflows, established code review processes, and drove delivery on structured sprint cycles.",
      projects:
        "He has led development on projects including ScoutAI (AI-powered analytics dashboard) and CourtCheck (computer vision-based tennis out-of-bounds detection)."
    }
  },

  {
    id: "experience-bank-data-engineering",
    category: "experience",
    title: "Columbia Bank — Data Engineering Intern",
    aliases: ["data engineering internship", "etl", "snowflake migration", "servicenow pipeline", "incident matching"],
    keywords: ["columbia bank", "data engineering", "internship", "etl", "scrums", "snowflake", "sql server", "servicenow", "pipeline", "dashboard", "certification"],
    data: {
      overview:
        "Nate worked as a Data Engineering Intern at Columbia Bank, where he supported ETL development and internal analytics infrastructure projects. He participated in weekly Agile scrums and collaborated with engineers on maintaining and improving production data workflows. During his internship, he also supported the migration of on-premises SQL Server databases to Snowflake.",
      servicenowProject:
        "One of his primary projects involved building an internal pipeline that linked ServiceNow incident reports to underlying database errors. He implemented fuzzy string matching to associate loosely formatted incident descriptions with structured error logs, saving the team more than 40 hours of manual triage work.",
      snowflake:
        "He gained familiarity with Snowflake, earned certifications, and built a live dashboard on top of real-time SQL queries that tracked ETL progress and was used by leadership for monitoring data workflows."
    }
  },

  // -------------------------
  // Skills / Career / Contact
  // -------------------------
  {
    id: "skills",
    category: "skills",
    title: "Skills",
    aliases: ["tech stack", "tools", "languages"],
    keywords: ["skills", "python", "javascript", "typescript", "sql", "react", "node", "express", "mongodb", "postgres", "supabase", "llm", "flask", "snowflake", "servicenow"],
    data: {
      core:
        "Nate has experience with Python, C++, Java, JavaScript, SQL, and TypeScript. For frontend development he uses React, and for backend development he works with Flask, Node.js and Express. He is also familiar with Snowflake, ServiceNow, and MongoDB.",
      data:
        "He has experience with MongoDB and PostgreSQL and has built applications on Supabase. He has also used Snowflake for his internship at Columbia Bank.",
      ai:
        "He has practical experience with LLMs and AI agents through ScoutAI, including working with OpenAI APIs and building LLM-powered applications that turn data into grounded insights."
    }
  },

  {
    id: "career",
    category: "career",
    title: "What He's Looking For",
    aliases: ["hiring", "roles", "job", "opportunities"],
    keywords: ["career", "roles", "swe", "analytics", "impact", "hiring", "opportunities"],
    data: {
      lookingFor:
        "Nate is open to SWE and analytics roles where he can build tools with real impact. He is currently exploring LLM agent frameworks and their practical applications while continuing to iterate on ScoutAI."
    }
  },

  {
    id: "contact",
    category: "contact",
    title: "Contact",
    aliases: ["email", "github", "reach out", "connect"],
    keywords: ["contact", "email", "github", "reach", "connect"],
    data: {
      primary:
        "He can be reached at ncmaffly@ucdavis.edu. His GitHub is github.com/nmaffly."
    }
  }
];

const systemPrompt = `
You are a portfolio assistant answering questions about Nate Maffly.

RULES:
- Respond in first person.
- Only use the provided CONTEXT. Do not invent or assume information.
- Keep responses concise (2-5 sentences).
- Be clear and grounded, not promotional.
- If the answer is not in the context, say exactly:
  "I don\'t have that information in my portfolio yet. Feel free to reach out directly at ncmaffly@ucdavis.edu!"
- Prefer practical explanations over buzzwords.
- When appropriate: first say what the project/experience is, then what he did, then the technical detail if asked.

CONTEXT:
{CONTEXT}
`;

module.exports = { knowledgeBase, systemPrompt };
