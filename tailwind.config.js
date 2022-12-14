/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      boxShadow: {
        '3xl': '0 3px 6px -4px #0000001f, 0 6px 16px #00000014, 0 9px 28px 8px #0000000d'
      },
      animation: {
        'spin-first-dot-pulse-color': 'spin-dot-pulse-color 1s 0s linear infinite alternate',
        'spin-second-dot-pulse-color': 'spin-dot-pulse-color 1s 0.25s linear infinite alternate',
        'spin-third-dot-pulse-color': 'spin-dot-pulse-color 1s 0.50s linear infinite alternate',
        'spin-fifth-dot-pulse-color': 'spin-dot-pulse-color 1s 0.75s linear infinite alternate',
        'progress-active-line': 'progress-active-line 1s ease-out infinite',
      },
      keyframes: {
        'spin-dot-pulse-color': {
          '0%': { backgroundColor: 'rgb(147 197 253)' },
          '100%': { backgroundColor: 'rgb(59 130 246)' },
        },
        'progress-active-line': {
          '0%': { transform: 'translateX(-200%)' },
          '100%': { transform: 'translateX(100%)' }
        },
      }
    },
  },
  plugins: [],
}
