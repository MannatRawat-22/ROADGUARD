/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        rg: {
          bg: '#070D17',
          surface: '#0B1422',
          card: '#101A29',
          elevated: '#142238',
          border: 'rgba(255, 255, 255, 0.08)',
          'border-bright': 'rgba(255, 255, 255, 0.16)',
          primary: '#3B82F6',
          'primary-light': '#60A5FA',
          'primary-glow': 'rgba(59, 130, 246, 0.25)',
          safe: '#22C55E',
          'safe-glow': 'rgba(34, 197, 94, 0.25)',
          caution: '#EAB308',
          'caution-glow': 'rgba(234, 179, 8, 0.25)',
          risky: '#F97316',
          'risky-glow': 'rgba(249, 115, 22, 0.25)',
          danger: '#EF4444',
          'danger-glow': 'rgba(239, 68, 68, 0.3)',
          slate: '#94A3B8',
          muted: '#64748B',
        }
      },
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'radar-sweep': 'radarSweep 4s linear infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite alternate',
        'traffic-flow': 'trafficFlow 1.5s linear infinite',
      },
      keyframes: {
        radarSweep: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        glowPulse: {
          '0%': { opacity: '0.4', filter: 'brightness(1)' },
          '100%': { opacity: '1', filter: 'brightness(1.2)' },
        },
        trafficFlow: {
          '0%': { strokeDashoffset: '20' },
          '100%': { strokeDashoffset: '0' },
        }
      }
    },
  },
  plugins: [],
}
