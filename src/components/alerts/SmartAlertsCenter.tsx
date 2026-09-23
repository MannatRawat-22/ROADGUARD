import React, { useState } from 'react';
import {
  Bell,
  AlertTriangle,
  AlertOctagon,
  Info,
  CheckCheck,
  Check,
  MapPin,
  Clock,
  ArrowRight,
  Volume2,
  Filter,
} from 'lucide-react';
import { useSafety } from '../../context/SafetyContext';
import { useTacticalAudio } from '../../context/AudioContext';

export const SmartAlertsCenter: React.FC = () => {
  const {
    alerts,
    markAlertRead,
    markAllAlertsRead,
    setCurrentView,
    setSelectedRoad,
    roadSegments,
  } = useSafety();

  const [filterPriority, setFilterPriority] = useState<string>('all');
  const audio = useTacticalAudio();

  const filteredAlerts = alerts.filter((a) => {
    if (filterPriority === 'all') return true;
    return a.priority === filterPriority;
  });

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'critical':
        return {
          bg: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
          icon: <AlertOctagon className="w-4 h-4 text-rose-400" />,
        };
      case 'high':
        return {
          bg: 'bg-orange-500/20 text-orange-300 border-orange-500/40',
          icon: <AlertTriangle className="w-4 h-4 text-orange-400" />,
        };
      case 'caution':
        return {
          bg: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
          icon: <AlertTriangle className="w-4 h-4 text-amber-400" />,
        };
      default:
        return {
          bg: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
          icon: <Info className="w-4 h-4 text-blue-400" />,
        };
    }
  };

  const handleViewOnMap = (roadId?: string) => {
    audio.playClick();
    if (roadId) {
      const matched = roadSegments.find((r) => r.id === roadId);
      if (matched) {
        setSelectedRoad(matched);
      }
    }
    setCurrentView('map');
  };

  return (
    <div className="p-4 lg:p-8 space-y-6 max-w-5xl mx-auto w-full pb-24 md:pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0B1422] border border-white/[0.08] p-5 rounded-3xl backdrop-blur-md">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-widest text-blue-400 font-bold">
              PROXIMITY GEO-FENCE ENGINE
            </span>
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white mt-1">
            Smart Safety Alerts
          </h1>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            Real-time critical hazard advisories filtered by your route corridor in Modinagar
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => audio.playAlert()}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-mono transition-all"
            title="Test tactical alert siren"
          >
            <Volume2 className="w-4 h-4" />
          </button>
          <button
            onClick={markAllAlertsRead}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-mono font-medium transition-all"
          >
            <CheckCheck className="w-4 h-4 text-emerald-400" />
            <span>Acknowledge All</span>
          </button>
        </div>
      </div>

      {/* Priority Filter Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <span className="text-xs font-mono text-slate-400 uppercase mr-1">FILTER:</span>
        {['all', 'critical', 'high', 'caution', 'info'].map((p) => (
          <button
            key={p}
            onClick={() => {
              audio.playClick();
              setFilterPriority(p);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold uppercase tracking-wider transition-all ${
              filterPriority === p
                ? 'bg-blue-600 text-white shadow-[0_0_12px_rgba(59,130,246,0.4)]'
                : 'bg-[#101A29] text-slate-400 hover:text-white border border-white/[0.06]'
            }`}
          >
            {p} ({p === 'all' ? alerts.length : alerts.filter((a) => a.priority === p).length})
          </button>
        ))}
      </div>

      {/* Alerts Stream List */}
      <div className="space-y-4">
        {filteredAlerts.length === 0 ? (
          <div className="p-12 rounded-3xl bg-[#0B1422] border border-white/[0.08] text-center space-y-2">
            <CheckCheck className="w-8 h-8 text-emerald-400 mx-auto" />
            <h3 className="font-display font-bold text-base text-white">
              No Active Alerts in this Category
            </h3>
            <p className="text-xs text-slate-400">
              All clear in the selected severity filter.
            </p>
          </div>
        ) : (
          filteredAlerts.map((alert) => {
            const badge = getPriorityBadge(alert.priority);
            return (
              <div
                key={alert.id}
                className={`p-5 sm:p-6 rounded-3xl bg-[#101A29] border transition-all ${
                  alert.isRead
                    ? 'border-white/[0.06] opacity-75'
                    : 'border-white/[0.15] shadow-xl hover:border-blue-500/40'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <span className={`p-2 rounded-xl border shrink-0 ${badge.bg}`}>
                      {badge.icon}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded border ${badge.bg}`}>
                          {alert.priority} PRIORITY
                        </span>
                        {!alert.isRead && (
                          <span className="text-[9px] font-mono bg-blue-500 text-white px-1.5 py-0.2 rounded font-bold">
                            NEW
                          </span>
                        )}
                      </div>
                      <h3 className="font-display font-extrabold text-lg text-white mt-1">
                        {alert.title}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{alert.timestamp}</span>
                  </div>
                </div>

                <p className="text-sm text-slate-200 mt-3 leading-relaxed">
                  {alert.message}
                </p>

                {/* Reason & Location Telemetry Box */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 mt-4 p-3.5 rounded-2xl bg-[#0B1422] border border-white/[0.06] text-xs font-mono">
                  <div className="space-y-0.5">
                    <span className="text-slate-400 text-[10px] uppercase">TRIGGER REASON:</span>
                    <p className="text-slate-300 font-sans text-xs">{alert.reason}</p>
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-slate-400 text-[10px] uppercase">GEO LOCATION:</span>
                    <p className="text-blue-300 flex items-center gap-1 text-xs">
                      <MapPin className="w-3 h-3 text-blue-400" />
                      {alert.location}
                    </p>
                  </div>
                </div>

                {/* Recommended Action Pill */}
                <div className="mt-3 p-3 rounded-xl bg-gradient-to-r from-blue-950/40 to-slate-900 border border-blue-500/20 text-xs text-blue-200 flex items-start gap-2">
                  <span className="font-mono font-bold text-blue-400 shrink-0">ADVICE:</span>
                  <span>{alert.recommendedAction}</span>
                </div>

                {/* Footer Controls */}
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/[0.06]">
                  <button
                    onClick={() => handleViewOnMap(alert.roadId)}
                    className="flex items-center gap-1.5 text-xs font-mono font-semibold text-blue-400 hover:text-blue-300"
                  >
                    <span>Inspect On Live Map</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  {!alert.isRead ? (
                    <button
                      onClick={() => {
                        audio.playClick();
                        markAlertRead(alert.id);
                      }}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono"
                    >
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Mark as Read</span>
                    </button>
                  ) : (
                    <span className="text-[11px] font-mono text-slate-500">Acknowledged</span>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
