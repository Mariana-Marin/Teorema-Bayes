import { motion } from 'framer-motion';

export default function Section1() {
  const timeline = [
    { year: '1701', title: 'Nace Thomas Bayes', desc: 'Clérigo presbiteriano y matemático autodidacta en Inglaterra.' },
    { year: '1761', title: 'Muere en Secreto', desc: 'Fallece sin publicar su ensayo "Un cálculo en la doctrina de las posibilidades".' },
    { year: '1763', title: 'El Rescate', desc: 'Su amigo Richard Price lee sus apuntes póstumos y los presenta a la Royal Society.' },
    { year: '1774', title: 'Formalización', desc: 'Pierre-Simon Laplace redescubre el concepto y crea la ecuación formal que usamos hoy.' },
  ];

  return (
    <div className="w-full flex-1 flex flex-col items-center justify-center p-2 lg:p-8 relative">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center w-full mb-4 lg:mb-8"
      >
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter text-slate-100 drop-shadow-xl mb-4 lg:mb-6" style={{ textShadow: "0 4px 30px rgba(255,255,255,0.1)" }}>
          Teorema de Bayes
        </h2>
        <p className="text-slate-400 font-light text-sm md:text-base max-w-2xl mx-auto px-4 text-balance">
          Modela matemáticamente el raciocinio humano, enseñándonos cómo <strong className="text-[#D4AF37] font-normal">actualizar nuestras creencias</strong> a la luz de nueva evidencia palpable. Es la base del pensamiento inductivo y el origen algorítmico del Machine Learning moderno.
        </p>
      </motion.div>

      {/* Main Content Layout */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 max-w-6xl w-full flex-1">
        
        {/* Left Side: Avatar and Fun Fact */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col items-center gap-6"
        >
          {/* Elegant portrait presentation */}
          <div className="relative flex items-center justify-center w-32 h-32 md:w-48 md:h-48 mb-4">
            <svg width="100%" height="100%" viewBox="0 0 200 250" className="relative z-10 drop-shadow-2xl">
              <defs>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3.5" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              <circle cx="100" cy="70" r="35" fill="#C9B6A1" />
              <path d="M 65 55 Q 100 20 135 55 Q 130 35 100 30 Q 70 35 65 55" fill="#f8fafc" />
              <circle cx="85" cy="65" r="3" fill="#111" />
              <circle cx="115" cy="65" r="3" fill="#111" />
              <circle cx="85" cy="65" r="10" fill="none" stroke="#D4AF37" strokeWidth="1.2" />
              <circle cx="115" cy="65" r="10" fill="none" stroke="#D4AF37" strokeWidth="1.2" />
              <path d="M 95 65 L 105 65" stroke="#D4AF37" strokeWidth="1.2" />
              <path d="M 92 84 Q 100 88 108 84" stroke="#A89083" strokeWidth="1.5" fill="none" strokeLinecap="round" />
              <rect x="60" y="110" width="80" height="90" rx="15" fill="#1E2128" stroke="#333" strokeWidth="1" />
              <rect x="85" y="110" width="30" height="90" fill="#E2E8F0" />
              <path d="M 85 110 L 100 130 L 115 110 Z" fill="#94A3B8" />
              <circle cx="100" cy="140" r="2.5" fill="#111" />
              <circle cx="100" cy="160" r="2.5" fill="#111" />
            </svg>

            {/* Elegant outer rings */}
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: 'linear' }} className="absolute inset-[-15%] border border-[#D4AF37]/20 rounded-full" />
            <motion.div animate={{ rotate: -360 }} transition={{ duration: 50, repeat: Infinity, ease: 'linear' }} className="absolute inset-[-30%] border border-slate-700/40 rounded-full" />
          </div>

          <div className="bg-[#111318]/80 backdrop-blur-md border border-[#D4AF37]/30 rounded-2xl p-5 max-w-[280px] shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-2 text-2xl opacity-10">🎩</div>
            <h3 className="text-sm font-serif text-[#D4AF37] uppercase tracking-widest mb-2 flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-[#D4AF37]" /> Dato Curioso
            </h3>
            <p className="text-xs md:text-sm text-slate-300 font-light leading-relaxed">
              <strong>¡Bayes nunca propuso la ecuación moderna!</strong> Él solo demostró un caso especial geométrico lanzando bolas en una mesa de billar. Fue <strong className="text-slate-100">Laplace</strong> quien 10 años después formuló el Teorema matemáticamente como lo usamos hoy.
            </p>
          </div>
        </motion.div>

        {/* Right Side: Timeline */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex-1 max-w-md w-full"
        >
          <h3 className="text-xl md:text-2xl font-serif text-slate-100 mb-6 hidden lg:block border-b border-white/5 pb-2">Línea del Tiempo</h3>
          <div className="relative border-l border-[#D4AF37]/20 ml-3 lg:ml-4 flex flex-col gap-6 lg:gap-8 py-2">
            {timeline.map((item, i) => (
              <motion.div 
                key={item.year}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + (i * 0.15) }}
                className="relative pl-6 lg:pl-8 group"
              >
                {/* Timeline dot */}
                <div className="absolute left-[-5px] top-[6px] w-[9px] h-[9px] rounded-full bg-[#0a0a0b] border-[1.5px] border-[#D4AF37] group-hover:scale-150 transition-transform shadow-[0_0_10px_rgba(212,175,55,0.4)]" />
                
                <span className="text-[#D4AF37] font-serif font-bold text-sm md:text-base tracking-wider block mb-1">
                  {item.year} <span className="opacity-40 px-2">•</span> <span className="text-slate-200 font-normal">{item.title}</span>
                </span>
                <p className="text-xs md:text-sm text-slate-400 font-light leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
}
