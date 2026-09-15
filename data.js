/**
 * ─────────────────────────────────────────────
 * data.js — Centralized Portfolio Data Model
 * ─────────────────────────────────────────────
 * Single source of truth for projects, research papers,
 * resume credentials, skills, and developer metadata.
 */

const portfolioData = {
  profile: {
    name: "HARSH RATHORE",
    role: "FULL-STACK & AI SYSTEMS ENGINEER",
    discipline: "FULL-STACK & AI SYSTEMS ENGINEERING",
    stack: "MERN ECOSYSTEM · AGENTIC AI & LLMS",
    location: "SURAT, GUJARAT, IN",
    timezone: "GMT+0530 (IST)",
    availability: "ACTIVE & DISPATCH READY",
    email: "harshpratapsinghrathore555@gmail.com",
    github: "https://github.com/harsh-pratap-singh-rathore",
    linkedin: "https://www.linkedin.com/in/harsh-rathore-1597012aa/"
  },

  manifesto: {
    lead: "Rejecting bloated templates. Engineering deliberate full-stack systems with autonomous AI precision.",
    paragraphs: [
      "I am a full-stack web developer and AI systems engineer focused on building digital platforms where thoughtful human interfaces converge with resilient, scalable engineering. Modern web applications require far more than surface styling; they demand rock-solid backend foundations, optimized document databases, and intuitive frontend states that operate in absolute harmony.",
      "My primary development stack centers on the MERN ecosystem across the entire software lifecycle—leveraging React for component-driven UI architecture, Node.js and Express for high-throughput REST APIs and middleware pipelines, and MongoDB for flexible data modeling and vector search. I prioritize clean code boundaries, reliable authentication patterns, and maintainable architectures that scale cleanly from concept to deployment."
    ]
  },

  learningProgress: {
    currentFocus: "MERN Stack Architecture & RESTful Systems",
    currentlyBuilding: "Full-Stack Web Applications & Real-Time Data Pipelines",
    skills: [
      {
        id: "js-engine",
        name: "JAVASCRIPT (ES6+)",
        percentage: 90,
        blocks: "██████████████████░░",
        detail: "Async patterns, Event loop mechanics, Closures, DOM engine architecture, Prototypes"
      },
      {
        id: "mern-stack",
        name: "MERN ECOSYSTEM",
        percentage: 82,
        blocks: "████████████████░░░░",
        detail: "React 19 hooks, Express modular routing, Mongo document modeling, Full-stack integration"
      },
      {
        id: "ai-systems",
        name: "DL · ML · OLLAMA",
        percentage: 78,
        blocks: "███████████████░░░░░",
        detail: "Deep learning neural nets, Scikit algorithms, Ollama local model inference, PyTorch pipelines"
      },
      {
        id: "backend-data",
        name: "BACKEND & DATA PIPELINES",
        percentage: 75,
        blocks: "███████████████░░░░░",
        detail: "RESTful API design, JWT/Session authentication, MySQL schemas, Middleware pipelines"
      },
      {
        id: "dsa-core",
        name: "DSA & ARCHITECTURAL LOGIC",
        percentage: 70,
        blocks: "██████████████░░░░░░",
        detail: "Data structures, Algorithmic space/time optimization, Deterministic state machines"
      }
    ]
  },

  projects: [
    {
      id: "shree-karni",
      number: "01 //",
      tag: "FULL-STACK E-COMMERCE",
      title: "SHREE KARNI TEXTILES",
      purpose: "Enterprise e-commerce platform delivering dynamic catalog exploration and secure transaction management for custom textile distribution.",
      problemSolved: "Streamlined inventory categorization, customer checkout session validation, and responsive mobile-first shopping navigation.",
      involvement: "Full-Stack Architecture (Frontend UI + Backend Data Handling)",
      features: [
        "Dynamic product browsing and categorized inventory indexing",
        "Secure session authorization state and cart persistence",
        "Optimized asset loading with sub-second page delivery",
        "Standardized dependency management and pathing mechanics"
      ],
      technologies: ["PHP", "JavaScript", "CSS3", "Composer", "HTML5"],
      year: "2026",
      liveUrl: "https://shreekarnitextiles.com",
      githubUrl: "https://github.com/harsh-pratap-singh-rathore"
    },
    {
      id: "code-canvas",
      number: "02 //",
      tag: "DEVELOPER TOOLING / UI ENGINE",
      title: "CODE CANVAS",
      purpose: "Interactive visual creation suite designed for developers to prototype, configure, and inspect responsive layouts in real time.",
      problemSolved: "Eliminates repetitive manual layout prototyping by providing live visual manipulation paired with instantaneous code output.",
      involvement: "Frontend Architecture & Engine Logic",
      features: [
        "Live interactive layout rendering canvas with instant viewport feedback",
        "Dynamic code generator producing clean markup and stylesheet output",
        "Strict brutalist typography and UI theme configuration matrix",
        "Zero-dependency vanilla JavaScript performance engine"
      ],
      technologies: ["JavaScript", "HTML5", "CSS3", "PHP"],
      year: "2026",
      liveUrl: "https://codecanvas.page/public/index.html",
      githubUrl: "https://github.com/harsh-pratap-singh-rathore/CodeCanvas"
    },
    {
      id: "my-voice",
      number: "03 //",
      tag: "CIVIC TECH / DATA PIPELINE",
      title: "MY VOICE",
      purpose: "Community issue reporting platform enabling citizens to submit, track, and monitor public infrastructure reports to local authorities.",
      problemSolved: "Replaces fragmented communication channels with a centralized, verified reporting pipeline featuring role-based workflows.",
      involvement: "Backend Engineering, Database Design & Frontend Integration",
      features: [
        "Secure user authentication with session management and input sanitation",
        "Relational MySQL database schema tracking issue status lifecycles",
        "Admin review portal with report categorization and status updates",
        "Responsive submission workflow optimized for mobile touchscreens"
      ],
      technologies: ["PHP", "MySQL", "JavaScript", "CSS3", "HTML5"],
      year: "2024",
      liveUrl: "https://myvoice.gt.tc/MyVoice/frontend/pages/index.php",
      githubUrl: "https://github.com/harsh-pratap-singh-rathore"
    }
  ],

  researchPapers: [
    {
      id: "agentic-llm-orchestration",
      number: "01 //",
      tag: "AI SYSTEMS / AGENT ARCHITECTURE",
      date: "2026 TECHNICAL REPORT",
      title: "AUTONOMOUS LLM AGENT ARCHITECTURES",
      subtitle: "Deterministic State Machines & Low-Latency Tool Orchestration in Web Systems",
      abstract: "Investigates the convergence of deterministic finite state machines with probabilistic large language models to eliminate unbounded tool execution loops and hallucinations in asynchronous web applications. Proposes a strict tiered JSON schema validation boundary coupled with speculative tool dispatch, achieving sub-200ms round-trip latency.",
      takeaways: [
        "Deterministic execution bounds preventing runaway tool calls",
        "Strict JSON schema enforcement with self-healing heuristic correction",
        "Context window caching and sub-250ms speculative tool dispatch"
      ],
      field: "LLM Systems · Agent Routing · Deterministic AI",
      readUrl: "https://github.com/harsh-pratap-singh-rathore",
      repoUrl: "https://github.com/harsh-pratap-singh-rathore"
    },
    {
      id: "dense-vector-retrieval",
      number: "02 //",
      tag: "RETRIEVAL / VECTOR EMBEDDINGS",
      date: "2025 BENCHMARK REPORT",
      title: "DENSE VECTOR RETRIEVAL IN DOCUMENT STORES",
      subtitle: "Optimizing Semantic Embedding Pipelines & Hybrid RAG in MongoDB Atlas",
      abstract: "Analyzes semantic retrieval precision across unstructured text chunks inside high-throughput document stores. Formulates a hybrid retrieval pipeline pairing BM25 keyword matching with dense cosine vector embeddings, elevating semantic recall by 41% while maintaining zero third-party vector database overhead.",
      takeaways: [
        "Hierarchical semantic chunking preserving cross-sentence token context",
        "Reciprocal Rank Fusion (RRF) combining lexical and vector scores",
        "Sub-50ms query latency profiling under sustained document throughput"
      ],
      field: "Vector Search · RAG Architecture · MongoDB Atlas",
      readUrl: "https://github.com/harsh-pratap-singh-rathore",
      repoUrl: "https://github.com/harsh-pratap-singh-rathore"
    },
    {
      id: "async-fullstack-state",
      number: "03 //",
      tag: "DISTRIBUTED SYSTEMS / EVENT LOOPS",
      date: "2025 SPECIFICATION",
      title: "RESILIENT ASYNCHRONOUS PIPELINES",
      subtitle: "Deterministic State Synchronization Across React & Node.js Runtimes",
      abstract: "Explores the mitigation of race conditions and memory leaks across full-stack JavaScript architectures. Establishes a lightweight transactional state bus that enforces eventual consistency between client-side optimistic UI updates and server-side document transactions over high-latency networks.",
      takeaways: [
        "Transactional rollback state machines for optimistic UI states",
        "Non-blocking Node.js stream backpressure management under high burst",
        "Zero-dependency isomorphic contract verification"
      ],
      field: "MERN Stack · Event Loop · Concurrency Controls",
      readUrl: "https://github.com/harsh-pratap-singh-rathore",
      repoUrl: "https://github.com/harsh-pratap-singh-rathore"
    }
  ],

  resume: {
    title: "HARSH RATHORE — CURRICULUM VITAE",
    edition: "2026 VERIFIED EDITION",
    location: "SURAT, GUJARAT, INDIA",
    summary: "Full-Stack Web Developer & AI Systems Engineer specializing in MERN stack architectures, robust RESTful APIs, and autonomous LLM agent integrations. Passionate about building resilient software systems with clean code boundaries and thoughtful human interfaces.",
    skillsHighlight: "React 19, JavaScript (ES6+), Node.js, Express, MongoDB, RESTful APIs, LLM Agents, Vector Search, Git/GitHub, Linux",
    downloadUrl: "https://github.com/harsh-pratap-singh-rathore",
    viewUrl: "https://github.com/harsh-pratap-singh-rathore"
  },

  expertise: [
    {
      categoryNumber: "01",
      categoryTitle: "CORE STACK",
      skills: [
        {
          name: "JAVASCRIPT (ES6+)",
          description: "Prototypes, asynchronous execution, closures, functional array methods, modern ES6+ syntax."
        },
        {
          name: "REACT.JS",
          description: "Component architecture, custom hooks, reactive state synchronization, and virtual DOM optimization."
        },
        {
          name: "NODE.JS",
          description: "Event-driven runtime, asynchronous I/O, npm ecosystem, and server-side process architecture."
        }
      ]
    },
    {
      categoryNumber: "02",
      categoryTitle: "BACKEND & DATA",
      skills: [
        {
          name: "EXPRESS.JS",
          description: "RESTful API design, modular routing architectures, custom middleware pipelines, and error handling layers."
        },
        {
          name: "MONGODB & MONGOOSE",
          description: "Document modeling, schema validation, aggregation pipelines, and indexed query design."
        },
        {
          name: "REST APIs & AUTH",
          description: "JWT authentication, session management, CORS configuration, and secure input sanitization."
        }
      ]
    },
    {
      categoryNumber: "03",
      categoryTitle: "ENGINEERING & AI",
      skills: [
        {
          name: "AGENTIC AI & VECTOR SEARCH",
          description: "LLM tool orchestration, prompt caching, semantic embeddings, and low-latency retrieval pipelines."
        },
        {
          name: "GIT & GITHUB",
          description: "Semantic commit history, feature branching, merge strategies, release workflows."
        },
        {
          name: "RESPONSIVE ARCHITECTURE",
          description: "Fluid typography (clamp), CSS Grid, Flexbox, touch-first breakpoint adaptation, and accessibility."
        }
      ]
    }
  ]
};

// Export for module or global window usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = portfolioData;
}
