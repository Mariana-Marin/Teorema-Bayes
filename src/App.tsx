import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from './components/Navigation';
import FloatingButtons from './components/FloatingButtons';
import Section1 from './components/sections/Section1';
import Section2 from './components/sections/Section2';
import Section3 from './components/sections/Section3';
import Section4 from './components/sections/Section4';
import Section5 from './components/sections/Section5';

const SECTIONS = [
  { id: 1, name: 'Historia' },
  { id: 2, name: 'Ecuación' },
  { id: 3, name: 'Normal vs Inversa' },
  { id: 4, name: 'Mundo Real' },
  { id: 5, name: 'Misterio' },
];

export default function App() {
  const [currentSection, setCurrentSection] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95,
      filter: 'blur(10px)'
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)'
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95,
      filter: 'blur(10px)'
    }),
  };

  const paginate = (newDirection: number) => {
    const nextSection = currentSection + newDirection;
    if (nextSection >= 0 && nextSection < SECTIONS.length) {
      setDirection(newDirection);
      setCurrentSection(nextSection);
    }
  };

  const goToSection = (index: number) => {
    setDirection(index > currentSection ? 1 : -1);
    setCurrentSection(index);
  };

  const renderSection = (sectionIndex: number) => {
    const sections = [Section1, Section2, Section3, Section4, Section5];
    const Component = sections[sectionIndex];
    return <Component />;
  };

  return (
    <div className="w-screen h-[100dvh] overflow-hidden bg-[#0A0A0B] flex flex-col font-sans text-slate-200">
      <Navigation 
        sections={SECTIONS} 
        currentSection={currentSection}
        onNavigate={goToSection}
      />
      
      {/* Background Mystical Atmosphere - Subtle, Elegant */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#13151a] via-[#0A0A0B] to-[#040405] pointer-events-none" />
      <div className="absolute inset-0 z-0 opacity-20 mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />

      {/* Main Content Area */}
      <main className="relative flex-1 w-full pt-44 md:pt-32 pb-24 px-4 z-10 overflow-x-hidden overflow-y-auto flex flex-col justify-start items-center">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentSection}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.4 },
              filter: { duration: 0.4 }
            }}
            className="w-full max-w-6xl mx-auto flex flex-col items-center flex-1 h-fit min-h-full"
          >
            <div className="my-auto w-full flex flex-col justify-center">
              {renderSection(currentSection)}
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      <FloatingButtons 
        onNext={() => paginate(1)}
        onPrev={() => paginate(-1)}
        canNext={currentSection < SECTIONS.length - 1}
        canPrev={currentSection > 0}
      />
    </div>
  );
}
