import React, { useEffect, useRef } from 'react';
// @ts-ignore
import WebGLFluid from 'webgl-fluid';

const FluidBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      WebGLFluid(canvasRef.current, {
        IMMEDIATE: false,
        TRIGGER: 'hover',
        SIM_RESOLUTION: window.innerWidth < 768 ? 64 : 128,
        DYE_RESOLUTION: window.innerWidth < 768 ? 256 : 512,
        CAPTURE_RESOLUTION: 512,
        DENSITY_DISSIPATION: window.innerWidth < 768 ? 4 : 3,
        VELOCITY_DISSIPATION: window.innerWidth < 768 ? 3 : 2,
        PRESSURE: 0.1,
        PRESSURE_ITERATIONS: 20,
        CURL: 5,
        SPLAT_RADIUS: window.innerWidth < 768 ? 0.02 : 0.05,
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
      const handlePointer = (e: PointerEvent | MouseEvent, type: string) => {
        if (!canvasRef.current) return;
        if (e.target instanceof Element && e.target.closest('a, button, [role="button"], nav, .group')) return;
        
        canvasRef.current.dispatchEvent(new MouseEvent(type, {
          clientX: e.clientX,
          clientY: e.clientY,
          bubbles: true
        }));
      };

      const handleTouch = (e: TouchEvent, type: string) => {
        if (!canvasRef.current || e.touches.length === 0) return;
        if (type === 'mousedown' && e.target instanceof Element && e.target.closest('a, button, [role="button"], nav, .group')) return;
        
        try {
          const touch = e.touches[0];
          canvasRef.current.dispatchEvent(new MouseEvent(type, {
            clientX: touch.clientX,
            clientY: touch.clientY,
            bubbles: true
          }));
        } catch {
          // Ignore
        }
      };

      const onPointerMove = (e: any) => handlePointer(e, 'mousemove');
      const onPointerDown = (e: any) => handlePointer(e, 'mousedown');
      const onPointerUp = (e: any) => handlePointer(e, 'mouseup');
      
      const onTouchMove = (e: any) => handleTouch(e, 'mousemove');
      const onTouchStart = (e: any) => handleTouch(e, 'mousedown');
      const onTouchEnd = () => {
        if (canvasRef.current) {
          canvasRef.current.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
        }
      };

      window.addEventListener('mousemove', onPointerMove);
      window.addEventListener('mousedown', onPointerDown);
      window.addEventListener('mouseup', onPointerUp);
      
      window.addEventListener('touchmove', onTouchMove, { passive: false });
      window.addEventListener('touchstart', onTouchStart, { passive: false });
      window.addEventListener('touchend', onTouchEnd);
      
      return () => {
        window.removeEventListener('mousemove', onPointerMove);
        window.removeEventListener('mousedown', onPointerDown);
        window.removeEventListener('mouseup', onPointerUp);
        
        window.removeEventListener('touchmove', onTouchMove);
        window.removeEventListener('touchstart', onTouchStart);
        window.removeEventListener('touchend', onTouchEnd);
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
