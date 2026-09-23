import React from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import {
  BarChart3,
  TrendingDown,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Download,
  Share2,
  Sparkles,
} from 'lucide-react';
import {
  ANALYTICS_SUMMARY,
  ACCIDENTS_BY_DAY,
  HAZARDS_BY_CATEGORY,
  RISK_DISTRIBUTION,
  HOURLY_VISIBILITY_TREND,
  REPORT_RESOLUTION_TIMELINE,
} from '../../data/analyticsData';
import { useTacticalAudio } from '../../context/AudioContext';
import { useSafety } from '../../context/SafetyContext';

export const AnalyticsDashboard: React.FC = () => {
  const audio = useTacticalAudio();
  const { addToast } = useSafety();

  const handleExportData = () => {
    audio.playSuccess();
    addToast({
      title: 'Safety Intelligence Report Exported',
      message: 'Downloaded 30-day municipal safety analytics summary (JSON format).',
      type: 'success',
    });
  };

  return (
    <div className="p-4 lg:p-8 space-y-6 max-w-7xl mx-auto w-full pb-24 md:pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0B1422] border border-white/[0.08] p-5 rounded-3xl backdrop-blur-md">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-widest text-blue-400 font-bold">
              ROAD SAFETY ANALYTICS ENGINE
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
              SIMULATED TELEMETRY
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white mt-1">
            Safety & Incident Intelligence
          </h1>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            Macro accident trends, hazard classification breakdown, and municipal response speeds
          </p>
        </div>

        <button
          onClick={handleExportData}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-mono font-medium transition-all"
        >
          <Download className="w-4 h-4 text-blue-400" />
          <span>Export Analytics Report</span>
        </button>
      </div>

      {/* 5 Top Level Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="p-4 rounded-2xl bg-[#0B1422] border border-white/[0.08] space-y-1">
          <span className="text-[10px] font-mono text-slate-400 uppercase">TOTAL REPORTS</span>
          <div className="text-2xl font-display font-extrabold text-white">
            {ANALYTICS_SUMMARY.totalReports}
          </div>
          <span className="text-[10px] font-mono text-blue-400">+18% this month</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#0B1422] border border-white/[0.08] space-y-1">
          <span className="text-[10px] font-mono text-slate-400 uppercase">VERIFIED INCIDENTS</span>
          <div className="text-2xl font-display font-extrabold text-emerald-400">
            {ANALYTICS_SUMMARY.verifiedReports}
          </div>
          <span className="text-[10px] font-mono text-slate-500">77.4% verification rate</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#0B1422] border border-white/[0.08] space-y-1">
          <span className="text-[10px] font-mono text-slate-400 uppercase">RESOLVED HAZARDS</span>
          <div className="text-2xl font-display font-extrabold text-teal-400">
            {ANALYTICS_SUMMARY.resolvedIncidents}
          </div>
          <span className="text-[10px] font-mono text-slate-500">{ANALYTICS_SUMMARY.resolutionRatePercent}% cleared</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#0B1422] border border-white/[0.08] space-y-1">
          <span className="text-[10px] font-mono text-slate-400 uppercase">AVG RESPONSE TIME</span>
          <div className="text-2xl font-display font-extrabold text-amber-400">
            {ANALYTICS_SUMMARY.avgResponseTimeMin} <span className="text-xs font-normal">min</span>
          </div>
          <span className="text-[10px] font-mono text-emerald-400">-3.2 min improvement</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#0B1422] border border-white/[0.08] space-y-1 col-span-2 lg:col-span-1">
          <span className="text-[10px] font-mono text-slate-400 uppercase">MOST REPORTED</span>
          <div className="text-base font-display font-extrabold text-orange-400 truncate">
            {ANALYTICS_SUMMARY.mostReportedHazard.split('(')[0]}
          </div>
          <span className="text-[10px] font-mono text-slate-500">46 road cavities</span>
        </div>
      </div>

      {/* Row 1 Charts: Accidents By Day & Hazard Category Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Weekly Incidents & Near-Misses (Area/Bar Chart) */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-[#0B1422] border border-white/[0.08] space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display font-bold text-lg text-white">
                Incidents & Hazards by Day
              </h3>
              <p className="text-xs text-slate-400">
                Daily trend of reported collisions, near-misses, and road hazards
              </p>
            </div>
            <span className="text-xs font-mono text-blue-400 font-bold">LAST 7 DAYS</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ACCIDENTS_BY_DAY} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" opacity={0.5} />
                <XAxis dataKey="day" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#101A29',
                    borderColor: 'rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontFamily: 'Inter',
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Bar dataKey="hazardsReported" name="Hazards" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="accidents" name="Collisions" fill="#EF4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Hazard Breakdown (Bar Horizontal) */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-[#0B1422] border border-white/[0.08] space-y-4">
          <div>
            <h3 className="font-display font-bold text-lg text-white">
              Hazards by Category
            </h3>
            <p className="text-xs text-slate-400">
              Distribution of road surface anomalies reported
            </p>
          </div>

          <div className="space-y-3 pt-2">
            {HAZARDS_BY_CATEGORY.map((cat) => (
              <div key={cat.name} className="space-y-1">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-300">{cat.name}</span>
                  <span className="text-white font-bold">{cat.count} reports</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${(cat.count / 46) * 100}%`,
                      backgroundColor: cat.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 2 Charts: 24h Visibility Trend & Risk Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* 24-Hour Visibility Sensor Trend */}
        <div className="lg:col-span-8 p-6 rounded-3xl bg-[#0B1422] border border-white/[0.08] space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display font-bold text-lg text-white">
                24-Hour Optical Visibility Cycle (Fog Telemetry)
              </h3>
              <p className="text-xs text-slate-400">
                Hourly sensor readings across Modinagar corridor
              </p>
            </div>
            <span className="text-xs font-mono text-amber-400 font-bold">FOG CYCLE</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={HOURLY_VISIBILITY_TREND} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <defs>
                  <linearGradient id="visGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#38BDF8" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#38BDF8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" opacity={0.5} />
                <XAxis dataKey="time" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#101A29',
                    borderColor: 'rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    fontSize: '12px',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="visibilityM"
                  name="Visibility (meters)"
                  stroke="#38BDF8"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#visGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Road Risk Score Distribution (Donut / Pie) */}
        <div className="lg:col-span-4 p-6 rounded-3xl bg-[#0B1422] border border-white/[0.08] space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="font-display font-bold text-lg text-white">
              Road Risk Distribution
            </h3>
            <p className="text-xs text-slate-400">
              Corridor miles classified by safety index
            </p>
          </div>

          <div className="h-44 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={RISK_DISTRIBUTION}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={70}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {RISK_DISTRIBUTION.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#101A29',
                    borderColor: 'rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    fontSize: '12px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
            {RISK_DISTRIBUTION.map((r) => (
              <div key={r.name} className="flex items-center gap-1.5 text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: r.color }} />
                <span>{r.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
