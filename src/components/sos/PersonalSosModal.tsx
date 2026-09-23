import React from 'react';
import {
  Flame,
  X,
  Phone,
  MessageSquare,
  MapPin,
  ShieldCheck,
  AlertTriangle,
  RotateCcw,
  Volume2,
  ExternalLink,
} from 'lucide-react';
import { useSafety } from '../../context/SafetyContext';
import { useTacticalAudio } from '../../context/AudioContext';

export const PersonalSosModal: React.FC = () => {
  const {
    isSosModalOpen,
    setIsSosModalOpen,
    sosState,
    cancelSos,
    dispatchSosImmediately,
    emergencyContacts,
  } = useSafety();

  const audio = useTacticalAudio();

  if (!isSosModalOpen) return null;

  const primaryContact = emergencyContacts.find((c) => c.isPrimary) || emergencyContacts[0];

  return (
    <div className="fixed inset-0 z-[1000] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg rounded-3xl bg-gradient-to-b from-[#1c0d12] via-[#0B1422] to-[#070D17] border-2 border-rose-500 shadow-[0_0_50px_rgba(239,68,68,0.4)] p-6 sm:p-8 text-center space-y-6 animate-in zoom-in-95">
        {/* Close / Dismiss Icon */}
        <button
          onClick={cancelSos}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-slate-400 hover:text-white transition-colors"
          aria-label="Close SOS"
        >
          <X className="w-5 h-5" />
        </button>

        {/* SOS Countdown Mode */}
        {!sosState.alertDispatched ? (
          <div className="space-y-6">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-rose-600/20 border-2 border-rose-500 text-rose-500 shadow-[0_0_30px_rgba(239,68,68,0.6)] animate-pulse">
              <Flame className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-mono uppercase px-2.5 py-1 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40 font-bold">
                {sosState.triggerType === 'crash' ? 'POSSIBLE CRASH DETECTED' : 'MANUAL SOS TRIGGERED'}
              </span>
              <h2 className="text-3xl font-display font-extrabold text-white mt-2">
                Emergency Alert Initiating
              </h2>
              <p className="text-xs text-slate-300 max-w-xs mx-auto mt-1">
                Broadcasting your coordinates to emergency contacts & Modinagar PCR in:
              </p>
            </div>

            {/* Countdown Big Timer Circle */}
            <div className="relative flex items-center justify-center h-32 w-32 mx-auto">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  className="stroke-slate-800"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  stroke="#EF4444"
                  strokeWidth="8"
                  strokeDasharray="263.8"
                  strokeDashoffset={263.8 * (1 - sosState.countdownRemaining / 15)}
                  strokeLinecap="round"
                  fill="none"
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="font-display font-extrabold text-4xl text-white">
                  0{sosState.countdownRemaining}
                </span>
                <span className="text-[9px] font-mono text-rose-400 uppercase">SECONDS</span>
              </div>
            </div>

            {/* Cancellation & Immediate Send Buttons */}
            <div className="space-y-3 pt-2">
              <button
                onClick={cancelSos}
                className="w-full py-3.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-mono text-sm font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(34,197,94,0.4)] transition-all"
              >
                I'M OKAY — CANCEL SOS
              </button>

              <button
                onClick={dispatchSosImmediately}
                className="w-full py-2.5 px-6 rounded-2xl bg-rose-600/30 hover:bg-rose-600/50 text-rose-300 font-mono text-xs font-semibold uppercase tracking-wider border border-rose-500/40 transition-all"
              >
                SEND SOS IMMEDIATELY
              </button>
            </div>
          </div>
        ) : (
          /* SOS Dispatched State */
          <div className="space-y-6">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-rose-600 border-4 border-rose-400 text-white shadow-[0_0_40px_rgba(239,68,68,0.8)] animate-pulse">
              <Flame className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-mono uppercase px-3 py-1 rounded bg-rose-500 text-white font-bold tracking-wider">
                SOS BROADCAST ACTIVE
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white mt-2">
                Emergency Telemetry Sent
              </h2>
              <p className="text-xs text-slate-300 max-w-sm mx-auto mt-1">
                Your live GPS coordinates (28.8342°N, 77.5748°E) have been transmitted to your 3 emergency contacts & Modinagar Traffic Police desk.
              </p>
            </div>

            {/* Direct Fallback Action Hub */}
            <div className="p-4 rounded-2xl bg-[#101A29] border border-white/[0.08] space-y-3 text-left font-mono text-xs">
              <span className="text-[10px] text-slate-400 uppercase tracking-widest block">
                DIRECT FALLBACK ACTIONS:
              </span>

              {/* Call Primary Contact */}
              {primaryContact && (
                <a
                  href={`tel:${primaryContact.phone.replace(/\s+/g, '')}`}
                  className="flex items-center justify-between p-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white transition-all"
                >
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4" />
                    <div>
                      <div className="font-bold">Call {primaryContact.name}</div>
                      <div className="text-[10px] opacity-80">{primaryContact.phone}</div>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}

              {/* Dial 112 PCR */}
              <a
                href="tel:112"
                className="flex items-center justify-between p-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4" />
                  <div>
                    <div className="font-bold">Dial 112 National Emergency</div>
                    <div className="text-[10px] opacity-80">Direct police dispatch</div>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4" />
              </a>

              {/* SMS Contacts */}
              <a
                href={`sms:${primaryContact?.phone || ''}?body=EMERGENCY! I need assistance at Modinagar, UP (Lat 28.835N, Lng 77.575E). Powered by ROADGUARD.`}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  <span>Send SOS SMS with GPS Link</span>
                </div>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            <button
              onClick={cancelSos}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-xs"
            >
              Dismiss / Mark Safe
            </button>
          </div>
        )}

        <div className="text-[10px] font-mono text-slate-500">
          ⚠️ ROADGUARD Emergency Protocol: Browsers trigger OS telephony handlers; always maintain voice contact with emergency responders.
        </div>
      </div>
    </div>
  );
};
