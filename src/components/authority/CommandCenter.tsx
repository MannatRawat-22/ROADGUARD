import React from 'react';
import {
  Building2,
  ShieldAlert,
  AlertTriangle,
  Radio,
  Eye,
  Send,
  Map,
  CheckCircle2,
  Car,
  Activity,
  FlameKindling,
  Users,
} from 'lucide-react';
import { useSafety } from '../../context/SafetyContext';
import { useTacticalAudio } from '../../context/AudioContext';
import { IncidentTable } from './IncidentTable';

export const CommandCenter: React.FC = () => {
  const { setCurrentView, incidents, alerts, roadSegments } = useSafety();
  const audio = useTacticalAudio();

  const pendingCount = incidents.filter((i) => i.status === 'pending').length;
  const verifiedCount = incidents.filter((i) => i.status === 'verified').length;
  const highRiskRoadCount = roadSegments.filter((r) => r.score > 75).length;

  return (
    <div className="p-4 lg:p-8 space-y-6 max-w-7xl mx-auto w-full pb-24 md:pb-8">
      {/* Ops Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-indigo-950/60 via-[#0B1422] to-[#101A29] border border-indigo-500/30 p-6 rounded-3xl backdrop-blur-md shadow-2xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-widest text-indigo-400 font-bold">
              MODINAGAR TRAFFIC & EMERGENCY COMMAND
            </span>
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white mt-1">
            Authority Command Operations
          </h1>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            Palantir-grade situational awareness, sensor stream fusion, and rapid unit dispatch
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              audio.playClick();
              setCurrentView('map');
            }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-mono font-semibold tracking-wider uppercase border border-indigo-400/40 shadow-[0_0_20px_rgba(99,102,241,0.4)] active:scale-95 transition-all"
          >
            <Map className="w-4 h-4" />
            <span>OPERATIONAL MAP</span>
          </button>
        </div>
      </div>

      {/* Top 5 Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Metric 1: Active Alerts */}
        <div className="p-4 rounded-2xl bg-[#0B1422] border border-white/[0.08] space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-[10px] font-mono uppercase">
            <span>ACTIVE ALERTS</span>
            <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
          </div>
          <div className="text-2xl font-display font-extrabold text-rose-400">
            04
          </div>
          <p className="text-[10px] text-slate-500 font-mono">1 Critical Collision</p>
        </div>

        {/* Metric 2: High Risk Areas */}
        <div className="p-4 rounded-2xl bg-[#0B1422] border border-white/[0.08] space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-[10px] font-mono uppercase">
            <span>HIGH-RISK AREAS</span>
            <ShieldAlert className="w-3.5 h-3.5 text-orange-400" />
          </div>
          <div className="text-2xl font-display font-extrabold text-orange-400">
            02
          </div>
          <p className="text-[10px] text-slate-500 font-mono">MG Rd & Main Chowk</p>
        </div>

        {/* Metric 3: New Reports */}
        <div className="p-4 rounded-2xl bg-[#0B1422] border border-white/[0.08] space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-[10px] font-mono uppercase">
            <span>NEW REPORTS</span>
            <Radio className="w-3.5 h-3.5 text-blue-400" />
          </div>
          <div className="text-2xl font-display font-extrabold text-blue-400">
            17
          </div>
          <p className="text-[10px] text-slate-500 font-mono">Last 2 hours</p>
        </div>

        {/* Metric 4: Pending Verification */}
        <div className="p-4 rounded-2xl bg-[#0B1422] border border-white/[0.08] space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-[10px] font-mono uppercase">
            <span>PENDING REVIEW</span>
            <Activity className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="text-2xl font-display font-extrabold text-amber-400">
            05
          </div>
          <p className="text-[10px] text-slate-500 font-mono">Queue triage active</p>
        </div>

        {/* Metric 5: Resolved Incidents */}
        <div className="p-4 rounded-2xl bg-[#0B1422] border border-white/[0.08] space-y-1 col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between text-slate-400 text-[10px] font-mono uppercase">
            <span>RESOLVED RATE</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="text-2xl font-display font-extrabold text-emerald-400">
            84%
          </div>
          <p className="text-[10px] text-slate-500 font-mono">Avg response 12m</p>
        </div>
      </div>

      {/* Main Incident Triage Table Component */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-display font-bold text-white flex items-center gap-2">
            <span>Live Incident Ledger & Triage Stream</span>
            <span className="text-xs font-mono text-indigo-400 px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/30">
              {incidents.length} RECORDS
            </span>
          </h2>
        </div>
        <IncidentTable />
      </div>

      {/* Active Patrol Fleet Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        <div className="p-4 rounded-2xl bg-[#0B1422] border border-white/[0.08] space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-white font-bold flex items-center gap-1.5">
              <Car className="w-4 h-4 text-emerald-400" />
              Patrol Car #04
            </span>
            <span className="text-emerald-400 font-bold">ON SCENE</span>
          </div>
          <p className="text-xs text-slate-400">
            MG Road Junction Collision • Traffic diversion established.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-[#0B1422] border border-white/[0.08] space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-white font-bold flex items-center gap-1.5">
              <Car className="w-4 h-4 text-blue-400" />
              NHAI Response Van #2
            </span>
            <span className="text-blue-400 font-bold">DISPATCHED</span>
          </div>
          <p className="text-xs text-slate-400">
            NH-58 Pothole Cavity • Asphalt patching team en route (ETA 6m).
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-[#0B1422] border border-white/[0.08] space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-white font-bold flex items-center gap-1.5">
              <Car className="w-4 h-4 text-slate-400" />
              Patrol Car #07
            </span>
            <span className="text-slate-400 font-bold">STANDBY</span>
          </div>
          <p className="text-xs text-slate-400">
            Main Chowk Station • Ready for immediate deployment.
          </p>
        </div>
      </div>
    </div>
  );
};
