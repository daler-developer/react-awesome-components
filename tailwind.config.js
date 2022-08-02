/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      animation: {
        'spin-first-dot-pulse-color': 'spin-dot-pulse-color 1s 0s linear infinite alternate',
        'spin-second-dot-pulse-color': 'spin-dot-pulse-color 1s 0.25s linear infinite alternate',
        'spin-third-dot-pulse-color': 'spin-dot-pulse-color 1s 0.50s linear infinite alternate',
        'spin-fifth-dot-pulse-color': 'spin-dot-pulse-color 1s 0.75s linear infinite alternate',
      },
      keyframes: {
        'spin-dot-pulse-color': {
          '0%': { backgroundColor: 'rgb(147 197 253)' },
          '100%': { backgroundColor: 'rgb(59 130 246)' },
        }
      }
    },
  },
  plugins: [],
}
