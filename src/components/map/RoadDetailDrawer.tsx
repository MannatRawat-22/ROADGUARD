import React from 'react';
import {
  X,
  AlertTriangle,
  Eye,
  Shield,
  Clock,
  Car,
  CheckCircle,
  TrendingUp,
  ArrowRight,
  ShieldAlert,
  Share2,
} from 'lucide-react';
import { useSafety } from '../../context/SafetyContext';
import { useTacticalAudio } from '../../context/AudioContext';
import { RiskBadge } from '../common/RiskBadge';

export const RoadDetailDrawer: React.FC = () => {
  const {
    selectedRoad,
    setSelectedRoad,
    setCurrentView,
    addToast,
  } = useSafety();

  const audio = useTacticalAudio();

  if (!selectedRoad) return null;

  const { breakdown } = selectedRoad;

  const handleAvoidRoad = () => {
    audio.playAlert();
    addToast({
      title: `Avoidance Alert Set: ${selectedRoad.name}`,
      message: 'Navigation will automatically detour around this high-risk corridor.',
      type: 'warning',
    });
    setSelectedRoad(null);
  };

  const handleFindSaferRoute = () => {
    audio.playClick();
    setSelectedRoad(null);
    setCurrentView('routes');
  };

  return (
    <div className="fixed inset-x-0 bottom-0 md:inset-y-0 md:right-0 md:left-auto md:w-96 z-[600] bg-[#0B1422]/98 backdrop-blur-xl border-t md:border-t-0 md:border-l border-white/[0.12] shadow-[0_-10px_40px_rgba(0,0,0,0.8)] md:shadow-[-10px_0_40px_rgba(0,0,0,0.8)] flex flex-col max-h-[85vh] md:max-h-full overflow-hidden animate-in slide-in-from-bottom md:slide-in-from-right duration-200">
      {/* Drawer Header */}
      <div className="p-4 border-b border-white/[0.08] flex items-center justify-between">
        <div className="flex items-center gap-2">
          {selectedRoad.badge && (
            <span className="px-2 py-0.5 rounded bg-blue-600 font-mono font-bold text-xs text-white shadow-sm">
              {selectedRoad.badge}
            </span>
          )}
          <h3 className="font-display font-bold text-lg text-white truncate max-w-[200px]">
            {selectedRoad.name}
          </h3>
        </div>
        <button
          onClick={() => {
            audio.playClick();
            setSelectedRoad(null);
          }}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors"
          aria-label="Close road details"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Drawer Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        {/* Score Hero */}
        <div className="p-4 rounded-2xl bg-[#101A29] border border-white/[0.08] relative overflow-hidden">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
                TOTAL RISK INDEX
              </span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="font-display font-extrabold text-4xl text-white">
                  {selectedRoad.score}
                </span>
                <span className="text-sm font-mono text-slate-400">/ 100</span>
              </div>
            </div>
            <RiskBadge category={selectedRoad.riskCategory} size="md" />
          </div>

          <p className="text-xs text-slate-300 mt-3 leading-relaxed">
            {selectedRoad.description}
          </p>

          <div className="mt-3 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              Updated {selectedRoad.lastUpdated}
            </span>
            <span className="flex items-center gap-1 text-slate-300">
              <Car className="w-3.5 h-3.5 text-blue-400" />
              {selectedRoad.trafficSpeedKmh} km/h avg flow
            </span>
          </div>
        </div>

        {/* Section 4: Transparent Risk Scoring Engine Breakdown */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-mono font-bold tracking-widest text-slate-300 uppercase flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-blue-400" />
              <span>TRANSPARENT RISK BREAKDOWN</span>
            </h4>
            <span className="text-[10px] font-mono text-slate-400">WEIGHTED ALGO</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#101A29] border border-white/[0.08] space-y-3">
            {/* 1. Accident History (30%) */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-slate-300">Accident History (30% max)</span>
                <span className="font-mono font-bold text-rose-400">
                  {breakdown.accidentHistory} / 30
                </span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-rose-500 rounded-full transition-all duration-500"
                  style={{ width: `${(breakdown.accidentHistory / 30) * 100}%` }}
                />
              </div>
            </div>

            {/* 2. Road Hazards (25%) */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-slate-300">Road Hazards & Cavities (25% max)</span>
                <span className="font-mono font-bold text-orange-400">
                  {breakdown.roadHazards} / 25
                </span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-orange-500 rounded-full transition-all duration-500"
                  style={{ width: `${(breakdown.roadHazards / 25) * 100}%` }}
                />
              </div>
            </div>

            {/* 3. Visibility Conditions (20%) */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-slate-300">Visibility & Fog Sensors (20% max)</span>
                <span className="font-mono font-bold text-amber-400">
                  {breakdown.visibility} / 20
                </span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-amber-400 rounded-full transition-all duration-500"
                  style={{ width: `${(breakdown.visibility / 20) * 100}%` }}
                />
              </div>
            </div>

            {/* 4. Recent Reports (15%) */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-slate-300">Recent Crowd Reports (15% max)</span>
                <span className="font-mono font-bold text-blue-400">
                  {breakdown.recentReports} / 15
                </span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full transition-all duration-500"
                  style={{ width: `${(breakdown.recentReports / 15) * 100}%` }}
                />
              </div>
            </div>

            {/* 5. Report Density (10%) */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-slate-300">Spatial Density Factor (10% max)</span>
                <span className="font-mono font-bold text-purple-400">
                  {breakdown.reportDensity} / 10
                </span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-purple-500 rounded-full transition-all duration-500"
                  style={{ width: `${(breakdown.reportDensity / 10) * 100}%` }}
                />
              </div>
            </div>

            <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono font-bold text-slate-200">
              <span>COMPUTED SCORE:</span>
              <span className="text-white text-sm">
                {breakdown.accidentHistory +
                  breakdown.roadHazards +
                  breakdown.visibility +
                  breakdown.recentReports +
                  breakdown.reportDensity}{' '}
                / 100
              </span>
            </div>
          </div>
        </div>

        {/* Live Segment Metrics Grid */}
        <div className="grid grid-cols-2 gap-2.5">
          <div className="p-3 rounded-xl bg-[#101A29] border border-white/[0.06]">
            <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-mono uppercase">
              <Eye className="w-3 h-3 text-blue-400" />
              <span>VISIBILITY</span>
            </div>
            <div className="text-sm font-display font-bold text-slate-200 mt-1">
              {selectedRoad.visibilityMeters} m ({selectedRoad.visibilityText})
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#101A29] border border-white/[0.06]">
            <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-mono uppercase">
              <AlertTriangle className="w-3 h-3 text-orange-400" />
              <span>ACTIVE HAZARDS</span>
            </div>
            <div className="text-sm font-display font-bold text-slate-200 mt-1">
              {selectedRoad.hazards} Reported
            </div>
          </div>
        </div>
      </div>

      {/* Drawer Footer Actions */}
      <div className="p-4 border-t border-white/[0.08] bg-[#070D17] flex gap-2">
        <button
          onClick={handleAvoidRoad}
          className="flex-1 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono font-medium border border-white/[0.1] active:scale-95 transition-all"
        >
          Avoid This Road
        </button>
        <button
          onClick={handleFindSaferRoute}
          className="flex-1 py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono font-semibold tracking-wide border border-blue-400/40 shadow-[0_0_15px_rgba(59,130,246,0.3)] active:scale-95 transition-all flex items-center justify-center gap-1.5"
        >
          <span>Find Safer Route</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
