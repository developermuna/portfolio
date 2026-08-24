import { useState, useCallback } from 'react';
import Navbar from './components/navbar/Navbar';
import LenisProvider from './components/common/LenisProvider';
import CustomCursor from './components/common/CustomCursor';
import ContactMeButton from './components/contact/ContactMeButton';
import SplashScreen from './components/common/SplashScreen';
import CurveTransition from './components/common/CurveTransition';
import AppRoutes from './routes/AppRoutes';

const App = () => {
  const [splashComplete, setSplashComplete] = useState(false);

  const handleSplashComplete = useCallback(() => {
    setSplashComplete(true);
  }, []);

  return (
    <LenisProvider>
      <div className="bg-[#0C0C0C] font-kanit min-h-screen relative" style={{ overflowX: 'clip' }}>
        
        {!splashComplete && (
          <SplashScreen onComplete={handleSplashComplete} />
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
        
        <AppRoutes />
      </div>
    </LenisProvider>
  );
};

export default App;
