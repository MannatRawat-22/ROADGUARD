import React, { useState } from 'react';
import {
  Compass,
  Crosshair,
  Car,
  ShieldAlert,
  FlameKindling,
  Search,
  Maximize2,
  Minimize2,
  Filter,
  Check,
  AlertOctagon,
} from 'lucide-react';
import { useSafety } from '../../context/SafetyContext';
import { useTacticalAudio } from '../../context/AudioContext';

interface MapControlsProps {
  onRecenter: () => void;
  onNorthUp: () => void;
  onSearchLocation: (query: string) => void;
}

export const MapControls: React.FC<MapControlsProps> = ({
  onRecenter,
  onNorthUp,
  onSearchLocation,
}) => {
  const {
    showTraffic,
    setShowTraffic,
    showRiskLayer,
    setShowRiskLayer,
    showIncidents,
    setShowIncidents,
    showHotspots,
    setShowHotspots,
    radiusKm,
    setRadiusKm,
  } = useSafety();

  const [searchQuery, setSearchQuery] = useState('');
  const [isLayerMenuOpen, setIsLayerMenuOpen] = useState(false);
  const audio = useTacticalAudio();

  const radii = [1, 2.4, 5, 10];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      audio.playClick();
      onSearchLocation(searchQuery);
    }
  };

  return (
    <div className="absolute top-4 left-4 right-4 z-[500] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pointer-events-none">
      {/* Search Input Bar */}
      <form
        onSubmit={handleSearchSubmit}
        className="pointer-events-auto flex items-center bg-[#101A29]/95 backdrop-blur-md border border-white/[0.12] rounded-2xl shadow-2xl px-3 py-2 w-full max-w-sm sm:max-w-md"
      >
        <Search className="w-4 h-4 text-slate-400 shrink-0 mr-2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search road, sector, or junction in Modinagar..."
          className="bg-transparent border-none outline-none text-xs text-slate-200 placeholder-slate-400 w-full font-mono"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              onSearchLocation('');
            }}
            className="text-[10px] font-mono text-slate-400 hover:text-white px-1.5"
          >
            CLEAR
          </button>
        )}
      </form>

      {/* Action Controls & Layer Toggles */}
      <div className="pointer-events-auto flex flex-wrap items-center gap-2">
        {/* Radius Filter Selector */}
        <div className="flex items-center bg-[#101A29]/95 backdrop-blur-md border border-white/[0.12] rounded-xl p-1 shadow-xl">
          <span className="text-[10px] font-mono text-slate-400 px-2 hidden lg:inline">
            RADIUS:
          </span>
          {radii.map((r) => (
            <button
              key={r}
              onClick={() => {
                audio.playClick();
                setRadiusKm(r);
              }}
              className={`px-2 py-1 rounded-lg text-[10px] font-mono font-bold transition-all ${
                radiusKm === r
                  ? 'bg-blue-600 text-white shadow-[0_0_8px_rgba(59,130,246,0.5)]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.05]'
              }`}
            >
              {r}km
            </button>
          ))}
        </div>

        {/* Tactical Layer Toggle Menu */}
        <div className="relative">
          <button
            onClick={() => {
              audio.playClick();
              setIsLayerMenuOpen(!isLayerMenuOpen);
            }}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl backdrop-blur-md border text-xs font-mono transition-all ${
              isLayerMenuOpen
                ? 'bg-blue-600/30 border-blue-500 text-blue-300'
                : 'bg-[#101A29]/95 border-white/[0.12] text-slate-300 hover:text-white'
            }`}
          >
            <Filter className="w-3.5 h-3.5 text-blue-400" />
            <span className="hidden sm:inline">LAYERS</span>
          </button>

          {isLayerMenuOpen && (
            <div className="absolute right-0 top-full mt-2 w-52 bg-[#101A29] border border-white/[0.12] rounded-2xl shadow-2xl p-2.5 space-y-1 z-50">
              <div className="px-2 py-1 text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                ACTIVE MAP LAYERS
              </div>

              {/* Traffic Toggle */}
              <button
                onClick={() => {
                  audio.playClick();
                  setShowTraffic(!showTraffic);
                }}
                className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs hover:bg-white/[0.04] text-slate-300"
              >
                <div className="flex items-center gap-2">
                  <Car className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Live Traffic Flow</span>
                </div>
                {showTraffic && <Check className="w-3.5 h-3.5 text-emerald-400" />}
              </button>

              {/* Road Risk Layer */}
              <button
                onClick={() => {
                  audio.playClick();
                  setShowRiskLayer(!showRiskLayer);
                }}
                className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs hover:bg-white/[0.04] text-slate-300"
              >
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                  <span>Road Risk Overlays</span>
                </div>
                {showRiskLayer && <Check className="w-3.5 h-3.5 text-emerald-400" />}
              </button>

              {/* Incidents Markers */}
              <button
                onClick={() => {
                  audio.playClick();
                  setShowIncidents(!showIncidents);
                }}
                className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs hover:bg-white/[0.04] text-slate-300"
              >
                <div className="flex items-center gap-2">
                  <AlertOctagon className="w-3.5 h-3.5 text-rose-400" />
                  <span>Active Incident Markers</span>
                </div>
                {showIncidents && <Check className="w-3.5 h-3.5 text-emerald-400" />}
              </button>

              {/* Hotspots */}
              <button
                onClick={() => {
                  audio.playClick();
                  setShowHotspots(!showHotspots);
                }}
                className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs hover:bg-white/[0.04] text-slate-300"
              >
                <div className="flex items-center gap-2">
                  <FlameKindling className="w-3.5 h-3.5 text-purple-400" />
                  <span>Risk Hotspot Clusters</span>
                </div>
                {showHotspots && <Check className="w-3.5 h-3.5 text-emerald-400" />}
              </button>
            </div>
          )}
        </div>

        {/* Recenter Button */}
        <button
          onClick={() => {
            audio.playClick();
            onRecenter();
          }}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#101A29]/95 backdrop-blur-md border border-white/[0.12] text-slate-300 hover:text-white shadow-xl hover:border-blue-500/50 transition-all text-xs font-mono"
          title="Recenter map on current location (Modinagar)"
        >
          <Crosshair className="w-3.5 h-3.5 text-blue-400" />
          <span className="hidden sm:inline">RECENTER</span>
        </button>

        {/* North-Up Orientation */}
        <button
          onClick={() => {
            audio.playClick();
            onNorthUp();
          }}
          className="p-2 rounded-xl bg-[#101A29]/95 backdrop-blur-md border border-white/[0.12] text-slate-300 hover:text-white shadow-xl hover:border-blue-500/50 transition-all"
          title="Align North-Up"
        >
          <Compass className="w-4 h-4 text-slate-400 hover:text-blue-400" />
        </button>
      </div>
    </div>
  );
};
