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

export const projects: any[] = [];

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
    col2Image: 'https://pub-300810ae570e4983a2a928a706ef0133.r2.dev/Portfolio/Assets/web%20service.webp',
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
    col2Image: 'https://pub-300810ae570e4983a2a928a706ef0133.r2.dev/Portfolio/Assets/flutter%20service.webp',
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
    col2Image: 'https://pub-300810ae570e4983a2a928a706ef0133.r2.dev/Portfolio/Assets/interior%20service.webp',
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
    id: '01',
    title: 'MERN Stack Development',
    issuer: 'Sigma',
    date: 'Recent',
    description: 'Comprehensive certification in MongoDB, Express.js, React, and Node.js stack.',
    image: 'https://pub-300810ae570e4983a2a928a706ef0133.r2.dev/Portfolio/achievementImage/sigmaMERN%20Stack.webp'
  },
  {
    id: '02',
    title: 'PERN Stack Development',
    issuer: 'Udemy',
    date: 'Recent',
    description: 'Advanced full-stack development using PostgreSQL, Express, React, and Node.js.',
    image: 'https://pub-300810ae570e4983a2a928a706ef0133.r2.dev/Portfolio/achievementImage/udemy%20PERN%20Stack.webp'
  },
  {
    id: '03',
    title: 'Nextwave Certificate',
    issuer: 'Nextwave',
    date: 'Recent',
    description: 'Certification of completion for intensive technical training programs.',
    image: 'https://pub-300810ae570e4983a2a928a706ef0133.r2.dev/Portfolio/achievementImage/Nextwave%20Certificate.webp'
  },
  {
    id: '04',
    title: 'IBM AI Engineering',
    issuer: 'IBM',
    date: 'Recent',
    description: 'Professional certificate in Artificial Intelligence, Machine Learning, and Data Science from IBM.',
    image: 'https://pub-300810ae570e4983a2a928a706ef0133.r2.dev/Portfolio/achievementImage/IBM%20AI%20Certificate.webp'
  },
  {
    id: '05',
    title: 'Coursera Cybersecurity',
    issuer: 'Coursera',
    date: 'Recent',
    description: 'Foundational certification covering cybersecurity concepts, network security, and risk management.',
    image: 'https://pub-300810ae570e4983a2a928a706ef0133.r2.dev/Portfolio/achievementImage/Coursera%20cybersecurity.webp'
  },
  {
    id: '06',
    title: 'InternPe Internship',
    issuer: 'InternPe',
    date: 'Recent',
    description: 'Certificate of completion for software development internship program.',
    image: 'https://pub-300810ae570e4983a2a928a706ef0133.r2.dev/Portfolio/achievementImage/internPeIntersnsip.webp'
  },
  {
    id: '07',
    title: 'Drone Bootcamp',
    issuer: 'Bootcamp',
    date: 'Recent',
    description: 'Practical training and certification in drone technology, assembly, and flight operations.',
    image: 'https://pub-300810ae570e4983a2a928a706ef0133.r2.dev/Portfolio/achievementImage/DroneBootcamp.webp'
  },
  {
    id: '08',
    title: 'Business English Certificate',
    issuer: 'Language Institute',
    date: 'Recent',
    description: 'Certification verifying proficiency in professional and business English communication.',
    image: 'https://pub-300810ae570e4983a2a928a706ef0133.r2.dev/Portfolio/achievementImage/Business%20Eng%20Certificate.webp'
  },
  {
    id: '09',
    title: 'OAV Art Certificate',
    issuer: 'OAV Foundation, Bhubaneswar',
    date: 'Recent',
    description: 'Received from the OAV Foundation in Bhubaneswar for excellence in visual arts and creative expression.',
    image: 'https://pub-300810ae570e4983a2a928a706ef0133.r2.dev/Portfolio/achievementImage/OAV%20Art%20Certificate.webp'
  },
  {
    id: '10',
    title: 'Chaiti Art Certificate',
    issuer: 'Chaiti Mahotsav, Rayagada',
    date: 'Recent',
    description: 'Secured 2nd position in the district-level art competition at Chaiti, the yearly cultural event of Rayagada district.',
    image: 'https://pub-300810ae570e4983a2a928a706ef0133.r2.dev/Portfolio/achievementImage/Chaiti%20art%20certificate.webp'
  }
];

export interface ProductData {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  buyUrl?: string;
  viewUrl?: string;
}

export const products: any[] = [];
