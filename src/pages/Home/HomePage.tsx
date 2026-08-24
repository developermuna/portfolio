import { Suspense, lazy } from 'react';
import HeroSection from '../../sections/home/HeroSection';
import MarqueeSection from '../../sections/home/MarqueeSection';

const AboutSection = lazy(() => import('../../sections/home/AboutSection'));
const SkillsSection = lazy(() => import('../../sections/home/SkillsSection'));
const ProjectsSection = lazy(() => import('../../sections/home/ProjectsSection'));
const ExperienceEducationSection = lazy(() => import('../../sections/home/ExperienceEducationSection'));
const ServicesSection = lazy(() => import('../../sections/home/ServicesSection'));
const CertificationsSection = lazy(() => import('../../sections/home/CertificationsSection'));
const TestimonialsSection = lazy(() => import('../../sections/home/TestimonialsSection'));
const ContactSection = lazy(() => import('../../sections/home/ContactSection'));

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <MarqueeSection />
      <Suspense fallback={<div className="h-screen w-full bg-[#0C0C0C]" />}>
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ServicesSection />
        <ExperienceEducationSection />
        <CertificationsSection />
        <TestimonialsSection />
        <ContactSection />
      </Suspense>
    </>
  );
};

export default HomePage;
