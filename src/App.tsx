import { useState, useEffect, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { isAuthenticated, logout } from './utils/dataStore';
import Navbar from './components/Navbar';
import HeroSection from './sections/HeroSection';
import MarqueeSection from './sections/MarqueeSection';
import LenisProvider from './components/LenisProvider';
import CustomCursor from './components/CustomCursor';
import ContactMeButton from './components/ContactMeButton';
import SplashScreen from './components/SplashScreen';
import CurveTransition from './components/CurveTransition';

// Lazily loaded components
const AboutSection = lazy(() => import('./sections/AboutSection'));
const SkillsSection = lazy(() => import('./sections/SkillsSection'));
const ProjectsSection = lazy(() => import('./sections/ProjectsSection'));
const ExperienceEducationSection = lazy(() => import('./sections/ExperienceEducationSection'));
const ServicesSection = lazy(() => import('./sections/ServicesSection'));
const CertificationsSection = lazy(() => import('./sections/CertificationsSection'));
const TestimonialsSection = lazy(() => import('./sections/TestimonialsSection'));
const ContactSection = lazy(() => import('./sections/ContactSection'));
const AllProjectsPage = lazy(() => import('./pages/AllProjectsPage'));
const AllProductsPage = lazy(() => import('./pages/AllProductsPage'));
const AdminPage = lazy(() => import('./pages/AdminPage'));
const AdminLoginPage = lazy(() => import('./pages/AdminLoginPage'));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'));
const TermsConditionsPage = lazy(() => import('./pages/TermsConditionsPage'));
const RefundPolicyPage = lazy(() => import('./pages/RefundPolicyPage'));

const App = () => {
  const [splashComplete, setSplashComplete] = useState(false);
  const [currentHash, setCurrentHash] = useState(window.location.hash);
  const [isAuth, setIsAuth] = useState(() => isAuthenticated());

  useEffect(() => {
    // Force sign out on page reload
    logout();
    setIsAuth(false);

    const onHashChange = () => {
      const newHash = window.location.hash;
      setCurrentHash(newHash);
      if (!newHash.startsWith('#admin')) {
        logout();
        setIsAuth(false);
      }
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  // Handle scrolling to top when switching to a dedicated page
  useEffect(() => {
    const isDedicatedPage = ['#privacy', '#terms', '#refund', '#admin', '#all-projects', '#all-products'].some(route => currentHash.startsWith(route));
    if (isDedicatedPage) {
      window.scrollTo(0, 0);
      if ((window as any).lenis) {
        (window as any).lenis.scrollTo(0, { immediate: true });
      }
    }
  }, [currentHash]);

  // Handle scrolling to hash when returning to home page
  useEffect(() => {
    const isDedicatedPage = ['#privacy', '#terms', '#refund', '#admin', '#all-projects', '#all-products'].some(route => currentHash.startsWith(route));
    if (currentHash && !isDedicatedPage) {
      const id = currentHash.substring(1);
      
      // Since the home page contains lazy-loaded components, the target element 
      // might not exist immediately. We poll for it for up to 2 seconds.
      let attempts = 0;
      const maxAttempts = 20; // 20 * 100ms = 2000ms maximum wait

      const scrollToElement = () => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'auto' });
        } else if (attempts < maxAttempts) {
          attempts++;
          setTimeout(scrollToElement, 100);
        }
      };

      setTimeout(scrollToElement, 50);
    }
  }, [currentHash]);

  return (
    <LenisProvider>
      <div className="bg-[#0C0C0C] font-kanit min-h-screen relative" style={{ overflowX: 'clip' }}>
        
        {!splashComplete && (
          <SplashScreen onComplete={() => setSplashComplete(true)} />
        )}
        
        {/* SVG filter for the fluid text hover effect */}
        <svg className="pointer-events-none absolute w-0 h-0">
          <filter id="fluid-wave">
            <feTurbulence type="fractalNoise" baseFrequency="0.02 0.04" numOctaves="2" result="warp">
              <animate attributeName="baseFrequency" values="0.02 0.04; 0.03 0.06; 0.02 0.04" dur="2s" repeatCount="indefinite" />
            </feTurbulence>
            <feDisplacementMap xChannelSelector="R" yChannelSelector="G" scale="35" in="SourceGraphic" in2="warp" />
          </filter>
        </svg>

        <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
          <div className="absolute inset-0 bg-[#0C0C0C]/80 backdrop-blur-[2px]" />
        </div>

        <CurveTransition />
        <CustomCursor />
        
        {splashComplete && (
          <>
            <Navbar />
            <ContactMeButton />
          </>
        )}
        
        <AnimatePresence mode="wait">
          {currentHash.startsWith('#admin') ? (
            <motion.div
              key="admin"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <Suspense fallback={<div className="h-screen w-full bg-[#0C0C0C]" />}>
                {isAuth ? <AdminPage onLogout={() => {
                  logout();
                  setIsAuth(false);
                  window.location.hash = '#home';
                }} /> : <AdminLoginPage onLoginSuccess={() => setIsAuth(true)} />}
              </Suspense>
            </motion.div>
          ) : currentHash.startsWith('#all-projects') ? (
            <motion.div
              key="all-projects"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <Suspense fallback={<div className="h-screen w-full bg-[#0C0C0C]" />}>
                <AllProjectsPage />
              </Suspense>
            </motion.div>
          ) : currentHash.startsWith('#all-products') ? (
            <motion.div
              key="all-products"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <Suspense fallback={<div className="h-screen w-full bg-[#0C0C0C]" />}>
                <AllProductsPage />
              </Suspense>
            </motion.div>
          ) : currentHash.startsWith('#privacy') ? (
            <motion.div
              key="privacy"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <Suspense fallback={<div className="h-screen w-full bg-[#0C0C0C]" />}>
                <PrivacyPolicyPage />
              </Suspense>
            </motion.div>
          ) : currentHash.startsWith('#terms') ? (
            <motion.div
              key="terms"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <Suspense fallback={<div className="h-screen w-full bg-[#0C0C0C]" />}>
                <TermsConditionsPage />
              </Suspense>
            </motion.div>
          ) : currentHash.startsWith('#refund') ? (
            <motion.div
              key="refund"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <Suspense fallback={<div className="h-screen w-full bg-[#0C0C0C]" />}>
                <RefundPolicyPage />
              </Suspense>
            </motion.div>
          ) : (
            <motion.div
              key="home"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
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
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </LenisProvider>
  );
};

export default App;
