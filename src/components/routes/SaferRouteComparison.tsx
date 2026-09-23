import React, { useState } from 'react';
import {
  GitCompare,
  Navigation,
  Shield,
  Clock,
  AlertTriangle,
  Eye,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Volume2,
  StopCircle,
  Compass,
} from 'lucide-react';
import { useSafety } from '../../context/SafetyContext';
import { useTacticalAudio } from '../../context/AudioContext';
import { RiskBadge } from '../common/RiskBadge';
import { SaferRoute } from '../../types';

export const SaferRouteComparison: React.FC = () => {
  const {
    routes,
    activeRoute,
    setActiveRoute,
    isNavigating,
    setIsNavigating,
    setCurrentView,
    addToast,
  } = useSafety();

  const [selectedRouteId, setSelectedRouteId] = useState<string>('route-safer');
  const [navStepIndex, setNavStepIndex] = useState<number>(0);
  const audio = useTacticalAudio();

  const currentRoute = routes.find((r) => r.id === selectedRouteId) || routes[0];

  const handleSelectRoute = (route: SaferRoute) => {
    audio.playClick();
    setSelectedRouteId(route.id);
    setActiveRoute(route);
  };

  const handleStartNavigation = () => {
    audio.playAlert();
    setActiveRoute(currentRoute);
    setIsNavigating(true);
    setNavStepIndex(0);
    addToast({
      title: 'Navigation Started',
      message: `Following ${currentRoute.name}. Hazard warnings active.`,
      type: 'info',
    });
  };

  const handleStopNavigation = () => {
    audio.playClick();
    setIsNavigating(false);
    addToast({
      title: 'Navigation Ended',
      message: 'Arrived at destination safely.',
      type: 'success',
    });
  };

  const handleNextStep = () => {
    audio.playClick();
    if (navStepIndex < currentRoute.steps.length - 1) {
      setNavStepIndex(navStepIndex + 1);
    }
  };

  return (
    <div className="p-4 lg:p-8 space-y-6 max-w-6xl mx-auto w-full pb-24 md:pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0B1422] border border-white/[0.08] p-5 rounded-3xl backdrop-blur-md">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">
              AI RISK-AWARE ROUTING
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold">
              DYNAMIC RISK OPTIMIZER
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white mt-1">
            Safer Route Comparison
          </h1>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            Compare travel time vs calculated accident probability along Modinagar sectors
          </p>
        </div>

        {/* Start Navigation CTA */}
        <div>
          {!isNavigating ? (
            <button
              onClick={handleStartNavigation}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-mono font-bold tracking-wider uppercase shadow-[0_0_20px_rgba(34,197,94,0.4)] active:scale-95 transition-all"
            >
              <Navigation className="w-4 h-4" />
              <span>START GUIDED NAVIGATION</span>
            </button>
          ) : (
            <button
              onClick={handleStopNavigation}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-mono font-bold tracking-wider uppercase shadow-[0_0_20px_rgba(239,68,68,0.4)] active:scale-95 transition-all"
            >
              <StopCircle className="w-4 h-4" />
              <span>STOP NAVIGATION</span>
            </button>
          )}
        </div>
      </div>

      {/* Origin & Destination Bar */}
      <div className="p-4 rounded-2xl bg-[#101A29] border border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="flex flex-col items-center">
            <span className="w-3 h-3 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
            <span className="w-0.5 h-6 bg-slate-700" />
            <span className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
          </div>
          <div className="space-y-1 text-xs font-mono">
            <div>
              <span className="text-slate-400">FROM: </span>
              <span className="text-white font-semibold">SRM Campus / College Gate 1</span>
            </div>
            <div>
              <span className="text-slate-400">TO: </span>
              <span className="text-blue-300 font-semibold">Campus Hostel Complex</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            audio.playClick();
            setCurrentView('map');
          }}
          className="w-full sm:w-auto px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-mono transition-all flex items-center justify-center gap-1.5"
        >
          <Navigation className="w-3.5 h-3.5 text-blue-400" />
          <span>View on Live Map</span>
        </button>
      </div>

      {/* Active Navigation HUD Simulator (if navigating) */}
      {isNavigating && (
        <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-950/60 via-[#0B1422] to-[#101A29] border-2 border-emerald-500 shadow-[0_0_30px_rgba(34,197,94,0.3)] space-y-4 animate-in zoom-in-95">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
              </span>
              <span className="font-mono text-xs font-bold text-emerald-400 uppercase tracking-widest">
                ACTIVE TURN-BY-TURN HUD (STEP {navStepIndex + 1} OF {currentRoute.steps.length})
              </span>
            </div>
            <span className="font-mono text-xs text-slate-300">
              ETA: {currentRoute.durationMinutes} MIN
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#070D17]/80 border border-white/[0.08]">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                <Compass className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <h3 className="font-display font-extrabold text-lg text-white">
                  {currentRoute.steps[navStepIndex].instruction}
                </h3>
                <p className="text-xs font-mono text-slate-400">
                  {currentRoute.steps[navStepIndex].roadName} • {currentRoute.steps[navStepIndex].distance}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {navStepIndex < currentRoute.steps.length - 1 ? (
                <button
                  onClick={handleNextStep}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold uppercase tracking-wider"
                >
                  Next Step ({navStepIndex + 2})
                </button>
              ) : (
                <button
                  onClick={handleStopNavigation}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold uppercase tracking-wider"
                >
                  Complete Trip
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Dual Route Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {routes.map((route) => {
          const isSelected = selectedRouteId === route.id;
          const isGreen = route.riskCategory === 'SAFE';

          return (
            <div
              key={route.id}
              onClick={() => handleSelectRoute(route)}
              className={`p-6 rounded-3xl border cursor-pointer transition-all duration-200 relative ${
                isSelected
                  ? isGreen
                    ? 'bg-gradient-to-b from-[#0e241b] to-[#0B1422] border-emerald-500 shadow-[0_0_30px_rgba(34,197,94,0.25)]'
                    : 'bg-gradient-to-b from-[#24170e] to-[#0B1422] border-orange-500 shadow-[0_0_30px_rgba(249,115,22,0.25)]'
                  : 'bg-[#101A29] border-white/[0.08] hover:border-white/[0.2]'
              }`}
            >
              {/* Badge Header */}
              <div className="flex items-start justify-between gap-2 mb-4">
                <div>
                  <span
                    className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded border ${
                      isGreen
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                        : 'bg-orange-500/20 text-orange-300 border-orange-500/40'
                    }`}
                  >
                    {isGreen ? 'RECOMMENDED: SAFER ROUTE' : 'DIRECT: FASTEST ROUTE'}
                  </span>
                  <h3 className="font-display font-extrabold text-xl text-white mt-1.5">
                    {route.name}
                  </h3>
                </div>
                <RiskBadge
                  category={route.riskCategory}
                  score={route.riskScore}
                  size="md"
                />
              </div>

              {/* Time & Distance Hero */}
              <div className="flex items-baseline gap-4 py-3 border-y border-white/[0.08]">
                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase">DURATION</span>
                  <div className="font-display font-extrabold text-3xl text-white">
                    {route.durationMinutes} <span className="text-sm font-normal text-slate-400">min</span>
                  </div>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase">DISTANCE</span>
                  <div className="font-display font-bold text-2xl text-slate-300">
                    {route.distanceKm} <span className="text-sm font-normal text-slate-400">km</span>
                  </div>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase">SAFETY DELTA</span>
                  <div className={`font-display font-bold text-xl ${isGreen ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {isGreen ? '+47 pts Safer' : '-47 pts Riskier'}
                  </div>
                </div>
              </div>

              {/* Safety Metrics Checklist */}
              <div className="mt-4 space-y-2 text-xs font-mono">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Reported Hazards:</span>
                  <span className={route.hazardCount === 0 ? 'text-emerald-400 font-bold' : 'text-orange-400 font-bold'}>
                    {route.hazardCount} Active Hazards
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Optical Visibility:</span>
                  <span className="text-slate-200">{route.visibility}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Recent Collision History:</span>
                  <span className={route.recentAccidents === 0 ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                    {route.recentAccidents === 0 ? 'Zero in last 24h' : '1 Collision on MG Road'}
                  </span>
                </div>
              </div>

              {/* Step By Step List */}
              <div className="mt-5 pt-4 border-t border-white/[0.08] space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block">
                  TURN-BY-TURN WAYPOINTS:
                </span>
                {route.steps.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-[#070D17]/60 border border-white/[0.04] text-xs flex items-center justify-between"
                  >
                    <span className="text-slate-300">{step.instruction}</span>
                    <span className="font-mono text-[10px] text-slate-400">{step.distance}</span>
                  </div>
                ))}
              </div>

              {/* Card Action Button */}
              <button
                onClick={() => handleSelectRoute(route)}
                className={`w-full mt-5 py-2.5 px-4 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                  isSelected
                    ? isGreen
                      ? 'bg-emerald-600 text-white shadow-lg'
                      : 'bg-orange-600 text-white shadow-lg'
                    : 'bg-slate-800 text-slate-300 hover:text-white'
                }`}
              >
                <span>{isSelected ? 'CURRENT SELECTED ROUTE' : 'CHOOSE THIS ROUTE'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
