import React, { useState } from 'react';
import {
  LifeBuoy,
  Plus,
  Trash2,
  Phone,
  User,
  ShieldCheck,
  Activity,
  Smartphone,
  Flame,
  Radio,
  Sparkles,
} from 'lucide-react';
import { useSafety } from '../../context/SafetyContext';
import { useTacticalAudio } from '../../context/AudioContext';

export const SosSettings: React.FC = () => {
  const {
    emergencyContacts,
    addEmergencyContact,
    removeEmergencyContact,
    triggerSos,
    addToast,
  } = useSafety();

  const [name, setName] = useState('');
  const [relationship, setRelationship] = useState('');
  const [phone, setPhone] = useState('');
  const [crashSensorActive, setCrashSensorActive] = useState(true);
  const [shakeSensorActive, setShakeSensorActive] = useState(true);
  const [locationSharing, setLocationSharing] = useState(true);
  const audio = useTacticalAudio();

  const handleAddContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    audio.playSuccess();
    addEmergencyContact({
      name,
      relationship: relationship || 'Family',
      phone,
      isPrimary: emergencyContacts.length === 0,
    });
    setName('');
    setRelationship('');
    setPhone('');
  };

  const handleSimulateCrash = () => {
    audio.playAlert();
    triggerSos('crash');
  };

  return (
    <div className="p-4 lg:p-8 space-y-6 max-w-5xl mx-auto w-full pb-24 md:pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0B1422] border border-white/[0.08] p-5 rounded-3xl backdrop-blur-md">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-widest text-rose-400 font-bold">
              PERSONAL SAFETY SUITE
            </span>
            <span className="h-2 w-2 rounded-full bg-rose-500 animate-ping" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white mt-1">
            Emergency SOS & Sensor Telemetry
          </h1>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            Automated impact threshold triggers, trusted contacts circle, and rapid dispatch fallback
          </p>
        </div>

        <button
          onClick={handleSimulateCrash}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-mono font-bold tracking-wider uppercase border border-rose-400/40 shadow-[0_0_20px_rgba(239,68,68,0.4)] active:scale-95 transition-all"
        >
          <Flame className="w-4 h-4 animate-pulse text-amber-300" />
          <span>SIMULATE CRASH IMPACT</span>
        </button>
      </div>

      {/* Grid: Emergency Contacts & Sensor Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Trusted Contacts Circle */}
        <div className="lg:col-span-7 space-y-5">
          <div className="p-6 rounded-3xl bg-[#0B1422] border border-white/[0.08] space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-lg text-white">
                Trusted Emergency Contacts ({emergencyContacts.length})
              </h3>
              <span className="text-xs font-mono text-slate-400">INSTANT BROADCAST</span>
            </div>

            <div className="space-y-2.5">
              {emergencyContacts.map((contact) => (
                <div
                  key={contact.id}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-[#101A29] border border-white/[0.06]"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center font-mono font-bold text-xs">
                      {contact.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-white text-sm flex items-center gap-1.5">
                        <span>{contact.name}</span>
                        {contact.isPrimary && (
                          <span className="text-[9px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-1.5 py-0.2 rounded font-bold">
                            PRIMARY
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-400 font-mono">
                        {contact.relationship} • {contact.phone}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      audio.playClick();
                      removeEmergencyContact(contact.id);
                    }}
                    className="p-2 text-slate-500 hover:text-rose-400 rounded-lg transition-colors"
                    aria-label="Remove contact"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add Contact Form */}
            <form onSubmit={handleAddContact} className="pt-3 border-t border-white/[0.06] space-y-3">
              <span className="text-xs font-mono text-slate-300 uppercase tracking-wider block">
                ADD NEW EMERGENCY CONTACT:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-[#101A29] border border-white/[0.1] rounded-xl px-3 py-2 text-xs font-mono text-white outline-none"
                  required
                />
                <input
                  type="text"
                  placeholder="Relationship (e.g. Parent)"
                  value={relationship}
                  onChange={(e) => setRelationship(e.target.value)}
                  className="bg-[#101A29] border border-white/[0.1] rounded-xl px-3 py-2 text-xs font-mono text-white outline-none"
                />
                <input
                  type="tel"
                  placeholder="Phone (+91...)"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="bg-[#101A29] border border-white/[0.1] rounded-xl px-3 py-2 text-xs font-mono text-white outline-none"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Add to SOS Broadcast Circle</span>
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Hardware Sensors & Triggers */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-3xl bg-[#0B1422] border border-white/[0.08] space-y-4">
            <h3 className="font-display font-bold text-lg text-white">
              Hardware Sensors & Telemetry
            </h3>

            {/* Sensor 1: G-Force Crash Sensor */}
            <div
              onClick={() => setCrashSensorActive(!crashSensorActive)}
              className="p-4 rounded-2xl bg-[#101A29] border border-white/[0.06] flex items-center justify-between cursor-pointer hover:border-white/[0.15] transition-all"
            >
              <div className="space-y-0.5">
                <div className="text-xs font-mono font-bold text-white uppercase">
                  G-Force Impact Detection
                </div>
                <div className="text-[11px] text-slate-400">
                  Monitors sudden deceleration &gt;4.2G
                </div>
              </div>
              <div
                className={`w-10 h-5 rounded-full transition-colors flex items-center px-1 ${
                  crashSensorActive ? 'bg-emerald-600' : 'bg-slate-700'
                }`}
              >
                <div
                  className={`w-3.5 h-3.5 rounded-full bg-white transition-transform ${
                    crashSensorActive ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </div>
            </div>

            {/* Sensor 2: Shake-to-SOS */}
            <div
              onClick={() => setShakeSensorActive(!shakeSensorActive)}
              className="p-4 rounded-2xl bg-[#101A29] border border-white/[0.06] flex items-center justify-between cursor-pointer hover:border-white/[0.15] transition-all"
            >
              <div className="space-y-0.5">
                <div className="text-xs font-mono font-bold text-white uppercase">
                  Shake-to-SOS Gesture
                </div>
                <div className="text-[11px] text-slate-400">
                  Rapid device shake activates countdown
                </div>
              </div>
              <div
                className={`w-10 h-5 rounded-full transition-colors flex items-center px-1 ${
                  shakeSensorActive ? 'bg-emerald-600' : 'bg-slate-700'
                }`}
              >
                <div
                  className={`w-3.5 h-3.5 rounded-full bg-white transition-transform ${
                    shakeSensorActive ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </div>
            </div>

            {/* Sensor 3: Continuous Location Sharing */}
            <div
              onClick={() => setLocationSharing(!locationSharing)}
              className="p-4 rounded-2xl bg-[#101A29] border border-white/[0.06] flex items-center justify-between cursor-pointer hover:border-white/[0.15] transition-all"
            >
              <div className="space-y-0.5">
                <div className="text-xs font-mono font-bold text-white uppercase">
                  High-Precision GPS Beacon
                </div>
                <div className="text-[11px] text-slate-400">
                  Transmit sub-10m coordinates to Modinagar PCR
                </div>
              </div>
              <div
                className={`w-10 h-5 rounded-full transition-colors flex items-center px-1 ${
                  locationSharing ? 'bg-emerald-600' : 'bg-slate-700'
                }`}
              >
                <div
                  className={`w-3.5 h-3.5 rounded-full bg-white transition-transform ${
                    locationSharing ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </div>
            </div>

            {/* Live Sensor Telemetry Monitor */}
            <div className="p-3.5 rounded-2xl bg-[#070D17] border border-white/[0.06] font-mono text-[11px] space-y-1.5 text-slate-300">
              <div className="flex justify-between text-slate-400">
                <span>ACCELEROMETER:</span>
                <span className="text-emerald-400">0.98 G (STABLE)</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>GYROSCOPE:</span>
                <span className="text-emerald-400">0.02 RAD/S</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>PERMISSION STATE:</span>
                <span className="text-blue-300">ACTIVE (DEMO SIM)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
