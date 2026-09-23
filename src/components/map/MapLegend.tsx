import React, { useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  Shield,
  AlertTriangle,
  Flame,
  Eye,
  Navigation,
  Activity,
  Layers,
} from 'lucide-react';

export const MapLegend: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  return (
    <div className="bg-[#101A29]/95 backdrop-blur-md border border-white/[0.12] rounded-2xl shadow-2xl p-3 w-56 text-xs select-none transition-all">
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between cursor-pointer font-mono font-bold text-slate-300 uppercase tracking-wider text-[11px]"
      >
        <div className="flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-blue-400" />
          <span>MAP LEGEND</span>
        </div>
        <button className="text-slate-400 hover:text-white">
          {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
        </button>
      </div>

      {isExpanded && (
        <div className="mt-3 space-y-3 pt-2 border-t border-white/[0.08]">
          {/* Road Risk Levels */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
              ROAD RISK INDEX
            </span>
            <div className="grid grid-cols-2 gap-1.5 text-[11px]">
              <div className="flex items-center gap-2">
                <span className="w-3 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                <span className="text-slate-300">Safe (0-25)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(234,179,8,0.5)]" />
                <span className="text-slate-300">Caution (26-50)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-1.5 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.5)]" />
                <span className="text-slate-300">Risky (51-75)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-1.5 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
                <span className="text-slate-300">High Risk (76+)</span>
              </div>
            </div>
          </div>

          {/* Incident Marker Types */}
          <div className="space-y-1.5 pt-1.5 border-t border-white/[0.06]">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
              INCIDENT MARKERS
            </span>
            <div className="space-y-1 text-[11px] text-slate-300">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 flex items-center justify-center text-[7px] text-white font-bold">
                  !
                </span>
                <span>Collision / Accident</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-orange-500 flex items-center justify-center text-[7px] text-white font-bold">
                  P
                </span>
                <span>Pothole / Surface Hazard</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 flex items-center justify-center text-[7px] text-slate-950 font-bold">
                  F
                </span>
                <span>Low Visibility / Fog</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-500 flex items-center justify-center text-[7px] text-white font-bold">
                  H
                </span>
                <span>Historical Hotspot Zone</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                <span>Simulated Current Location</span>
              </div>
            </div>
          </div>

          {/* Traffic Flow Indicator */}
          <div className="pt-1.5 border-t border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-slate-400">
            <span>FLOW TELEMETRY</span>
            <span className="text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              LIVE 12s AGO
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
