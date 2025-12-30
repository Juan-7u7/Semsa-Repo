/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        // Acento Industrial
        primary: {
          DEFAULT: '#FFCC00',
          light: '#FFD700',
          dark: '#E6B800',
          subtle: '#FFFBE6',
        },
        // Fondos Premium
        background: {
          DEFAULT: '#FFFFFF',
          secondary: '#F8F9FA',
          tertiary: '#F0F4F8',
        },
        // Textos
        text: {
          DEFAULT: '#00335F', // Azul Oscuro
          secondary: '#005596', // Azul Medio
          muted: '#64748B',
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
