// Quiet Cinematic Final Film Credit
import React from 'react';

export default function EndingCredit() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 py-24 relative z-20 pointer-events-none">
      <div className="max-w-xl mx-auto space-y-8 animate-fade-in">
        {/* Title */}
        <h1 className="text-4xl sm:text-6xl font-bold tracking-[0.4em] uppercase text-white font-cinzel opacity-90 drop-shadow-[0_0_30px_rgba(255,255,255,0.15)]">
          COSMOS
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base text-slate-400 font-light tracking-[0.25em] italic">
          The universe is still waiting to be discovered.
        </p>

        {/* Subtle separator */}
        <div className="w-8 h-[1px] bg-white/20 mx-auto my-6" />

        {/* Understated Creator Credit */}
        <div className="pt-4 opacity-75 transition-opacity duration-1000">
          <span className="text-[11px] sm:text-xs font-light tracking-[0.3em] uppercase text-slate-500 block">
            Made by Mannat
          </span>
        </div>
      </div>
    </section>
  );
}
