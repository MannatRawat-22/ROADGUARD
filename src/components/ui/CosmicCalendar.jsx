// Cosmic Calendar - Elegant Astronomical Timeline & Event Schedule
import React, { useState } from 'react';
import { Calendar, Sparkles, Rocket, Eye, ShieldCheck } from 'lucide-react';
import { COSMIC_CALENDAR_EVENTS } from '../../constants/celestialData';

export default function CosmicCalendar() {
  const [filter, setFilter] = useState('ALL');

  const categories = ['ALL', 'Solar Eclipse', 'Meteor Shower', 'Space Mission Launch', 'Planetary Event'];

  const filteredEvents = filter === 'ALL'
    ? COSMIC_CALENDAR_EVENTS
    : COSMIC_CALENDAR_EVENTS.filter(e => e.category === filter);

  return (
    <div className="w-full max-w-4xl mx-auto px-6 py-12 text-white">
      <div className="text-center mb-10">
        <span className="text-xs font-semibold tracking-[0.3em] uppercase text-cyan-400">Astronomical Ephemeris</span>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-widest uppercase font-cinzel mt-2">Cosmic Calendar</h2>
        <p className="text-sm text-slate-400 mt-2 font-light max-w-lg mx-auto">
          Verified celestial phenomena, orbital alignments, and upcoming deep space missions.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wider transition-all duration-300 ${
              filter === cat
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-sm'
                : 'bg-white/5 text-slate-400 border border-white/5 hover:text-white hover:bg-white/10'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Event Timeline Cards */}
      <div className="space-y-4">
        {filteredEvents.map((evt) => (
          <div
            key={evt.id}
            className="p-5 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-300"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
              <div className="flex items-center space-x-2.5">
                <span className="p-2 rounded-lg bg-cyan-950/60 border border-cyan-500/30 text-cyan-400">
                  <Calendar className="w-4 h-4" />
                </span>
                <div>
                  <h3 className="text-base font-semibold text-white tracking-wide font-cinzel">{evt.title}</h3>
                  <span className="text-xs text-amber-400/90 font-medium">{evt.date}</span>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-[11px] font-medium tracking-wider uppercase px-2.5 py-1 rounded-full bg-white/5 text-slate-300 border border-white/5">
                  {evt.category}
                </span>
                <span className="flex items-center space-x-1 text-[10px] text-emerald-400 bg-emerald-950/40 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                  <ShieldCheck className="w-3 h-3" />
                  <span>{evt.status}</span>
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed mb-3">
              {evt.details}
            </p>

            <div className="flex flex-wrap gap-4 text-xs text-slate-400 pt-3 border-t border-white/5">
              {evt.visibility && (
                <div>
                  <span className="text-slate-500 uppercase tracking-wider text-[10px] block">Visibility</span>
                  <span>{evt.visibility}</span>
                </div>
              )}
              {evt.totalityDuration && (
                <div>
                  <span className="text-slate-500 uppercase tracking-wider text-[10px] block">Totality Duration</span>
                  <span className="text-cyan-300">{evt.totalityDuration}</span>
                </div>
              )}
              {evt.zenithHourlyRate && (
                <div>
                  <span className="text-slate-500 uppercase tracking-wider text-[10px] block">Peak Rate</span>
                  <span className="text-amber-300">{evt.zenithHourlyRate}</span>
                </div>
              )}
              {evt.destination && (
                <div>
                  <span className="text-slate-500 uppercase tracking-wider text-[10px] block">Target Destination</span>
                  <span className="text-cyan-300">{evt.destination}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
