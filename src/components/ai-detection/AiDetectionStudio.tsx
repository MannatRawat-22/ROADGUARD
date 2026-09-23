import React, { useState, useEffect } from 'react';
import {
  Eye,
  Scan,
  ShieldCheck,
  AlertTriangle,
  Upload,
  Play,
  RotateCcw,
  Sparkles,
  CheckCircle,
  XCircle,
  Send,
  Camera,
  Layers,
  Activity,
  Cpu,
} from 'lucide-react';
import { useSafety } from '../../context/SafetyContext';
import { useTacticalAudio } from '../../context/AudioContext';

interface SampleFeed {
  id: string;
  title: string;
  source: string;
  type: string;
  imageUrl: string;
  confidence: number;
  detectionLabel: string;
  box: { top: string; left: string; width: string; height: string };
  location: string;
  description: string;
}

export const AiDetectionStudio: React.FC = () => {
  const { verifyIncident, addToast, setCurrentView } = useSafety();
  const audio = useTacticalAudio();

  const sampleFeeds: SampleFeed[] = [
    {
      id: 'feed-1',
      title: 'CCTV Camera #04 — Main Chowk Junction',
      source: 'Municipal Traffic Cam Feed',
      type: 'accident',
      imageUrl: 'https://images.unsplash.com/photo-1543465077-db45d34b88a5?w=800&auto=format&fit=crop&q=70',
      confidence: 94.8,
      detectionLabel: 'Possible Vehicle Collision',
      box: { top: '35%', left: '42%', width: '38%', height: '45%' },
      location: 'MG Road Junction near Main Chowk',
      description: 'Computer vision flagged sudden velocity deceleration & multi-vehicle contact signature.',
    },
    {
      id: 'feed-2',
      title: 'Dashcam Live Stream #81 — NH-58 North',
      source: 'Connected Transit Dashcam',
      type: 'pothole',
      imageUrl: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=800&auto=format&fit=crop&q=70',
      confidence: 89.2,
      detectionLabel: 'Potential Pothole Cavity',
      box: { top: '55%', left: '30%', width: '40%', height: '35%' },
      location: 'NH-58 Northbound Lane 2',
      description: 'Surface depth gradient discrepancy detected (>12 cm estimated depth).',
    },
    {
      id: 'feed-3',
      title: 'Optical Sensor #12 — GT Road Shastri Nagar',
      source: 'Smart City Weather Pole',
      type: 'low_visibility',
      imageUrl: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=800&auto=format&fit=crop&q=70',
      confidence: 96.5,
      detectionLabel: 'Dense Fog Cloud Pocket',
      box: { top: '15%', left: '15%', width: '70%', height: '65%' },
      location: 'GT Road, Modinagar',
      description: 'Visual contrast attenuation below 140 meters optical threshold.',
    },
  ];

  const [selectedFeed, setSelectedFeed] = useState<SampleFeed>(sampleFeeds[0]);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanProgress, setScanProgress] = useState<number>(0);
  const [showAnalysis, setShowAnalysis] = useState<boolean>(true);
  const [statusState, setStatusState] = useState<'pending' | 'verified' | 'dismissed'>('pending');

  const startAnalysis = (feed: SampleFeed) => {
    audio.playPing();
    setSelectedFeed(feed);
    setIsScanning(true);
    setScanProgress(0);
    setShowAnalysis(false);
    setStatusState('pending');

    let current = 0;
    const interval = setInterval(() => {
      current += 20;
      setScanProgress(current);
      if (current >= 100) {
        clearInterval(interval);
        setIsScanning(false);
        setShowAnalysis(true);
        audio.playAlert();
      }
    }, 180);
  };

  const handleVerify = () => {
    audio.playVerify();
    setStatusState('verified');
    addToast({
      title: 'AI Detection Verified',
      message: `${selectedFeed.detectionLabel} confirmed by human operator. Patrol notified.`,
      type: 'success',
    });
  };

  const handleDismiss = () => {
    audio.playClick();
    setStatusState('dismissed');
    addToast({
      title: 'AI Detection Dismissed',
      message: 'Marked as false-positive or non-critical.',
      type: 'info',
    });
  };

  return (
    <div className="p-4 lg:p-8 space-y-6 max-w-7xl mx-auto w-full pb-24 md:pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0B1422] border border-white/[0.08] p-5 rounded-3xl backdrop-blur-md">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-widest text-indigo-400 font-bold">
              COMPUTER VISION LAB
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
              YOLO-v11 ROADGUARD MODEL
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white mt-1">
            AI-Assisted Detection Studio
          </h1>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            Automated collision, cavity, and visibility classification stream with human-in-the-loop verification
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => startAnalysis(selectedFeed)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-mono font-semibold tracking-wider uppercase border border-indigo-400/40 shadow-[0_0_20px_rgba(99,102,241,0.4)] active:scale-95 transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            <span>RUN AI INFERENCE</span>
          </button>
        </div>
      </div>

      {/* Main Studio Viewport */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Video / Frame Analysis Viewport */}
        <div className="lg:col-span-8 space-y-4">
          <div className="relative rounded-3xl bg-[#070D17] border border-white/[0.12] overflow-hidden shadow-2xl">
            {/* Top Telemetry Overlay */}
            <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between pointer-events-none">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#070D17]/80 backdrop-blur-md border border-white/[0.1] text-[11px] font-mono text-slate-300">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                <span className="text-white font-bold">{selectedFeed.title}</span>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-[#070D17]/80 backdrop-blur-md border border-white/[0.1] text-[11px] font-mono text-indigo-300">
                FPS: 29.97 • LATENCY: 42ms
              </div>
            </div>

            {/* Frame Image View */}
            <div className="relative h-[340px] sm:h-[440px] w-full bg-slate-950 flex items-center justify-center overflow-hidden">
              <img
                src={selectedFeed.imageUrl}
                alt="AI Feed Analysis"
                className="w-full h-full object-cover filter brightness-90 contrast-110"
              />

              {/* Laser Scanning Grid Animation */}
              {isScanning && (
                <div className="absolute inset-0 bg-indigo-500/10 flex flex-col justify-center">
                  <div className="w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_20px_#22d3ee] animate-pulse" />
                  <div className="absolute inset-0 tactical-grid-bg opacity-70" />
                </div>
              )}

              {/* Bounding Box Render */}
              {showAnalysis && (
                <div
                  className="absolute border-2 border-dashed border-rose-500 bg-rose-500/10 rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(244,63,94,0.4)]"
                  style={{
                    top: selectedFeed.box.top,
                    left: selectedFeed.box.left,
                    width: selectedFeed.box.width,
                    height: selectedFeed.box.height,
                  }}
                >
                  <div className="absolute -top-7 left-0 px-2 py-0.5 rounded bg-rose-600 text-white text-[10px] font-mono font-bold whitespace-nowrap shadow-md flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3" />
                    <span>{selectedFeed.detectionLabel} ({selectedFeed.confidence}%)</span>
                  </div>
                </div>
              )}
            </div>

            {/* Scan Progress Bar */}
            {isScanning && (
              <div className="p-4 bg-[#0B1422] border-t border-white/[0.08] flex items-center gap-3">
                <Cpu className="w-4 h-4 text-indigo-400 animate-spin" />
                <div className="flex-1">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-300 mb-1">
                    <span>Neural Network Processing...</span>
                    <span>{scanProgress}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-500 rounded-full transition-all duration-150"
                      style={{ width: `${scanProgress}%` }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sample Feed Switcher Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {sampleFeeds.map((feed) => (
              <button
                key={feed.id}
                onClick={() => startAnalysis(feed)}
                className={`p-3 rounded-2xl border text-left transition-all ${
                  selectedFeed.id === feed.id
                    ? 'bg-indigo-950/40 border-indigo-500 text-white shadow-[0_0_15px_rgba(99,102,241,0.2)]'
                    : 'bg-[#0B1422] border-white/[0.08] text-slate-400 hover:border-white/[0.2]'
                }`}
              >
                <div className="text-xs font-mono font-semibold truncate text-white">
                  {feed.title}
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5 truncate">
                  {feed.location}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: AI Telemetry & Operator Verification Controls */}
        <div className="lg:col-span-4 space-y-4">
          {/* AI Result Card */}
          <div className="p-6 rounded-3xl bg-[#0B1422] border border-white/[0.08] space-y-5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">
                INFERENCE TELEMETRY
              </span>
              <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-mono font-bold uppercase">
                AI-ASSISTED DETECTION
              </span>
            </div>

            <div>
              <h3 className="font-display font-extrabold text-xl text-white">
                {selectedFeed.detectionLabel}
              </h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                {selectedFeed.description}
              </p>
            </div>

            {/* Confidence Metric */}
            <div className="p-4 rounded-2xl bg-[#101A29] border border-white/[0.06] space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">MODEL CONFIDENCE:</span>
                <span className="text-emerald-400 font-bold text-sm">
                  {selectedFeed.confidence}%
                </span>
              </div>
              <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-emerald-400 rounded-full"
                  style={{ width: `${selectedFeed.confidence}%` }}
                />
              </div>
              <div className="text-[10px] font-mono text-slate-500 flex justify-between">
                <span>Threshold: 75%</span>
                <span>High Accuracy Flag</span>
              </div>
            </div>

            {/* Status Pill */}
            <div className="p-3 rounded-xl bg-[#070D17] border border-white/[0.06] text-xs font-mono flex items-center justify-between">
              <span className="text-slate-400">VERIFICATION STATE:</span>
              {statusState === 'verified' ? (
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" />
                  VERIFIED BY OPERATOR
                </span>
              ) : statusState === 'dismissed' ? (
                <span className="text-slate-400 font-bold flex items-center gap-1">
                  <XCircle className="w-3.5 h-3.5" />
                  DISMISSED (FALSE POSITIVE)
                </span>
              ) : (
                <span className="text-amber-400 font-bold flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5 animate-pulse" />
                  NEEDS HUMAN REVIEW
                </span>
              )}
            </div>

            {/* Verification Actions */}
            <div className="space-y-2.5 pt-2">
              <button
                onClick={handleVerify}
                disabled={statusState === 'verified'}
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-mono text-xs font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(34,197,94,0.3)] transition-all flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-4 h-4" />
                <span>VERIFY & DISPATCH RESPONSE</span>
              </button>

              <button
                onClick={handleDismiss}
                disabled={statusState === 'dismissed'}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-xs transition-all flex items-center justify-center gap-2"
              >
                <XCircle className="w-4 h-4" />
                <span>DISMISS / FALSE ALARM</span>
              </button>
            </div>

            <div className="pt-2 border-t border-white/[0.06] text-center">
              <span className="text-[10px] font-mono text-slate-400">
                ⚠️ Legal Notice: All AI vision detections require operator verification before dispatch.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
