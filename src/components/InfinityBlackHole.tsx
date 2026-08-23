import { motion } from 'framer-motion';

const InfinityBlackHole = () => {
  return (
    <motion.div 
      className="relative w-full h-full min-h-[400px] flex items-center justify-center -rotate-[20deg]"
      style={{ zIndex: 50 }}
    >
      
      {/* Background GIF of Black Hole */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-70">
        <img 
          src="https://i.pinimg.com/originals/39/97/6b/39976b18d4a2475e7a5083a845415cb8.gif" 
          alt="Black Hole" 
          className="w-[250%] sm:w-[300%] max-w-[1200px] object-cover mix-blend-screen scale-125"
          style={{ 
            filter: 'brightness(1.5) contrast(1.2)',
            maskImage: 'radial-gradient(circle at center, black 30%, transparent 60%)',
            WebkitMaskImage: 'radial-gradient(circle at center, black 30%, transparent 60%)'
          }}
        />
      </div>

      {/* Custom SVG Filter for Black Hole Gravitational Warp */}
      <svg className="absolute w-0 h-0 pointer-events-none">
        <filter id="blackhole-warp">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise">
            <animate attributeName="baseFrequency" values="0.04; 0.06; 0.04" dur="4s" repeatCount="indefinite" />
          </feTurbulence>
          <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 12 -5" in="noise" result="intenseNoise" />
          <feDisplacementMap xChannelSelector="R" yChannelSelector="G" scale="30" in="SourceGraphic" in2="intenseNoise" />
        </filter>
      </svg>

      {/* Infinity Light Ring Overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <svg viewBox="0 0 200 100" className="w-[120%] max-w-[500px]" style={{ filter: 'drop-shadow(0 0 15px rgba(215, 226, 234, 0.4))' }}>
          <path
            d="M 100 50 C 100 50, 60 10, 30 10 C 10 10, 10 90, 30 90 C 60 90, 100 50, 100 50 C 100 50, 140 10, 170 10 C 190 10, 190 90, 170 90 C 140 90, 100 50, 100 50"
            fill="none"
            stroke="#ffffff"
            strokeWidth="0.5"
            className="opacity-40"
            style={{ filter: 'blur(1px)' }}
          />
          <motion.path
            d="M 100 50 C 100 50, 60 10, 30 10 C 10 10, 10 90, 30 90 C 60 90, 100 50, 100 50 C 100 50, 140 10, 170 10 C 190 10, 190 90, 170 90 C 140 90, 100 50, 100 50"
            fill="none"
            stroke="#ffffff"
            strokeWidth="3"
            style={{ filter: 'blur(3px)' }}
            initial={{ strokeDasharray: "150 400", strokeDashoffset: 0 }}
            animate={{ strokeDashoffset: 550 }}
            transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
          />
        </svg>
      </div>

      {/* Warped Text (Removed) */}
    </motion.div>
  );
};

export default InfinityBlackHole;
