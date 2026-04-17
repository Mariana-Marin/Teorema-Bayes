import { motion, AnimatePresence, Reorder } from 'framer-motion';
import { useState } from 'react';

interface Suspect {
  id: string;
  name: string;
  emoji: string;
  role: string;
  probability: number;
}

interface Clue {
  id: string;
  title: string;
  content: string;
  likelihoods: Record<string, number>;
}

const initialSuspects: Suspect[] = [
  { id: 'picasso', name: 'Pablo Picasso (Pintor)', emoji: '🎨', role: 'Pintor joven. Años antes compró estatuas ibéricas robadas del Louvre sin saber su origen.', probability: 25 },
  { id: 'apollinaire', name: 'G. Apollinaire (Poeta)', emoji: '✍️', role: 'Poeta vanguardista y amigo de Picasso. Públicamente exigía "quemar los museos" para dar paso al arte nuevo.', probability: 25 },
  { id: 'pieret', name: 'G. Pieret (Ladrón)', emoji: '💼', role: 'Ladrón de poca monta y aventurero excéntrico. Robó esos ídolos del Louvre y confesó crímenes a la prensa.', probability: 25 },
  { id: 'peruggia', name: 'V. Peruggia (Cristalero)', emoji: '🚪', role: 'Cristalero y humilde ex-trabajador del museo. Conocido en su círculo por tener una fuerza inmensa.', probability: 25 }
];

const gameClues: Clue[] = [
  {
    id: 'clue1',
    title: 'Pista 1: El Testigo',
    content: 'Un testigo vio huir aprisa a alguien vistiendo el "blusón blanco" típico de los trabajadores de mantenimiento o pintores del museo.',
    likelihoods: { 'picasso': 80, 'apollinaire': 10, 'pieret': 10, 'peruggia': 80 }
  },
  {
    id: 'clue2',
    title: 'Pista 2: La Vitrina',
    content: 'El grueso cristal protector de la Mona Lisa fue desmontado limpiamente con herramientas profesionales en menos de un minuto.',
    likelihoods: { 'picasso': 5, 'apollinaire': 5, 'pieret': 10, 'peruggia': 95 }
  },
  {
    id: 'clue3',
    title: 'Pista 3: La Carga',
    content: 'La caja, el marco, el cristal y la misma pintura pesaban casi 40kg. El ladrón bajó las escaleras sin ninguna ayuda.',
    likelihoods: { 'picasso': 15, 'apollinaire': 15, 'pieret': 15, 'peruggia': 90 }
  }
];

export default function Section5() {
  const [gameState, setGameState] = useState<'intro' | 'playing' | 'result'>('intro');
  const [roundState, setRoundState] = useState<'guess' | 'reveal'>('guess');
  const [clueIdx, setClueIdx] = useState(0);
  const [hasReordered, setHasReordered] = useState(false);
  
  const [suspects, setSuspects] = useState<Suspect[]>(initialSuspects);
  const [userRanking, setUserRanking] = useState<Suspect[]>(initialSuspects);

  const startGame = () => {
    setGameState('playing');
    setRoundState('guess');
    setClueIdx(0);
    setHasReordered(false);
    setSuspects(initialSuspects);
    setUserRanking(initialSuspects);
  };

  // Derivar probabilidades basado en el ranking actual del usuario y el prior 'suspects'
  const likelihoodMap = [0.60, 0.25, 0.10, 0.05];
  
  const currentSuspects = suspects.map(s => {
    const prior = s.probability;
    const indexObj = userRanking.findIndex(r => r.id === s.id);
    const userLikelihood = (indexObj >= 0 && hasReordered) ? likelihoodMap[indexObj] : 0.25;
    return { ...s, tempProbability: prior * userLikelihood };
  });

  const totalProb = currentSuspects.reduce((sum, s) => sum + s.tempProbability, 0);
  
  const liveSuspects = currentSuspects.map(s => ({
    ...s,
    probability: hasReordered 
      ? Math.max(1, Math.round((s.tempProbability / totalProb) * 100))
      : s.probability
  }));

  const handleReorder = (newRanking: Suspect[]) => {
    setUserRanking(newRanking);
    setHasReordered(true);
  };

  const applyBayesUpdate = () => {
    setSuspects(liveSuspects); // Confirmar las probabilidades calculadas para usarlas en el reveal y siguientes clues
    setRoundState('reveal');
  };

  const nextRound = () => {
    if (clueIdx < gameClues.length - 1) {
      setClueIdx(clueIdx + 1);
      setRoundState('guess');
      setHasReordered(false);
    } else {
      setGameState('result');
    }
  };

  const sortedActualSuspects = [...suspects].sort((a, b) => b.probability - a.probability);

  return (
    <div className="w-full flex-1 flex flex-col items-center justify-start py-8 px-2 md:px-4 overflow-y-auto overflow-x-hidden">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6 md:mb-10 w-full flex-shrink-0"
      >
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif text-slate-100 tracking-wide drop-shadow-lg mb-2" style={{ textShadow: "0 2px 10px rgba(255,255,255,0.05)" }}>
          1911: El Robo de la Mona Lisa
        </h2>
        <div className="h-1 w-24 bg-[#D4AF37]/50 mx-auto rounded-full mb-4"></div>
      </motion.div>

      <AnimatePresence mode="wait">
        
        {/* INTRO PHASE */}
        {gameState === 'intro' && (
          <motion.div 
            key="intro"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center max-w-5xl w-full pb-10"
          >
            <p className="text-slate-300 font-light text-sm md:text-lg text-center max-w-3xl mb-8 leading-relaxed">
              La famosa pintura ha desaparecido del Louvre. La policía parte en blanco, asignando una creencia inicial <strong className="text-[#D4AF37] font-normal">(Prior) del 25%</strong> a cada uno de sus 4 sospechosos principales. Lee quiénes son, investiga y ordena tus sospechas.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mb-10">
              {initialSuspects.map((s) => (
                <div key={s.id} className="bg-[#111318]/80 backdrop-blur-md border border-white/5 rounded-2xl p-5 flex items-start gap-4 shadow-xl">
                  <div className="text-4xl grayscale opacity-80">{s.emoji}</div>
                  <div>
                    <h3 className="text-lg md:text-xl font-serif text-slate-200 mb-1">{s.name}</h3>
                    <p className="text-xs md:text-sm text-slate-400 font-light leading-relaxed">{s.role}</p>
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={startGame}
              className="px-8 py-3 md:py-4 bg-[#D4AF37]/10 border border-[#D4AF37]/40 rounded-full text-[#D4AF37] font-serif tracking-widest uppercase text-sm hover:bg-[#D4AF37]/20 hover:scale-105 transition-all shadow-[0_0_20px_rgba(212,175,55,0.1)] focus:outline-none"
            >
              Comenzar Investigación
            </button>
          </motion.div>
        )}

        {/* PLAYING PHASE */}
        {gameState === 'playing' && (
          <motion.div 
            key="playing"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="flex flex-col items-center w-full max-w-4xl pb-10"
          >
            <div className="flex items-center gap-4 mb-4">
              <span className="text-[#D4AF37] font-serif text-lg">Pista {clueIdx + 1} de 3</span>
            </div>

            <div className="w-full bg-[#111318]/90 backdrop-blur-xl border border-[#D4AF37]/30 rounded-3xl p-5 md:p-8 text-center shadow-2xl mb-8">
              <h3 className="text-xl md:text-2xl font-serif text-slate-100 mb-3">{gameClues[clueIdx].title}</h3>
              <p className="text-base md:text-lg text-[#ebca62] font-light max-w-2xl mx-auto">{gameClues[clueIdx].content}</p>
            </div>

            {roundState === 'guess' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-xl flex flex-col items-center">
                <p className="text-slate-400 font-light mb-6 text-center text-sm md:text-base px-2">
                  <strong>Tu turno:</strong> Arrastra a los sospechosos arriba o abajo para ordenar quién es más (arriba) y menos (abajo) sospechoso basándote en la pista.
                </p>
                
                <Reorder.Group 
                  axis="y" 
                  values={userRanking} 
                  onReorder={handleReorder} 
                  className="w-full flex flex-col gap-3 mb-8 px-2"
                >
                  {userRanking.map((s, idx) => {
                    const liveProb = liveSuspects.find(ls => ls.id === s.id)?.probability || 0;
                    return (
                    <Reorder.Item 
                      key={s.id} 
                      value={s} 
                      className="bg-[#0a0a0b]/80 backdrop-blur-sm cursor-grab active:cursor-grabbing border border-white/10 rounded-xl p-3 flex items-center justify-between hover:border-[#D4AF37]/40 shadow-inner group"
                    >
                      <div className="flex items-center gap-4 z-10">
                        <span className="text-2xl grayscale">{s.emoji}</span>
                        <div className="flex flex-col">
                          <span className="text-slate-200 font-serif text-base md:text-lg">{s.name}</span>
                          <span className="text-[#D4AF37] font-serif text-sm opacity-80">{liveProb}% Probable</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 z-10">
                        <span className="text-xs text-slate-600 font-mono uppercase tracking-wider">Lugar: {idx + 1}°</span>
                        <div className="text-slate-600 group-hover:text-[#D4AF37] transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
                        </div>
                      </div>
                    </Reorder.Item>
                    );
                  })}
                </Reorder.Group>

                <button 
                  onClick={applyBayesUpdate}
                  className="px-6 py-3 bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30 rounded-full font-light uppercase tracking-widest text-sm hover:bg-[#D4AF37]/20 hover:scale-105 transition-all focus:outline-none"
                >
                  Revelar Cálculo Bayesiano
                </button>
              </motion.div>
            )}

            {roundState === 'reveal' && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-xl flex flex-col items-center px-2">
                <p className="text-[#D4AF37] font-serif mb-6 text-center text-lg">
                  Así actualizó las probabilidades el Teorema de Bayes:
                </p>
                
                <div className="flex-1 w-full bg-[#111318]/80 backdrop-blur-md border border-white/5 rounded-2xl p-4 flex flex-col gap-3 shadow-2xl mb-8">
                  {sortedActualSuspects.map((suspect) => (
                    <motion.div
                      layout
                      key={suspect.id}
                      className="flex items-center gap-3 w-full bg-[#0a0a0b]/80 border border-white/5 rounded-xl p-3 relative overflow-hidden"
                    >
                      <div className="text-2xl w-10 text-center grayscale opacity-80 z-10">{suspect.emoji}</div>
                      <div className="flex-1 z-10">
                        <div className="text-sm md:text-base font-serif text-slate-200">{suspect.name}</div>
                      </div>
                      <div className="text-right font-serif text-[#D4AF37] w-14 z-10 text-lg md:text-xl">{suspect.probability}%</div>
                      
                      <motion.div
                        className="absolute inset-y-0 left-0 bg-[#D4AF37]/15 border-r border-[#D4AF37]/40 rounded-xl"
                        initial={{ width: 0 }}
                        animate={{ width: `${suspect.probability}%` }}
                        transition={{ type: 'spring', stiffness: 50 }}
                      />
                    </motion.div>
                  ))}
                </div>

                <button 
                  onClick={nextRound}
                  className="px-8 py-3 bg-slate-100 text-[#0a0a0b] rounded-full font-serif font-bold uppercase tracking-widest text-sm hover:bg-[#ebca62] hover:scale-105 transition-all shadow-[0_0_15px_rgba(255,255,255,0.2)] focus:outline-none"
                >
                  {clueIdx < 2 ? 'Siguiente Pista →' : 'Completar Caso'}
                </button>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* RESULT PHASE */}
        {gameState === 'result' && (
          <motion.div 
            key="result"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center max-w-3xl w-full text-center pb-10 px-2"
          >
            <div className="text-5xl md:text-6xl mb-6">🕵️‍♂️</div>
            <h3 className="text-3xl md:text-5xl font-serif text-[#D4AF37] mb-6">¡Vincenzo fue el ladrón!</h3>
            
            <div className="bg-[#111318]/90 border border-[#D4AF37]/40 shadow-2xl rounded-3xl p-6 md:p-10 backdrop-blur-sm mb-8 relative text-left">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-[#D4AF37]/50 rounded-b-full"></div>
              <p className="text-slate-300 font-light text-base md:text-lg leading-relaxed">
                Tanto Picasso como Apollinaire fueron arrestados e interrogados en la vida real. Sin embargo, la acumulación de pequeñas evidencias (<strong>Likelihoods</strong>) matemática y lógicamente fue ajustando el <strong>Prior</strong> inicial hasta descartarlos.
              </p>
              <br/>
              <p className="text-slate-300 font-light text-base md:text-lg leading-relaxed">
                El cristalero Peruggia ocultó la pintura por años en un baúl. El Teorema nos enseña que debemos <strong className="text-[#D4AF37] font-normal">actualizar constantemente nuestras suposiciones conforme validamos nueva evidencia real</strong>, sin importar quién sea el sospechoso más famoso.
              </p>
            </div>

            <button 
              onClick={startGame}
              className="px-6 py-3 bg-[#111318] text-slate-400 border border-slate-700 rounded-full font-light uppercase tracking-widest text-sm hover:border-[#D4AF37]/50 hover:text-[#D4AF37] transition-colors focus:outline-none"
            >
              Reiniciar Simulación
            </button>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
