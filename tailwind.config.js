/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        // Acento Industrial
        primary: {
          DEFAULT: '#FFB800',
          light: '#FFC933',
          dark: '#E6A600',
          subtle: '#FFF8E6',
        },
        // Fondos Premium
        background: {
          DEFAULT: '#FFFFFF',
          secondary: '#F9FAFB',
          tertiary: '#F3F4F6',
        },
        // Textos
        text: {
          DEFAULT: '#111827',
          secondary: '#6B7280',
          muted: '#9CA3AF',
        },
      },
      spacing: {
        // Sistema de espaciado amplio
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
      },
      borderRadius: {
        // Esquinas redondeadas elegantes
        '2xl': '16px',
        '3xl': '24px',
        '4xl': '32px',
      },
      boxShadow: {
        // Sombras sutiles
        'soft': '0 1px 3px 0 rgba(0, 0, 0, 0.04)',
        'soft-md': '0 4px 6px -1px rgba(0, 0, 0, 0.08)',
        'soft-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.08)',
        'soft-xl': '0 20px 25px -5px rgba(0, 0, 0, 0.08)',
      },
    },
  },
  plugins: [],
};
