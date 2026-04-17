import { motion } from 'framer-motion';

interface Section {
  id: number;
  name: string;
}

interface NavigationProps {
  sections: Section[];
  currentSection: number;
  onNavigate: (index: number) => void;
}

export default function Navigation({ sections, currentSection, onNavigate }: NavigationProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-4 md:px-8 md:py-6 bg-gradient-to-b from-[#0A0A0B]/90 to-transparent backdrop-blur-sm pointer-events-none">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 pointer-events-auto">
        <h1 className="text-xl md:text-2xl font-serif font-semibold tracking-widest text-slate-200 uppercase drop-shadow-md">
          Teorema de Bayes
        </h1>
        
        <div className="flex flex-wrap justify-center items-center gap-2 md:gap-4 bg-[#111318]/80 p-1 md:p-2 rounded-full border border-white/5">
          {sections.map((section, index) => (
            <motion.button
              key={section.id}
              onClick={() => onNavigate(index)}
              className={`relative px-3 py-1.5 md:px-5 md:py-2 text-xs md:text-sm font-medium tracking-wide rounded-full transition-all ${
                index === currentSection
                  ? 'text-[#0A0A0B]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">{section.name}</span>
              {index === currentSection && (
                <motion.div
                  layoutId="activeSection"
                  className="absolute inset-0 rounded-full bg-slate-200 shadow-md"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-4 px-2">
        <div className="w-full h-[2px] bg-slate-800/50 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-[#D4AF37]"
            initial={{ width: '0%' }}
            animate={{ width: `${((currentSection + 1) / sections.length) * 100}%` }}
            transition={{ type: 'spring', bounce: 0, duration: 0.8 }}
          />
        </div>
      </div>
    </nav>
  );
}
