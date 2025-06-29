/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontSize:{
      '6xl': ['3rem', { lineHeight: '4rem' }],
      '5xl': ['2.5rem', { lineHeight: '3.5rem' }],
      '4xl': ['2.25rem', { lineHeight: '3rem' }],
      '3xl': ['1.875rem', { lineHeight: '2.5rem' }],
      '2xl': ['1.5rem', { lineHeight: '2rem' }],
      'xl': ['1.25rem', { lineHeight: '1.75rem' }],
      'lg': ['1.125rem', { lineHeight: '1.5rem' }],
      'sm': ['0.875rem', { lineHeight: '1.25rem' }],
      'xs': ['0.75rem', { lineHeight: '1rem' }],
      '2xs': ['0.625rem', { lineHeight: '0.875rem' }],
    },
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1367px',
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'purple-pink': 'linear-gradient(135deg, #9333ea, #ec4899)',
        'purple-magenta': 'linear-gradient(135deg, #6b21a8, #c026d3)',
      },
      colors: {
        'brand-purple': {
          500: '#9333ea',
          600: '#7c3aed',
          800: '#6b21a8',
        },
        'brand-pink': {
          500: '#ec4899',
          600: '#db2777',
        }
      }
    },
  },
  plugins: [],
} 
