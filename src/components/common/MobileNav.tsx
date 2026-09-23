import React from 'react';
import {
  LayoutDashboard,
  Map,
  PlusCircle,
  GitCompare,
  Flame,
  Building2,
  Bell,
  Eye,
} from 'lucide-react';
import { useSafety, AppView } from '../../context/SafetyContext';
import { useTacticalAudio } from '../../context/AudioContext';

export const MobileNav: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    userRole,
    setUserRole,
    triggerSos,
    alerts,
  } = useSafety();

  const audio = useTacticalAudio();
  const unreadAlerts = alerts.filter((a) => !a.isRead).length;

  const handleNav = (view: AppView) => {
    audio.playClick();
    setCurrentView(view);
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#070D17]/95 backdrop-blur-lg border-t border-white/[0.08] px-2 py-1.5 flex items-center justify-around">
      {/* Home / Dashboard */}
      <button
        onClick={() => handleNav(userRole === 'authority' ? 'authority' : 'dashboard')}
        className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
          currentView === 'dashboard' || currentView === 'authority'
            ? 'text-blue-400 font-semibold'
            : 'text-slate-400'
        }`}
      >
        <LayoutDashboard className="w-5 h-5" />
        <span className="text-[10px] font-mono">
          {userRole === 'authority' ? 'Ops' : 'Home'}
        </span>
      </button>

      {/* Safety Map */}
      <button
        onClick={() => handleNav('map')}
        className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
          currentView === 'map' ? 'text-blue-400 font-semibold' : 'text-slate-400'
        }`}
      >
        <Map className="w-5 h-5" />
        <span className="text-[10px] font-mono">Map</span>
      </button>

      {/* Center Action: Report Hazard (Citizen) or AI Detect (Authority) */}
      {userRole === 'citizen' ? (
        <button
          onClick={() => handleNav('report')}
          className={`flex flex-col items-center gap-1 p-2 -mt-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.5)] active:scale-95 transition-all ${
            currentView === 'report' ? 'ring-2 ring-blue-400' : ''
          }`}
        >
          <PlusCircle className="w-6 h-6" />
          <span className="text-[9px] font-mono font-bold uppercase">Report</span>
        </button>
      ) : (
        <button
          onClick={() => handleNav('ai-detect')}
          className={`flex flex-col items-center gap-1 p-2 -mt-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white shadow-[0_0_20px_rgba(99,102,241,0.5)] active:scale-95 transition-all ${
            currentView === 'ai-detect' ? 'ring-2 ring-indigo-400' : ''
          }`}
        >
          <Eye className="w-6 h-6" />
          <span className="text-[9px] font-mono font-bold uppercase">Vision</span>
        </button>
      )}

      {/* Routes */}
      <button
        onClick={() => handleNav('routes')}
        className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
          currentView === 'routes' ? 'text-blue-400 font-semibold' : 'text-slate-400'
        }`}
      >
        <GitCompare className="w-5 h-5" />
        <span className="text-[10px] font-mono">Routes</span>
      </button>

      {/* SOS Button */}
      <button
        onClick={() => triggerSos('manual')}
        className="flex flex-col items-center gap-1 p-2 rounded-xl text-rose-400 hover:text-rose-300 transition-all active:scale-95"
      >
        <Flame className="w-5 h-5 animate-pulse text-rose-500" />
        <span className="text-[10px] font-mono font-bold text-rose-400">SOS</span>
      </button>
    </div>
  );
};
