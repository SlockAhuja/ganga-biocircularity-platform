/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#F7FAF8',
        card: '#FFFFFF',
        ganga: {
          50: '#F0F8F3',
          100: '#E8F5EE',
          200: '#CBE5D7',
          300: '#9ECDB5',
          400: '#64AC8B',
          500: '#2E7D5B', // Primary Green
          600: '#25664A',
          700: '#1F573F',
          800: '#194532',
          900: '#143829',
        },
        skywater: {
          50: '#F2F8FC',
          100: '#EAF4FB',
          200: '#D2E8F7',
          300: '#A4CFEE',
          400: '#71B0E1',
          500: '#4A90C2', // Blue
          600: '#3472A4',
          700: '#285880',
          800: '#21496B',
          900: '#1E3E59',
        },
        ink: {
          900: '#17211B', // Primary text
          700: '#3E4E45',
          500: '#66736B', // Secondary text
          300: '#A1ADA6',
          200: '#D3DDD7',
          100: '#E3EAE5', // Border
          50: '#F4F7F5',
        },
        amberalert: '#E6A23C',
        crimsonalert: '#D96B6B',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(23, 33, 27, 0.04), 0 1px 2px -1px rgba(23, 33, 27, 0.04)',
        'card': '0 2px 8px -2px rgba(23, 33, 27, 0.06), 0 1px 4px -1px rgba(23, 33, 27, 0.03)',
        'elevated': '0 10px 25px -5px rgba(23, 33, 27, 0.08), 0 8px 10px -6px rgba(23, 33, 27, 0.04)',
        'glow-green': '0 0 15px rgba(46, 125, 91, 0.25)',
      }
    },
  },
  plugins: [],
}
