export const personalInfo = {
  name: "Khan Sher",
  titles: [
    "Machine Learning Developer",
    "Frontend Developer",
    "AI Graphic Designer"
  ],
  headline: "Building intelligent systems, high-performance web applications, and creative AI-driven visuals.",
  aboutShort: "I am a Computer Science student and aspiring Machine Learning Developer with an interest in Artificial Intelligence, Deep Learning, frontend development, and AI-powered graphic design.",
  aboutFull: [
    "I am a Computer Science student and aspiring Machine Learning Developer with an active interest in Artificial Intelligence, Deep Learning, frontend development, and AI-powered graphic design.",
    "I have approximately one year of practical experience working on diverse projects, collaborating with clients, and developing web-based applications. I enjoy initiating, designing, and building practical projects that solve real-world problems through clean code and data-driven insights.",
    "Alongside development, I actively provide online training and conduct hands-on courses in Machine Learning, Frontend Development, AI-Assisted Graphic Design, and Microsoft Office tools—helping students and beginners translate theoretical fundamentals into practical skills."
  ],
  experienceYears: "~1 Year",
  email: "khansher68u@gmail.com",
  phone: "03185775553",
  whatsapp: "https://wa.me/923185775553",
  location: "Khyber Pakhtunkhwa, Pakistan",
  github: "https://github.com/sher-coder68",
  linkedinPlaceholder: "https://linkedin.com/in/#",
  twitterPlaceholder: "https://twitter.com/#",
  status: "Available for Projects & Collaboration"
};

export const educationData = [
  {
    degree: "Bachelor of Science in Computer Science (BSCS)",
    institution: "Bacha Khan University",
    location: "Charsadda, KP, Pakistan",
    duration: "2023 – 2027",
    status: "Currently pursuing degree (Active Student)",
    description: "Focusing on core computer science foundations, algorithms, data structures, software engineering principles, and mathematical foundations for Machine Learning and Artificial Intelligence.",
    highlights: [
      "Foundational Computer Science & Software Engineering",
      "Object-Oriented Programming & Data Structures",
      "Calculus, Linear Algebra & Probability for AI",
      "Database Management Systems & Web Technologies"
    ]
  }
];

export const experienceData = [
  {
    period: "2023 – Present (Approx. 1 Year)",
    role: "Junior Developer & Freelance Practitioner",
    organization: "Client Projects & Independent Development",
    category: "Development",
    description: "Delivering practical solutions across web interfaces and data workflows while collaborating directly with clients to meet functional requirements.",
    points: [
      "Built responsive, accessible web-based applications using modern HTML5, CSS3, and JavaScript.",
      "Developed beginner-to-intermediate Machine Learning pipelines using Python, Pandas, and Scikit-learn.",
      "Iterated on client feedback to refine user interfaces and optimize frontend performance.",
      "Researched and integrated modern AI developer workflows to accelerate project delivery."
    ]
  },
  {
    period: "2023 – Present",
    role: "Technical Instructor & Course Facilitator",
    organization: "Educational Institute & Online Technical Training",
    category: "Training & Education",
    description: "Mentoring students and junior peers through structured curriculum delivery and practical hands-on lab sessions.",
    points: [
      "Designed and delivered introductory courses in Machine Learning and Python programming.",
      "Taught foundational frontend development concepts (HTML, CSS, modern JavaScript).",
      "Conducted practical workshops on AI-assisted graphic design and creative prompt workflows.",
      "Instructed classes on Microsoft Office suite for business and academic productivity."
    ]
  },
  {
    period: "Ongoing",
    role: "AI & Emerging Tech Explorer",
    organization: "Self-Directed Research & Applied AI",
    category: "Research",
    description: "Investigating state-of-the-art developer tooling, open-source model deployments, and API integrations.",
    points: [
      "Prototyping applications with OpenAI, Anthropic, and Google Gemini API endpoints.",
      "Exploring containerization with Docker and deployment pipelines across cloud platforms.",
      "Experimenting with prompt design and AI generative engines for creative digital workflows."
    ]
  }
];

export const skillsData = {
  programming: {
    title: "Programming & Development",
    description: "Core languages and web engineering foundations for scalable applications",
    skills: [
      { name: "Python", level: "Primary Language", note: "ML pipelines, Pandas, Scikit-learn, scripting" },
      { name: "JavaScript", level: "Core Language", note: "ES6+, DOM, modern UI engineering, React" },
      { name: "Ruby on Rails", level: "Familiar Framework", note: "MVC architecture, backend conventions" },
      { name: "HTML5 / CSS3", level: "Semantic Markup", note: "Responsive layouts, Tailwind, modern CSS" }
    ]
  },
  aiMl: {
    title: "AI & Machine Learning",
    description: "Model development, deep learning concepts, and cutting-edge LLM ecosystems",
    skills: [
      { name: "Machine Learning", level: "Intermediate", note: "Supervised & unsupervised learning, Scikit-learn" },
      { name: "Deep Learning", level: "Foundations", note: "Neural networks, conceptual frameworks" },
      { name: "OpenAI API", level: "Integration", note: "Prompt engineering, function calling, agents" },
      { name: "Anthropic API", level: "Integration", note: "Claude models, structured reasoning workflows" },
      { name: "Google Gemini API", level: "Integration", note: "Multimodal prompts, Gemini SDK integrations" },
      { name: "LLM Integrations", level: "Applied", note: "Retrieval pipelines, embeddings, prompt chains" },
      { name: "Open-Source LLM Deployment", level: "Exploration", note: "Hugging Face models, local runtime testing" }
    ]
  },
  cloudDevOps: {
    title: "Cloud & DevOps",
    description: "Modern containerization, deployment pipelines, and cloud platform familiarity",
    skills: [
      { name: "Docker", level: "Containerization", note: "Dockerfiles, multi-stage builds, container isolation" },
      { name: "Kubernetes", level: "Foundations", note: "Pod concepts, cluster orchestration overview" },
      { name: "AWS", level: "Cloud Platform", note: "EC2, S3, cloud deployment basics" },
      { name: "Microsoft Azure", level: "Cloud Platform", note: "Cloud services, VM configuration" },
      { name: "Google Cloud Platform (GCP)", level: "Cloud Platform", note: "Cloud Run, compute instances, APIs" }
    ]
  },
  creative: {
    title: "Creative & AI Design",
    description: "Next-generation design workflows blending aesthetic principles with AI synthesis",
    skills: [
      { name: "AI-Assisted Graphic Design", level: "Practical", note: "Visual composition, typography, branding assets" },
      { name: "AI Image Generation", level: "Advanced Workflow", note: "Midjourney/Stable Diffusion prompting & refining" },
      { name: "Creative Design Workflows", level: "Applied", note: "Asset preparation, mood boards, rapid prototyping" },
      { name: "Microsoft Office Suite", level: "Instructional", note: "Advanced Word, Excel analysis, PowerPoint decks" }
    ]
  }
};

export const projectsData = [
  {
    id: "student-performance-prediction",
    title: "Student Performance Prediction",
    category: "Machine Learning",
    badge: "ML / Data Science",
    shortDescription: "A machine learning project that predicts student academic performance using relevant academic and socio-economic features.",
    fullDescription: "Built to analyze how demographic variables, study hours, attendance rates, and previous test scores influence overall student academic success. The model performs feature encoding, outlier detection, data normalization, and compares multiple regression algorithms using Scikit-learn to determine the most accurate predictor.",
    technologies: ["Python", "Pandas", "Scikit-learn", "Machine Learning", "NumPy", "Matplotlib"],
    metrics: [
      { label: "Pipeline", value: "EDA & Regression" },
      { label: "Core Library", value: "Scikit-learn" },
      { label: "Evaluation", value: "MAE, RMSE & R²" }
    ],
    github: null, // Placeholder as instructed
    demo: null,
    githubPlaceholder: "https://github.com/sher-coder68/student-performance-prediction-placeholder",
    demoPlaceholder: "#",
    featured: true
  },
  {
    id: "house-price-prediction",
    title: "House Price Prediction",
    category: "Machine Learning",
    badge: "Regression Analysis",
    shortDescription: "A regression-based machine learning project that estimates house prices using property features and market indicators.",
    fullDescription: "An end-to-end regression modeling project that predicts property market valuations based on features such as square footage, room count, neighborhood metrics, and building age. Employs comprehensive exploratory data analysis, correlation heatmaps, missing value imputation, and hyperparameter tuning across linear and ensemble regressors.",
    technologies: ["Python", "Pandas", "NumPy", "Scikit-learn", "Seaborn"],
    metrics: [
      { label: "Problem Type", value: "Supervised Regression" },
      { label: "Technique", value: "Feature Engineering" },
      { label: "Validation", value: "K-Fold Cross-Validation" }
    ],
    github: null,
    demo: null,
    githubPlaceholder: "https://github.com/sher-coder68/house-price-prediction-placeholder",
    demoPlaceholder: "#",
    featured: true
  },
  {
    id: "college-management-system",
    title: "College Management System",
    category: "Frontend Development",
    badge: "Web Application",
    shortDescription: "A web-based application designed to manage college-related information, student records, and administrative activities.",
    fullDescription: "A clean, responsive web application built to streamline collegiate record management, course schedules, and departmental notices. Features a structured dashboard layout, intuitive data tables, client-side search and filtering mechanisms, and an accessible mobile-friendly interface designed for faculty and administrative staff.",
    technologies: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "Local Storage", "UI/UX"],
    metrics: [
      { label: "Architecture", value: "Component-driven Web" },
      { label: "Accessibility", value: "WCAG Compliant" },
      { label: "Interface", value: "Fully Responsive" }
    ],
    github: null,
    demo: null,
    githubPlaceholder: "https://github.com/sher-coder68/college-management-system-placeholder",
    demoPlaceholder: "#",
    featured: true
  }
];

export const servicesData = [
  {
    id: "ml-solutions",
    title: "Machine Learning & Predictive Modeling",
    iconName: "BrainCircuit",
    description: "Developing structured predictive pipelines, exploratory data analyses, and regression or classification models tailored to real data problems.",
    deliverables: [
      "Data preprocessing, cleaning & feature engineering",
      "Scikit-learn model training & cross-validation",
      "Model evaluation reports (R², RMSE, Accuracy, F1)",
      "Python scripts ready for production integration"
    ]
  },
  {
    id: "frontend-dev",
    title: "Modern Frontend Web Development",
    iconName: "Layout",
    description: "Building fast, responsive, and visually modern web interfaces utilizing clean HTML, modern CSS/Tailwind, and dynamic JavaScript.",
    deliverables: [
      "Responsive, cross-device web interfaces",
      "Component-based architecture & clean code standards",
      "Fast loading performance & accessible layouts",
      "Interactive data presentations & dashboard interfaces"
    ]
  },
  {
    id: "online-training",
    title: "Technical Training & Mentorship",
    iconName: "GraduationCap",
    description: "Delivering practical, easy-to-understand online courses and coaching sessions for students and newcomers into tech.",
    deliverables: [
      "Machine Learning & Python from Scratch",
      "Frontend Development (HTML, CSS, JavaScript)",
      "AI-Assisted Graphic Design & Prompting workflows",
      "Microsoft Office Suite (Word, Excel, PowerPoint) mastery"
    ]
  },
  {
    id: "ai-creative",
    title: "AI-Assisted Graphic & Visual Design",
    iconName: "Sparkles",
    description: "Leveraging generative AI tools and creative workflows to craft striking digital visual assets, banners, and marketing collaterals.",
    deliverables: [
      "Prompt engineering for high-resolution visual generation",
      "Marketing banners, thumbnails & social graphics",
      "Visual branding asset conceptualization",
      "AI tool consultation for creative agencies"
    ]
  }
];

export const testimonialsData = [
  {
    id: "testimonial-placeholder-1",
    isPlaceholder: true,
    clientType: "Client Project",
    label: "Client Feedback Slot #1",
    clientRole: "Web Development Client (Placeholder)",
    institution: "Independent Business Client",
    quote: "Sample review placeholder: Khan communicated clearly throughout the development process, delivering a clean, responsive frontend on schedule. Highly receptive to design iterations.",
    rating: 5,
    date: "Verification Pending"
  },
  {
    id: "testimonial-placeholder-2",
    isPlaceholder: true,
    clientType: "Student / Trainee",
    label: "Student Feedback Slot #2",
    clientRole: "Machine Learning Course Student (Placeholder)",
    institution: "Online Training Cohort",
    quote: "Sample student feedback placeholder: The explanations of Python data structures and machine learning regression algorithms were straightforward, hands-on, and easy to follow.",
    rating: 5,
    date: "Verification Pending"
  },
  {
    id: "testimonial-placeholder-3",
    isPlaceholder: true,
    clientType: "Educational Institute",
    label: "Institute Feedback Slot #3",
    clientRole: "Academic Coordinator (Placeholder)",
    institution: "Educational Training Partner",
    quote: "Sample institutional review placeholder: Khan demonstrated strong dedication in preparing teaching materials and guiding students through practical IT and Microsoft Office workshops.",
    rating: 5,
    date: "Verification Pending"
  }
];

export const blogPostsData = [
  {
    id: "intro-to-machine-learning",
    title: "Introduction to Machine Learning: Foundations & Real-World Use",
    category: "Machine Learning",
    readTime: "5 min read",
    date: "March 2024",
    summary: "Discover what machine learning is, how algorithms learn patterns from data, and where supervised versus unsupervised learning fits into modern technology.",
    contentPreview: "Machine Learning (ML) has transitioned from academic laboratories into everyday software. At its core, ML shifts the paradigm of traditional programming: instead of explicitly hardcoding every rule, we feed data and desired outcomes into algorithms that learn the rules themselves.",
    fullContent: [
      "Machine Learning (ML) has transitioned from academic laboratories into everyday software. At its core, ML shifts the paradigm of traditional programming: instead of explicitly hardcoding every rule, we feed data and desired outcomes into algorithms that learn the rules themselves.",
      "In this introductory guide, we break down the three primary paradigms of Machine Learning: Supervised Learning (where models learn from labeled pairs like predicting house prices or diagnosing medical scans), Unsupervised Learning (discovering hidden patterns or customer segments without prior labels), and Reinforcement Learning.",
      "For beginners starting with Python, libraries like Scikit-learn, Pandas, and NumPy provide the ideal toolkit to preprocess datasets, split training and testing subsets, and evaluate performance using metrics such as Mean Squared Error and Accuracy."
    ],
    tags: ["Machine Learning", "Python", "Data Science", "Beginners"]
  },
  {
    id: "ml-vs-deep-learning",
    title: "Machine Learning vs Deep Learning: Key Differences & When to Use Each",
    category: "AI Architecture",
    readTime: "6 min read",
    date: "April 2024",
    summary: "A practical breakdown of when to rely on traditional Scikit-learn tabular models versus when deep multi-layer neural networks are truly justified.",
    contentPreview: "While Deep Learning is a subset of Machine Learning, their architectural foundations and computational requirements differ substantially. Understanding these differences helps developers choose the right tool.",
    fullContent: [
      "While Deep Learning is a subset of Machine Learning, their architectural foundations and computational requirements differ substantially. Deep Learning relies on artificial neural networks inspired by biological brains, capable of learning hierarchical feature representations directly from raw inputs like images and audio.",
      "In contrast, traditional Machine Learning models—such as Random Forests, Support Vector Machines, and Gradient Boosted Trees—often outperform deep networks on structured, tabular datasets while requiring significantly less compute, memory, and training data.",
      "Before jumping straight to deep neural nets, engineers should always establish a rigorous baseline with classic ML models to evaluate cost-to-benefit ratios."
    ],
    tags: ["Deep Learning", "Machine Learning", "Neural Networks", "AI"]
  },
  {
    id: "getting-started-with-python",
    title: "Getting Started with Python: Essential Libraries for Modern Developers",
    category: "Programming",
    readTime: "4 min read",
    date: "May 2024",
    summary: "The essential ecosystem for aspiring developers—from virtual environments and Jupyter Notebooks to Pandas, NumPy, and clean code formatting.",
    contentPreview: "Python has established itself as the lingua franca of data science, artificial intelligence, and automation due to its readable syntax and rich third-party library ecosystem.",
    fullContent: [
      "Python has established itself as the lingua franca of data science, artificial intelligence, and automation due to its readable syntax and rich third-party library ecosystem.",
      "To build production-grade workflows, developers should start by mastering virtual environments (venv or conda) to isolate dependencies. Next, familiarizing oneself with vectorized operations in NumPy eliminates inefficient loops, while Pandas provides expressive data frame manipulation.",
      "Adopting tools like Black and Flake8 ensures consistent code quality across collaborative repositories."
    ],
    tags: ["Python", "Programming", "Pandas", "Clean Code"]
  },
  {
    id: "building-your-first-ml-project",
    title: "Building Your First ML Project: From Data Collection to Evaluation",
    category: "Machine Learning",
    readTime: "7 min read",
    date: "June 2024",
    summary: "A step-by-step roadmap for scoping, cleaning, training, and validating an end-to-end beginner-to-intermediate machine learning model.",
    contentPreview: "Many beginners struggle not with understanding machine learning algorithms, but with organizing the sequential stages of an applied machine learning project.",
    fullContent: [
      "Many beginners struggle not with understanding machine learning algorithms, but with organizing the sequential stages of an applied machine learning project.",
      "Stage 1 starts with problem framing: defining whether your objective is classification, regression, or clustering, and choosing the appropriate success metric before writing code.",
      "Stage 2 is Exploratory Data Analysis (EDA): inspecting distributions, checking for class imbalance, handling missing values, and detecting anomalies. Stage 3 is pipeline construction: ensuring feature transformations are fit strictly on training splits to prevent data leakage.",
      "Finally, Stage 4 encompasses cross-validation, hyperparameter tuning, and documenting failure modes."
    ],
    tags: ["Machine Learning", "Workflow", "Scikit-Learn", "Projects"]
  },
  {
    id: "intro-to-llms",
    title: "Introduction to Large Language Models: APIs, Prompts & Integrations",
    category: "Generative AI",
    readTime: "6 min read",
    date: "July 2024",
    summary: "How modern developers can leverage OpenAI, Claude, and Gemini APIs to build intelligent capabilities into real-world web applications.",
    contentPreview: "Large Language Models (LLMs) have fundamentally altered software development. Developers no longer need to train billion-parameter models from scratch to incorporate natural language intelligence.",
    fullContent: [
      "Large Language Models (LLMs) have fundamentally altered software development. Developers no longer need to train billion-parameter models from scratch to incorporate natural language intelligence.",
      "Through structured API endpoints offered by OpenAI, Anthropic, and Google Gemini, developers can execute semantic parsing, summarization, conversational agents, and structured JSON extraction.",
      "Key techniques such as system prompt formulation, few-shot prompting, and grounding with external data enable resilient real-world software integrations without hallucination hazards."
    ],
    tags: ["LLM", "OpenAI", "Gemini", "Anthropic", "APIs"]
  },
  {
    id: "ai-tools-for-developers",
    title: "AI Tools for Developers: Boosting Daily Productivity and Code Quality",
    category: "Developer Tools",
    readTime: "5 min read",
    date: "August 2024",
    summary: "A curated look at how modern developers leverage AI code assistants, automated test generators, and documentation accelerators responsibly.",
    contentPreview: "AI developer tooling has grown far beyond simple auto-complete. Used with discipline, AI tools act as round-the-clock junior pairing partners.",
    fullContent: [
      "AI developer tooling has grown far beyond simple auto-complete. Used with discipline, AI tools act as round-the-clock junior pairing partners.",
      "From generating boilerplate boilerplate unit tests and explaining complex regex expressions to reviewing syntax edge cases, AI tools free up cognitive energy for architectural decisions.",
      "The critical skill is verification: understanding every line generated and maintaining strict human oversight on security, licensing, and correctness."
    ],
    tags: ["Productivity", "Developer Tools", "AI", "Engineering"]
  },
  {
    id: "frontend-development-tips",
    title: "Frontend Development Tips: Crafting Scalable, Modern & Accessible UIs",
    category: "Web Development",
    readTime: "5 min read",
    date: "September 2024",
    summary: "Proven strategies for building fast, responsive, and visually harmonious web interfaces that stand out to international clients.",
    contentPreview: "Great frontend development is where engineering rigor meets visual empathy. A truly professional interface prioritizes accessibility, speed, and subtle interaction details.",
    fullContent: [
      "Great frontend development is where engineering rigor meets visual empathy. A truly professional interface prioritizes accessibility, speed, and subtle interaction details.",
      "Key recommendations include maintaining strict color contrast ratios, designing mobile-first responsive breakpoints, minimizing layout shifts, and using semantic HTML tags.",
      "Pairing utility-first frameworks like Tailwind CSS with reusable React components allows developers to iterate rapidly without incurring stylesheet bloat."
    ],
    tags: ["Frontend", "React", "CSS", "UI/UX", "Accessibility"]
  }
];

