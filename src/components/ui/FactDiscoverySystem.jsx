// Elegant Fact Discovery & "[ SHOW ME WHY ]" Visual Explanation Trigger
import React, { useState } from 'react';
import { HelpCircle, ArrowRight, X, Info } from 'lucide-react';

export default function FactDiscoverySystem({
  fact,
  onShowWhy = null
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!fact) return null;

  const handleShowWhyClick = () => {
    if (onShowWhy && fact.showWhy) {
      onShowWhy(fact.showWhy);
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <div className="fixed bottom-10 left-6 sm:left-10 z-30 max-w-sm pointer-events-auto">
      <div className="p-4 rounded-xl bg-black/50 backdrop-blur-lg border border-white/10 shadow-2xl text-white transition-all duration-300">
        <div className="flex items-center space-x-2 text-cyan-400 text-[11px] font-semibold tracking-wider uppercase mb-1.5">
          <Info className="w-3.5 h-3.5" />
          <span>Did you know?</span>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
          {fact.text}
        </p>

        {fact.showWhy && (
          <button
            onClick={handleShowWhyClick}
            className="mt-3 flex items-center space-x-1 text-[11px] font-medium tracking-wider text-cyan-400 hover:text-cyan-300 transition-colors uppercase group"
          >
            <span>[ SHOW ME WHY ]</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </button>
        )}
      </div>

      {/* Fallback Explanatory Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
          <div className="relative max-w-md w-full p-6 rounded-2xl bg-slate-950 border border-white/10 text-white shadow-2xl">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-base font-semibold text-cyan-400 mb-2 font-cinzel">Scientific Principle</h3>
            <p className="text-sm text-slate-300 leading-relaxed font-light mb-4">
              {fact.text}
            </p>
            <div className="text-xs text-slate-400 border-t border-white/10 pt-3">
              Observed via high-precision astronomical telemetry and gravitational orbital dynamics.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
