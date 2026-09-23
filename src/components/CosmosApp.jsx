// COSMOS - Interactive 3D Space Experience (Ultra-Smooth 60FPS Architecture)
import React, { useState, useEffect, useRef, memo } from 'react';
import Lenis from 'lenis';
import CosmosCanvas from './canvas/CosmosCanvas';
import AudioController from './ui/AudioController';
import CosmicJournal from './ui/CosmicJournal';
import InteractiveChallenges from './ui/InteractiveChallenges';
import {
  ChevronDown,
  Sparkles,
  BookOpen,
  Sliders,
  Globe2,
  Moon
} from 'lucide-react';
import { cosmosAudio } from '../utils/audioSynthesizer';

// Memoized canvas wrapper — prevents ANY re-render when UI state (activeSection,
// isJournalOpen, etc.) changes. The 3D canvas stays mounted and only reads
// from refs, never from React props that change frequently.
const MemoizedCanvas = memo(CosmosCanvas);

export default function CosmosApp() {
  // All values the animation loop reads are REFS, not state.
  // This is the single most important performance decision:
  // refs mutate without triggering React reconciliation.
  const scrollProgressRef = useRef(0);
  const mousePosRef = useRef({ x: 0.5, y: 0.5 });
  const showBulgeRef = useRef(false);   // <-- ref instead of prop, so canvas never re-renders
  const lenisRef = useRef(null);
  // Guards setActiveSection — only fires React setState when section truly changes
  const activeSectionRef = useRef('hero');

  // React state — only for UI rendering, not for animation loop
  const [showBulge, setShowBulge] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isJournalOpen, setIsJournalOpen] = useState(false);
  const [isChallengesOpen, setIsChallengesOpen] = useState(false);
  const [unlockedDiscoveries, setUnlockedDiscoveries] = useState(new Set(['earth-oasis', 'lunar-craters', 'saturn-rings']));

  // Initialize Lenis Smooth Momentum Scroll Engine
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.85
    });

    lenisRef.current = lenis;

    // Single shared RAF loop for Lenis — do NOT add a second RAF loop anywhere
    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    lenis.on('scroll', ({ progress }) => {
      // Update the ref every frame — ZERO React overhead
      scrollProgressRef.current = progress;

      // Section detection is a trivial comparison — no heavy computation
      const sec = progress < 0.20 ? 'hero'
        : progress < 0.45 ? 'earth'
        : progress < 0.70 ? 'moon'
        : progress < 0.88 ? 'facts'
        : 'ending';

      // KEY FIX: Only call setState when the section actually changes.
      // The ref guard prevents React reconciliation on every scroll tick.
      if (sec !== activeSectionRef.current) {
        activeSectionRef.current = sec;
        setActiveSection(sec);
      }
    });

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  // Mouse move listener with lerped values
  useEffect(() => {
    const handleMouseMove = (e) => {
      mousePosRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      };
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToSection = (progressTarget) => {
    cosmosAudio.playChime(680, 0.08);
    if (lenisRef.current) {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      lenisRef.current.scrollTo(progressTarget * maxScroll, { duration: 1.6 });
    }
  };

  const unlockDiscovery = (id) => {
    setUnlockedDiscoveries(prev => new Set(prev).add(id));
  };

  return (
    <div className="relative bg-[#030508] text-white selection:bg-cyan-500/30 font-outfit min-h-screen">
      {/*
        ============================================================
        DIAGNOSTIC TEST — Three.js canvas temporarily disabled.
        Replace the block below with <MemoizedCanvas .../> to restore.
        ============================================================
        <MemoizedCanvas
          scrollProgressRef={scrollProgressRef}
          mousePosRef={mousePosRef}
          showBulgeRef={showBulgeRef}
        />
      */}
      {/* PLACEHOLDER: zero-cost CSS background, no WebGL, no RAF */}
      <div style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100vw', height: '100vh',
        zIndex: 0,
        background: 'radial-gradient(ellipse at 50% 40%, rgba(15,23,42,0.55) 0%, #030508 70%)',
        pointerEvents: 'none'
      }} />

      {/* 2. Sleek Floating Header HUD */}
      <header className="fixed top-0 left-0 w-full z-40 px-6 sm:px-10 py-6 flex items-center justify-between pointer-events-none">
        <div
          className="flex items-center space-x-3 pointer-events-auto cursor-pointer group"
          onClick={() => scrollToSection(0)}
        >
          <span className="text-lg font-bold tracking-[0.4em] text-white uppercase font-cinzel opacity-90 group-hover:text-cyan-300 transition-colors">
            COSMOS
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
          <span className="text-[10px] font-light tracking-widest text-slate-500 uppercase hidden sm:inline">
            Observatory
          </span>
        </div>

        {/* Minimal Nav Pills */}
        <div className="flex items-center space-x-2 sm:space-x-3 pointer-events-auto">
          <button
            onClick={() => scrollToSection(0.28)}
            className={`px-3 py-1 text-xs rounded-full border transition-all duration-300 ${
              activeSection === 'earth'
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40'
                : 'bg-black/30 text-slate-400 border-white/10 hover:text-white hover:bg-black/50'
            }`}
          >
            Earth
          </button>
          <button
            onClick={() => scrollToSection(0.55)}
            className={`px-3 py-1 text-xs rounded-full border transition-all duration-300 ${
              activeSection === 'moon'
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40'
                : 'bg-black/30 text-slate-400 border-white/10 hover:text-white hover:bg-black/50'
            }`}
          >
            Moon
          </button>
          <button
            onClick={() => scrollToSection(0.78)}
            className={`px-3 py-1 text-xs rounded-full border transition-all duration-300 ${
              activeSection === 'facts'
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40'
                : 'bg-black/30 text-slate-400 border-white/10 hover:text-white hover:bg-black/50'
            }`}
          >
            Curiosities
          </button>

          {/* Interactive Lab Button */}
          <button
            onClick={() => setIsChallengesOpen(true)}
            className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-cyan-950/50 hover:bg-cyan-900/60 border border-cyan-500/30 text-cyan-300 text-xs font-medium tracking-wider transition-all duration-300 backdrop-blur-md"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Lab</span>
          </button>

          {/* Journal Button */}
          <button
            onClick={() => setIsJournalOpen(true)}
            className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-black/40 hover:bg-black/60 border border-white/10 text-white text-xs font-medium tracking-wider transition-all duration-300 backdrop-blur-md"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Journal</span>
          </button>
        </div>
      </header>

      {/* Floating Audio Controller */}
      <AudioController />

      {/* Modals */}
      <CosmicJournal
        isOpen={isJournalOpen}
        onClose={() => setIsJournalOpen(false)}
        unlockedDiscoveries={unlockedDiscoveries}
      />
      <InteractiveChallenges
        isOpen={isChallengesOpen}
        onClose={() => setIsChallengesOpen(false)}
        onUnlockDiscovery={unlockDiscovery}
      />

      {/* 3. SCROLL-DRIVEN DOM SECTIONS OVERLAY */}
      <main className="relative z-10 pointer-events-none">
        
        {/* =========================================================
            SECTION 1: HERO (0 - 100vh)
            ========================================================= */}
        <section className="min-h-screen flex flex-col items-center justify-between text-center px-6 py-28">
          <div className="pt-20 max-w-xl mx-auto space-y-4">
            <span className="text-[11px] font-semibold tracking-[0.4em] uppercase text-cyan-400 block">
              Interactive 3D Universe
            </span>
            <h1 className="text-5xl sm:text-7xl font-bold tracking-[0.4em] uppercase text-white font-cinzel opacity-95 drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
              COSMOS
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 font-light tracking-[0.3em] uppercase">
              Explore The Universe
            </p>
          </div>

          <div
            onClick={() => scrollToSection(0.28)}
            className="flex flex-col items-center space-y-2.5 pb-6 pointer-events-auto cursor-pointer opacity-70 hover:opacity-100 transition-opacity"
          >
            <span className="text-[10px] font-light tracking-[0.35em] uppercase text-slate-400">
              Scroll to Explore
            </span>
            <ChevronDown className="w-4 h-4 text-cyan-400 animate-bounce" />
          </div>
        </section>

        {/* =========================================================
            SECTION 2: EARTH DISCOVERY (100vh - 200vh)
            Earth glides to right flank; Staggered cards on left
            ========================================================= */}
        <section className="min-h-screen flex items-center px-6 sm:px-16 py-20">
          <div className="max-w-md pointer-events-auto space-y-4 p-7 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl transition-all duration-500 hover:border-cyan-500/30">
            <div className="flex items-center space-x-2 text-cyan-400 text-xs font-semibold tracking-widest uppercase">
              <Globe2 className="w-4 h-4" />
              <span>1.00 AU • Terrestrial Oasis</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-bold tracking-widest uppercase font-cinzel text-white">
              Planet Earth
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
              Third stone from the Sun. Liquid water covers 71% of the crust, shielded by a protective geomagnetic field. As Earth rotates, atmospheric Rayleigh scattering casts a glowing halo along the twilight terminator.
            </p>

            {/* Micro-Interaction Cards */}
            <div className="grid grid-cols-2 gap-2.5 pt-2">
              <div className="p-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/20 transition-all">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Atmosphere</span>
                <span className="text-xs text-cyan-300 font-medium">78% N₂ • 21% O₂</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/20 transition-all">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Orbital Velocity</span>
                <span className="text-xs text-cyan-300 font-medium">29.78 km/s</span>
              </div>
            </div>

            <button
              onClick={() => {
                // Toggle both: the ref (read by Three.js) and state (updates button label)
                // The canvas does NOT re-render — it reads showBulgeRef.current each frame
                const next = !showBulgeRef.current;
                showBulgeRef.current = next;
                setShowBulge(next);
                cosmosAudio.playChime(620, 0.08);
              }}
              className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-400/30 text-cyan-300 text-xs font-medium tracking-wider uppercase transition-all duration-300"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>{showBulge ? 'Reset Geometry' : 'Exaggerate Equator Bulge (+43 km)'}</span>
            </button>
          </div>
        </section>

        {/* =========================================================
            SECTION 3: MOON & LUNAR EXPLORER (200vh - 300vh)
            Earth recedes; Moon glides to left flank; Cards on right
            ========================================================= */}
        <section className="min-h-screen flex items-center justify-end px-6 sm:px-16 py-20">
          <div className="max-w-md pointer-events-auto space-y-4 p-7 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl transition-all duration-500 hover:border-amber-500/30">
            <div className="flex items-center space-x-2 text-amber-400 text-xs font-semibold tracking-widest uppercase">
              <Moon className="w-4 h-4" />
              <span>384,400 km • Lunar Body</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold tracking-widest uppercase font-cinzel text-white">
              The Moon
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
              Tidally locked with Earth, Luna presents a cratered regolith face punctuated by ancient volcanic basaltic plains (*Maria*). Directional sunlight sculpts razor-sharp shadows across the peaks of Tycho and Copernicus.
            </p>

            <div className="grid grid-cols-2 gap-2.5 pt-2">
              <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Orbital Period</span>
                <span className="text-xs text-amber-300 font-medium">27.3 Earth Days</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Surface Gravity</span>
                <span className="text-xs text-amber-300 font-medium">1.62 m/s² (0.16g)</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-500/20 text-xs text-slate-300 font-light flex items-center justify-between">
              <span>Synodic Phase Cycle:</span>
              <span className="text-amber-400 font-semibold uppercase font-cinzel">Waxing Gibbous</span>
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 4: COSMIC FACTS & CURIOSITIES (300vh - 400vh)
            Interactive staggered curiosity cards with hover lifts
            ========================================================= */}
        <section className="min-h-screen flex flex-col justify-center px-6 sm:px-16 py-20 max-w-5xl mx-auto">
          <div className="text-center mb-10 pointer-events-auto">
            <span className="text-[11px] font-semibold tracking-[0.35em] uppercase text-cyan-400 block mb-2">
              Astrophysical Wonders
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-widest uppercase font-cinzel text-white">
              Cosmic Curiosities
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 font-light max-w-md mx-auto mt-2">
              Remarkable phenomena and principles governing the observable universe.
            </p>
          </div>

          {/* Staggered Interactive Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pointer-events-auto">
            {[
              {
                title: 'Venusian Days',
                fact: 'A single day on Venus (from sunrise to sunrise) lasts 117 Earth days, and its rotational period is longer than its orbital year.',
                tag: 'Orbital Mechanics',
                color: 'text-amber-400'
              },
              {
                title: 'Buoyancy of Saturn',
                fact: 'Saturn’s average density (0.687 g/cm³) is lower than liquid water. Placed in a cosmic ocean, Saturn would float.',
                tag: 'Planetary Density',
                color: 'text-cyan-400'
              },
              {
                title: 'Looking Into The Past',
                fact: 'Photons from the Andromeda Galaxy take 2.5 million years to reach our eyes. Looking farther into space means looking farther back in time.',
                tag: 'Speed of Light',
                color: 'text-indigo-400'
              },
              {
                title: 'Millisecond Pulsars',
                fact: 'A collapsed neutron star with 1.5 times the mass of our Sun packed into a 20 km sphere can spin up to 43,000 rotations per minute.',
                tag: 'Stellar Corpses',
                color: 'text-rose-400'
              }
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 hover:border-cyan-500/40 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-950/20 transition-all duration-300 space-y-2 group cursor-default"
              >
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-semibold tracking-wider uppercase font-cinzel ${item.color}`}>
                    {item.title}
                  </span>
                  <span className="text-[10px] tracking-widest uppercase px-2 py-0.5 rounded-full bg-white/5 text-slate-400">
                    {item.tag}
                  </span>
                </div>
                <p className="text-xs text-slate-300 font-light leading-relaxed">
                  {item.fact}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================
            SECTION 5: QUIET CINEMATIC CREATOR CREDIT (400vh - 500vh)
            3D objects retreat into deep tranquil space; Signature
            ========================================================= */}
        <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 py-24">
          <div className="max-w-xl mx-auto space-y-6 pointer-events-auto animate-fade-in">
            <h2 className="text-4xl sm:text-6xl font-bold tracking-[0.45em] uppercase text-white font-cinzel opacity-90 drop-shadow-2xl">
              COSMOS
            </h2>

            <p className="text-xs sm:text-sm text-slate-400 font-light tracking-[0.3em] italic">
              The universe is still waiting to be discovered.
            </p>

            <div className="w-8 h-[1px] bg-white/20 mx-auto my-6" />

            <div className="pt-2 opacity-80 transition-opacity">
              <span className="text-[11px] sm:text-xs font-light tracking-[0.35em] uppercase text-slate-400 block font-cinzel">
                Made by Mannat
              </span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
