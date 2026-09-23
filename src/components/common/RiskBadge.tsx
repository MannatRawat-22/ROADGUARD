import React from 'react';
import { RiskCategory } from '../../types';

interface RiskBadgeProps {
  category: RiskCategory;
  score?: number;
  size?: 'sm' | 'md' | 'lg';
  showPulse?: boolean;
}

export const RiskBadge: React.FC<RiskBadgeProps> = ({
  category,
  score,
  size = 'md',
  showPulse = true,
}) => {
  const getStyles = () => {
    switch (category) {
      case 'SAFE':
        return {
          bg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
          dot: 'bg-emerald-500',
          glow: 'shadow-[0_0_10px_rgba(34,197,94,0.3)]',
          label: 'SAFE',
        };
      case 'CAUTION':
        return {
          bg: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
          dot: 'bg-amber-500',
          glow: 'shadow-[0_0_10px_rgba(234,179,8,0.3)]',
          label: 'CAUTION',
        };
      case 'RISKY':
        return {
          bg: 'bg-orange-500/10 border-orange-500/30 text-orange-400',
          dot: 'bg-orange-500',
          glow: 'shadow-[0_0_12px_rgba(249,115,22,0.35)]',
          label: 'RISKY',
        };
      case 'HIGH RISK':
      default:
        return {
          bg: 'bg-rose-500/10 border-rose-500/30 text-rose-400',
          dot: 'bg-rose-500',
          glow: 'shadow-[0_0_15px_rgba(239,68,68,0.4)]',
          label: 'HIGH RISK',
        };
    }
  };

  const config = getStyles();

  const sizeClasses = {
    sm: 'text-[10px] px-2 py-0.5 tracking-wider gap-1',
    md: 'text-xs px-2.5 py-1 tracking-wider gap-1.5',
    lg: 'text-sm px-3.5 py-1.5 tracking-wider gap-2 font-semibold',
  }[size];

  return (
    <span
      className={`inline-flex items-center rounded-full border font-mono font-medium uppercase ${config.bg} ${config.glow} ${sizeClasses}`}
    >
      {showPulse && (
        <span className="relative flex h-2 w-2">
          <span
            className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${config.dot}`}
          />
          <span className={`relative inline-flex rounded-full h-2 w-2 ${config.dot}`} />
        </span>
      )}
      <span>{config.label}</span>
      {typeof score === 'number' && (
        <span className="font-display font-bold opacity-90 ml-0.5">
          {score}/100
        </span>
      )}
    </span>
  );
};
