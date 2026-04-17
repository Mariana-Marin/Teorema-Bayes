import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function Section2() {
  const [hoveredVariable, setHoveredVariable] = useState<string | null>(null);

  const variables = {
    'PAnB': { label: 'P(A|B)', description: 'Posterior: La probabilidad actualizada de nuestra hipótesis (A) después de obsevar la nueva evidencia (B). Es lo que realmente buscamos conocer.', color: 'text-[#D4AF37] border-[#D4AF37]/30' },
    'PBnA': { label: 'P(B|A)', description: 'Verosimilitud (Likelihood): ¿Qué tan probable es observar esta evidencia (B) si nuestra hipótesis (A) fuera cierta? Mide el "peso" de los datos.', color: 'text-slate-300 border-slate-600' },
    'PA': { label: 'P(A)', description: 'Prior: Nuestra creencia inicial o probabilidad base de la hipótesis (A) antes de siquiera ver la evidencia. Nos ancla en la realidad.', color: 'text-slate-300 border-slate-600' },
    'PB': { label: 'P(B)', description: 'Evidencia Total (Marginal): La probabilidad total de que ocurra la evidencia (B) bajo cualquier circunstancia. Sirve para normalizar el resultado.', color: 'text-slate-300 border-slate-600' }
  };

  return (
    <div className="w-full flex-1 flex flex-col items-center justify-center p-4 relative">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 md:mb-12"
      >
        <h2 className="text-3xl md:text-5xl font-serif text-center text-slate-100 tracking-wide drop-shadow-lg" style={{ textShadow: "0 2px 10px rgba(255,255,255,0.05)" }}>
          La Ecuación Fundamental
        </h2>
      </motion.div>

      {/* Main formula */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="mb-8 md:mb-12 px-6 md:px-12 py-6 md:py-10 rounded-3xl bg-[#111318]/80 border border-white/10 backdrop-blur-xl shadow-2xl relative overflow-hidden group"
      >
        <div className="absolute inset-0 bg-[#D4AF37]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="text-center text-2xl md:text-6xl font-bold font-mono text-white tracking-widest drop-shadow-lg">
          <span className="text-[#D4AF37]">P(A|B)</span> = <span className="text-slate-400">P(B|A) × P(A) / P(B)</span>
        </div>
      </motion.div>

      {/* Interactive variables */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-2 gap-4 md:gap-6 max-w-4xl w-full"
      >
        {Object.entries(variables).map(([key, { label, description, color }], index) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
            onHoverStart={() => setHoveredVariable(key)}
            onHoverEnd={() => setHoveredVariable(null)}
            className="relative cursor-default"
          >
            <motion.div
              className={`h-full p-4 md:p-6 rounded-2xl bg-[#0f1115] border ${color} text-center relative overflow-hidden shadow-xl hover:shadow-2xl transition-all hover:bg-[#15181e]`}
              whileHover={{ scale: 1.02 }}
            >
              <div className={`text-xl md:text-3xl font-serif mb-1 md:mb-2 ${color.split(' ')[0]}`}>{label}</div>
              
              <div className="h-0 md:h-[4rem] flex items-start justify-center">
                <AnimatePresence>
                  {hoveredVariable === key && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-xs md:text-sm font-light text-slate-400 leading-tight md:leading-normal"
                    >
                      {description}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* Real-world COVID Example block */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="w-full max-w-4xl mt-8 md:mt-12 bg-gradient-to-br from-[#1a1c22] to-[#111318] border border-[#D4AF37]/20 rounded-3xl p-5 md:p-8 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-4 opacity-5 text-6xl pointer-events-none">🦠</div>
        <h3 className="text-xl md:text-2xl font-serif text-[#D4AF37] mb-4 flex items-center gap-3">
          <span className="text-2xl">🔬</span> Ejemplo: Prueba Positiva de COVID
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-slate-300 font-light text-sm md:text-base leading-relaxed">
          <div className="flex flex-col gap-3">
            <p>Imagina que te haces una prueba de COVID y da <strong>positivo</strong>.</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-400">
              <li><strong className="text-white">P(A) Prior:</strong> Hoy en día, la prevalencia es muy baja. Supongamos un <strong>2%</strong> (0.02).</li>
              <li><strong className="text-white">P(B|A) Sensibilidad:</strong> Si de verdad estás enfermo, la prueba detecta el virus el <strong>90%</strong> (0.90) de las veces.</li>
              <li><strong className="text-white">P(B|~A) Falso Positivo:</strong> Si en realidad estás sano, la prueba se confunde y da "positivo" el <strong>5%</strong> (0.05) de las veces.</li>
            </ul>
          </div>
          
          <div className="flex flex-col justify-center bg-[#0a0a0b] border border-white/5 rounded-xl p-4 relative overflow-hidden">
            <div className="absolute left-0 top-0 w-1 h-full bg-[#D4AF37]/50" />
            <div className="font-mono text-center flex flex-col items-center justify-center text-xs md:text-sm mb-4 mt-2 text-slate-300 w-full overflow-x-auto">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-[#D4AF37]">P(Covid|Pos.)</span> =
                <div className="flex flex-col items-center text-slate-400">
                  <span className="border-b border-white/20 pb-2 px-2">0.90 × 0.02</span>
                  <span className="pt-2 px-2 text-[0.7rem] md:text-[0.8rem]">(0.90 × 0.02) + (0.05 × 0.98)</span>
                </div>
              </div>
            </div>
            <div className="text-center font-serif">
              <span className="text-3xl md:text-4xl font-bold text-white tracking-widest drop-shadow-lg">26.8%</span>
            </div>
            <p className="text-xs text-center mt-3 text-[#D4AF37]/80">
              ¡Incluso con test positivo, sigue siendo más probable que estés sano (falso positivo) debido a la baja prevalencia base!
            </p>
          </div>
        </div>
      </motion.div>

      {/* Decorative center glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[100px] -z-10 pointer-events-none" />
    </div>
  );
}
