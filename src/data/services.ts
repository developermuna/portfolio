export interface ServiceData {
  number: string;
  name: string;
  slug: string;
  defaultMessage: string;
  description: string;
  col1Image1: string;
  col1Image2: string;
  col2Image: string;
  badge?: string;
  actionType?: 'page' | 'external';
  targetUrl?: string;
}

export const services: ServiceData[] = [
  {
    number: '01',
    name: 'App & Website Development',
    slug: 'app-web',
    badge: 'Digital Engineering',
    actionType: 'page',
    targetUrl: '/services',
    defaultMessage: "Hi Muna, I'm interested in your App and Website Development services. I'd love to discuss my project requirements and see how we can collaborate.",
    description:
      'Architecting modern, high-performance web applications, cross-platform mobile apps (iOS & Android), and progressive web apps (PWAs) with cutting-edge UI/UX, fluid animations, and robust scalability.',
    col1Image1: 'https://images.unsplash.com/photo-1507238692062-1981bd697193?q=80&w=1000&auto=format&fit=crop',
    col1Image2: 'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?q=80&w=1000&auto=format&fit=crop',
    col2Image: 'https://pub-300810ae570e4983a2a928a706ef0133.r2.dev/Portfolio/Assets/web%20service.webp',
  },
  {
    number: '02',
    name: 'Interior Design',
    slug: 'interior',
    badge: '3D Spatial Architecture',
    actionType: 'external',
    targetUrl: '/interior',
    defaultMessage: "Hi Muna, I'm looking for 3D architectural visualization and interior design services for a project. Let's talk!",
    description:
      'Transforming architectural concepts into immersive realities through high-fidelity 3D modeling and photorealistic rendering in Blender, SketchUp, and Revit. Bridging imagination and physical construction.',
    col1Image1: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1000&auto=format&fit=crop',
    col1Image2: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1000&auto=format&fit=crop',
    col2Image: 'https://pub-300810ae570e4983a2a928a706ef0133.r2.dev/Portfolio/Assets/interior%20service.webp',
  },
];
