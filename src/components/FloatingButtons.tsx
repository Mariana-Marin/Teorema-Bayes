import { motion } from 'framer-motion';

interface FloatingButtonsProps {
  onNext: () => void;
  onPrev: () => void;
  canNext: boolean;
  canPrev: boolean;
}

export default function FloatingButtons({ onNext, onPrev, canNext, canPrev }: FloatingButtonsProps) {
  return (
    <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-40 flex flex-col md:flex-row gap-3 md:gap-4">
      <motion.button
        onClick={onPrev}
        disabled={!canPrev}
        whileHover={canPrev ? { y: -2 } : {}}
        whileTap={canPrev ? { scale: 0.95 } : {}}
        className={`w-12 h-12 md:w-14 md:h-14 rounded-full font-light text-xl md:text-2xl transition-all flex items-center justify-center
          ${canPrev 
            ? 'bg-[#111318] border border-white/10 text-slate-300 hover:border-[#D4AF37]/50 hover:text-[#D4AF37] cursor-pointer shadow-2xl' 
            : 'bg-[#111318]/50 border border-white/5 text-slate-600 cursor-not-allowed opacity-50 shadow-none'
          }
        `}
      >
        <span className="relative drop-shadow-md">↑</span>
      </motion.button>

      <motion.button
        onClick={onNext}
        disabled={!canNext}
        whileHover={canNext ? { y: -2 } : {}}
        whileTap={canNext ? { scale: 0.95 } : {}}
        className={`w-12 h-12 md:w-14 md:h-14 rounded-full font-light text-xl md:text-2xl transition-all flex items-center justify-center
          ${canNext 
            ? 'bg-[#111318] border border-white/10 text-slate-300 hover:border-[#D4AF37]/50 hover:text-[#D4AF37] cursor-pointer shadow-2xl' 
            : 'bg-[#111318]/50 border border-white/5 text-slate-600 cursor-not-allowed opacity-50 shadow-none'
          }
        `}
      >
        <span className="relative drop-shadow-md">↓</span>
      </motion.button>
    </div>
  );
}
