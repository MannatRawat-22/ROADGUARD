// Minimal Floating Audio Controller
import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { cosmosAudio } from '../../utils/audioSynthesizer';

export default function AudioController() {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleToggle = () => {
    const active = cosmosAudio.toggleMute();
    setIsPlaying(active);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 pointer-events-auto">
      <button
        onClick={handleToggle}
        className={`flex items-center space-x-2 px-3 py-2 rounded-full border backdrop-blur-md transition-all duration-300 ${
          isPlaying
            ? 'bg-cyan-950/60 border-cyan-500/40 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
            : 'bg-black/40 border-white/10 text-slate-400 hover:text-white hover:bg-black/60'
        }`}
        title={isPlaying ? 'Mute Space Soundscape' : 'Enable Space Soundscape (432Hz Drone)'}
      >
        {isPlaying ? (
          <>
            <Volume2 className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span className="text-[11px] font-medium tracking-wider uppercase hidden sm:inline">Audio On</span>
          </>
        ) : (
          <>
            <VolumeX className="w-4 h-4" />
            <span className="text-[11px] font-medium tracking-wider uppercase hidden sm:inline">Sound</span>
          </>
        )}
      </button>
    </div>
  );
}
