export const ROLES = {
  'software-developer': {
    title: 'Software Developer',
    description: 'Learn to build software from scratch. A Software Developer creates the computer programs we use every day, like web browsers, office tools, and mobile apps.',
    steps: [
      { 
        id: 1, 
        title: 'Building Blocks: Logic & Algorithms', 
        details: 'Everything in software starts with simple logic. You need to learn how to tell a computer to solve problems efficiently.',
        popupDescription: `I.   MODERN PROBLEM SOLVING OVERVIEW
        ------------------------------------------------------------
        This foundational stage is the "Brain" of your engineering journey. It involves the critical skill of decomposing high-level business problems into a sequence of simple, logical instructions that a machine can execute with precision. Mastery here is not about memorizing code, but about training your mind to see the patterns behind every complex task.

        II.  CORE DATA STRUCTURES TO MASTER
        ------------------------------------------------------------
        - Linear Structures: Mastering Linked Lists, Stacks, and Queues for sequential data handling.
        - Hierarchical Structures: Understanding Trees (Binary Search Trees, Heaps) and Graphs for relationship mapping.
        - Retrieval Efficiency: Implementing Hash Maps and Dictionaries for near-instant data lookup.

        III. ESSENTIAL ALGORITHMS & EFFICIENCY
        ------------------------------------------------------------
        - Big O Analysis: Learning to measure Performance (Time) and Memory (Space) usage for scalable applications.
        - Sorting & Searching: Implementing industrially optimized techniques like Merge Sort, Quick Sort, and Binary Search.
        - Optimization Techniques: Using Greedy Algorithms and Dynamic Programming to solve multi-step problems without redundant effort.

        IV.  WHY IT MATTERS FOR MNCs
        ------------------------------------------------------------
        Top-tier companies like Amazon and Google operate at a massive scale. They require engineers who can write code that remains lightning-fast even when processing billions of records. This stage provides the competitive edge needed to clear the most rigorous technical assessments.`
      },
      { 
        id: 2, 
        title: 'Language Sovereignty: Core Development', 
        details: 'Choosing your primary tool for building industrial systems. Master the internals of Java, C++, or Python.',
        popupDescription: `I.   TECHNICAL LANGUAGE OVERVIEW
        ------------------------------------------------------------
        Industrial software is built using powerful, strictly structured languages. This stage focuses on gaining "Sovereignty" over your chosen language—moving beyond basic syntax into the deep internals of how the language manages memory, execution, and security.

        II.  ADVANCED TOPICS TO MASTER
        ------------------------------------------------------------
        - Object-Oriented Principles: Deep dive into Classes, Interfaces, Inheritance, and Polymorphism for clean code.
        - Memory & Resource Management: Understanding Pointers, Stack vs Heap, and Garbage Collection cycles.
        - System Resilience: Mastering Exception Handling, Try-Catch blocks, and creating custom, scalable error messages.
        - Concurrency & Threads: Learning how to run multiple tasks simultaneously to maximize modern CPU power.

        III. WHY IT MATTERS FOR MNCs
        ------------------------------------------------------------
        In a professional environment, code must be more than just "functional"—it must be maintainable, reusable, and secure. Companies look for developers who understand the hidden mechanics of their tools, allowing them to build systems that are significantly more reliable under heavy load.`
      },
      { 
        id: 3, 
        title: 'Data Engineering: Persistence & Systems', 
        details: 'Learning how computers store, retrieve, and manage data persistently in professional environments.',
        popupDescription: `I.   SYSTEMS ARCHITECTURE OVERVIEW
        ------------------------------------------------------------
        No software is complete without a way to remember user progress and business records. You must transition from writing scripts to designing full-scale "Persistence Layers" where data is stored safely, indexed for speed, and protected against system failures.

        II.  RELATIONAL & DOCUMENT DATA TOPICS
        ------------------------------------------------------------
        - RDBMS Excellence: Mastering SQL for complex queries, Joins, and high-speed data retrieval.
        - Performance Engineering: Learning Database Indexing, Query Optimization, and preventing "Deadlocks."
        - Modern Paradigms: Exploring NoSQL (MongoDB, Cassandra) for flexible, horizontally scaling data needs.
        - ACID Properties: Ensuring Transactions are Atomical, Consistent, Isolated, and Durable for financial accuracy.

        III. WHY IT MATTERS FOR MNCs
        ------------------------------------------------------------
        Slow data retrieval is the primary cause of app failure. Understanding how to organize data correctly allows you to design applications that can support millions of simultaneous users without slowing down or losing a single byte of information.`
      },
      { 
        id: 4, 
        title: 'Scale & Architecture: System Design', 
        details: 'Designing infrastructures that handle global audiences without compromise.',
        popupDescription: `I.   SCALABLE ARCHITECTURE OVERVIEW
        ------------------------------------------------------------
        System Design marks your transition from a Coder to an Architect. You will look at the "Big Picture"—thinking about how hundreds of servers and different software services work together across the globe to deliver a single experience.

        II.  DISTRIBUTED SYSTEM TOPICS
        ------------------------------------------------------------
        - Scalability Patterns: Understanding when to use Vertical Scaling (more power) vs Horizontal Scaling (more servers).
        - High Availability: Deploying Load Balancers and CDNs to ensure the app is never "Down" in any region.
        - Decoupled Systems: Implementing Microservices and Message Queues (Kafka, RabbitMQ) to prevent one error from crashing the whole app.
        - Data Reliability: Mastering Database Sharding and Replication to keep data close to the user's location.

        III. WHY IT MATTERS FOR MNCs
        ------------------------------------------------------------
        When platforms like Netflix or Instagram process massive traffic, they rely on these architectural principles. This is the most prestigious and highly-paid skill in the engineering world, demonstrating that you can lead large-scale digital transformations.`
      },
      { 
        id: 5, 
        title: 'Corporate Performance: The Interview Phase', 
        details: 'Final polish on technical communication, high-pressure problem solving, and professional presentation.',
        popupDescription: `I.   CORPORATE ASSESSMENT OVERVIEW
        ------------------------------------------------------------
        The final stage is proving your expertise to the world. High-level interviews at MNCs are not just about "what you know," but about "how you think." This stage prepares you to communicate your logic clearly under pressure.

        II.  INTERVIEW & CAREER SUB-TOPICS
        ------------------------------------------------------------
        - Logic Articulation: Learning to explain your thought process while coding onto a whiteboard or shared editor.
        - Behavioral Strategy: Mastering the STAR Method (Situation, Task, Action, Result) for leadership interviews.
        - High-Pressure Solving: Intensive training with LeetCode "Hard" problems to refine your speed and accuracy.
        - Artifact Preparation: Building an ATS-optimized resume and a high-impact portfolio of real-world projects.

        III. WHY IT MATTERS FOR MNCs
        ------------------------------------------------------------
        MNCs hire for culture and problem-solving potential. This stage ensures you don't just have the skills, but also the professional presence to clear the toughest entry barriers and secure your dream role.`
      }
    ]
  },
  'frontend-developer': {
    title: 'Frontend Developer',
    description: 'The Front-End Developer builds everything you see, touch, and click in a web browser. It is a mix of tech and design.',
    steps: [
      { 
        id: 1, 
        title: 'Structure & Style: Responsive Design', 
        details: 'The visual core of the modern web. Master HTML5 and CSS Architecture.',
        popupDescription: `I.   VISUAL ARCHITECTURE OVERVIEW
        ------------------------------------------------------------
        Modern web design is about more than just colors. It is about creating a "Fluid" experience that adapts perfectly across smartphones, tablets, and high-resolution desktops. You will learn to build the "Skin" of the application with professional accuracy.

        II.  CSS & LAYOUT SUB-TOPICS
        ------------------------------------------------------------
        - Semantic HTML5: Using the right tags to ensure Search Engines (SEO) and users can understand your content.
        - Modern Layout Engines: Mastering CSS Flexbox and Grid to build complex interfaces with minimal code.
        - Responsive Systems: Using Media Queries and Viewport units to ensure a "Mobile First" experience.
        - Design Consistency: Implementing SASS/SCSS and CSS Variables for scalable, enterprise-grade themes.

        III. WHY IT MATTERS FOR MNCs
        ------------------------------------------------------------
        The first interaction a user has is with your UI. Professional, responsive code ensures that the brand looks premium and accessible on every device, which is essential for global user retention.`
      },
      { 
        id: 2, 
        title: 'Client-Side Brain: Advanced JavaScript', 
        details: 'Turning static pages into powerful interactive applications using the world\'s most popular language.',
        popupDescription: `I.   INTERACTIVE LOGIC OVERVIEW
        ------------------------------------------------------------
        JavaScript is the engine of the modern web. This stage focuses on moving beyond "Simple scripts" to building complex logic that manages user data, server updates, and real-time interactions in the browser.

        II.  JAVASCRIPT SUB-TOPICS TO MASTER
        ------------------------------------------------------------
        - Modern ES6+ Standards: Mastering Arrow Functions, Destructuring, and Template Literals for clean code.
        - Asynchronous Power: Using Promises and Async/Await to handle data from servers without freezing the page.
        - The Event Loop: Understanding how JavaScript handles thousands of interactions without blocking.
        - Scope & Closures: Mastering the hidden mechanics of the language for high-performance memory management.

        III. WHY IT MATTERS FOR MNCs
        ------------------------------------------------------------
        JavaScript is the only language that runs everywhere. Mastering its advanced concepts allows you to build features like live chat, drag-and-drop interfaces, and real-time dashboards that feel as fast as a desktop app.`
      },
      { 
        id: 3, 
        title: 'Reusable Systems: ReactJS Mastery', 
        details: 'Building large-scale apps with reusable components and efficient, predictable state management.',
        popupDescription: `I.   COMPONENT-BASED ARCHITECTURE OVERVIEW
        ------------------------------------------------------------
        Instead of building "Pages," modern devs build "Components"—independent building blocks that can be reused across an entire platform. React is the industry standard used by Meta, Netflix, and Airbnb.

        II.  REACT ECOSYSTEM SUB-TOPICS
        ------------------------------------------------------------
        - Declarative UI: Learning JSX to describe what the user should see based on the data.
        - React Hooks: Mastering useState, useEffect, and useMemo to manage the "Memory" of your components.
        - State Management: Using Redux or Zustand to ensure data stays synchronized across massive, complex apps.
        - Routing & Navigation: Building "Single Page Applications (SPAs)" that feel fluid and instant.

        III. WHY IT MATTERS FOR MNCs
        ------------------------------------------------------------
        Companies use React to scale their development teams. Mastering this allows you to contribute to multi-billion dollar platforms where code consistency and component reuse are critical for business success.`
      },
      { 
        id: 4, 
        title: 'Modern Tooling & Build Engineering', 
        details: 'Optimizing your code for high-performance delivery and professional quality control.',
        popupDescription: `I.   PERFORMANCE & QUALITY OVERVIEW
        ------------------------------------------------------------
        Professional developers do not just write code; they ensure it is high-quality, bug-free, and loads in less than a second. This stage covers the "Build Process"—automating the testing and optimization of your web apps.

        II.  BUILD & QUALITY SUB-TOPICS
        ------------------------------------------------------------
        - Performance Optimization: Mastering Lighthouse scores, Image compression, and "Code Splitting."
        - Specialized Tooling: Setting up Vite, Webpack, and pnpm for lightning-fast development workflows.
        - Quality Assurance: Writing Unit Tests with Jest and End-to-End tests to catch bugs before they reach users.
        - Type Safety: Using TypeScript to find errors in your code while you are still writing it.

        III. WHY IT MATTERS FOR MNCs
        ------------------------------------------------------------
        In a large-scale project, a small bug can affect millions. Automated tooling and performance optimization ensure your software remains stable, professional, and ultra-fast for every user on the planet.`
      },
      { 
        id: 5, 
        title: 'Human-Centric Design: Web Accessibility', 
        details: 'Ensuring your digital products are usable by everyone, regardless of their physical abilities.',
        popupDescription: `I.   INCLUSIVE DESIGN OVERVIEW
        ------------------------------------------------------------
        "Accessibility (a11y)" is the science of making the web usable for everyone, including people who are blind, colorblind, or cannot use a mouse. This is a core requirement for any high-level corporate project.

        II.  ACCESSIBILITY SUB-TOPICS
        ------------------------------------------------------------
        - Semantic Accessibility: Using correct HTML tags so Screen Readers can describe the site to visually impaired users.
        - ARIA Standards: Implementing Accessible Rich Internet Applications (ARIA) for complex UI components.
        - Keyboard Navigation: Ensuring all features can be used with a Tab key alone.
        - Visual Compliance: Auditing Color Contrast and font sizes for maximum readability.

        III. WHY IT MATTERS FOR MNCs
        ------------------------------------------------------------
        Web Accessibility is often a legal requirement and a hallmark of a truly Senior Engineer. It shows that you build products with empathy, ensuring no user is left behind in the digital age.`
      }
    ]
  },
  'backend-developer': {
    title: 'Backend Developer',
    description: 'The "Invisible Hand" behind every app. Handle logic, security, and data with server-side mastery.',
    steps: [
      { 
        id: 1, 
        title: 'Server Foundations: Node.js & Python', 
        details: 'Mastering the environment where business logic and data processing live.',
        popupDescription: `I.   SERVER-SIDE RUNTIME OVERVIEW
        ------------------------------------------------------------
        The backend is the core brain of the application. You will learn to build environment-agnostic systems that can process thousands of orders, messages, or user updates per second without failing.

        II.  BACKEND CORE SUB-TOPICS
        ------------------------------------------------------------
        - Non-Blocking I/O: Understanding how Node.js handles thousands of connections on a single thread.
        - Professional Frameworks: Mastering Express (Node.js) or FastAPI (Python) for robust API routing.
        - Request-Response Cycle: Deep dive into HTTP Methods, Headers, Status Codes, and JSON data.
        - Config Management: Securing sensitive keys using Environment Variables across production environments.

        III. WHY IT MATTERS FOR MNCs
        ------------------------------------------------------------
        A backend must be a rock-solid foundation. Companies hire experts who can build predictable, high-performance servers that serve as the single source of truth for all user data.`
      },
      { 
        id: 2, 
        title: 'System Memory: Advanced Persistence', 
        details: 'Designing database architectures that preserve data integrity at massive scale.',
        popupDescription: `I.   DATABASE ARCHITECTURE OVERVIEW
        ------------------------------------------------------------
        Information is the most valuable asset in tech. You will learn how to design "Digital Filing Cabinets"—Databases—that are searchable, crash-resistant, and optimized for high-speed business operations.

        II.  DATA PERSISTENCE SUB-TOPICS
        ------------------------------------------------------------
        - Relational Design: Mastering PostgreSQL for complex data relationships and "Normalization."
        - Flexible Modeling: Using NoSQL (MongoDB, Redis) for rapidly changing data and high-speed caching.
        - ORM Engineering: Implementing Prisma or Mongoose to talk to databases using clean, modern code.
        - Performance Optimization: Learning Indecxes, Sharding, and Replication to keep data close to the user.

        III. WHY IT MATTERS FOR MNCs
        ------------------------------------------------------------
        Companies like Amazon or Meta process trillions of data points. Mastering persistence ensures you can design systems that find exactly the right information in a split-second, providing a seamless user experience.`
      },
      { 
        id: 3, 
        title: 'Digital Armor: Security & Auth', 
        details: 'Protecting the system from hackers and ensuring total data privacy for users.',
        popupDescription: `I.   BACKEND SECURITY OVERVIEW
        ------------------------------------------------------------
        As a Backend Developer, you are the final line of defense for user privacy. You must implement the same encryption and security protocols used by banks to ensure zero data leaks.

        II.  SECURITY SUB-TOPICS TO MASTER
        ------------------------------------------------------------
        - Identity Management: Implementing JWT and Session-based Authentication to verify "Who is the user."
        - Secure Hashing: Transitioning from raw passwords to one-way secret codes (bcrypt/Argon2).
        - Protection Protocols: Learning to prevent SQL Injection, XSS, and CSRF attacks before they happen.
        - Access Control: Building Role-Based (RBAC) systems so only the right people see the right data.

        III. WHY IT MATTERS FOR MNCs
        ------------------------------------------------------------
        Security is the most responsible role in software. One breach can cost a company its reputation. Mastering auth and security makes you an indispensable asset to any serious engineering team.`
      },
      { 
        id: 4, 
        title: 'Modern DevOps: Docker & Containers', 
        details: 'Standardizing your software so it runs identically on any server in the world.',
        popupDescription: `I.   CONTAINERIZATION OVERVIEW
        ------------------------------------------------------------
        In a perfect world, an app should run the same on your laptop as it does on a massive Amazon cloud server. Docker makes this possible by "Packing" your app into a standard container that includes everything it needs.

        II.  CONTAINER SUB-TOPICS TO MASTER
        ------------------------------------------------------------
        - Image Engineering: Writing Dockerfiles to build tiny, efficient, and secure app images.
        - Multi-Container Orchestration: Using Docker Compose to link your Server and Database together.
        - Automated Delivery: Setting up CI/CD (GitHub Actions) to automatically build your images on every change.
        - Cloud Registry: Managing your app versions in secure, private Docker hubs.

        III. WHY IT MATTERS FOR MNCs
        ------------------------------------------------------------
        In modern development, we don't just "Upload files." We deploy "Images." This technology eliminates the "It worked on my machine" problem, allowing global teams to ship code hundreds of times a day safely.`
      },
      { 
        id: 5, 
        title: 'World-Scale: Distributed Microservices', 
        details: 'Breaking massive applications into tiny, independent services for infinite scaling.',
        popupDescription: `I.   DISTRIBUTED SYSTEMS OVERVIEW
        ------------------------------------------------------------
        When an app grows to the size of Netflix, a single giant code file is too slow to update. You will learn to break the app into many tiny, specialized "Microservices" that talk to each other in real-time.

        II.  MICROSERVICE SUB-TOPICS
        ------------------------------------------------------------
        - Service Communication: Mastering REST and gRPC for high-speed talk between different services.
        - Event-Driven Design: Using Kafka or RabbitMQ so services can react to events without waiting for each other.
        - API Gateways: Leading all user traffic through a single entry point for security and routing.
        - Observability: Implementing Distributed Tracing (Jaeger) to find bugs across multiple servers.

        III. WHY IT MATTERS FOR MNCs
        ------------------------------------------------------------
        This is the apex of Backend Engineering. Mastering microservices shows you can manage world-class infrastructure, positioning you for the most senior roles in the tech industry.`
      }
    ]
  },
  'fullstack-developer': {
    title: 'Full Stack Developer',
    description: 'The "All-Rounder." You build both the parts users see and the invisible logic that powers them.',
    steps: [
      { 
        id: 1, 
        title: 'The Frontend Core', 
        details: 'Mastering the visual layer of the application using React and Modern CSS.',
        popupDescription: `I.   FRONTEND MASTERY OVERVIEW
        ------------------------------------------------------------
        A Fullstack journey starts with the user. You will learn to build a visually stunning and responsive interface that acts as the "Face" of your product. This is where you bring the brand to life.

        II.  FRONTEND SUB-TOPICS
        ------------------------------------------------------------
        - Modern UI libraries (Tailwind, Material UI) to build professional designs fast.
        - React Hooks & Lifecycle to manage how the UI responds to data.
        - Client-side Data Fetching to pull real information from the servers.
        - Responsive Architecture to ensure the app works on tablets and phones perfectly.

        III. WHY IT MATTERS FOR MNCs
        ------------------------------------------------------------
        MNCs need developers who understand the user. Knowing the frontend allows you to build features that not only "work" but "feel" premium and modern, which is critical for customer satisfaction.`
      },
      { 
        id: 2, 
        title: 'The Backend Brain', 
        details: 'Learning Node.js and SQL to build the memory and intelligence of your app.',
        popupDescription: `I.   BACKEND INTEGRATION OVERVIEW
        ------------------------------------------------------------
        Once the "Face" is ready, you need a "Brain." You will build the server and database that stores your users' posts, photos, and accounts, making your static site a living application.

        II.  BACKEND SUB-TOPICS
        ------------------------------------------------------------
        - Node.js & Express to build the API "Endpoints" your site will call.
        - SQL/NoSQL Databases to store millions of user records safely.
        - Business Logic Coding—writing the rules of how your app behaves.
        - Environment Configs to manage sensitive data across different versions of your site.

        III. WHY IT MATTERS FOR MNCs
        ------------------------------------------------------------
        Fullstack devs are powerful because they can build an entire feature alone—from the database table to the button the user clicks. This versatility makes you an invaluable team member in fast-moving companies.`
      },
      { 
        id: 3, 
        title: 'Cross-Stack Security Loop', 
        details: 'Bridging the front and back using secure, industry-standard authentication systems.',
        popupDescription: `I.   UNIFIED SECURITY OVERVIEW
        ------------------------------------------------------------
        This is the most critical technical bridge. You must ensure that when a user logs in on your React site, your Node.js server securely knows who they are for every future action.

        II.  INTEGRATED AUTH SUB-TOPICS
        ------------------------------------------------------------
        - JWT (Json Web Token) Architecture: Building a secure ticket system for your app.
        - Secure Cookies & HTTP-Only Storage: Preventing hackers from stealing user secrets.
        - Protected Routing: Ensuring users can only see the pages they are authorized for.
        - Full Login/Logout Flow: Managing user "State" across the entire stack.

        III. WHY IT MATTERS FOR MNCs
        ------------------------------------------------------------
        Authentication is the hardest part for beginners. Mastering this "loop" allows you to build real, professional SaaS products where user privacy is guaranteed by design.`
      },
      { 
        id: 4, 
        title: 'Cloud Orchestration & DevOps', 
        details: 'Automating the deployment of your full-scale app to the global cloud.',
        popupDescription: `I.   THE PRODUCTION PIPELINE OVERVIEW
        ------------------------------------------------------------
        You will transition from "My computer" to "The Internet." You'll learn to use robots (CI/CD) to automatically put your frontend and backend on the cloud whenever you change a line of code.

        II.  DEPLOYMENT SUB-TOPICS
        ------------------------------------------------------------
        - Automated Hosting: Using Vercel for frontend and AWS/Render for backend servers.
        - Git-Based Automation: Setting up GitHub Actions to run tests and deploy on every push.
        - Performance Analytics: Using logging tools to see how your app is performing in the real world.
        - Domain & SSL Management: Securing your app with HTTPS and a professional name (.com).

        III. WHY IT MATTERS FOR MNCs
        ------------------------------------------------------------
        Modern developers are expected to understand "Shipping." Learning to manage a live cloud environment makes you a "Product Engineer"—someone who can reliably deliver value to the world.`
      },
      { 
        id: 5, 
        title: 'Vertical Product Mastery', 
        details: 'Building and shipping an industry-ready SaaS product from inception to final production.',
        popupDescription: `I.   PRODUCT ENGINEERING OVERVIEW
        ------------------------------------------------------------
        This is the final test of your journey. You will build a complex, professional application on your own—proving you can select the right tools, design the data, and build the interface from scratch.

        II.  PRODUCT SUB-TOPICS
        ------------------------------------------------------------
        - Feature Design: Building complex modules like Search, News Feeds, or Payment Gateways.
        - Advanced UI Polish: Adding animations, loading headers, and professional error handling.
        - Code Documentation: Writing clean, documented code that a professional team could maintain.
        - Scalable Architecture: Ensuring your project can handle a sudden spike in traffic.

        III. WHY IT MATTERS FOR MNCs
        ------------------------------------------------------------
        This project will be the anchor of your professional portfolio. It proves to any MNC that you are not just a student, but a capable engineer who can lead the development of a real product without supervision.`
      }
    ]
  },
  'ai-ml-engineer': {
    title: 'AI/ML Engineer',
    description: 'Teaching computers to learn from patterns in data to build intelligent predictive systems.',
    steps: [
      { 
        id: 1, 
        title: 'Mathematical Rigor & Python DS', 
        details: 'The math and code foundations that power every modern intelligence engine.',
        popupDescription: `I.   MATHEMATICAL FOUNDATIONS OVERVIEW
        ------------------------------------------------------------
        AI is not magic; it's Statistics in disguise. Before building models, you must understand "How" a computer learns by mastering the math of probabilities and transformations.

        II.  MATH & CODE SUB-TOPICS
        ------------------------------------------------------------
        - Linear Algebra: Mastering Matrices and Vectors to handle multidimensional data.
        - Statistics & Probability: Learning distributions and Hypothesis Testing for accurate model decisions.
        - NumPy & Pandas: Using Python libraries to manipulate and "Clean" millions of data points easily.
        - Gradient Descent: Understanding the math of how a neural network "Learns" from its mistakes.

        III. WHY IT MATTERS FOR MNCs
        ------------------------------------------------------------
        Without math, you are just following a tutorial. With it, you understand the engine. This deep knowledge allows you to invent new AI solutions that have never been seen before.`
      },
      { 
        id: 2, 
        title: 'Predictive Intelligence: Classical ML', 
        details: 'Learning the core algorithms that power everything from stock predictions to fraud detection.',
        popupDescription: `I.   ALGORITHMIC INTELLIGENCE OVERVIEW
        ------------------------------------------------------------
        Classical Machine Learning allows machines to spot patterns without being told exactly what to look for. You will learn the "Blueprints" of data patterns.

        II.  CORE ML SUB-TOPICS
        ------------------------------------------------------------
        - Regression Models: Predicting values, like how much a house will cost based on its size.
        - Classification Models: Teaching a computer to identify "Spam" vs "Not Spam" based on past examples.
        - Clustring & Unsupervised Learning: Letting the computer group similar data together on its own.
        - Model Evaluation: Learning if your AI is "Right" using metrics like F1-Score and R-Squared.

        III. WHY IT MATTERS FOR MNCs
        ------------------------------------------------------------
        Classical ML is the bread and butter of modern business. It powers the decision-making of every major bank, hospital, and retail giant on the planet.`
      },
      { 
        id: 3, 
        title: 'Computational Brains: Deep Learning', 
        details: 'Building Neural Networks that mimic the human brain to solve vision and voice problems.',
        popupDescription: `I.   NEURAL ARCHITECTURE OVERVIEW
        ------------------------------------------------------------
        Deep Learning is the tech behind Siri, Self-Driving Cars, and FaceID. You will build artificial "Brains" made of layers of neurons that can "See" and "Hear" data.

        II.  DEEP LEARNING SUB-TOPICS
        ------------------------------------------------------------
        - Framework Mastery: Becoming an expert in PyTorch or TensorFlow to build complex networks.
        - CNNs (Convolutional Neural Networks): Teaching computers specifically how to recognize objects in photos.
        - RNNs & LSTMs: Building models that remember past data, used for language and stock market trends.
        - Backpropagation: The science of how a model self-corrects its Billion tiny weights for accuracy.

        III. WHY IT MATTERS FOR MNCs
        ------------------------------------------------------------
        This is the most cutting-edge part of tech. MNCs hire experts who can fine-tune these massive "Brains" to reach 99.9% accuracy for critical safety and business tasks.`
      },
      { 
        id: 4, 
        title: 'Generative AI & LLMs (NLP)', 
        details: 'Teaching machines to write, converse, and understand human language like ChatGPT.',
        popupDescription: `I.   GEN-AI & LANGUAGE OVERVIEW
        ------------------------------------------------------------
        We are now in the age of ChatGPT. Natural Language Processing (NLP) is the science of turning messy words into structured numbers that a computer can understand and generate.

        II.  NLP & GEN-AI SUB-TOPICS
        ------------------------------------------------------------
        - Attention Mechanisms: Learning the "Secret Sauce" of modern AI that allows it to focus on relevant words.
        - Transformers Architectures: The foundation of GPT and BERT models.
        - LLM Fine-Tuning: Learning to take a giant model and teach it your company's specific data.
        - Prompt Engineering & RAG: Turning your AI into a knowledgeable assistant that can read specific books/docs.

        III. WHY IT MATTERS FOR MNCs
        ------------------------------------------------------------
        Every company is racing to integrate AI. Mastering NLP and LLMs makes you the most relevant and in-demand engineer in the current global jobs market.`
      },
      { 
        id: 5, 
        title: 'Deployment: MLOps in Production', 
        details: 'Taking your AI from a script and putting it inside a real, global software product.',
        popupDescription: `I.   AI PRODUCTION OVERVIEW
        ------------------------------------------------------------
        An AI model on your computer is just an experiment. A "Product" is an AI that helps millions. You will learn to deploy your models into the real world as cloud services.

        II.  MLOPS SUB-TOPICS TO MASTER
        ------------------------------------------------------------
        - Model Deployment: Building APIs (FastAPI) so any website can talk to your AI.
        - Version Control for Data: Learning tools like DVC to manage the massive datasets used in training.
        - Cloud AI Services: Deploying on AWS SageMaker or Google Cloud for massive global scaling.
        - Model Monitoring: Watching your AI in the wild to ensure it hasn't become "Biased" or "Dull" over time.

        III. WHY IT MATTERS FOR MNCs
        ------------------------------------------------------------
        Companies need engineers who can not only "build" AI but "maintain" it at scale. MLOps experts are the highest-paid professionals in AI because they bridges the gap between science and business.`
      }
    ]
  },
  'data-analyst': {
    title: 'Data Analyst',
    description: 'Transform raw data into meaningful insights for business growth and strategy.',
    steps: [
      { 
        id: 1, 
        title: 'Analytics Basics: Statistics & Excel', 
        details: 'Validating data with scientific accuracy using modern analytical tools.',
        popupDescription: `I.   DATA FOUNDATIONS OVERVIEW
        ------------------------------------------------------------
        A Data Analyst's job starts with certainty. You must learn enough math to know if an increase in sales is a "Real Trend" or just a random fluke. This is where you learn to be a data-driven detective.

        II.  ANALYTICS SUB-TOPICS
        ------------------------------------------------------------
        - Advanced Excel Mastery: Learning Pivot Tables, Power Query, and VLOOKUP for professional data handling.
        - Descriptive Statistics: Mastering Mean, Median, Variance, and Std Deviation to summarize millions of records.
        - Hypothesis Testing: Learning P-values and T-tests to scientifically prove your findings to your boss.
        - Data Cleaning: The art of fixing "Dirty" data (missing names, wrong dates) before analysis.

        III. WHY IT MATTERS FOR MNCs
        ------------------------------------------------------------
        The world is full of data but short on truth. Companies rely on your foundational math to ensure they aren't making multi-million dollar mistakes based on random fluctuations.`
      },
      { 
        id: 2, 
        title: 'Query Mastery: Professional SQL', 
        details: 'Querying massive corporate data repositories with precision and speed.',
        popupDescription: `I.   DATABASE QUERYING OVERVIEW
        ------------------------------------------------------------
        In a large company, data is spread across massive servers. SQL is the "Universal Language" you use to talk to those servers and extract the exact information you need in seconds.

        II.  SQL SUB-TOPICS TO MASTER
        ------------------------------------------------------------
        - Complex Joins: Linking different data tables (e.g., Users table + Orders table) to see the full story.
        - Window Functions: Learning to rank sales, calculate growth, and find averages over time directly with SQL.
        - Common Table Expressions (CTEs): Writing clean, readable queries that a whole team of analysts can understand.
        - Query Optimization: Making your code run fast even when searching through 100 million rows of data.

        III. WHY IT MATTERS FOR MNCs
        ------------------------------------------------------------
        Data Analysts must be self-sufficient. Mastering SQL means you have the "Keys to the Kingdom"—you can find answers for your company without waiting for an engineering team to help you.`
      },
      { 
        id: 3, 
        title: 'Visual Storytelling: Dashboards', 
        details: 'Turning complex numbers into visual insights that stakeholders can understand instantly.',
        popupDescription: `I.   VISUAL STORYTELLING OVERVIEW
        ------------------------------------------------------------
        Numbers can be boring. Pictures are powerful. This stage focuses on the "Visual Communication" of your findings—turning tables of numbers into colorful, interactive charts that explain the business.

        II.  VIZ & DASHBOARD SUB-TOPICS
        ------------------------------------------------------------
        - Industry Tools: Becoming a pro in Tableau or Power BI to build "Sales Heartbeat" dashboards.
        - Dashboard Design: Learning the "Gestalt Principles"—how to use space and color to guide a viewer's eye.
        - Human-Centered Viz: Choosing the right chart (Bar vs Line) to make sure your message is never misunderstood.
        - Drill-downs: Building interactive maps where a boss can click on a city to see exactly what happened there.

        III. WHY IT MATTERS FOR MNCs
        ------------------------------------------------------------
        A single great chart can convince a CEO to start a Billion-dollar project. Your ability to tell a simple story from complex data makes you a critical influencer in the company's future.`
      },
      { 
        id: 4, 
        title: 'Scaled Analysis with Python', 
        details: 'Using code to automate reports and find patterns that are too deep for Excel.',
        popupDescription: `I.   COMPUTATIONAL ANALYSIS OVERVIEW
        ------------------------------------------------------------
        Excel has limits. Python does not. You will learn to use code to analyze millions of rows, calculate complex "Correlations," and automate your monthly reports to run in one second.

        II.  PYTHON ANALYTICS SUB-TOPICS
        ------------------------------------------------------------
        - Pandas Mastery: Using the industry's favorite library for "Cleaning" and "Filtering" data at scale.
        - Data Visualization Coding: Learning Seaborn and Matplotlib to create custom charts that tools like Excel can't draw.
        - Exploratory Data Analysis (EDA): A structured process for finding "Why" something is happening in your business data.
        - Script Automation: Writing Python scripts that download data, analyze it, and email the results automatically.

        III. WHY IT MATTERS FOR MNCs
        ------------------------------------------------------------
        Python adds "Tech Power" to your "Analyst Mind." It allows you to build reproducible, world-class reports that your company can rely on for years to come.`
      },
      { 
        id: 5, 
        title: 'Strategy: Decision Recommendation', 
        details: 'Providing business recommendations based on your data-driven evidence.',
        popupDescription: `I.   STRATEGIC ADVISORY OVERVIEW
        ------------------------------------------------------------
        The final level of an analyst is becoming a "Business Consultant." You don't just "Show charts"—you "Recommend actions." This is the part where you tell the company exactly what to do next to succeed.

        II.  STRATEGY SUB-TOPICS
        ------------------------------------------------------------
        - KPI Leadership: Learning to define what "Success" looks like for a major brand.
        - Root Cause Analysis: Not just saying "Sales are down," but proving "Sales are down because of X in Region Y."
        - A/B Testing: Designing scientific experiments to see which website design or price point makes more money.
        - Executive Presence: Learning to present your findings to Boards and CEOs with confidence.

        III. WHY IT MATTERS FOR MNCs
        ------------------------------------------------------------
        At an MNC, data Analysts are the strategic advisors to the leadership board. Your insights determine where the company spends its money and how it grows. This is where your career becomes truly influential.`
      }
    ]
  },
  'cyber-security': {
    title: 'Cyber Security',
    description: 'The "Digital Guardian." Protect systems, networks, and private information through defensive and offensive security.',
    steps: [
      { 
        id: 1, 
        title: 'Network Defense Blueprints', 
        details: 'Understanding how information travels across the internet and how to secure those paths.',
        popupDescription: `I.   NETWORK ARCHITECTURE OVERVIEW
        ------------------------------------------------------------
        Cybersecurity starts at the network. You must learn the "Digital Highways" of the internet so you can build the barriers and checkpoints that keep the company's private data inside and intruders out.

        II.  NETWORK SECURITY SUB-TOPICS
        ------------------------------------------------------------
        - TCP/IP Fundamentals: Deep dive into the protocols that make the internet move data.
        - OSI Model Mastery: Understanding security at every layer—from the physical wire to the app search bar.
        - Traffic Forensics: Using Wireshark to "See" what a hacker is doing inside your network.
        - Barrier Tech: Setting up professional Firewalls, VPNs, and Intrusion Detection Systems (IDS).

        III. WHY IT MATTERS FOR MNCs
        ------------------------------------------------------------
        Most cyber-attacks happen over a network. Understanding these "roads" allows you to build a secure perimeter for your MNC, ensuring no external threat can even reach your servers.`
      },
      { 
        id: 2, 
        title: 'Systems Hardening & IAM', 
        details: 'Securing individual servers and cloud environments against the latest vulnerabilities.',
        popupDescription: `I.   IDENTITY & SYSTEM PROTECTION OVERVIEW
        ------------------------------------------------------------
        A single weak laptop or server can sink a global brand. This stage focuses on making sure every machine is "Hardened"—locked down so there are no open doors for an attacker to walk through.

        II.  HARDENING & ACCESS SUB-TOPICS
        ------------------------------------------------------------
        - Least Privilege Principle: Learning to ensure employees only see the data they "Absolutely Need" to see.
        - Multi-Factor Auth (MFA): Building systems that require more than just a password to log in.
        - Linux & Windows Security: Learning to lock down the operating systems that run the business world.
        - Identity Management (IAM): Masterfully managing millions of user accounts across global systems safely.

        III. WHY IT MATTERS FOR MNCs
        ------------------------------------------------------------
        "Hardening" is about reducing the target area. The fewer open doors a system has, the lower the chance of a disaster. This foundational work is the daily shield of modern corporate security.`
      },
      { 
        id: 3, 
        title: 'Ethical Hacking: Pentesting', 
        details: 'Learning to think and act like an attacker to find weaknesses before the bad guys do.',
        popupDescription: `I.   OFFENSIVE SECURITY OVERVIEW
        ------------------------------------------------------------
        To beat a hacker, you must learn their games. This is the most exciting part where you use the same tools as an attacker but with the legal permission to "Test" your company's own defenses.

        II.  PENTESTING SUB-TOPICS
        ------------------------------------------------------------
        - Vulnerability Assessment: Scanning for known weaknesses in software before they are exploited.
        - Tools of the Trade: Becoming an expert with Nmap (Network scanning) and Metasploit (Exploitation).
        - Web App Security: Mastering the "OWASP Top 10"—the most common way hackers break into websites.
        - Social Engineering: Learning how hackers trick humans, and how to train your staff to be "Hack-Proof."

        III. WHY IT MATTERS FOR MNCs
        ------------------------------------------------------------
        Offensive security is proactive. Instead of waiting for a fire, you go looking for gas leaks. Highly valued by MNCs with sensitive billion-dollar data, who need to find bugs before anyone else.`
      },
      { 
        id: 4, 
        title: 'Detection: Security Operations', 
        details: 'Building the "Digital CCTV" that monitors the entire company around the clock.',
        popupDescription: `I.   MONITORING & LOGGING OVERVIEW
        ------------------------------------------------------------
        Defense is good, but "Detection" is key. You will learn to build a system that watches every log and every click in the company, alerting you to "Red Flags" in seconds.

        II.  SECURITY OPS SUB-TOPICS
        ------------------------------------------------------------
        - SIEM Architecture: Setting up Splunk or Microsoft Sentinel to act as the "Security Camera" for your network.
        - Log Correlation: Teaching a computer to say: "Hey, 100 failed logins in one minute is an attack!"
        - Threat Intel: Plugging into global databases of "Known Bad IP Addresses" to block them instantly.
        - Incident Triaging: Learning to distinguish a real attack from a simple user error.

        III. WHY IT MATTERS FOR MNCs
        ------------------------------------------------------------
        MNCs hire entire teams (SOC teams) specifically to watch these dashboards 24/7. Mastering detection ensures that even if a hacker gets in, they are spotted and stopped before they can steal anything.`
      },
      { 
        id: 5, 
        title: 'Crisis Response & Governance', 
        details: 'Leadership-level security management and incident recovery strategies.',
        popupDescription: `I.   STRATEGIC SECURITY OVERVIEW
        ------------------------------------------------------------
        The highest level of Security is about "Survival Strategy." You learn the laws, standards, and crisis plans that ensure a company can keep running even after a massive digital attack.

        II.  GRC & RESPONSE SUB-TOPICS
        ------------------------------------------------------------
        - ISO 27001 & NIST: Learning the international "Rulebooks" of security that all major MNCs must follow.
        - Incident Handling: A step-by-step plan for what to do during a real live hack (Containment, Eradication, Recovery).
        - Digital Forensics: Learning to investigate a crime scene to prove exactly what a hacker did.
        - Disaster Recovery: Ensuring the company has "Backups" so they never lose their data permanently.

        III. WHY IT MATTERS FOR MNCs
        ------------------------------------------------------------
        This stage prepares you for leadership (CISO) roles. You are not just fixing code; you are managing the entire digital existence of the company. It is the ultimate role of digital responsibility.`
      }
    ]
  },
  'devops-engineer': {
    title: 'DevOps Engineer',
    description: 'The "Speed Expert." Automate the entire lifecycle of software scaling and reliability.',
    steps: [
      { 
        id: 1, 
        title: 'The Terminal & Automation', 
        details: 'Mastering the Linux terminal to automate every repetitive system task with speed.',
        popupDescription: `I.   SYSTEM AUTOMATION OVERVIEW
        ------------------------------------------------------------
        A DevOps engineer never does the same thing twice. If a task takes more than 5 minutes, you write a "Script" (a mini-robot) that will do it for you forever. You become the master of the machines.

        II.  LINUX & SCRIPTING SUB-TOPICS
        ------------------------------------------------------------
        - Advanced Linux Admin: Learning to talk to servers without a mouse, using only the "Terminal."
        - Bash & Python Scripting: Writing code that can update 1,000 servers in one second.
        - Task Orchestration: Mastering "Cron Jobs" to schedule system checks and backups automatically.
        - Performance CLI: Learning to troubleshoot server health (CPU/RAM) using only text commands.

        III. WHY IT MATTERS FOR MNCs
        ------------------------------------------------------------
        Speed is everything. Mastery of systems and automation allows a single DevOps engineer to manage massive global networks that would otherwise require hundreds of people. This is the definition of "Tech Efficiency."`
      },
      { 
        id: 2, 
        title: 'Continuous Flow: CI/CD', 
        details: 'Building the automatic software assembly line that ships code hundreds of times a day.',
        popupDescription: `I.   SOFTWARE PIPELINE OVERVIEW
        ------------------------------------------------------------
        When a developer writes code, it shouldn't be manually uploaded. You will build a "Digital Assembly Line" where code is tested, fixed, and "Shipped" to the cloud automatically without any human help.

        II.  PIPELINE SUB-TOPICS TO MASTER
        ------------------------------------------------------------
        - Git-Flow Mastery: Managing how code travels from a dev's laptop to the production server safely.
        - Automatic Testing CI: Setting up robots (GitHub Actions) to check every line of code for errors before it goes live.
        - Code Quality: Using SonarQube to ensure the code is professional, documented, and secure.
        - Continuous Deployment: Building the final link that puts the app in front of the users instantly.

        III. WHY IT MATTERS FOR MNCs
        ------------------------------------------------------------
        MNCs can only innovate because of these assembly lines. It allows them to release new features daily rather than yearly. You become the engineer who enables the entire company to move fast.`
      },
      { 
        id: 3, 
        title: 'Containers: Scale & Portability', 
        details: 'Mastering Docker and Kubernetes to keep apps running perfectly everywhere at any scale.',
        popupDescription: `I.   CONTAINER ORCHESTRATION OVERVIEW
        ------------------------------------------------------------
        If an app is a "Car," Kubernetes is the "Factory Manager." You will learn to put apps into "Boxes" (Docker) and then use a manager to make sure those boxes stay running, self-heal if they break, and scale up if users increase.

        II.  CLOUD SCALE SUB-TOPICS
        ------------------------------------------------------------
        - Docker Excellence: Becoming an expert at "Packing" software so it works on any server.
        - Kubernetes (K8s) Architecture: Learning to manage massive "Clusters" of servers as if they were a single unit.
        - Self-healing Systems: Teaching the cloud to automatically restart an app if it crashes.
        - Massively Scaling: Building systems that automatically double their number of servers during a sale day.

        III. WHY IT MATTERS FOR MNCs
        ------------------------------------------------------------
        This is the most in-demand skill in modern IT. Every major company uses Kubernetes to manage their global apps. Mastery here puts you in the elite league of Cloud Engineers.`
      },
      { 
        id: 4, 
        title: 'Infrastructure as Code (IaC)', 
        details: 'Building entire global networks with text files rather than manual clicks.',
        popupDescription: `I.   CLOUD-AS-CODE OVERVIEW
        ------------------------------------------------------------
        In the old days, you had to manually click buttons to build a server. Now, you write "Code" (Terraform) that tells the Cloud (AWS) exactly what to build. This makes infrastructure fast, safe, and version-controlled.

        II.  AUTOMATED INFRA SUB-TOPICS
        ------------------------------------------------------------
        - Terraform Mastery: Learning the language that builds servers out of thin air.
        - Configuration Management: Using Ansible to automatically set up 1,000 servers with the right software.
        - Multi-Cloud: Learning to build systems that work equally on AWS, Google Cloud, and Microsoft Azure.
        - Infrastructure Disaster Recovery: Learning to "Re-create" a whole company in 5 minutes from a text file.

        III. WHY IT MATTERS FOR MNCs
        ------------------------------------------------------------
        Manual work leads to mistakes. "Infrastructure as Code" ensures that everything is perfect and reproducible. It is the ultimate insurance for a multi-billion dollar digital existence.`
      },
      { 
        id: 5, 
        title: 'Observability & SRE', 
        details: 'The science of measuring system "Health" and ensuring 99.999% uptime for world-scale apps.',
        popupDescription: `I.   SYSTEM RELIABILITY (SRE) OVERVIEW
        ------------------------------------------------------------
        Site Reliability Engineering (SRE) is the practice of "Observing" a system. You will build dashboards that show the heartbeat of every server, allowing you to fix problems before users ever notice them.

        II.  OBSERVABILITY SUB-TOPICS
        ------------------------------------------------------------
        - Professional Monitoring: Using Prometheus and Grafana to see beautiful charts of server health.
        - Centralized Logging: Searching through millions of log lines to find the "One hidden error" that caused a lag.
        - Distributed Tracing: Tracking a single user request across 50 different servers to find where it slowed down.
        - Five Nines Philosophy: Learning the discipline of 99.999% uptime—allowing only 5 minutes of downtime per YEAR.

        III. WHY IT MATTERS FOR MNCs
        ------------------------------------------------------------
        Downtime for an MNC costs Millions per minute. SREs are the high-level guardians of the platform's survival. Your skills ensure that the company remains reliable and trusted by its global audience.`
      }
    ]
  }
};
