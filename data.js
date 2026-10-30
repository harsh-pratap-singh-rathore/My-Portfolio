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
    role: "MERN STACK DEVELOPER | FULL-STACK WEB ENGINEER",
    discipline: "MERN ARCHITECTURE & AI-ACCELERATED ENGINEERING",
    stack: "MERN ECOSYSTEM · AUDIOPHILE DSP · AGENTIC AI & LLMS",
    location: "SURAT, GUJARAT, IN",
    timezone: "GMT+0530 (IST)",
    availability: "ACTIVE & DISPATCH READY",
    email: "harshpratapsinghrathore555@gmail.com",
    portfolio: "https://harshrathore.vercel.app",
    github: "https://github.com/harsh-pratap-singh-rathore",
    linkedin: "https://www.linkedin.com/in/harsh-rathore-1597012aa/"
  },

  manifesto: {
    lead: "Rejecting bloated templates. Engineering deliberate full-stack systems with autonomous AI precision.",
    paragraphs: [
      "I am a full-stack web developer and AI systems engineer focused on building digital platforms where thoughtful human interfaces converge with resilient, scalable engineering. Modern web applications require far more than surface styling; they demand rock-solid backend foundations, optimized document databases, and intuitive frontend states that operate in absolute harmony.",
      "My primary development stack centers on the MERN ecosystem across the entire software lifecycle—leveraging React for component-driven UI architecture, Node.js and Express for high-throughput REST APIs and middleware pipelines, and MongoDB for flexible document data modeling and aggregations. I prioritize clean code boundaries, reliable authentication patterns, and maintainable architectures that scale cleanly from concept to deployment."
    ]
  },

  learningProgress: {
    currentFocus: "MERN Stack Architecture & High-Performance Audio DSP",
    currentlyBuilding: "Dropify (Audiophile Android & Windows PC Player) & Real-Time Data Pipelines",
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
      id: "dropify",
      number: "01 //",
      tag: "NATIVE ANDROID & WINDOWS PC",
      title: "DROPIFY",
      purpose: "High-fidelity audiophile music player engineered natively for Android and Windows PC with a custom 10-band DSP equalizer and LRCLIB real-time synchronized lyrics.",
      problemSolved: "Delivers an ad-free, local and streaming music ecosystem with low-latency hardware audio decoding, Nothing OS liquid glass UI, and zero subscription barriers.",
      involvement: "Audio DSP Engineering, Android App (Kotlin), Windows Desktop (Electron), and Stream Extraction Pipeline",
      features: [
        "10-Band Hardware-Accelerated Equalizer with ±12dB biquad filters and audiophile presets",
        "Mid/Side Stereo Expander widening acoustic spatial depth without phase cancellation",
        "Real-time millisecond-synchronized lyrics resolver powered by LRCLIB",
        "Native Android APK (v1.0.2) and Windows PC installer packages",
        "Zero-telemetry privacy architecture and high-performance offline caching"
      ],
      technologies: ["Android (Kotlin)", "Windows (Electron)", "Audio DSP Engine", "Node.js", "LRCLIB API", "Tailwind CSS"],
      year: "2026",
      liveUrl: "https://github.com/harsh-pratap-singh-rathore/Dropify/releases",
      githubUrl: "https://github.com/harsh-pratap-singh-rathore/Dropify"
    },
    {
      id: "shree-karni",
      number: "02 //",
      tag: "CLIENT PRODUCTION · E-COMMERCE",
      title: "SHREE KARNI TEXTILES",
      purpose: "Full-stack enterprise e-commerce platform for custom textile distribution, cataloging 10,000+ fabric SKUs with sub-second page delivery and transactional cart persistence.",
      problemSolved: "Streamlined inventory categorization across 10,000+ fabric items, customer checkout session validation, and responsive mobile-first shopping navigation.",
      involvement: "Full-Stack Architecture (Frontend UI + Backend Data Handling)",
      features: [
        "10,000+ fabric SKU cataloging with high-speed indexing and multi-parameter filters",
        "Secure session authorization state and persistent transactional cart management",
        "Optimized image delivery pipeline delivering sub-second page loads",
        "Standardized Composer dependency management and responsive UI architecture"
      ],
      technologies: ["PHP", "MySQL", "JavaScript (ES6+)", "CSS3", "Composer", "Responsive Design"],
      year: "2026",
      liveUrl: "https://shreekarnitextiles.com",
      githubUrl: "https://github.com/harsh-pratap-singh-rathore"
    },
    {
      id: "code-canvas",
      number: "03 //",
      tag: "DEVELOPER TOOLING · AI WORKBENCH",
      title: "CODE CANVAS",
      purpose: "Interactive developer creation suite and AI-assisted workbench allowing users to visually manipulate and inspect responsive layouts at 60 FPS.",
      problemSolved: "Eliminates repetitive manual layout prototyping by translating natural language design instructions into clean CSS/HTML markup via local AI workflows.",
      involvement: "Frontend Architecture & Engine Logic",
      features: [
        "Zero-dependency vanilla JavaScript performance engine running at smooth 60 FPS",
        "Local AI code generation (Antigravity & Claude Code workflows) translating design prompts to CSS/HTML",
        "Live interactive layout rendering canvas with instant viewport feedback",
        "Dynamic code generator producing clean, production-ready stylesheets and markup"
      ],
      technologies: ["JavaScript (ES6+)", "HTML5 Canvas", "CSS3 Grid/Flexbox", "Local AI Workflows"],
      year: "2026",
      liveUrl: "https://codecanvas.page/public/index.html",
      githubUrl: "https://github.com/harsh-pratap-singh-rathore/CodeCanvas"
    },
    {
      id: "my-voice",
      number: "04 //",
      tag: "CIVIC TECH · MUNICIPAL TRIAGE",
      title: "MY VOICE",
      purpose: "Civic tech platform enabling citizens to report, geolocate, and track public infrastructure complaints directly to municipal authorities.",
      problemSolved: "Replaces fragmented municipal communication channels with a centralized, verified incident pipeline featuring role-based triage workflows.",
      involvement: "Backend Engineering, Database Design & Frontend Integration",
      features: [
        "Normalized relational MySQL database tracking issue lifecycles (Reported, In Triage, Dispatched, Resolved)",
        "Role-based administrative controls slashing ticket dispatch overhead by 40%",
        "GPS-tagged incident reporting with multimedia attachments for civic complaints",
        "Secure user authentication with session management and input sanitation"
      ],
      technologies: ["PHP", "MySQL", "JavaScript (ES6+)", "RESTful APIs", "Session Auth", "Bootstrap"],
      year: "2024",
      liveUrl: "https://myvoice.gt.tc/MyVoice/frontend/pages/index.php",
      githubUrl: "https://github.com/harsh-pratap-singh-rathore"
    }
  ],

  researchPapers: [
    {
      id: "waste-object-detection",
      number: "01 //",
      tag: "COMPUTER VISION · OBJECT DETECTION",
      date: "IRJMETS · SEPT 2026",
      title: "MULTI-CLASS WASTE OBJECT DETECTION USING YOLO11N: A DEEP LEARNING APPROACH FOR INTELLIGENT WASTE SEGREGATION",
      subtitle: "Transfer Learning & Multi-Class Evaluation Across 60 Categories on the TACO Dataset",
      abstract: "Implements a deep learning object detection framework using YOLO11n on the TACO dataset (1,500 images, 4,784 annotations, 60 waste classes). Converts COCO annotations to normalized YOLO coordinates, fine-tunes with transfer learning on NVIDIA Tesla T4 GPU, achieving 45.63% Precision and 13.45% mAP@50 under real-world cluttered conditions.",
      modelsUsed: "YOLO11n (Ultralytics) · Backbone + PAN-FPN + Detection Head",
      techUsed: "PyTorch · CUDA Acceleration · TACO Dataset · AdamW Optimizer",
      keyMetrics: "45.63% Precision · 13.45% mAP@50 · 60 Waste Categories",
      field: "Object Detection · Waste Segregation · Computer Vision",
      pdfUrl: "assets/research/papers/waste-object-detection-yolo11n.pdf",
      doiUrl: "https://www.doi.org/10.56726/IRJMETS102755"
    },
    {
      id: "ai-image-detection",
      number: "02 //",
      tag: "IMAGE FORENSICS · DEEP LEARNING",
      date: "IJRASET · DEC 2025",
      title: "A COMPARATIVE STUDY OF SPATIAL AND FREQUENCY-DOMAIN CNN MODELS FOR DETECTING AI-GENERATED IMAGES",
      subtitle: "Evaluating Baseline Spatial CNN vs. Hybrid Fast Fourier Transform (FFT) Models",
      abstract: "Conducts an empirical comparative study between a baseline spatial-domain CNN and a hybrid CNN integrating Fast Fourier Transform (FFT) frequency features across 60,000 images (30,000 real, 30,000 synthetic). Demonstrates that spatial-domain CNNs achieve 85.3% test accuracy, outperforming frequency hybrids (76–78%) under realistic social-media compression.",
      modelsUsed: "Spatial-Domain CNN · CNN + FFT Dual-Branch Hybrid Architecture",
      techUsed: "TensorFlow / Keras · Fast Fourier Transform (FFT) · Magnitude Spectrum · GPU",
      keyMetrics: "85.3% Spatial Test Accuracy vs. 76-78% Hybrid · 60,000 Images",
      field: "AI-Generated Image Detection · Image Forensics · Frequency Domain Analysis",
      pdfUrl: "assets/research/papers/spatial-frequency-cnn-ai-images.pdf",
      doiUrl: "https://doi.org/10.22214/ijraset.2025.76618"
    },
    {
      id: "car-model-classification",
      number: "03 //",
      tag: "FINE-GRAINED VISION · ITS",
      date: "IRJMETS · SEPT 2025",
      title: "ANALYSING THE EFFECTIVENESS OF DEEP LEARNING MODELS FOR CAR MODEL CLASSIFICATION: A COMPARATIVE APPROACH",
      subtitle: "Multi-Angle Perspective Recognition Across 16 Vehicle Models via Pretrained Deep CNNs",
      abstract: "Evaluates VGG16, MobileNetV2, and ResNet50 for vehicle model recognition across 7,463 images spanning 16 car models and 8 distinct camera viewpoints. Demonstrates that ResNet50 achieved the highest overall accuracy of 95.8% (100% on front-right angles), establishing benchmark criteria for Intelligent Transportation Systems.",
      modelsUsed: "ResNet50 (Residual Skip Connections) · MobileNetV2 · VGG16 Baseline",
      techUsed: "TensorFlow / Keras · 8-Angle Multi-Viewpoint Dataset · Transfer Learning",
      keyMetrics: "95.8% ResNet50 Accuracy · 100% Front-Right View · 8 Viewing Angles",
      field: "Vehicle Model Recognition · Intelligent Transportation · Deep CNNs",
      pdfUrl: "assets/research/papers/car-model-classification-cnn.pdf",
      doiUrl: "https://www.doi.org/10.56726/IRJMETS82757"
    },
    {
      id: "cifar100-benchmarking",
      number: "04 //",
      tag: "BENCHMARKING · ARCHITECTURAL STUDY",
      date: "IJRASET · NOV 2025",
      title: "PERFORMANCE BENCHMARKING OF CNN ARCHITECTURES FOR FINE-GRAINED IMAGE CLASSIFICATION ON CIFAR-100",
      subtitle: "Controlled Evaluation of ResNet-18, EfficientNet-B0, and GoogLeNet Without Pretraining Bias",
      abstract: "Benchmarked three popular CNN architectures (ResNet-18, GoogLeNet, EfficientNet-B0) trained from scratch strictly under identical conditions on CIFAR-100 (60,000 images, 100 classes, 32×32). ResNet-18 achieved the highest accuracy of 65%, outperforming EfficientNet (62%) and GoogLeNet (42%), confirming the power of residual connections on constrained resolutions.",
      modelsUsed: "ResNet-18 (Residual Flow) · EfficientNet-B0 (Compound Scaling) · GoogLeNet (Inception)",
      techUsed: "TensorFlow / Keras · CIFAR-100 Benchmark · Adam Optimizer · GPU Acceleration",
      keyMetrics: "65% ResNet-18 vs. 62% EfficientNet vs. 42% GoogLeNet · 100 Classes",
      field: "Fine-Grained Classification · CNN Benchmarking · CIFAR-100",
      pdfUrl: "assets/research/papers/cifar100-cnn-benchmarking.pdf",
      doiUrl: "https://doi.org/10.22214/ijraset.2025.75713"
    }
  ],

  resume: {
    title: "HARSH RATHORE — CURRICULUM VITAE",
    edition: "2026 VERIFIED EDITION",
    location: "SURAT, GUJARAT, INDIA",
    summary: "Full-Stack Web Developer specializing in MERN stack architectures, robust RESTful APIs, and practical Deep Learning / Computer Vision implementations. Passionate about building resilient software systems with clean code boundaries and thoughtful human interfaces.",
    skillsHighlight: "React 19, JavaScript (ES6+), Node.js, Express, MongoDB, RESTful APIs, PyTorch, Deep Learning, Git/GitHub, Linux",
    downloadUrl: "./Harsh_Rathore_Resume.pdf",
    viewUrl: "./Harsh_Rathore_Resume.pdf"
  },

  education: [
    {
      degree: "Master of Computer Applications (MCA)",
      institution: "Uka Tarsadia University",
      location: "Bardoli, Gujarat, India",
      year: "2026 – 2028"
    },
    {
      degree: "Bachelor of Computer Applications (BCA)",
      institution: "Uka Tarsadia University",
      location: "Bardoli, Gujarat, India",
      score: "7.77 CGPA",
      year: "2023 – 2026"
    }
  ],

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
      categoryTitle: "DEEP LEARNING & AI TOOLING",
      skills: [
        {
          name: "DEEP LEARNING & PYTORCH",
          description: "CNN architectures (ResNet, YOLO11, MobileNet), computer vision benchmarking, transfer learning."
        },
        {
          name: "AI-ASSISTED DEVELOPMENT",
          description: "Leveraging cutting-edge AI systems (Antigravity, Claude Code, Ollama local models) to accelerate site building."
        },
        {
          name: "GIT & RESPONSIVE ARCHITECTURE",
          description: "Git/GitHub semantic workflows, CSS Grid, Flexbox, touch-first breakpoint adaptation, and accessibility."
        }
      ]
    }
  ]
};

// Export for module or global window usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = portfolioData;
}
