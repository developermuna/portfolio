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

