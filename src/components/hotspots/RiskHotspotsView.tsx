import React, { useState } from 'react';
import {
  FlameKindling,
  TrendingUp,
  TrendingDown,
  Clock,
  AlertTriangle,
  Eye,
  Shield,
  MapPin,
  Sparkles,
  ArrowRight,
  Layers,
  Activity,
} from 'lucide-react';
import { useSafety } from '../../context/SafetyContext';
import { useTacticalAudio } from '../../context/AudioContext';
import { RiskBadge } from '../common/RiskBadge';
import { Hotspot } from '../../types';

export const RiskHotspotsView: React.FC = () => {
  const { hotspots, setCurrentView, setSelectedRoad, roadSegments } = useSafety();
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot>(hotspots[0]);
  const audio = useTacticalAudio();

  const handleSelectHotspot = (hs: Hotspot) => {
    audio.playClick();
    setSelectedHotspot(hs);
  };

  const handleInspectOnMap = () => {
    audio.playClick();
    setCurrentView('map');
  };

  return (
    <div className="p-4 lg:p-8 space-y-6 max-w-7xl mx-auto w-full pb-24 md:pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0B1422] border border-white/[0.08] p-5 rounded-3xl backdrop-blur-md">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-widest text-purple-400 font-bold">
              SPATIAL RISK DENSITY INTELLIGENCE
            </span>
            <span className="h-2 w-2 rounded-full bg-purple-400 animate-ping" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white mt-1">
            Historical Risk Hotspots
          </h1>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            30-day recurring incident clustering, accident causation analysis, and AI preventative interventions
          </p>
        </div>

        <button
          onClick={handleInspectOnMap}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-mono font-semibold tracking-wider uppercase border border-purple-400/40 shadow-[0_0_20px_rgba(168,85,247,0.3)] active:scale-95 transition-all"
        >
          <FlameKindling className="w-4 h-4" />
          <span>VIEW HEATMAP ON MAP</span>
        </button>
      </div>

      {/* Main Grid: Hotspot Ranking List & Selected Hotspot Deep-Dive */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Hotspot Leaderboard */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-mono uppercase tracking-widest text-slate-400 px-1">
            CRITICAL INCIDENT HOTSPOT CLUSTERS
          </div>

          <div className="space-y-3">
            {hotspots.map((hs, index) => {
              const isSelected = selectedHotspot.id === hs.id;
              return (
                <div
                  key={hs.id}
                  onClick={() => handleSelectHotspot(hs)}
                  className={`p-4 rounded-3xl border cursor-pointer transition-all duration-200 ${
                    isSelected
                      ? 'bg-purple-950/30 border-purple-500 shadow-[0_0_25px_rgba(168,85,247,0.2)]'
                      : 'bg-[#0B1422] border-white/[0.08] hover:border-white/[0.2]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-slate-800 font-mono text-xs font-bold text-slate-300">
                        0{index + 1}
                      </span>
                      <div>
                        <h4 className="font-display font-bold text-white text-base">
                          {hs.name}
                        </h4>
                        <span className="text-[11px] font-mono text-slate-400">
                          {hs.totalIncidents} Total Incidents (30d)
                        </span>
                      </div>
                    </div>
                    <RiskBadge category={hs.riskCategory} score={hs.score} size="sm" />
                  </div>

                  {/* Micro telemetry footer */}
                  <div className="mt-3 pt-2.5 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span>Peak: {hs.peakHours.split('&')[0]}</span>
                    <span className="flex items-center gap-1 text-purple-300">
                      {hs.trend === 'increasing' ? (
                        <TrendingUp className="w-3.5 h-3.5 text-rose-400" />
                      ) : (
                        <TrendingDown className="w-3.5 h-3.5 text-emerald-400" />
                      )}
                      {hs.trend.toUpperCase()}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Deep-Dive Hotspot Intelligence Dossier */}
        <div className="lg:col-span-7">
          <div className="p-6 rounded-3xl bg-[#0B1422] border border-white/[0.1] shadow-2xl space-y-6">
            {/* Dossier Header */}
            <div className="flex flex-wrap items-start justify-between gap-3 pb-4 border-b border-white/[0.08]">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-purple-400 font-bold">
                    HOTSPOT DOSSIER
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    ID: #{selectedHotspot.id.toUpperCase()}
                  </span>
                </div>
                <h3 className="text-2xl font-display font-extrabold text-white mt-1">
                  {selectedHotspot.name}
                </h3>
              </div>
              <RiskBadge
                category={selectedHotspot.riskCategory}
                score={selectedHotspot.score}
                size="lg"
              />
            </div>

            {/* 30-Day Breakdown Telemetry */}
            <div>
              <span className="text-xs font-mono text-slate-400 uppercase tracking-widest block mb-3">
                30-DAY REPORT DISTRIBUTION
              </span>
              <div className="grid grid-cols-3 gap-3 text-center font-mono">
                <div className="p-3.5 rounded-2xl bg-[#101A29] border border-white/[0.06]">
                  <div className="text-[10px] text-rose-400 font-bold">ACCIDENTS</div>
                  <div className="text-2xl font-display font-extrabold text-white mt-1">
                    {selectedHotspot.accidentReports30d}
                  </div>
                  <div className="text-[10px] text-slate-500">Verified impacts</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#101A29] border border-white/[0.06]">
                  <div className="text-[10px] text-orange-400 font-bold">HAZARDS</div>
                  <div className="text-2xl font-display font-extrabold text-white mt-1">
                    {selectedHotspot.hazardReports30d}
                  </div>
                  <div className="text-[10px] text-slate-500">Potholes & debris</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#101A29] border border-white/[0.06]">
                  <div className="text-[10px] text-amber-400 font-bold">LOW VISIBILITY</div>
                  <div className="text-2xl font-display font-extrabold text-white mt-1">
                    {selectedHotspot.visibilityReports30d}
                  </div>
                  <div className="text-[10px] text-slate-500">Fog alerts</div>
                </div>
              </div>
            </div>

            {/* Primary Causation Factor */}
            <div className="p-4 rounded-2xl bg-[#101A29] border border-white/[0.06] space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-amber-400 uppercase">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>PRIMARY CAUSATION FACTOR</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed font-sans">
                {selectedHotspot.primaryFactor}
              </p>
              <div className="text-[11px] font-mono text-slate-400 pt-1">
                Peak Risk Window: <strong className="text-slate-200">{selectedHotspot.peakHours}</strong>
              </div>
            </div>

            {/* AI Preventative Insight Box */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-950/40 to-[#101A29] border border-purple-500/30 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-purple-300 uppercase">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span>AI SAFETY INTERVENTION RECOMMENDATION</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed font-sans">
                {selectedHotspot.aiInsight}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-[11px] font-mono text-slate-400">
                Data refreshed with 30-day municipal police archives
              </span>
              <button
                onClick={handleInspectOnMap}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-lg"
              >
                <span>Inspect Sector Map</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
