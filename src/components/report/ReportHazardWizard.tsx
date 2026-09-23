import React, { useState } from 'react';
import {
  AlertTriangle,
  MapPin,
  Camera,
  FileText,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Upload,
  Eye,
  ShieldCheck,
  Radio,
  Image as ImageIcon,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { useSafety } from '../../context/SafetyContext';
import { useTacticalAudio } from '../../context/AudioContext';
import { IncidentType, SeverityLevel } from '../../types';

export const ReportHazardWizard: React.FC = () => {
  const { addHazardReport, setCurrentView } = useSafety();
  const audio = useTacticalAudio();

  const [step, setStep] = useState<number>(1);
  const [hazardType, setHazardType] = useState<IncidentType>('pothole');
  const [locationName, setLocationName] = useState<string>('MG Road near Main Chowk, Modinagar');
  const [severity, setSeverity] = useState<SeverityLevel>('moderate');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [isAnonymous, setIsAnonymous] = useState<boolean>(true);
  const [submittedReportId, setSubmittedReportId] = useState<string | null>(null);

  const hazardOptions = [
    { type: 'accident' as IncidentType, label: 'Accident / Collision', icon: '🚨', desc: 'Vehicle impact, overturned vehicle, blocked lane' },
    { type: 'pothole' as IncidentType, label: 'Pothole / Road Cavity', icon: '🕳️', desc: 'Dangerous asphalt dip, sharp rim-damaging edges' },
    { type: 'obstruction' as IncidentType, label: 'Road Obstruction', icon: '🚧', desc: 'Fallen barricades, construction gravel, tree branches' },
    { type: 'low_visibility' as IncidentType, label: 'Poor Visibility / Dense Fog', icon: '🌫️', desc: 'Sudden optical drop below 150 meters' },
    { type: 'waterlogging' as IncidentType, label: 'Waterlogging / Flooding', icon: '🌊', desc: 'Underpass accumulation, deep monsoon puddle' },
    { type: 'damaged_road' as IncidentType, label: 'Damaged Road / Trench', icon: '⚠️', desc: 'Uncovered utility wiring digging, missing manhole' },
    { type: 'other' as IncidentType, label: 'Other Safety Hazard', icon: '🛑', desc: 'Broken street lamps, missing road signs' },
  ];

  const samplePresets = [
    { name: 'MG Road Junction', loc: 'MG Road near Main Chowk, Modinagar' },
    { name: 'NH-58 Corridor', loc: 'NH-58 Northbound Lane 2, Modinagar' },
    { name: 'GT Road Link', loc: 'GT Road near Shastri Nagar Crossing' },
    { name: 'Railway Road', loc: 'Railway Road Link, Modinagar' },
    { name: 'Campus Hostels', loc: 'Hostel Road near Gate 3, SRM Modinagar' },
  ];

  const handleNext = () => {
    audio.playClick();
    if (step < 5) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    audio.playClick();
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const reportId = addHazardReport({
      type: hazardType,
      locationName,
      description: description || `Reported ${hazardType.replace('_', ' ')} hazard at ${locationName}. Caution advised.`,
      severity,
      image: imageUrl || undefined,
      isAnonymous,
    });
    setSubmittedReportId(reportId);
    setStep(6); // Success confirmation state
  };

  const handleReset = () => {
    audio.playClick();
    setStep(1);
    setHazardType('pothole');
    setDescription('');
    setImageUrl('');
    setSubmittedReportId(null);
  };

  return (
    <div className="p-4 lg:p-8 max-w-3xl mx-auto w-full pb-24 md:pb-8">
      {/* Wizard Card Header */}
      <div className="p-6 rounded-3xl bg-[#0B1422] border border-white/[0.08] backdrop-blur-md mb-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono tracking-widest text-blue-400 uppercase font-bold">
              CITIZEN SAFETY TELEMETRY
            </span>
            <h1 className="text-2xl font-display font-extrabold text-white mt-0.5">
              Report Road Hazard
            </h1>
          </div>
          {step <= 5 && (
            <div className="text-right">
              <span className="text-xs font-mono text-slate-400">STEP</span>
              <div className="font-display font-bold text-lg text-white">
                0{step} <span className="text-xs text-slate-500 font-normal">/ 05</span>
              </div>
            </div>
          )}
        </div>

        {/* Progress Step Bar */}
        {step <= 5 && (
          <div className="grid grid-cols-5 gap-1.5 mt-4">
            {[1, 2, 3, 4, 5].map((s) => (
              <div
                key={s}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  s <= step ? 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]' : 'bg-slate-800'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Main Step Container */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#101A29] border border-white/[0.1] shadow-2xl relative">
        {/* Step 1: Hazard Type */}
        {step === 1 && (
          <div className="space-y-4 animate-in fade-in">
            <h2 className="text-lg font-display font-bold text-white">
              1. What type of hazard are you reporting?
            </h2>
            <p className="text-xs text-slate-400">
              Select the most accurate category to help AI and highway response units prioritize.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {hazardOptions.map((opt) => (
                <button
                  key={opt.type}
                  type="button"
                  onClick={() => {
                    audio.playClick();
                    setHazardType(opt.type);
                  }}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    hazardType === opt.type
                      ? 'bg-blue-600/20 border-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.2)]'
                      : 'bg-[#0B1422] border-white/[0.06] text-slate-300 hover:border-white/[0.15]'
                  }`}
                >
                  <div className="text-2xl mb-2">{opt.icon}</div>
                  <div className="font-semibold text-sm">{opt.label}</div>
                  <div className="text-[11px] text-slate-400 mt-1">{opt.desc}</div>
                </button>
              ))}
            </div>

            <div className="pt-4 flex justify-end">
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all"
              >
                <span>Continue to Location</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Location */}
        {step === 2 && (
          <div className="space-y-5 animate-in fade-in">
            <div>
              <h2 className="text-lg font-display font-bold text-white">
                2. Where is this hazard located?
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Select a recognized road corridor or enter specific landmark details.
              </p>
            </div>

            {/* Quick Sector Presets */}
            <div>
              <label className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-2">
                QUICK SELECT HIGHWAY / STREET:
              </label>
              <div className="flex flex-wrap gap-2">
                {samplePresets.map((p) => (
                  <button
                    key={p.name}
                    type="button"
                    onClick={() => {
                      audio.playClick();
                      setLocationName(p.loc);
                    }}
                    className={`px-3 py-1.5 rounded-xl border text-xs font-mono transition-all ${
                      locationName === p.loc
                        ? 'bg-blue-600/30 border-blue-400 text-blue-200'
                        : 'bg-[#0B1422] border-white/[0.08] text-slate-400 hover:text-white'
                    }`}
                  >
                    {p.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Location Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-slate-300">
                Detailed Location / Landmark Description:
              </label>
              <div className="flex items-center bg-[#0B1422] border border-white/[0.12] rounded-xl px-3 py-2.5">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mr-2" />
                <input
                  type="text"
                  value={locationName}
                  onChange={(e) => setLocationName(e.target.value)}
                  placeholder="e.g. MG Road, 200m ahead of Main Chowk"
                  className="bg-transparent border-none outline-none text-xs text-white font-mono w-full"
                />
              </div>
            </div>

            {/* Severity Rating */}
            <div className="space-y-2">
              <label className="text-xs font-mono text-slate-300">
                Estimated Severity Level:
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {(['moderate', 'high', 'critical'] as SeverityLevel[]).map((sev) => (
                  <button
                    key={sev}
                    type="button"
                    onClick={() => {
                      audio.playClick();
                      setSeverity(sev);
                    }}
                    className={`py-2 px-3 rounded-xl border font-mono text-xs uppercase font-bold tracking-wider transition-all ${
                      severity === sev
                        ? sev === 'critical'
                          ? 'bg-rose-500/20 border-rose-500 text-rose-300'
                          : sev === 'high'
                          ? 'bg-orange-500/20 border-orange-500 text-orange-300'
                          : 'bg-amber-500/20 border-amber-500 text-amber-300'
                        : 'bg-[#0B1422] border-white/[0.08] text-slate-400'
                    }`}
                  >
                    {sev}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between">
              <button
                onClick={handleBack}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-mono"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold uppercase tracking-wider"
              >
                <span>Continue to Photo</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Optional Image Upload */}
        {step === 3 && (
          <div className="space-y-5 animate-in fade-in">
            <div>
              <h2 className="text-lg font-display font-bold text-white">
                3. Add Photo / Dashcam Evidence (Optional)
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Visual proof speeds up authority verification and automatically triggers AI vision classification.
              </p>
            </div>

            {/* Upload Area */}
            <div className="p-6 rounded-2xl bg-[#0B1422] border-2 border-dashed border-white/[0.15] hover:border-blue-500/50 flex flex-col items-center justify-center text-center transition-all">
              <Upload className="w-8 h-8 text-blue-400 mb-2" />
              <div className="text-sm font-semibold text-white">
                Drag and drop image or browse files
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Supports JPG, PNG, WEBP (Max 15MB)
              </p>

              {/* Sample simulated photo triggers */}
              <div className="mt-4 pt-4 border-t border-white/[0.06] w-full">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-2">
                  SIMULATE CAMERA SNAPSHOT:
                </span>
                <div className="flex flex-wrap justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      audio.playClick();
                      setImageUrl('https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=600&auto=format&fit=crop&q=60');
                    }}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-blue-300 border border-blue-500/30"
                  >
                    📷 Road Pothole Sample
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      audio.playClick();
                      setImageUrl('https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=600&auto=format&fit=crop&q=60');
                    }}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-amber-300 border border-amber-500/30"
                  >
                    📷 Low Fog Sample
                  </button>
                </div>
              </div>
            </div>

            {/* Preview Image if present */}
            {imageUrl && (
              <div className="relative rounded-2xl overflow-hidden border border-white/[0.15]">
                <img
                  src={imageUrl}
                  alt="Hazard Snapshot Preview"
                  className="w-full h-44 object-cover"
                />
                <button
                  type="button"
                  onClick={() => setImageUrl('')}
                  className="absolute top-2 right-2 px-2.5 py-1 rounded-lg bg-rose-600/90 text-white font-mono text-xs"
                >
                  Remove Photo
                </button>
              </div>
            )}

            <div className="pt-4 flex items-center justify-between">
              <button
                onClick={handleBack}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-mono"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold uppercase tracking-wider"
              >
                <span>Continue to Description</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Description & Anonymous Option */}
        {step === 4 && (
          <div className="space-y-5 animate-in fade-in">
            <div>
              <h2 className="text-lg font-display font-bold text-white">
                4. Description & Privacy Options
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Provide helpful notes for incoming traffic and emergency crews.
              </p>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-slate-300">
                Hazard Notes & Impact Details:
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                placeholder="e.g. Deep pothole across the right lane. Causing cars to swerve suddenly into oncoming lane. Needs patching."
                className="w-full bg-[#0B1422] border border-white/[0.12] rounded-2xl p-3.5 text-xs text-white font-sans placeholder-slate-500 outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            {/* Anonymous Toggle Pill */}
            <div
              onClick={() => setIsAnonymous(!isAnonymous)}
              className="p-4 rounded-2xl bg-[#0B1422] border border-white/[0.08] flex items-center justify-between cursor-pointer hover:border-blue-500/40 transition-all"
            >
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <div>
                  <div className="text-xs font-mono font-bold text-white uppercase">
                    ANONYMOUS REPORTING
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Your name and personal telemetry will remain confidential.
                  </div>
                </div>
              </div>
              <div
                className={`w-11 h-6 rounded-full transition-colors flex items-center px-1 ${
                  isAnonymous ? 'bg-blue-600' : 'bg-slate-700'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform ${
                    isAnonymous ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between">
              <button
                onClick={handleBack}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-mono"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold uppercase tracking-wider"
              >
                <span>Review & Submit</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 5: Review & Submit */}
        {step === 5 && (
          <div className="space-y-5 animate-in fade-in">
            <div>
              <h2 className="text-lg font-display font-bold text-white">
                5. Review Safety Telemetry Submission
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Please verify all data before transmitting to the ROADGUARD network.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#0B1422] border border-white/[0.08] space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
                <span className="text-slate-400">HAZARD TYPE:</span>
                <span className="text-white font-bold uppercase">{hazardType.replace('_', ' ')}</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
                <span className="text-slate-400">LOCATION:</span>
                <span className="text-blue-400 font-semibold">{locationName}</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
                <span className="text-slate-400">SEVERITY:</span>
                <span className="text-amber-400 font-bold uppercase">{severity}</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
                <span className="text-slate-400">PRIVACY:</span>
                <span className="text-emerald-400 font-semibold">
                  {isAnonymous ? 'Anonymous Citizen' : 'Public Profile'}
                </span>
              </div>
              {description && (
                <div className="pt-1 text-slate-300">
                  <span className="text-slate-400 block mb-1">NOTES:</span>
                  <p className="font-sans text-xs bg-[#101A29] p-2.5 rounded-xl border border-white/[0.04]">
                    {description}
                  </p>
                </div>
              )}
            </div>

            <div className="pt-4 flex items-center justify-between">
              <button
                onClick={handleBack}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-mono"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                onClick={handleSubmit}
                className="flex items-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white font-mono text-xs font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(34,197,94,0.3)] active:scale-95 transition-all"
              >
                <span>TRANSMIT REPORT</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 6: Confirmation State */}
        {step === 6 && (
          <div className="space-y-6 text-center py-6 animate-in zoom-in-95">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 shadow-[0_0_25px_rgba(34,197,94,0.4)]">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold">
                TRANSMISSION CONFIRMED
              </span>
              <h2 className="text-2xl font-display font-extrabold text-white mt-2">
                Hazard Report #{submittedReportId}
              </h2>
              <p className="text-xs text-slate-300 max-w-md mx-auto mt-2">
                Your report has been broadcasted to the local telemetry grid and queued for traffic authority review.
              </p>
            </div>

            {/* Tracking Status Card */}
            <div className="p-4 rounded-2xl bg-[#0B1422] border border-white/[0.08] max-w-md mx-auto text-left font-mono text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">STATUS:</span>
                <span className="text-amber-400 font-bold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                  PENDING VERIFICATION
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">CORRIDOR:</span>
                <span className="text-slate-200">{locationName}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">IMPACT RATING:</span>
                <span className="text-rose-400 uppercase font-bold">+{severity === 'critical' ? '12' : '4'} RISK POINTS</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setCurrentView('map')}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-semibold tracking-wider uppercase transition-all"
              >
                View on Live Map
              </button>
              <button
                onClick={handleReset}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-mono text-xs transition-all flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Submit Another Report</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
