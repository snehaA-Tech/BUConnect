/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      colors: {
        paper: '#F6F5F1',
        ink: {
          DEFAULT: '#14161F',
          soft: '#1C1F2B',
          muted: '#6B6F7B',
        },
        cobalt: {
          50: '#EEF1FF',
          100: '#DCE2FF',
          400: '#5B78FF',
          500: '#2D5BFF',
          600: '#1E44E0',
        },
        safe: { DEFAULT: '#1B8A5A', bg: '#E8F5EE' },
        warn: { DEFAULT: '#C77D0A', bg: '#FBF0DC' },
        crit: { DEFAULT: '#C7402D', bg: '#FBE7E3' },
      },
      borderRadius: {
        xl2: '1.25rem',
      },
      boxShadow: {
        card: '0 1px 2px rgba(20,22,31,0.04), 0 8px 24px -12px rgba(20,22,31,0.12)',
      },
    },
  },
  plugins: [],
}
