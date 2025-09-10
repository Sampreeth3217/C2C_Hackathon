/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#F7F8FA',
        backgroundAlt: '#EAF4FF',
        primary: '#4A90E2',
        secondary: '#7B61FF',
      },
      fontFamily: {
        inter: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glass: '0 8px 32px rgba(31,38,135,0.18)',
      },
    },
  },
  plugins: [],
}
