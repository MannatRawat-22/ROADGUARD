// Interactive Science Challenges & Celestial Physics Lab
import React, { useState } from 'react';
import { X, Trophy, CheckCircle2, RotateCcw, Play, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { cosmosAudio } from '../../utils/audioSynthesizer';

export default function InteractiveChallenges({
  isOpen,
  onClose,
  onUnlockDiscovery = null
}) {
  const [activeTab, setActiveTab] = useState('eclipse'); // eclipse, polaris, orbit, phase

  // Challenge 1: Align the Eclipse
  const [eclipseAngle, setEclipseAngle] = useState(0.65);
  const [eclipseSolved, setEclipseSolved] = useState(false);

  // Challenge 2: Find Polaris
  const [selectedStar, setSelectedStar] = useState(null);
  const [polarisSolved, setPolarisSolved] = useState(false);

  // Challenge 3: Orbit Mars
  const [velocity, setVelocity] = useState(18);
  const [orbitSolved, setOrbitSolved] = useState(false);

  // Challenge 4: Moon Phase Matcher
  const [phaseAngle, setPhaseAngle] = useState(45);
  const [phaseSolved, setPhaseSolved] = useState(false);

  if (!isOpen) return null;

  const triggerSuccess = (discoveryId) => {
    confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 } });
    cosmosAudio.playDiscoverySound();
    if (onUnlockDiscovery) onUnlockDiscovery(discoveryId);
  };

  const handleEclipseCheck = (val) => {
    setEclipseAngle(val);
    if (Math.abs(val) < 0.05 && !eclipseSolved) {
      setEclipseSolved(true);
      triggerSuccess('solar-totality');
    }
  };

  const handlePolarisCheck = (starName) => {
    setSelectedStar(starName);
    if (starName === 'Polaris' && !polarisSolved) {
      setPolarisSolved(true);
      triggerSuccess('polaris-guide');
    }
  };

  const handleOrbitCheck = () => {
    // Ideal circular orbital velocity for given radius: ~24.1 km/s
    if (velocity >= 23.5 && velocity <= 24.8 && !orbitSolved) {
      setOrbitSolved(true);
      triggerSuccess('interstellar-voyage');
    }
  };

  const handlePhaseCheck = (val) => {
    setPhaseAngle(val);
    // Target: First Quarter (90 degrees)
    if (Math.abs(val - 90) < 6 && !phaseSolved) {
      setPhaseSolved(true);
      triggerSuccess('lunar-craters');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md pointer-events-auto">
      <div className="relative w-full max-w-2xl bg-slate-950/95 border border-white/10 rounded-2xl p-6 sm:p-8 text-white shadow-2xl flex flex-col max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div>
            <span className="text-[10px] font-semibold tracking-[0.3em] uppercase text-cyan-400">Astrophysics Lab</span>
            <h2 className="text-xl font-bold tracking-wider uppercase font-cinzel text-white">Interactive Science Challenges</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Experiment Navigation Tabs */}
        <div className="flex flex-wrap gap-2 my-5">
          {[
            { id: 'eclipse', label: '1. Align Totality', solved: eclipseSolved },
            { id: 'polaris', label: '2. Find Polaris', solved: polarisSolved },
            { id: 'orbit', label: '3. Orbit Insertion', solved: orbitSolved },
            { id: 'phase', label: '4. Lunar Syzygy', solved: phaseSolved }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wider transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40'
                  : 'bg-white/5 text-slate-400 border border-white/5 hover:text-white'
              }`}
            >
              <span>{tab.label}</span>
              {tab.solved && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
            </button>
          ))}
        </div>

        {/* Challenge 1: Align the Eclipse */}
        {activeTab === 'eclipse' && (
          <div className="p-5 rounded-xl bg-white/5 border border-white/10 space-y-4">
            <h3 className="text-base font-semibold text-white font-cinzel">Experiment: Perfect Solar Syzygy</h3>
            <p className="text-xs text-slate-300 font-light leading-relaxed">
              Adjust the Moon’s orbital position relative to Earth’s line of sight until the Moon completely eclipses the solar photosphere to achieve 100% Totality and reveal the solar corona.
            </p>

            <div className="pt-3">
              <div className="flex justify-between text-xs text-slate-400 mb-2">
                <span>Alignment Offset: {eclipseAngle.toFixed(2)} AU</span>
                <span className={eclipseSolved ? 'text-emerald-400 font-semibold' : 'text-amber-400'}>
                  {eclipseSolved ? 'Totality Achieved!' : 'Partial Alignment'}
                </span>
              </div>
              <input
                type="range"
                min="-1"
                max="1"
                step="0.01"
                value={eclipseAngle}
                onChange={(e) => handleEclipseCheck(parseFloat(e.target.value))}
                className="w-full accent-cyan-400"
              />
            </div>
          </div>
        )}

        {/* Challenge 2: Find Polaris */}
        {activeTab === 'polaris' && (
          <div className="p-5 rounded-xl bg-white/5 border border-white/10 space-y-4">
            <h3 className="text-base font-semibold text-white font-cinzel">Experiment: Celestial Navigation</h3>
            <p className="text-xs text-slate-300 font-light leading-relaxed">
              Use the pointer stars (Merak and Dubhe) of the Big Dipper to trace a straight line northward and identify Polaris (the North Star).
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
              {['Dubhe', 'Merak', 'Polaris', 'Alioth', 'Vega', 'Betelgeuse', 'Sirius', 'Rigel'].map((star) => (
                <button
                  key={star}
                  onClick={() => handlePolarisCheck(star)}
                  className={`p-3 rounded-lg border text-xs font-medium transition-all ${
                    selectedStar === star
                      ? (star === 'Polaris'
                          ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300'
                          : 'bg-rose-950/60 border-rose-500 text-rose-300')
                      : 'bg-black/40 border-white/10 hover:border-white/30 text-slate-300'
                  }`}
                >
                  {star}
                </button>
              ))}
            </div>
            {polarisSolved && (
              <p className="text-xs text-emerald-400 pt-2 font-medium">
                Correct! Polaris is locked as your northern celestial axis point.
              </p>
            )}
          </div>
        )}

        {/* Challenge 3: Orbit Mars */}
        {activeTab === 'orbit' && (
          <div className="p-5 rounded-xl bg-white/5 border border-white/10 space-y-4">
            <h3 className="text-base font-semibold text-white font-cinzel">Experiment: Orbital Velocity Insertion</h3>
            <p className="text-xs text-slate-300 font-light leading-relaxed">
              Calculate and apply the precise spacecraft insertion velocity ($\Delta v$) needed to circularize orbit without burning in the upper atmosphere or escaping on a hyperbolic trajectory.
            </p>

            <div className="pt-3 space-y-3">
              <div className="flex justify-between text-xs text-slate-400">
                <span>Spacecraft Velocity: {velocity} km/s</span>
                <span>Target: 24.1 km/s</span>
              </div>
              <input
                type="range"
                min="10"
                max="35"
                step="0.5"
                value={velocity}
                onChange={(e) => setVelocity(parseFloat(e.target.value))}
                className="w-full accent-cyan-400"
              />
              <button
                onClick={handleOrbitCheck}
                className="w-full py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold tracking-wider uppercase transition-colors"
              >
                Execute Orbit Insertion Burn
              </button>
              {orbitSolved && (
                <p className="text-xs text-emerald-400 text-center font-medium">
                  Stable circular orbit achieved! Mars orbital telemetry confirmed.
                </p>
              )}
            </div>
          </div>
        )}

        {/* Challenge 4: Moon Phase Matcher */}
        {activeTab === 'phase' && (
          <div className="p-5 rounded-xl bg-white/5 border border-white/10 space-y-4">
            <h3 className="text-base font-semibold text-white font-cinzel">Experiment: Lunar Phase Geometry</h3>
            <p className="text-xs text-slate-300 font-light leading-relaxed">
              Rotate the Moon’s orbital position relative to the Sun to create a <strong>First Quarter (50% Illumination)</strong> phase.
            </p>

            <div className="pt-3 space-y-3">
              <div className="flex justify-between text-xs text-slate-400">
                <span>Phase Angle: {phaseAngle}°</span>
                <span className={phaseSolved ? 'text-emerald-400' : 'text-amber-400'}>
                  {phaseSolved ? 'Target Match: First Quarter!' : 'Adjust Angle'}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="360"
                step="1"
                value={phaseAngle}
                onChange={(e) => handlePhaseCheck(parseInt(e.target.value, 10))}
                className="w-full accent-cyan-400"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
