import { motion } from 'framer-motion';
import { useState } from 'react';

interface RealWorldExample {
  id: string;
  title: string;
  icon: string;
  description: string;
  details: string;
  color: string;
}

const examples: RealWorldExample[] = [
  {
    id: 'enigma',
    title: 'WWII: Enigma',
    icon: '🎖️',
    description: 'Alan Turing descifró códigos enemigos',
    details: 'Turing usó inferencia Bayesiana para deducir las configuraciones diarias de la máquina Enigma. Cada letra interceptada y descartada actualizaba la probabilidad de la configuración real, descartando millones de opciones falsas en segundos.',
    color: 'from-[#1a1c22] to-[#111318]'
  },
  {
    id: 'chess',
    title: 'Ajedrez y Juegos',
    icon: '♟️',
    description: 'Cálculo de movimientos óptimos',
    details: 'Los motores de ajedrez y sistemas como AlphaGo usan árboles de búsqueda Bayesianos para evaluar probabilidades de victoria. Actualizan sus "creencias" sobre qué rama del tablero es ganadora a medida que simulan más jugadas.',
    color: 'from-[#1a1c22] to-[#111318]'
  },
  {
    id: 'poker',
    title: 'Poker Profesional',
    icon: '🎰',
    description: 'Ajuste de apuestas con información incompleta',
    details: 'Los jugadores usan razonamiento Bayesiano instintivo: comienzan con una probabilidad base de la fuerza de su mano (Prior) y la actualizan dramáticamente (Posterior) al leer el tamaño de las apuestas y el lenguaje corporal de los rivales (Likelihood).',
    color: 'from-[#1a1c22] to-[#111318]'
  },
  {
    id: 'ai',
    title: 'Machine Learning',
    icon: '🤖',
    description: 'Filtros Anti-Spam y Diagnósticos Médicos',
    details: 'Los clasificadores Bayesianos calculan probabilidades como: "¿Cuál es la probabilidad de que este correo sea Spam dado que contiene la palabra \'Oferta\'?". Es el corazón del Machine Learning probabilístico moderno.',
    color: 'from-[#1a1c22] to-[#111318]'
  }
];

export default function Section4() {
  const [flipped, setFlipped] = useState<Set<string>>(new Set());

  const toggleFlip = (id: string) => {
    const newFlipped = new Set(flipped);
    if (newFlipped.has(id)) {
      newFlipped.delete(id);
    } else {
      newFlipped.add(id);
    }
    setFlipped(newFlipped);
  };

  return (
    <div className="w-full flex-1 flex flex-col items-center justify-center p-4 relative">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 md:mb-12"
      >
        <h2 className="text-3xl md:text-5xl font-serif text-center text-slate-100 tracking-wide mb-8 md:mb-12 drop-shadow-lg" style={{ textShadow: "0 2px 10px rgba(255,255,255,0.05)" }}>
          Bayes en el Mundo Real
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8 max-w-5xl w-full"
      >
        {examples.map((example, index) => (
          <motion.div
            key={example.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className="perspective h-40 md:h-56 cursor-pointer group"
            onClick={() => toggleFlip(example.id)}
          >
            <motion.div
              className="w-full h-full relative"
              initial={false}
              animate={{ rotateY: flipped.has(example.id) ? 180 : 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Front side */}
              <div 
                className="absolute inset-0 bg-[#0f1115] border border-white/5 backdrop-blur-sm rounded-3xl p-4 md:p-6 flex items-center justify-start gap-4 md:gap-6 shadow-xl hover:shadow-2xl hover:border-[#D4AF37]/30 transition-all backface-hidden overflow-hidden"
                style={{ backfaceVisibility: 'hidden' }}
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#D4AF37] opacity-5 rounded-bl-full -z-10 group-hover:scale-110 transition-transform`} />
                <div className="text-4xl md:text-6xl drop-shadow-md grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all">{example.icon}</div>
                <div>
                  <h3 className="text-xl md:text-2xl font-serif text-slate-200 mb-1 group-hover:text-[#D4AF37] transition-colors">{example.title}</h3>
                  <p className="text-sm md:text-base text-slate-500 font-light leading-tight group-hover:text-slate-400">{example.description}</p>
                </div>
              </div>

              {/* Back side */}
              <div 
                className={`absolute inset-0 bg-gradient-to-br ${example.color} rounded-3xl p-6 flex flex-col items-center justify-center text-center shadow-xl backface-hidden border border-[#D4AF37]/40`}
                style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
              >
                <p className="text-slate-300 font-light text-sm md:text-lg leading-relaxed drop-shadow-md">
                  {example.details}
                </p>
                <div className="absolute bottom-4 text-xs font-bold text-[#D4AF37]/50 uppercase tracking-widest">
                  Aplicación Práctica
                </div>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-8 md:mt-12 text-center"
      >
        <p className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#111318]/50 border border-white/5 text-sm text-slate-500 font-light backdrop-blur-sm">
          <span className="animate-pulse opacity-70">👆</span> Toca las tarjetas para descubrir su funcionamiento
        </p>
      </motion.div>
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#D4AF37]/5 rounded-[100%] blur-[100px] -z-10 pointer-events-none" />
    </div>
  );
}
