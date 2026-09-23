import React from 'react';
import {
  Shield,
  Bell,
  Radio,
  SlidersHorizontal,
  Flame,
  UserCheck,
  Building2,
  Navigation,
} from 'lucide-react';
import { useSafety } from '../../context/SafetyContext';
import { useTacticalAudio } from '../../context/AudioContext';

export const Navbar: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    userRole,
    setUserRole,
    alerts,
    triggerSos,
  } = useSafety();

  const audio = useTacticalAudio();
  const unreadAlertsCount = alerts.filter((a) => !a.isRead).length;

  const handleRoleToggle = () => {
    audio.playClick();
    if (userRole === 'citizen') {
      setUserRole('authority');
      setCurrentView('authority');
    } else {
      setUserRole('citizen');
      setCurrentView('dashboard');
    }
  };

  return (
    <header className="sticky top-0 z-40 h-16 bg-[#070D17]/90 backdrop-blur-md border-b border-white/[0.08] px-4 lg:px-6 flex items-center justify-between">
      {/* Brand & Status */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => {
            audio.playClick();
            setCurrentView('landing');
          }}
          className="flex items-center gap-2.5 group text-left focus:outline-none"
        >
          <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-900 border border-blue-400/40 shadow-[0_0_15px_rgba(59,130,246,0.3)] group-hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-all">
            <Shield className="w-5 h-5 text-white" />
            <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-display font-bold tracking-tight text-lg text-white group-hover:text-blue-400 transition-colors">
                ROADGUARD
              </span>
              <span className="text-[10px] font-mono uppercase bg-blue-500/10 border border-blue-500/30 text-blue-400 px-1.5 py-0.2 rounded">
                AI CORE
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-mono tracking-wider hidden sm:block">
              DETECT • WARN • PREVENT • RESPOND
            </p>
          </div>
        </button>

        {/* Live Telemetry Pill */}
        <div className="hidden xl:flex items-center gap-2 bg-[#101A29] border border-white/[0.06] rounded-full px-3 py-1 text-[11px] font-mono text-slate-300">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-slate-400">TELEMETRY:</span>
          <span className="text-emerald-400 font-semibold">MODINAGAR GRID ONLINE</span>
          <span className="text-slate-500">|</span>
          <span className="text-slate-400">LAT: 28.835°N</span>
        </div>
      </div>

      {/* Center Navigation Shortcuts (Desktop) */}
      <div className="hidden lg:flex items-center gap-1 bg-[#101A29]/80 border border-white/[0.06] p-1 rounded-xl">
        <button
          onClick={() => {
            audio.playClick();
            setCurrentView('dashboard');
          }}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
            currentView === 'dashboard'
              ? 'bg-blue-600 text-white shadow-[0_0_12px_rgba(59,130,246,0.3)]'
              : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
          }`}
        >
          Dashboard
        </button>
        <button
          onClick={() => {
            audio.playClick();
            setCurrentView('map');
          }}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
            currentView === 'map'
              ? 'bg-blue-600 text-white shadow-[0_0_12px_rgba(59,130,246,0.3)]'
              : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
          }`}
        >
          Live Safety Map
        </button>
        <button
          onClick={() => {
            audio.playClick();
            setCurrentView('routes');
          }}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
            currentView === 'routes'
              ? 'bg-blue-600 text-white shadow-[0_0_12px_rgba(59,130,246,0.3)]'
              : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
          }`}
        >
          Safer Routes
        </button>
        <button
          onClick={() => {
            audio.playClick();
            setCurrentView('ai-detect');
          }}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
            currentView === 'ai-detect'
              ? 'bg-blue-600 text-white shadow-[0_0_12px_rgba(59,130,246,0.3)]'
              : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
          }`}
        >
          AI Vision
        </button>
        <button
          onClick={() => {
            audio.playClick();
            setCurrentView('hotspots');
          }}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
            currentView === 'hotspots'
              ? 'bg-blue-600 text-white shadow-[0_0_12px_rgba(59,130,246,0.3)]'
              : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
          }`}
        >
          Hotspots
        </button>
        <button
          onClick={() => {
            audio.playClick();
            setCurrentView('authority');
          }}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
            currentView === 'authority'
              ? 'bg-indigo-600 text-white shadow-[0_0_12px_rgba(99,102,241,0.4)]'
              : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
          }`}
        >
          Command Center
        </button>
      </div>

      {/* Right Action Controls */}
      <div className="flex items-center gap-2.5">
        {/* Role Switcher Pill */}
        <button
          onClick={handleRoleToggle}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono tracking-wider uppercase transition-all duration-200 ${
            userRole === 'authority'
              ? 'bg-indigo-950/80 border-indigo-500/50 text-indigo-300 shadow-[0_0_15px_rgba(99,102,241,0.25)]'
              : 'bg-slate-900 border-white/[0.1] text-slate-300 hover:border-white/[0.2]'
          }`}
          title="Toggle Citizen / Authority Command Center view"
        >
          {userRole === 'authority' ? (
            <>
              <Building2 className="w-3.5 h-3.5 text-indigo-400" />
              <span className="hidden sm:inline">AUTHORITY</span> OPS
            </>
          ) : (
            <>
              <UserCheck className="w-3.5 h-3.5 text-blue-400" />
              <span className="hidden sm:inline">CITIZEN</span> DRIVER
            </>
          )}
        </button>

        {/* Smart Alerts Trigger */}
        <button
          onClick={() => {
            audio.playClick();
            setCurrentView('alerts');
          }}
          className="relative p-2 rounded-lg bg-[#101A29] border border-white/[0.08] text-slate-300 hover:text-white hover:border-white/[0.2] transition-colors"
          aria-label="View Smart Alerts"
        >
          <Bell className="w-4 h-4" />
          {unreadAlertsCount > 0 && (
            <span className="absolute -top-1 -right-1 flex items-center justify-center h-4 min-w-[16px] px-1 text-[9px] font-mono font-bold rounded-full bg-rose-500 text-white shadow-[0_0_8px_rgba(244,63,94,0.6)]">
              {unreadAlertsCount}
            </span>
          )}
        </button>

        {/* Personal SOS Trigger Button (Tactical Red) */}
        <button
          onClick={() => triggerSos('manual')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-mono font-bold tracking-wider uppercase border border-rose-400/40 shadow-[0_0_15px_rgba(239,68,68,0.4)] hover:shadow-[0_0_20px_rgba(239,68,68,0.6)] active:scale-95 transition-all"
        >
          <Flame className="w-3.5 h-3.5 animate-pulse text-amber-300" />
          <span>SOS</span>
        </button>
      </div>
    </header>
  );
};
