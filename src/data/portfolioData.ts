export const experiences = [
  {
    year: '2032 — 2037',
    role: 'Ph.D.',
    company: 'XYZ College, India',
    description: '',
  },
  {
    year: '2029 — 2031',
    role: 'MBA',
    company: 'XYZ College, India',
    description: '',
  },
  {
    year: '2024 — 2028',
    role: 'B.Tech — Computer Science & Engineering',
    company: 'MITS, Rayagada, Odisha',
    description: "Currently pursuing my Bachelor's degree with a focus on software development, web technologies, and computer science.",
  },
  {
    year: '2022 — 2024',
    role: 'Higher Secondary (+2) — Science',
    company: 'Odisha Adarsha Vidyalaya (OAV), Kolnara, Rayagada',
    description: '59%',
  },
  {
    year: '2022',
    role: 'Secondary School — 10th',
    company: 'Odisha Adarsha Vidyalaya (OAV), Kalyansingpur, Rayagada',
    description: '82%',
  }
];

export const projects = [
  {
    number: '01',
    name: 'Bakery Website',
    category: 'web',
    description:
      'A delightful bakery showcase with an elegant product catalog, online ordering system, and warm brand identity that brings the in-store experience online.',
    url: 'https://bakery.munakousalya.online',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1000&auto=format&fit=crop',
  },
  {
    number: '02',
    name: 'Muna Kousalya',
    category: 'web',
    description:
      'A polished personal portfolio and business website featuring project showcases, service offerings, and a refined visual identity built to impress.',
    url: 'https://munakousalya.online',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop',
  },
  {
    number: '03',
    name: 'NovaTech Solutions',
    category: 'web',
    description:
      'A sleek SaaS landing page for a tech startup featuring animated hero sections, interactive pricing tables, and conversion-optimized user flows.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop',
  },
  {
    number: '04',
    name: 'GreenLeaf Interiors',
    category: 'interior',
    description:
      'An immersive interior design portfolio with 3D room visualizations, before-and-after galleries, and a consultation booking system.',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1000&auto=format&fit=crop',
  },
  {
    number: '05',
    name: 'CloudSync Dashboard',
    category: 'web',
    description:
      'A data-driven web application dashboard with real-time analytics charts, team collaboration tools, and a clean, intuitive admin interface.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop',
  },
  {
    number: '06',
    name: 'EcoTrack App',
    category: 'app',
    description: 'A mobile-first web app helping users track their carbon footprint with gamified features and real-time social leaderboards.',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1000&auto=format&fit=crop',
  },
  {
    number: '07',
    name: 'FinDash Analytics',
    category: 'web',
    description: 'A comprehensive financial dashboard offering real-time crypto charting, portfolio tracking, and AI-powered insights.',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1000&auto=format&fit=crop',
  },
  {
    number: '08',
    name: 'ArtGallery VR',
    category: 'interior',
    description: 'An interactive virtual reality art gallery built with WebGL, allowing users to walk through curated digital exhibitions.',
    image: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?q=80&w=1000&auto=format&fit=crop',
  },
  {
    number: '09',
    name: 'HealthSync Portal',
    category: 'web',
    description: 'A secure patient-doctor communication portal featuring video consultations, medical records management, and automated appointment scheduling.',
    image: 'https://images.unsplash.com/photo-1576091160550-2173ff9e5ee5?q=80&w=1000&auto=format&fit=crop',
  },
  {
    number: '10',
    name: 'Apex AI Assistant',
    category: 'app',
    description: 'A productivity tool powered by advanced language models that automates email drafting, scheduling, and meeting summaries.',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1000&auto=format&fit=crop',
  }
];

export interface Review {
  id: string;
  name: string;
  role: string;
  rating: number;
  text: string;
  date: string;
}

export const defaultReviews: Review[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'CEO, TechStart',
    rating: 5,
    text: "Muna is an exceptional developer. His ability to translate our complex requirements into a seamless, beautiful user interface was truly impressive. He delivered ahead of schedule and the code quality was top-notch.",
    date: '12 August 2026',
  },
  {
    id: '2',
    name: 'David Chen',
    role: 'Founder, CreativeSpace',
    rating: 5,
    text: "Working with Muna was a game-changer for our agency. His deep understanding of both front-end aesthetics and back-end architecture allowed us to launch our platform with zero issues. Highly recommended!",
    date: '04 September 2026',
  },
  {
    id: '3',
    name: 'Elena Rodriguez',
    role: 'Product Manager',
    rating: 4,
    text: "I was blown away by Muna's attention to detail and proactive approach. He didn't just write code; he suggested UI/UX improvements that significantly increased our user retention. A true professional.",
    date: '19 October 2026',
  },
];

export interface ServiceData {
  number: string;
  name: string;
  slug: string;
  defaultMessage: string;
  description: string;
  col1Image1: string;
  col1Image2: string;
  col2Image: string;
}

export const services: ServiceData[] = [
  {
    number: '01',
    name: 'Web Design & Development',
    slug: 'web',
    defaultMessage: "Hi Muna, I'm interested in building a new website. I'd love to discuss my project requirements and see how we can work together.",
    description:
      'Crafting high-performance, visually striking websites that captivate users and drive results. By combining fluid typography, responsive layouts, and modern frameworks like React, I deliver seamless digital experiences perfectly tailored to your brand identity.',
    col1Image1: 'https://images.unsplash.com/photo-1507238692062-1981bd697193?q=80&w=1000&auto=format&fit=crop',
    col1Image2: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1000&auto=format&fit=crop',
    col2Image: '/web service.webp',
  },
  {
    number: '02',
    name: 'App Design & Development',
    slug: 'app',
    defaultMessage: "Hi Muna, I have an idea for a mobile application and I'm looking for a developer. I'd love to hear your thoughts on it.",
    description:
      'Building intuitive and powerful cross-platform mobile applications for iOS and Android. Utilizing modern technologies like Flutter, I focus on pixel-perfect UI, buttery-smooth micro-interactions, and robust state management to ensure a flawless native experience.',
    col1Image1: 'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?q=80&w=1000&auto=format&fit=crop',
    col1Image2: 'https://images.unsplash.com/photo-1618761714954-0b8cd0026356?q=80&w=1000&auto=format&fit=crop',
    col2Image: '/flutter service.webp',
  },
  {
    number: '03',
    name: 'Interior Design & 3D Architecture',
    slug: 'interior',
    defaultMessage: "Hi Muna, I'm looking for 3D architectural visualization and interior design services for a project. Let's talk!",
    description:
      'Transforming architectural concepts into immersive realities through high-fidelity 3D modeling and rendering. From spatial planning in SketchUp and Revit to photorealistic visualizations in Blender, I bridge the gap between imagination and physical construction.',
    col1Image1: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1000&auto=format&fit=crop',
    col1Image2: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1000&auto=format&fit=crop',
    col2Image: '/interior service.webp',
  },
];

export const skillCategories = [
  {
    title: 'Web Development',
    number: '01',
    skills: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'React.js', 'Vite', 'Tailwind CSS', 'Progressive Web Apps (PWA)'],
  },
  {
    title: 'Backend Development',
    number: '02',
    skills: ['Node.js', 'Express.js', 'MongoDB', 'Supabase', 'REST APIs', 'Authentication', 'Database Management'],
  },
  {
    title: 'Construction & Interior',
    number: '03',
    skills: ['AutoCAD', 'Autodesk Revit', 'SketchUp', 'Blender', '3D Modeling', 'Interior Design', 'Construction Drawings', 'Space Planning', 'Material & Lighting Concepts'],
  },
  {
    title: 'App Development',
    number: '04',
    skills: ['Flutter', 'Dart', 'Responsive UI/UX', 'API Integration', 'State Management', 'Firebase Basics'],
  },
  {
    title: 'AI & Prompt Engineering',
    number: '05',
    skills: ['AI Prompting', 'ChatGPT', 'Claude', 'Gemini', 'AI-assisted Development', 'AI Productivity Workflows'],
  },
  {
    title: 'Tools & Platforms',
    number: '06',
    skills: ['Git', 'GitHub', 'VS Code', 'Vercel', 'Cloudflare', 'Cloudflare R2', 'Postman', 'API Testing'],
  },
  {
    title: 'Core Competencies',
    number: '07',
    skills: ['Problem Solving', 'Responsive Design', 'Performance Optimization', 'Clean & Maintainable Code', 'Project Development', 'Technical Documentation', 'Continuous Learning'],
  }
];

export const otherKnowledge = [
  'Data Structures & Algorithms',
  'DBMS Fundamentals',
  'Software Development Life Cycle',
  'Agile Methodology',
  'Version Control',
  'Technical Documentation'
];

export const certifications = [
  {
    title: 'Full-Stack Web Development',
    issuer: 'Coursera / Meta',
    date: '2023',
    description: 'Comprehensive certification covering front-end and back-end development, responsive design, and database management.',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop'
  },
  {
    title: 'Advanced React Patterns',
    issuer: 'Frontend Masters',
    date: '2023',
    description: 'Deep dive into advanced React concepts, performance optimization, and custom hooks architecture.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop'
  },
  {
    title: 'Cloud Computing Fundamentals',
    issuer: 'AWS Training',
    date: '2022',
    description: 'Foundational knowledge of cloud concepts, core services, security, architecture, pricing, and support.',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop'
  },
  {
    title: 'UI/UX Design Masterclass',
    issuer: 'Design+Code',
    date: '2024',
    description: 'Advanced techniques in user interface design, user experience research, and prototyping with Figma.',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800&auto=format&fit=crop'
  },
  {
    title: 'Node.js Microservices',
    issuer: 'Udemy',
    date: '2024',
    description: 'Building scalable microservices architecture using Node.js, Express, Docker, and Kubernetes.',
    image: 'https://images.unsplash.com/photo-1550439062-609e1531270e?q=80&w=800&auto=format&fit=crop'
  },
  {
    title: 'TypeScript for Professionals',
    issuer: 'Codecademy',
    date: '2023',
    description: 'Mastering strong typing in JavaScript applications to build robust, error-free production codebases.',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop'
  },
  {
    title: 'Modern CSS Frameworks',
    issuer: 'Pluralsight',
    date: '2022',
    description: 'Deep understanding of utility-first CSS, Tailwind architecture, and modern CSS-in-JS solutions.',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop'
  },
  {
    title: 'Database Architecture',
    issuer: 'MongoDB University',
    date: '2021',
    description: 'Designing scalable NoSQL schemas, performance tuning, and advanced aggregation pipelines.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop'
  },
];
