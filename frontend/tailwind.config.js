/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bioriver: {
          bg: '#F6FAF7',
          card: '#FFFFFF',
          primary: '#2E7D5B',
          secondary: '#59A978',
          lightGreen: '#EAF5EE',
          blue: '#4B8DB8',
          lightBlue: '#EDF6FB',
          textPrimary: '#17211B',
          textSecondary: '#68756D',
          border: '#DFE8E2',
          warning: '#E4A044',
          danger: '#D96B6B',
        },
        bio: {
          50: '#f0fdf4',
          100: '#EAF5EE',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#59A978',
          500: '#2E7D5B',
          600: '#246549',
          700: '#1d513a',
          800: '#173e2d',
          900: '#17211B',
        },
        river: {
          50: '#EDF6FB',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#4B8DB8',
          500: '#3577a1',
          600: '#275d80',
          700: '#1d4661',
          800: '#143144',
          900: '#0c1f2b',
        },
        confluence: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Manrope', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      }
    },
  },
  plugins: [],
};
