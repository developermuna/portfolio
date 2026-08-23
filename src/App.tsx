import Navbar from './components/Navbar';
import HeroSection from './sections/HeroSection';
import MarqueeSection from './sections/MarqueeSection';
import AboutSection from './sections/AboutSection';
import SkillsSection from './sections/SkillsSection';
import ProjectsSection from './sections/ProjectsSection';
import ExperienceEducationSection from './sections/ExperienceEducationSection';
import ServicesSection from './sections/ServicesSection';
import CertificationsSection from './sections/CertificationsSection';
import TestimonialsSection from './sections/TestimonialsSection';
import ContactSection from './sections/ContactSection';
import LenisProvider from './components/LenisProvider';
import CustomCursor from './components/CustomCursor';
import FluidBackground from './components/FluidBackground';
import ContactMeButton from './components/ContactMeButton';

const App = () => {
  return (
    <LenisProvider>
      <div className="bg-[#0C0C0C] font-kanit min-h-screen relative" style={{ overflowX: 'clip' }}>
        
        {/* SVG filter for the fluid text hover effect */}
        <svg className="pointer-events-none absolute w-0 h-0">
          <filter id="fluid-wave">
            <feTurbulence type="fractalNoise" baseFrequency="0.02 0.04" numOctaves="2" result="warp">
              <animate attributeName="baseFrequency" values="0.02 0.04; 0.03 0.06; 0.02 0.04" dur="2s" repeatCount="indefinite" />
            </feTurbulence>
            <feDisplacementMap xChannelSelector="R" yChannelSelector="G" scale="35" in="SourceGraphic" in2="warp" />
          </filter>
        </svg>

        <FluidBackground />
        <CustomCursor />
        
        <Navbar />
        <ContactMeButton />
        
        <HeroSection />
        <MarqueeSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceEducationSection />
        <ServicesSection />
        <CertificationsSection />
        <TestimonialsSection />
        <ContactSection />
      </div>
    </LenisProvider>
  );
};

export default App;
