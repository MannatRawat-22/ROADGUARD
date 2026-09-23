import React from 'react';
import {
  Shield,
  Eye,
  AlertTriangle,
  AlertOctagon,
  Activity,
  PlusCircle,
  Map,
  Bell,
  GitCompare,
  ArrowRight,
  Navigation,
  Flame,
  Radio,
  Clock,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Building2,
} from 'lucide-react';
import { useSafety } from '../../context/SafetyContext';
import { useTacticalAudio } from '../../context/AudioContext';
import { RiskBadge } from '../common/RiskBadge';

export const UserDashboard: React.FC = () => {
  const {
    setCurrentView,
    alerts,
    roadSegments,
    incidents,
    setSelectedRoad,
    triggerSos,
  } = useSafety();

  const audio = useTacticalAudio();
  const unreadAlerts = alerts.filter((a) => !a.isRead);

  const handleAction = (view: any) => {
    audio.playClick();
    setCurrentView(view);
  };

  const highRiskRoads = roadSegments.filter((r) => r.score > 75);
  const riskyRoads = roadSegments.filter((r) => r.score > 50 && r.score <= 75);
  const cautionRoads = roadSegments.filter((r) => r.score > 25 && r.score <= 50);

  return (
    <div className="p-4 lg:p-8 space-y-6 max-w-7xl mx-auto w-full pb-24 md:pb-8">
      {/* Top Welcome Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0B1422] border border-white/[0.08] p-5 rounded-3xl backdrop-blur-md">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-widest text-blue-400">
              SAFETY INTELLIGENCE FEED
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white mt-1">
            Good morning, Driver.
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 font-mono mt-0.5">
            📍 Modinagar, Uttar Pradesh • Real-time telemetry monitoring active
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => handleAction('report')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono font-semibold tracking-wider uppercase border border-blue-400/40 shadow-[0_0_15px_rgba(59,130,246,0.3)] active:scale-95 transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            <span>REPORT HAZARD</span>
          </button>
        </div>
      </div>

      {/* Hero Safety Overview Card */}
      <div className="relative overflow-hidden p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#101A29] via-[#0B1422] to-[#142238] border border-white/[0.1] shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400">
                LOCAL AREA SAFETY
              </span>
              <RiskBadge category="CAUTION" score={46} size="md" />
            </div>

            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white">
              Moderate Risk Index
            </h2>

            <p className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed">
              Your immediate corridor currently has <strong className="text-amber-300 font-semibold">2 reported hazards</strong> and <strong className="text-blue-300 font-semibold">reduced visibility (180 m)</strong> along the NH-58 and GT Road crossing.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => handleAction('routes')}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 text-xs font-mono font-semibold transition-all"
              >
                <GitCompare className="w-4 h-4" />
                <span>FIND SAFER BYPASS ROUTE</span>
              </button>
              <button
                onClick={() => handleAction('map')}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/[0.1] text-xs font-mono font-medium transition-all"
              >
                <Map className="w-4 h-4 text-blue-400" />
                <span>EXPLORE MAP</span>
              </button>
            </div>
          </div>

          {/* Area Score Dial Graphic */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center p-5 rounded-2xl bg-[#070D17]/80 border border-white/[0.08] backdrop-blur-md">
            <div className="relative flex items-center justify-center h-32 w-32">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  className="stroke-slate-800"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="#EAB308"
                  strokeWidth="8"
                  strokeDasharray="251.2"
                  strokeDashoffset={251.2 * (1 - 46 / 100)}
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="font-display font-extrabold text-3xl text-white">46</span>
                <span className="text-[10px] font-mono text-slate-400 uppercase">/ 100</span>
              </div>
            </div>
            <span className="text-xs font-mono text-amber-400 font-bold uppercase mt-2">
              CAUTION LEVEL
            </span>
          </div>
        </div>
      </div>

      {/* 4 Core Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Visibility */}
        <div className="p-4 rounded-2xl bg-[#0B1422] border border-white/[0.08] hover:border-blue-500/40 transition-all">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono uppercase">
            <span>VISIBILITY</span>
            <Eye className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-display font-bold text-white mt-2">
            180 m
          </div>
          <div className="flex items-center gap-1.5 text-xs text-amber-400 font-mono mt-1">
            <span>Low (Dense Fog Ahead)</span>
          </div>
        </div>

        {/* Metric 2: Road Hazards */}
        <div className="p-4 rounded-2xl bg-[#0B1422] border border-white/[0.08] hover:border-orange-500/40 transition-all">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono uppercase">
            <span>ROAD HAZARDS</span>
            <AlertTriangle className="w-4 h-4 text-orange-400" />
          </div>
          <div className="text-2xl font-display font-bold text-white mt-2">
            02 Active
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono mt-1">
            <span>Pothole & Obstruction</span>
          </div>
        </div>

        {/* Metric 3: Active Incidents */}
        <div className="p-4 rounded-2xl bg-[#0B1422] border border-white/[0.08] hover:border-rose-500/40 transition-all">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono uppercase">
            <span>INCIDENTS</span>
            <AlertOctagon className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-2xl font-display font-bold text-white mt-2">
            01 Collision
          </div>
          <div className="flex items-center gap-1.5 text-xs text-rose-400 font-mono mt-1">
            <span>MG Road Junction</span>
          </div>
        </div>

        {/* Metric 4: Road Status */}
        <div className="p-4 rounded-2xl bg-[#0B1422] border border-white/[0.08] hover:border-amber-500/40 transition-all">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono uppercase">
            <span>ROAD STATUS</span>
            <Activity className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-display font-bold text-amber-400 mt-2">
            Caution
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono mt-1">
            <span>Updated 2m ago</span>
          </div>
        </div>
      </div>

      {/* Active Priority Alert Card */}
      {unreadAlerts.length > 0 && (
        <div className="p-5 rounded-3xl bg-gradient-to-r from-amber-950/40 via-[#101A29] to-[#0B1422] border border-amber-500/40 shadow-[0_0_25px_rgba(234,179,8,0.15)] space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2.5">
              <span className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                <AlertTriangle className="w-5 h-5 animate-pulse" />
              </span>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold">
                  HIGH PRIORITY ROAD ADVISORY
                </span>
                <h3 className="font-display font-bold text-lg text-white">
                  {unreadAlerts[0].title}
                </h3>
              </div>
            </div>
            <span className="text-xs font-mono text-slate-400">
              {unreadAlerts[0].timestamp}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            {unreadAlerts[0].message}
          </p>

          <div className="p-3 rounded-xl bg-[#070D17]/80 border border-white/[0.06] text-xs font-mono text-amber-200 flex flex-wrap items-center gap-x-6 gap-y-1">
            <span>• Reduce speed below 35 km/h</span>
            <span>• Maintain greater following distance</span>
            <span>• Use low-beam fog lights</span>
          </div>

          <div className="flex items-center justify-between pt-1">
            <button
              onClick={() => handleAction('map')}
              className="text-xs font-mono font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1.5"
            >
              <span>View On Map</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleAction('alerts')}
              className="text-xs font-mono text-slate-400 hover:text-white"
            >
              View All Alerts ({alerts.length})
            </button>
          </div>
        </div>
      )}

      {/* Nearby Safety Section & Interactive Mini Corridor Selector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Nearby Corridor Danger Counts */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-[#0B1422] border border-white/[0.08] space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-lg text-white">
              Nearby Road Safety Index
            </h3>
            <span className="text-xs font-mono text-slate-400">MODINAGAR SECTOR</span>
          </div>

          <div className="space-y-2.5">
            {roadSegments.map((road) => (
              <div
                key={road.id}
                onClick={() => {
                  audio.playClick();
                  setSelectedRoad(road);
                  setCurrentView('map');
                }}
                className="flex items-center justify-between p-3.5 rounded-2xl bg-[#101A29] hover:bg-[#142238] border border-white/[0.06] cursor-pointer transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: road.color }}
                  />
                  <div>
                    <h4 className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">
                      {road.name}
                    </h4>
                    <p className="text-[11px] text-slate-400 font-mono">
                      {road.hazards} hazards • {road.visibilityText} visibility ({road.visibilityMeters}m)
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <RiskBadge category={road.riskCategory} score={road.score} size="sm" />
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Launchpad Actions */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-[#0B1422] border border-white/[0.08] space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="font-display font-bold text-lg text-white">
              Quick Safety Actions
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Access emergency modules and route intelligence.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 my-2">
            <button
              onClick={() => handleAction('report')}
              className="p-3.5 rounded-2xl bg-[#101A29] hover:bg-[#142238] border border-white/[0.08] text-left transition-all group"
            >
              <PlusCircle className="w-5 h-5 text-blue-400 mb-2 group-hover:scale-110 transition-transform" />
              <div className="text-xs font-mono font-bold text-white">Report Hazard</div>
              <div className="text-[10px] text-slate-400">5-step wizard</div>
            </button>

            <button
              onClick={() => handleAction('map')}
              className="p-3.5 rounded-2xl bg-[#101A29] hover:bg-[#142238] border border-white/[0.08] text-left transition-all group"
            >
              <Map className="w-5 h-5 text-emerald-400 mb-2 group-hover:scale-110 transition-transform" />
              <div className="text-xs font-mono font-bold text-white">Safety Map</div>
              <div className="text-[10px] text-slate-400">Live dark radar</div>
            </button>

            <button
              onClick={() => handleAction('routes')}
              className="p-3.5 rounded-2xl bg-[#101A29] hover:bg-[#142238] border border-white/[0.08] text-left transition-all group"
            >
              <GitCompare className="w-5 h-5 text-amber-400 mb-2 group-hover:scale-110 transition-transform" />
              <div className="text-xs font-mono font-bold text-white">Safer Route</div>
              <div className="text-[10px] text-slate-400">Dual compare</div>
            </button>

            <button
              onClick={() => triggerSos('manual')}
              className="p-3.5 rounded-2xl bg-rose-950/30 hover:bg-rose-900/40 border border-rose-500/40 text-left transition-all group"
            >
              <Flame className="w-5 h-5 text-rose-500 mb-2 animate-pulse group-hover:scale-110 transition-transform" />
              <div className="text-xs font-mono font-bold text-rose-400">Emergency SOS</div>
              <div className="text-[10px] text-rose-300/70">Crash & Alert</div>
            </button>
          </div>

          <div className="p-3 rounded-2xl bg-[#101A29] border border-white/[0.06] flex items-center justify-between text-xs font-mono text-slate-400">
            <span>AI ENGINE STATUS</span>
            <span className="text-emerald-400 font-bold">READY (99.8%)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
