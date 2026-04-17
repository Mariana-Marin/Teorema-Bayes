import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Section3() {
  const [showFrequentist, setShowFrequentist] = useState(true);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1, y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <div className="w-full flex-1 flex flex-col items-center justify-center p-4 relative">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl text-center mb-6 md:mb-10 px-4"
      >
        <h2 className="text-3xl md:text-5xl font-serif text-slate-100 tracking-wide mb-4 drop-shadow-lg" style={{ textShadow: "0 2px 10px rgba(255,255,255,0.05)" }}>
          Frecuentista vs Bayesiano
        </h2>
        <div className="bg-[#111318]/60 border border-white/5 rounded-2xl p-4 md:p-6 backdrop-blur-sm">
          <p className="text-slate-300 font-light text-sm md:text-base leading-relaxed">
            Imagina que tienes una <strong className="text-white font-medium">olla de 10 litros de sopa hirviendo</strong> (La Población). Tu objetivo es saber si quedó bien de sal, pero no puedes tomarte los 10 litros. Solo puedes sacar <strong className="text-[#D4AF37] font-medium">una cucharada</strong> (La Muestra) para probar. Aquí es donde entran a juzgar nuestros dos personajes...
          </p>
        </div>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-6xl w-full"
      >
        {/* Frequentist approach */}
        <motion.div
          variants={itemVariants}
          className={`flex flex-col p-6 md:p-8 rounded-3xl transition-colors duration-500 ${showFrequentist ? 'bg-[#111318]/90 border border-white/10 shadow-2xl' : 'bg-transparent filter grayscale opacity-30 cursor-pointer hover:opacity-50'}`}
          onClick={!showFrequentist ? () => setShowFrequentist(true) : undefined}
        >
          <div className="flex flex-col items-center mb-6">
            <div className="text-5xl md:text-6xl mb-4 grayscale opacity-80 transition-transform duration-500 hover:scale-110">🥣🔍</div>
            <h3 className="text-xl md:text-2xl font-serif text-center mb-1 text-slate-200">
              El Estadístico Frecuentista
            </h3>
            <p className="text-xs md:text-sm text-slate-500 uppercase tracking-widest font-semibold">El Inspector Estricto</p>
          </div>
          
          <div className="text-slate-400 font-light text-sm md:text-base mb-6 space-y-4 flex-1">
            <p className="bg-[#0a0a0b]/50 p-3 rounded-lg border border-white/5">
              <strong className="text-slate-200 block mb-1">La Hipótesis (Punto de partida):</strong> 
              No usa intuición. Asume obligatoriamente: <em>"Esta sopa no tiene absolutamente nada de sal"</em>.
            </p>
            <p className="bg-[#0a0a0b]/50 p-3 rounded-lg border border-white/5">
              <strong className="text-slate-200 block mb-1">El Efecto (La prueba):</strong> 
              Toma la cucharada, la prueba y siente que está muy salada.
            </p>
            <p className="bg-[#0a0a0b]/50 p-3 rounded-lg border border-white/5 italic">
              "Si fuera cierto que toda la olla no tiene sal, sería prácticamente imposible que justo esta cucharada me supiera salada. Como eso es una contradicción, rechazo la idea inicial."
            </p>
          </div>
          
          <div className="mt-auto px-4 py-4 bg-[#0A0A0B] border border-white/10 rounded-xl text-center shadow-inner">
            <p className="text-slate-200 font-medium text-base md:text-lg">Resultado: "Sí, tiene sal"</p>
            <p className="text-slate-500 font-light text-xs md:text-sm mt-1">No da probabilidades, solo usa la cucharada para desmentir la suposición inicial.</p>
          </div>
        </motion.div>

        {/* Bayesian approach */}
        <motion.div
          variants={itemVariants}
          className={`flex flex-col p-6 md:p-8 rounded-3xl transition-colors duration-500 ${!showFrequentist ? 'bg-[#111318]/90 border border-[#D4AF37]/30 shadow-2xl relative overflow-hidden' : 'bg-transparent filter grayscale opacity-30 cursor-pointer hover:opacity-50'}`}
          onClick={showFrequentist ? () => setShowFrequentist(false) : undefined}
        >
          {!showFrequentist && <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 to-transparent pointer-events-none" />}
          
          <div className="flex flex-col items-center mb-6 relative z-10">
            <div className="text-5xl md:text-6xl mb-4 drop-shadow-[0_0_15px_rgba(212,175,55,0.4)] transition-transform duration-500 hover:scale-110">👨‍🍳✨</div>
            <h3 className="text-xl md:text-2xl font-serif text-center mb-1 text-[#D4AF37]">
              El Estadístico Bayesiano
            </h3>
            <p className="text-xs md:text-sm text-[#D4AF37]/60 uppercase tracking-widest font-semibold">El Cocinero con Memoria</p>
          </div>
          
          <div className="text-slate-300 font-light text-sm md:text-base mb-6 space-y-4 flex-1 relative z-10">
            <p className="bg-[#D4AF37]/5 p-3 rounded-lg border border-[#D4AF37]/10">
              <strong className="text-[#D4AF37] block mb-1">El Prior (Conocimiento Previo):</strong> 
              Piensa: <em>"Yo vi que hace 10 minutos le echaron un puñado de sal, así que estoy un 70% seguro de que ya debe estar lista"</em>.
            </p>
            <p className="bg-[#D4AF37]/5 p-3 rounded-lg border border-[#D4AF37]/10">
              <strong className="text-[#D4AF37] block mb-1">El Efecto (La prueba):</strong> 
              Toma la misma cucharada y siente que está muy salada.
            </p>
            <p className="bg-[#D4AF37]/5 p-3 rounded-lg border border-[#D4AF37]/10 text-[#ebca62] italic">
              "Esta cucharada lo confirma. Juntando lo que vi antes con el sabor de ahora, mi confianza se actualiza a un 95%."
            </p>
          </div>
          
          <div className="mt-auto px-4 py-4 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-xl text-center shadow-inner relative z-10">
            <p className="text-[#D4AF37] font-medium text-base md:text-lg">Resultado: 95% seguro</p>
            <p className="text-[#D4AF37]/70 font-light text-xs md:text-sm mt-1">Mezcla las pistas del pasado con la evidencia del presente para dar una probabilidad viva.</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Toggle button */}
      <motion.button
        onClick={() => setShowFrequentist(!showFrequentist)}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-8 md:mt-12 px-6 md:px-8 py-3 rounded-full bg-[#111318] text-slate-300 font-light text-sm md:text-base shadow-xl hover:shadow-2xl transition-all border border-white/10 hover:border-[#D4AF37]/50 hover:text-[#D4AF37]"
      >
        {showFrequentist ? 'Ver Enfoque Bayesiano →' : '← Ver Enfoque Frecuentista'}
      </motion.button>
      
      {/* Decorative center glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#D4AF37]/5 rounded-full blur-[100px] -z-10 pointer-events-none" />
    </div>
  );
}
