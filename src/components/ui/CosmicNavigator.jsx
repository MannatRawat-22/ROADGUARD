// Minimal Floating Cosmic Navigator
import React from 'react';
import { Compass, Sparkles, BookOpen, Volume2, VolumeX } from 'lucide-react';

export const SECTIONS = [
  { id: 'opening', label: 'Deep Space' },
  { id: 'earth', label: 'Earth' },
  { id: 'moon', label: 'Moon' },
  { id: 'eclipse', label: 'Eclipse' },
  { id: 'solar-system', label: 'Solar System' },
  { id: 'saturn', label: 'Saturn' },
  { id: 'sun', label: 'The Sun' },
  { id: 'stars', label: 'Stars' },
  { id: 'milky-way', label: 'Galaxies' },
  { id: 'nebula', label: 'Nebula' },
  { id: 'black-hole', label: 'Black Hole' },
  { id: 'phenomena', label: 'Phenomena' },
  { id: 'missions', label: 'Missions' },
  { id: 'calendar', label: 'Calendar' },
  { id: 'future', label: 'The Future' }
];

export default function CosmicNavigator({
  activeSection,
  onNavigate,
  unlockedCount = 0,
  totalDiscoveries = 12,
  onOpenJournal,
  onOpenChallenges
}) {
  return (
    <header className="fixed top-0 left-0 w-full z-40 px-6 py-5 flex items-center justify-between pointer-events-none">
      {/* Top Left: Logo / Brand */}
      <div className="flex items-center space-x-3 pointer-events-auto cursor-pointer" onClick={() => onNavigate('opening')}>
        <span className="text-xl font-bold tracking-[0.35em] text-white uppercase font-cinzel">COSMOS</span>
        <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
        <span className="hidden sm:inline-block text-xs font-light tracking-widest text-slate-400 uppercase">Observatory</span>
      </div>

      {/* Center: Sleek Glassmorphism Waypoint Rail (Desktop) */}
      <nav className="hidden lg:flex items-center space-x-1 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 pointer-events-auto">
        {SECTIONS.map((sec) => {
          const isActive = activeSection === sec.id;
          return (
            <button
              key={sec.id}
              onClick={() => onNavigate(sec.id)}
              className={`px-3 py-1 text-xs font-medium tracking-wider rounded-full transition-all duration-300 ${
                isActive
                  ? 'bg-white/20 text-white shadow-sm border border-white/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              {sec.label}
            </button>
          );
        })}
      </nav>

      {/* Top Right: Challenges & Cosmic Journal Controls */}
      <div className="flex items-center space-x-3 pointer-events-auto">
        {/* Interactive Challenges Button */}
        <button
          onClick={onOpenChallenges}
          className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-cyan-950/40 hover:bg-cyan-900/60 border border-cyan-500/30 text-cyan-300 text-xs font-medium tracking-wider transition-all duration-300 backdrop-blur-md"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span className="hidden sm:inline">Lab</span>
        </button>

        {/* Cosmic Journal Button */}
        <button
          onClick={onOpenJournal}
          className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-black/40 hover:bg-black/60 border border-white/10 text-white text-xs font-medium tracking-wider transition-all duration-300 backdrop-blur-md"
        >
          <BookOpen className="w-3.5 h-3.5 text-amber-400" />
          <span className="hidden sm:inline">Journal</span>
          <span className="px-1.5 py-0.5 rounded-full bg-white/10 text-[10px] text-slate-300">
            {unlockedCount}/{totalDiscoveries}
          </span>
        </button>
      </div>
    </header>
  );
}
