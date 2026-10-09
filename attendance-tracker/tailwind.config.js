/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Inter"', 'system-ui', 'sans-serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      colors: {
        ivory: '#FBF5E9',
        paper: '#FBF5E9',
        'paper-card': '#FAF2E3',
        line: '#DECEB0',
        maroon: {
          DEFAULT: '#7A1F3D',
          deep: '#5A1530',
        },
        gold: {
          DEFAULT: '#C1902E',
          soft: '#E5C378',
        },
        teal: {
          DEFAULT: '#1F6F5C',
          deep: '#154D40',
        },
        white: '#FFFFFF',
        ink: {
          DEFAULT: '#2B1B1F',
          soft: '#5B4A4E',
          muted: '#5B4A4E',
        },
        cobalt: {
          50: '#FBF5E9',
          100: '#F4EBD8',
          400: '#7A1F3D',
          500: '#7A1F3D',
          600: '#5A1530',
        },
        safe: { DEFAULT: '#1F6F5C', bg: '#EAF5F2' },
        warn: { DEFAULT: '#C1902E', bg: '#F4EBD8' },
        crit: { DEFAULT: '#5A1530', bg: '#F0DCC7' },
        status: {
          pending: '#C1902E',
          'in-progress': '#1F6F5C',
          resolved: '#154D40',
          warning: '#C1902E',
          danger: '#7A1F3D',
        },
      },
      borderRadius: {
        control: '6px',
        card: '8px',
        panel: '12px',
        pill: '20px',
        xl2: '8px',
      },
      boxShadow: {
        card: '0 10px 30px -5px rgba(43,27,31,0.08)',
        'card-hover': '0 15px 35px -5px rgba(122,31,61,0.15)',
      },
    },
  },
  plugins: [],
}
