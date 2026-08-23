import React, { useEffect, useRef } from 'react';
// @ts-ignore
import WebGLFluid from 'webgl-fluid';

const FluidBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      WebGLFluid(canvasRef.current, {
        IMMEDIATE: true,
        TRIGGER: 'hover',
        SIM_RESOLUTION: 128,
        DYE_RESOLUTION: 512,
        CAPTURE_RESOLUTION: 512,
        DENSITY_DISSIPATION: 3,
        VELOCITY_DISSIPATION: 2,
        PRESSURE: 0.1,
        PRESSURE_ITERATIONS: 20,
        CURL: 5,
        SPLAT_RADIUS: 0.05,
        SPLAT_FORCE: 8000,
        SHADING: true,
        COLORFUL: false, // Monochromatic default
        COLOR_UPDATE_SPEED: 10,
        PAUSED: false,
        BACK_COLOR: { r: 12, g: 12, b: 12 }, // Match #0C0C0C
        TRANSPARENT: true, 
        BLOOM: false,
        SUNRAYS: false,
      });

      // Forward pointer events to the canvas since it has pointer-events: none
      const handlePointerMove = (e: PointerEvent | MouseEvent) => {
        if (!canvasRef.current) return;
        
        // Check if cursor is over a button, link, or their container padding
        if (e.target instanceof Element) {
          if (e.target.closest('a, button, [role="button"], nav, .group')) {
            return; // Skip drawing fluid
          }
        }
        
        // Dispatch standard mouse event
        const mouseEvent = new MouseEvent('mousemove', {
          clientX: e.clientX,
          clientY: e.clientY,
          bubbles: true
        });
        canvasRef.current.dispatchEvent(mouseEvent);
      };

      const handleTouchMove = (e: TouchEvent) => {
        if (!canvasRef.current || e.touches.length === 0) return;

        // Check if touch is over a button, link, or their container padding
        if (e.target instanceof Element) {
          if (e.target.closest('a, button, [role="button"], nav, .group')) {
            return; // Skip drawing fluid
          }
        }

        try {
          const touch = e.touches[0];
          const mouseEvent = new MouseEvent('mousemove', {
            clientX: touch.clientX,
            clientY: touch.clientY,
            bubbles: true
          });
          canvasRef.current.dispatchEvent(mouseEvent);
        } catch {
          // Ignore fallback touch
        }
      };

      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('mousemove', handlePointerMove);
      window.addEventListener('touchmove', handleTouchMove);
      
      return () => {
        window.removeEventListener('pointermove', handlePointerMove);
        window.removeEventListener('mousemove', handlePointerMove);
        window.removeEventListener('touchmove', handleTouchMove);
      };
    }
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-[1]"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

export default FluidBackground;
