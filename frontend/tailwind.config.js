/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        neon: {
          green: '#00ff88',
          purple: '#a855f7',
          blue: '#3b82f6'
        },
        dark: {
          900: '#050508',
          800: '#0a0a12',
          700: '#0f0f1a',
          600: '#161622',
          500: '#1e1e2e',
          400: '#2a2a3e'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif']
      },
      animation: {
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate'
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(0,255,136,0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(0,255,136,0.6)' }
        }
      }
    }
  },
  plugins: []
}
