import React from 'react';
import { Incident } from '../../types';
import {
  AlertTriangle,
  Clock,
  MapPin,
  ShieldCheck,
  CheckCircle,
  ThumbsUp,
  User,
  Radio,
} from 'lucide-react';
import { useSafety } from '../../context/SafetyContext';
import { useTacticalAudio } from '../../context/AudioContext';

interface IncidentPopupProps {
  incident: Incident;
  onClose?: () => void;
}

export const IncidentPopup: React.FC<IncidentPopupProps> = ({ incident, onClose }) => {
  const { userRole, verifyIncident, resolveIncident, addToast } = useSafety();
  const audio = useTacticalAudio();

  const getSeverityBadge = () => {
    switch (incident.severity) {
      case 'critical':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/40';
      case 'high':
        return 'bg-orange-500/20 text-orange-300 border-orange-500/40';
      case 'moderate':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      default:
        return 'bg-blue-500/20 text-blue-300 border-blue-500/40';
    }
  };

  const handleUpvote = (e: React.MouseEvent) => {
    e.stopPropagation();
    audio.playClick();
    addToast({
      title: 'Incident Confirmed',
      message: 'Thank you for crowdsource verification.',
      type: 'success',
    });
  };

  return (
    <div className="p-3.5 min-w-[260px] max-w-xs space-y-2.5 bg-[#101A29] text-slate-100 rounded-xl">
      {/* Header */}
      <div className="flex items-start justify-between gap-2 border-b border-white/[0.08] pb-2">
        <div>
          <span
            className={`text-[9px] font-mono uppercase px-1.5 py-0.5 rounded border font-semibold ${getSeverityBadge()}`}
          >
            {incident.severity} SEVERITY
          </span>
          <h4 className="font-display font-bold text-sm text-white mt-1 leading-snug">
            {incident.title}
          </h4>
        </div>
      </div>

      {/* Location & Time */}
      <div className="space-y-1 text-xs text-slate-300">
        <div className="flex items-center gap-1.5 text-slate-400 font-mono text-[11px]">
          <MapPin className="w-3 h-3 text-blue-400 shrink-0" />
          <span className="truncate">{incident.locationName}</span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-400 font-mono text-[10px]">
          <Clock className="w-3 h-3 text-slate-400 shrink-0" />
          <span>Reported {incident.reportedAt}</span>
          <span className="text-slate-600">•</span>
          <span className="capitalize">{incident.reporterType.replace('_', ' ')}</span>
        </div>
      </div>

      <p className="text-xs text-slate-300 leading-relaxed bg-[#070D17]/60 p-2 rounded-lg border border-white/[0.04]">
        {incident.description}
      </p>

      {/* Verification Status */}
      <div className="flex items-center justify-between text-[11px] font-mono pt-1">
        <div className="flex items-center gap-1">
          {incident.status === 'verified' ? (
            <span className="text-emerald-400 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Verified
            </span>
          ) : (
            <span className="text-amber-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              Pending Review
            </span>
          )}
        </div>

        <button
          onClick={handleUpvote}
          className="flex items-center gap-1 text-slate-400 hover:text-blue-400 px-2 py-0.5 rounded bg-white/[0.04] transition-colors"
        >
          <ThumbsUp className="w-3 h-3" />
          <span>{incident.upvotes || 1}</span>
        </button>
      </div>

      {/* Authority Quick Actions */}
      {userRole === 'authority' && incident.status === 'pending' && (
        <div className="pt-2 border-t border-white/[0.08] flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              verifyIncident(incident.id);
            }}
            className="flex-1 py-1.5 px-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-mono font-semibold transition-all"
          >
            Verify Now
          </button>
        </div>
      )}
    </div>
  );
};
