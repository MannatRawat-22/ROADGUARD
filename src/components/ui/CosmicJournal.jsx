// Cosmic Journal - Elegant Slide-Over Logbook of Unlocked Discoveries
import React from 'react';
import { X, CheckCircle2, Lock, Sparkles, Compass } from 'lucide-react';
import { DISCOVERIES_LIST } from '../../constants/celestialData';

export default function CosmicJournal({
  isOpen,
  onClose,
  unlockedDiscoveries = new Set(),
  onJumpToDiscovery = null
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm pointer-events-auto transition-opacity duration-300">
      <div className="relative w-full max-w-md h-full bg-slate-950/95 border-l border-white/10 p-6 flex flex-col shadow-2xl overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div>
            <h2 className="text-lg font-bold tracking-widest text-white uppercase font-cinzel">Cosmic Journal</h2>
            <p className="text-xs text-slate-400 font-light">Documented celestial discoveries & observations</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="my-5 p-4 rounded-xl bg-white/5 border border-white/5">
          <div className="flex justify-between items-center text-xs mb-2">
            <span className="text-slate-300 font-medium">Discoveries Unlocked</span>
            <span className="text-cyan-400 font-semibold">{unlockedDiscoveries.size} / {DISCOVERIES_LIST.length}</span>
          </div>
          <div className="w-full h-1.5 bg-black/50 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-amber-400 rounded-full transition-all duration-500"
              style={{ width: `${(unlockedDiscoveries.size / DISCOVERIES_LIST.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Discoveries List */}
        <div className="flex-1 space-y-3">
          {DISCOVERIES_LIST.map((item) => {
            const isUnlocked = unlockedDiscoveries.has(item.id);

            return (
              <div
                key={item.id}
                className={`p-4 rounded-xl border transition-all duration-300 ${
                  isUnlocked
                    ? 'bg-white/5 border-cyan-500/20 hover:border-cyan-500/40 text-slate-200'
                    : 'bg-black/20 border-white/5 opacity-40 text-slate-500'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2.5">
                    {isUnlocked ? (
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                    ) : (
                      <Lock className="w-4 h-4 text-slate-600 flex-shrink-0" />
                    )}
                    <span className="text-xs font-semibold tracking-wider uppercase text-white font-cinzel">
                      {item.title}
                    </span>
                  </div>
                  <span className="text-[10px] tracking-widest uppercase px-2 py-0.5 rounded-full bg-white/5 text-slate-400">
                    {item.category}
                  </span>
                </div>

                <p className="text-xs text-slate-400 mt-2 font-light leading-relaxed">
                  {isUnlocked ? item.desc : 'Traverse deeper into the cosmic journey to unlock this observation.'}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
