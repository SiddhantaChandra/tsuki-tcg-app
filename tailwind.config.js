/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1367px',
    },
    extend: {
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        'theme': '300ms',
      },
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
