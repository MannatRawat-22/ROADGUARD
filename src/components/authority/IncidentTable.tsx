import React, { useState } from 'react';
import {
  Search,
  Filter,
  ShieldCheck,
  XCircle,
  CheckCircle,
  Clock,
  Car,
  Eye,
  Send,
  User,
  AlertTriangle,
  ChevronDown,
  ArrowUpDown,
} from 'lucide-react';
import { useSafety } from '../../context/SafetyContext';
import { useTacticalAudio } from '../../context/AudioContext';
import { Incident, VerificationStatus } from '../../types';

export const IncidentTable: React.FC = () => {
  const {
    incidents,
    verifyIncident,
    rejectIncident,
    resolveIncident,
    dispatchPatrol,
    setSelectedIncident,
    setCurrentView,
  } = useSafety();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedIncidentDetail, setSelectedIncidentDetail] = useState<Incident | null>(null);
  const [patrolInput, setPatrolInput] = useState('Patrol Unit #07');
  const audio = useTacticalAudio();

  const filtered = incidents.filter((inc) => {
    const matchesSearch =
      inc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inc.locationName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inc.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || inc.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: VerificationStatus) => {
    switch (status) {
      case 'verified':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      case 'resolved':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/40';
      case 'dismissed':
        return 'bg-slate-500/20 text-slate-400 border-slate-500/40';
      default:
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
    }
  };

  return (
    <div className="space-y-4">
      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center bg-[#101A29] border border-white/[0.1] rounded-2xl px-3 py-2 flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 shrink-0 mr-2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search report ID, hazard type, or location..."
            className="bg-transparent border-none outline-none text-xs text-slate-200 placeholder-slate-400 w-full font-mono"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto">
          {['all', 'pending', 'verified', 'resolved'].map((st) => (
            <button
              key={st}
              onClick={() => {
                audio.playClick();
                setStatusFilter(st);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold uppercase tracking-wider transition-all ${
                statusFilter === st
                  ? 'bg-indigo-600 text-white shadow-[0_0_12px_rgba(99,102,241,0.4)]'
                  : 'bg-[#101A29] text-slate-400 hover:text-white border border-white/[0.06]'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Incidents Table */}
      <div className="rounded-3xl bg-[#0B1422] border border-white/[0.08] overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#070D17] text-[10px] font-mono uppercase tracking-widest text-slate-400 border-b border-white/[0.08]">
              <tr>
                <th className="p-4">INCIDENT ID / TYPE</th>
                <th className="p-4">LOCATION</th>
                <th className="p-4">SEVERITY</th>
                <th className="p-4">STATUS</th>
                <th className="p-4">TIME</th>
                <th className="p-4 text-right">AUTHORITY ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04] text-slate-300">
              {filtered.map((inc) => (
                <tr
                  key={inc.id}
                  className="hover:bg-white/[0.03] transition-colors group cursor-pointer"
                  onClick={() => setSelectedIncidentDetail(inc)}
                >
                  <td className="p-4">
                    <div className="font-mono font-bold text-white flex items-center gap-2">
                      <span>#{inc.id}</span>
                      <span className="text-[10px] font-normal uppercase px-1.5 py-0.2 rounded bg-white/[0.05] text-slate-400">
                        {inc.type.replace('_', ' ')}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 font-sans mt-0.5 truncate max-w-[200px]">
                      {inc.title}
                    </div>
                  </td>

                  <td className="p-4 font-mono text-slate-200">
                    <div className="truncate max-w-[180px]">{inc.locationName}</div>
                  </td>

                  <td className="p-4">
                    <span
                      className={`text-[9px] font-mono uppercase font-bold px-2 py-0.5 rounded border ${
                        inc.severity === 'critical'
                          ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                          : inc.severity === 'high'
                          ? 'bg-orange-500/20 text-orange-300 border-orange-500/40'
                          : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                      }`}
                    >
                      {inc.severity}
                    </span>
                  </td>

                  <td className="p-4">
                    <span
                      className={`text-[10px] font-mono uppercase font-semibold px-2 py-0.5 rounded border ${getStatusBadge(
                        inc.status
                      )}`}
                    >
                      {inc.status}
                    </span>
                  </td>

                  <td className="p-4 font-mono text-slate-400">
                    {inc.reportedAt}
                  </td>

                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-1.5" onClick={(e) => e.stopPropagation()}>
                      {inc.status === 'pending' && (
                        <>
                          <button
                            onClick={() => verifyIncident(inc.id)}
                            className="p-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/40 text-emerald-300 border border-emerald-500/30"
                            title="Verify Incident"
                          >
                            <ShieldCheck className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => rejectIncident(inc.id)}
                            className="p-1.5 rounded-lg bg-rose-600/20 hover:bg-rose-600/40 text-rose-300 border border-rose-500/30"
                            title="Dismiss Incident"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        </>
                      )}

                      {inc.status === 'verified' && (
                        <button
                          onClick={() => resolveIncident(inc.id)}
                          className="px-2.5 py-1 rounded-lg bg-blue-600/20 hover:bg-blue-600/40 text-blue-300 border border-blue-500/30 font-mono text-[11px]"
                        >
                          Resolve
                        </button>
                      )}

                      <button
                        onClick={() => setSelectedIncidentDetail(inc)}
                        className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-[11px]"
                      >
                        Details
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Incident Detail Modal / Drawer */}
      {selectedIncidentDetail && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0B1422] border border-white/[0.12] rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4 animate-in zoom-in-95">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono text-indigo-400 uppercase font-bold">
                  COMMAND INCIDENT LEDGER #{selectedIncidentDetail.id}
                </span>
                <h3 className="font-display font-bold text-xl text-white mt-1">
                  {selectedIncidentDetail.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedIncidentDetail(null)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-[#101A29] border border-white/[0.06] space-y-2 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-slate-400">LOCATION:</span>
                <span className="text-slate-200">{selectedIncidentDetail.locationName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">STATUS:</span>
                <span className="text-emerald-400 uppercase font-bold">{selectedIncidentDetail.status}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">ASSIGNED PATROL:</span>
                <span className="text-indigo-300">{selectedIncidentDetail.assignedPatrol || 'Unassigned'}</span>
              </div>
              <div className="pt-2 border-t border-white/[0.04]">
                <span className="text-slate-400 block mb-1">DESCRIPTION:</span>
                <p className="font-sans text-slate-300 leading-relaxed bg-[#070D17] p-2.5 rounded-xl">
                  {selectedIncidentDetail.description}
                </p>
              </div>
            </div>

            {/* Dispatch Unit Form */}
            <div className="space-y-2">
              <label className="text-xs font-mono text-slate-300">
                Dispatch Patrol / Repair Crew:
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={patrolInput}
                  onChange={(e) => setPatrolInput(e.target.value)}
                  className="flex-1 bg-[#101A29] border border-white/[0.1] rounded-xl px-3 py-2 text-xs font-mono text-white"
                  placeholder="e.g. Patrol Unit #04"
                />
                <button
                  onClick={() => {
                    dispatchPatrol(selectedIncidentDetail.id, patrolInput);
                    setSelectedIncidentDetail(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Dispatch</span>
                </button>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedIncidentDetail(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white font-mono text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
