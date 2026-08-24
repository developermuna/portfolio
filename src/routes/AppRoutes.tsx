import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

const HomePage = lazy(() => import('../pages/Home/HomePage'));
const ProjectsPage = lazy(() => import('../pages/Projects/ProjectsPage'));
const ProductsPage = lazy(() => import('../pages/Products/ProductsPage'));
const PrivacyPolicyPage = lazy(() => import('../pages/Privacy/PrivacyPolicyPage'));
const TermsConditionsPage = lazy(() => import('../pages/Terms/TermsConditionsPage'));
const RefundPolicyPage = lazy(() => import('../pages/Refund/RefundPolicyPage'));
// Adding a simple contact page component that just scrolls to contact section on home, or we can just render HomePage and rely on hash
// Since the prompt wants /services, /projects, /products, /contact as distinct routes if possible.

// ScrollToTop component
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      if ((window as any).lenis) {
        (window as any).lenis.scrollTo(0, { immediate: true });
      }
    } else {
      const id = hash.substring(1);
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'auto' });
        }
      }, 100);
    }
  }, [pathname, hash]);

  return null;
};

const AppRoutes = () => {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<div className="h-screen w-full bg-[#0C0C0C]" />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/products" element={<ProductsPage />} />
          
          {/* Legacy hash support for Contact/Services could just render Home */}
          <Route path="/contact" element={<HomePage />} />
          <Route path="/services" element={<HomePage />} />

          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/terms" element={<TermsConditionsPage />} />
          <Route path="/refund" element={<RefundPolicyPage />} />

          {/* Catch-all */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default AppRoutes;
