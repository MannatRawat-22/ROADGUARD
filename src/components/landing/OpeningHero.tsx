import React from 'react';
import {
  Shield,
  Radio,
  ArrowRight,
  Eye,
  CheckCircle2,
  AlertTriangle,
  Send,
  Navigation,
  Activity,
  Layers,
  Sparkles,
  Building2,
  ChevronRight,
  TrendingDown,
  Lock,
} from 'lucide-react';
import { useSafety } from '../../context/SafetyContext';
import { useTacticalAudio } from '../../context/AudioContext';
import { RiskBadge } from '../common/RiskBadge';

export const OpeningHero: React.FC = () => {
  const { setCurrentView, setUserRole } = useSafety();
  const audio = useTacticalAudio();

  const handleEnterCitizen = () => {
    audio.playClick();
    setUserRole('citizen');
    setCurrentView('dashboard');
  };

  const handleEnterAuthority = () => {
    audio.playClick();
    setUserRole('authority');
    setCurrentView('authority');
  };

  const flowSteps = [
    { step: '01', title: 'DETECT', desc: 'AI Vision & Sensor Feeds', icon: Eye, color: 'text-blue-400' },
    { step: '02', title: 'VERIFY', desc: 'Crowdsourced & Police Triage', icon: CheckCircle2, color: 'text-emerald-400' },
    { step: '03', title: 'WARN', desc: 'Proximity Geo-Fencing', icon: AlertTriangle, color: 'text-amber-400' },
    { step: '04', title: 'RESPOND', desc: 'Patrol & Emergency Dispatch', icon: Send, color: 'text-rose-400' },
  ];

  return (
    <div className="relative min-h-[calc(100vh-4rem)] bg-[#070D17] tactical-grid-bg flex flex-col justify-between overflow-hidden px-4 lg:px-8 py-8 md:py-12">
      {/* Background Animated Gradient Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-20 right-10 w-[350px] h-[350px] bg-rose-600/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Top Telemetry Header */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-900 border border-blue-400/40 shadow-[0_0_20px_rgba(59,130,246,0.35)]">
            <Shield className="w-6 h-6 text-white" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-2xl tracking-tight text-white">
                ROADGUARD
              </span>
              <span className="text-[10px] font-mono uppercase bg-blue-500/15 border border-blue-500/40 text-blue-300 px-2 py-0.5 rounded-full font-semibold">
                PLATFORM 2.4
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono tracking-wider">
              Safety Intelligence & Emergency Command
            </p>
          </div>
        </div>

        {/* Live Pulse Metrics Bar */}
        <div className="flex items-center gap-3 bg-[#101A29]/90 border border-white/[0.08] backdrop-blur-md px-4 py-2 rounded-2xl">
          <div className="flex items-center gap-2 pr-3 border-r border-white/[0.08]">
            <span className="text-[10px] font-mono text-slate-400 uppercase">RISK SCORE</span>
            <span className="font-display font-bold text-base text-amber-400">46/100</span>
          </div>
          <div className="flex items-center gap-2 pr-3 border-r border-white/[0.08]">
            <span className="text-[10px] font-mono text-slate-400 uppercase">ACTIVE ALERTS</span>
            <span className="font-display font-bold text-base text-rose-400">04</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-slate-400 uppercase">VISIBILITY</span>
            <span className="font-display font-bold text-base text-blue-400">180 m</span>
          </div>
        </div>
      </div>

      {/* Main Hero Showcase */}
      <div className="relative z-10 max-w-7xl mx-auto w-full my-auto py-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left Column: Hero Content */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI-POWERED ROAD SAFETY INTELLIGENCE</span>
          </div>

          <div className="space-y-3">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white tracking-tight leading-[1.1]">
              Make every road decision <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-sky-300">safer.</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed">
              An AI-powered road safety platform that transforms real-time incidents, road hazards, and visibility conditions into actionable safety intelligence for drivers, students, and emergency command authorities.
            </p>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={handleEnterCitizen}
              className="flex items-center gap-3 px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-mono text-sm font-semibold tracking-wider uppercase border border-blue-400/40 shadow-[0_0_25px_rgba(59,130,246,0.4)] hover:shadow-[0_0_35px_rgba(59,130,246,0.6)] active:scale-95 transition-all"
            >
              <span>ENTER ROADGUARD</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={handleEnterAuthority}
              className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#101A29] hover:bg-[#142238] text-slate-200 hover:text-white font-mono text-sm font-medium tracking-wider uppercase border border-white/[0.12] hover:border-indigo-500/50 shadow-lg active:scale-95 transition-all"
            >
              <Building2 className="w-4 h-4 text-indigo-400" />
              <span>AUTHORITY COMMAND CENTER</span>
            </button>
          </div>

          {/* Simulation Disclaimer Pill */}
          <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400 pt-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>MODINAGAR, UP SECTOR ACTIVE • DEMO / SIMULATED HIGHWAY TELEMETRY</span>
          </div>
        </div>

        {/* Right Column: Mini Safety Map Preview Card */}
        <div className="lg:col-span-5">
          <div className="relative rounded-3xl bg-[#0B1422] border border-white/[0.12] p-5 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-md overflow-hidden">
            {/* Top Card Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <Navigation className="w-4 h-4 text-blue-400" />
                <span className="font-mono text-xs text-slate-300 font-semibold tracking-wider">
                  MODINAGAR CORRIDOR PREVIEW
                </span>
              </div>
              <RiskBadge category="CAUTION" score={46} size="sm" />
            </div>

            {/* Simulated Road Radar Preview Graphic */}
            <div className="relative my-4 h-52 w-full rounded-2xl bg-[#070D17] border border-white/[0.06] overflow-hidden flex flex-col justify-center items-center">
              {/* Radar Sweep Effect */}
              <div className="absolute inset-0 tactical-grid-bg opacity-40" />
              <div className="absolute h-44 w-44 rounded-full border border-blue-500/20 flex items-center justify-center animate-pulse-slow">
                <div className="h-32 w-32 rounded-full border border-blue-500/30 flex items-center justify-center">
                  <div className="h-20 w-20 rounded-full border border-blue-500/40" />
                </div>
              </div>

              {/* Vector Road Lines Preview */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 200">
                {/* MG Road (Red High Risk) */}
                <path d="M 30,170 Q 150,110 270,40" stroke="#EF4444" strokeWidth="6" strokeLinecap="round" fill="none" opacity="0.9" />
                {/* NH-58 (Orange Risky) */}
                <path d="M 50,20 Q 150,90 250,180" stroke="#F97316" strokeWidth="7" strokeLinecap="round" fill="none" opacity="0.85" />
                {/* Railway Road (Green Safe) */}
                <path d="M 150,100 L 280,120" stroke="#22C55E" strokeWidth="4" strokeLinecap="round" fill="none" />
                {/* GT Road (Yellow Caution) */}
                <path d="M 20,90 L 150,100" stroke="#EAB308" strokeWidth="5" strokeLinecap="round" fill="none" />
                
                {/* Junction Hub */}
                <circle cx="150" cy="100" r="7" fill="#3B82F6" stroke="#FFFFFF" strokeWidth="2" />
                
                {/* Hazard markers */}
                <circle cx="95" cy="138" r="4" fill="#EF4444" className="animate-ping" />
                <circle cx="95" cy="138" r="4" fill="#EF4444" />
                <circle cx="210" cy="148" r="4" fill="#F97316" />
              </svg>

              {/* Floating Tooltips on Map */}
              <div className="absolute top-4 left-4 bg-[#101A29]/90 border border-white/[0.1] px-2.5 py-1 rounded-lg text-[10px] font-mono text-slate-300 backdrop-blur-md">
                <span className="text-rose-400 font-bold">MG Road:</span> 82 / 100 High Risk
              </div>
              <div className="absolute bottom-4 right-4 bg-[#101A29]/90 border border-white/[0.1] px-2.5 py-1 rounded-lg text-[10px] font-mono text-slate-300 backdrop-blur-md">
                <span className="text-emerald-400 font-bold">Railway Road:</span> 18 / 100 Safe
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-3 gap-2.5 text-center">
              <div className="p-2.5 rounded-xl bg-[#101A29] border border-white/[0.06]">
                <div className="text-[10px] font-mono text-slate-400">HIGH RISK</div>
                <div className="text-base font-display font-bold text-rose-400">1 Road</div>
              </div>
              <div className="p-2.5 rounded-xl bg-[#101A29] border border-white/[0.06]">
                <div className="text-[10px] font-mono text-slate-400">CAUTION</div>
                <div className="text-base font-display font-bold text-amber-400">3 Roads</div>
              </div>
              <div className="p-2.5 rounded-xl bg-[#101A29] border border-white/[0.06]">
                <div className="text-[10px] font-mono text-slate-400">SAFE</div>
                <div className="text-base font-display font-bold text-emerald-400">5 Roads</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Product Flow: Detect -> Verify -> Warn -> Respond */}
      <div className="relative z-10 max-w-7xl mx-auto w-full pt-8 border-t border-white/[0.08]">
        <div className="text-[11px] font-mono tracking-widest text-slate-400 uppercase text-center mb-5">
          INTELLIGENCE OPERATING PIPELINE
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {flowSteps.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={f.step}
                className="relative p-4 rounded-2xl bg-[#0B1422] border border-white/[0.08] hover:border-blue-500/40 transition-all duration-200"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold text-slate-400">{f.step}</span>
                  <Icon className={`w-4 h-4 ${f.color}`} />
                </div>
                <h4 className="text-sm font-display font-bold text-white tracking-wide">
                  {f.title}
                </h4>
                <p className="text-xs text-slate-400 mt-1">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
