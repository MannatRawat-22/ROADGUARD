import React from 'react';
import {
  LayoutDashboard,
  Map,
  PlusCircle,
  Eye,
  GitCompare,
  Bell,
  Flame,
  BarChart3,
  FlameKindling,
  Building2,
  ShieldCheck,
  Radio,
  Sliders,
  LifeBuoy,
} from 'lucide-react';
import { useSafety, AppView } from '../../context/SafetyContext';
import { useTacticalAudio } from '../../context/AudioContext';

export const Sidebar: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    userRole,
    alerts,
    incidents,
    triggerSos,
  } = useSafety();

  const audio = useTacticalAudio();
  const unreadAlerts = alerts.filter((a) => !a.isRead).length;
  const pendingIncidents = incidents.filter((i) => i.status === 'pending').length;

  const handleNav = (view: AppView) => {
    audio.playClick();
    setCurrentView(view);
  };

  const navItems =
    userRole === 'authority'
      ? [
          { id: 'authority' as AppView, label: 'Ops Overview', icon: Building2 },
          { id: 'map' as AppView, label: 'Tactical Live Map', icon: Map },
          {
            id: 'authority' as AppView,
            label: 'Incident Triage',
            icon: ShieldCheck,
            badge: pendingIncidents > 0 ? `${pendingIncidents} new` : undefined,
            badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
          },
          { id: 'ai-detect' as AppView, label: 'AI Vision Studio', icon: Eye },
          { id: 'hotspots' as AppView, label: 'Risk Hotspots', icon: FlameKindling },
          { id: 'analytics' as AppView, label: 'City Analytics', icon: BarChart3 },
        ]
      : [
          { id: 'dashboard' as AppView, label: 'Dashboard', icon: LayoutDashboard },
          { id: 'map' as AppView, label: 'Safety Map', icon: Map },
          { id: 'report' as AppView, label: 'Report Hazard', icon: PlusCircle },
          { id: 'routes' as AppView, label: 'Safer Routes', icon: GitCompare },
          { id: 'ai-detect' as AppView, label: 'AI Vision Detect', icon: Eye },
          {
            id: 'alerts' as AppView,
            label: 'Smart Alerts',
            icon: Bell,
            badge: unreadAlerts > 0 ? `${unreadAlerts}` : undefined,
            badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
          },
          { id: 'hotspots' as AppView, label: 'Risk Hotspots', icon: FlameKindling },
          { id: 'analytics' as AppView, label: 'Safety Analytics', icon: BarChart3 },
          { id: 'sos-settings' as AppView, label: 'SOS Protection', icon: LifeBuoy },
        ];

  return (
    <aside className="hidden md:flex flex-col w-64 bg-[#0B1422] border-r border-white/[0.08] h-[calc(100vh-4rem)] sticky top-16 select-none shrink-0 justify-between p-3">
      {/* Navigation Group */}
      <div className="space-y-6">
        <div>
          <div className="px-3 mb-2 flex items-center justify-between">
            <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">
              {userRole === 'authority' ? 'COMMAND OPERATIONS' : 'SAFETY NAVIGATION'}
            </span>
            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/[0.05] text-slate-400">
              v2.4
            </span>
          </div>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={`${item.id}-${item.label}`}
                  onClick={() => handleNav(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? userRole === 'authority'
                        ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/40 shadow-[0_0_15px_rgba(99,102,241,0.15)] font-semibold'
                        : 'bg-blue-600/20 text-blue-300 border border-blue-500/40 shadow-[0_0_15px_rgba(59,130,246,0.15)] font-semibold'
                      : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon
                      className={`w-4 h-4 ${
                        isActive
                          ? userRole === 'authority'
                            ? 'text-indigo-400'
                            : 'text-blue-400'
                          : 'text-slate-400'
                      }`}
                    />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-full border ${item.badgeColor}`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* SOS Rapid Launch Card (Citizen Mode) */}
        {userRole === 'citizen' && (
          <div className="p-3.5 rounded-2xl bg-gradient-to-b from-rose-950/40 to-[#101A29] border border-rose-500/30 shadow-[0_0_20px_rgba(244,63,94,0.15)]">
            <div className="flex items-center gap-2 text-rose-400 mb-1.5">
              <Flame className="w-4 h-4 animate-pulse" />
              <span className="text-xs font-mono font-bold tracking-wider uppercase">
                EMERGENCY SOS
              </span>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed mb-3">
              One-tap broadcast to 3 contacts & Modinagar PCR.
            </p>
            <button
              onClick={() => triggerSos('manual')}
              className="w-full py-2 px-3 rounded-xl bg-rose-600 hover:bg-rose-500 active:scale-95 text-white font-mono text-xs font-bold uppercase tracking-wider shadow-[0_0_12px_rgba(239,68,68,0.4)] transition-all"
            >
              TRIGGER SOS SIMULATION
            </button>
          </div>
        )}
      </div>

      {/* Bottom Telemetry & Status Widget */}
      <div className="p-3 rounded-xl bg-[#101A29] border border-white/[0.06] space-y-2">
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-slate-400 font-mono">SECTOR:</span>
          <span className="text-slate-200 font-semibold font-mono">MODINAGAR-NORTH</span>
        </div>
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-slate-400 font-mono">RADAR:</span>
          <span className="text-emerald-400 font-mono font-semibold flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
            SCANNING (4.2 GHz)
          </span>
        </div>
        <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-[10px] text-slate-500 font-mono">
          <span>SIMULATION MODE</span>
          <span>LAT 28.835°N</span>
        </div>
      </div>
    </aside>
  );
};
