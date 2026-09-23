import React from 'react';
import { AlertTriangle, CheckCircle, Info, XCircle, X } from 'lucide-react';
import { useSafety } from '../../context/SafetyContext';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useSafety();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const getIcon = () => {
          switch (toast.type) {
            case 'success':
              return <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />;
            case 'warning':
              return <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />;
            case 'error':
              return <XCircle className="w-5 h-5 text-rose-400 shrink-0" />;
            default:
              return <Info className="w-5 h-5 text-blue-400 shrink-0" />;
          }
        };

        const getBorder = () => {
          switch (toast.type) {
            case 'success':
              return 'border-emerald-500/30 bg-[#0c1a1a]/95 shadow-[0_0_20px_rgba(16,185,129,0.2)]';
            case 'warning':
              return 'border-amber-500/30 bg-[#1c180a]/95 shadow-[0_0_20px_rgba(245,158,11,0.2)]';
            case 'error':
              return 'border-rose-500/30 bg-[#1c0d12]/95 shadow-[0_0_20px_rgba(244,63,94,0.25)]';
            default:
              return 'border-blue-500/30 bg-[#0d1624]/95 shadow-[0_0_20px_rgba(59,130,246,0.2)]';
          }
        };

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-xl border backdrop-blur-md transition-all duration-200 animate-in slide-in-from-bottom-5 ${getBorder()}`}
          >
            {getIcon()}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-xs font-mono font-semibold tracking-wider uppercase text-slate-200 truncate">
                  {toast.title}
                </h4>
                <span className="text-[10px] text-slate-400 font-mono shrink-0">
                  {toast.timestamp}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                {toast.message}
              </p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-white p-0.5 rounded transition-colors"
              aria-label="Dismiss toast"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
