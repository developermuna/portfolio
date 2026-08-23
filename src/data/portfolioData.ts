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
    description:
      'A delightful bakery showcase with an elegant product catalog, online ordering system, and warm brand identity that brings the in-store experience online.',
    url: 'https://bakery.munakousalya.online',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1000&auto=format&fit=crop',
  },
  {
    number: '02',
    name: 'Muna Kousalya',
    description:
      'A polished personal portfolio and business website featuring project showcases, service offerings, and a refined visual identity built to impress.',
    url: 'https://munakousalya.online',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop',
  },
  {
    number: '03',
    name: 'NovaTech Solutions',
    description:
      'A sleek SaaS landing page for a tech startup featuring animated hero sections, interactive pricing tables, and conversion-optimized user flows.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop',
  },
  {
    number: '04',
    name: 'GreenLeaf Interiors',
    description:
      'An immersive interior design portfolio with 3D room visualizations, before-and-after galleries, and a consultation booking system.',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1000&auto=format&fit=crop',
  },
  {
    number: '05',
    name: 'CloudSync Dashboard',
    description:
      'A data-driven web application dashboard with real-time analytics charts, team collaboration tools, and a clean, intuitive admin interface.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop',
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
  description: string;
  col1Image1: string;
  col1Image2: string;
  col2Image: string;
}

export const services: ServiceData[] = [
  {
    number: '01',
    name: 'Website Design',
    description:
      'Crafting beautiful, modern websites that captivate visitors and drive conversions with clean layouts, fluid typography, and seamless user experience.',
    col1Image1: 'https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif',
    col1Image2: 'https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif',
    col2Image: 'https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif',
  },
  {
    number: '02',
    name: 'Web App Design',
    description:
      'Designing powerful, intuitive web applications with complex dashboards, data-driven interfaces, and scalable design systems built for real-world use.',
    col1Image1: 'https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif',
    col1Image2: 'https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif',
    col2Image: 'https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif',
  },
  {
    number: '03',
    name: 'Mobile App Design',
    description:
      'Creating engaging mobile experiences with pixel-perfect interfaces, smooth micro-interactions, and native-feel designs for iOS and Android platforms.',
    col1Image1: 'https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif',
    col1Image2: 'https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif',
    col2Image: 'https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif',
  },
  {
    number: '04',
    name: 'Interior & Construction',
    description:
      'Bringing architectural visions to life with immersive 3D visualizations, realistic interior renders, and construction-ready design presentations.',
    col1Image1: 'https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif',
    col1Image2: 'https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif',
    col2Image: 'https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif',
  },
];

export const skills = [
  'HTML5',
  'CSS3',
  'JavaScript (ES6+)',
  'React.js',
  'Node.js',
  'Express.js',
  'MongoDB',
  'Supabase',
  'Tailwind CSS',
  'TypeScript',
  'Framer Motion',
  'Git / GitHub',
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
