/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#111827',
        brand: '#2563eb',
        mint: '#10b981',
        amber: '#f59e0b',
        rose: '#ef4444',
      },
      boxShadow: {
        panel: '0 10px 30px rgba(15, 23, 42, 0.08)',
      },
    },
  },
  plugins: [],
};
