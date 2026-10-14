/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#e8faef',
          100: '#c9f2d7',
          200: '#96e6b1',
          300: '#5fd889',
          400: '#2fca66',
          500: '#0eae4a',
          600: '#008f3b',
          700: '#017032',
          800: '#065a2b',
          900: '#084a26',
          950: '#022a14'
        },
        ink: {
          50: '#f7f8f7',
          100: '#eceeed',
          200: '#d4d8d6',
          300: '#adb4b1',
          400: '#7d8783',
          500: '#5b6561',
          600: '#454e4a',
          700: '#363d3a',
          800: '#22282a',
          900: '#141819',
          950: '#0a0d0d'
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        display: ['Space Grotesk', 'Inter', 'sans-serif']
      },
      backgroundImage: {
        'grid-light':
          'radial-gradient(circle at 1px 1px, rgba(15,23,20,0.08) 1px, transparent 0)',
        'grid-dark':
          'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.06) 1px, transparent 0)'
      },
      backgroundSize: {
        grid: '22px 22px'
      },
      boxShadow: {
        soft: '0 1px 2px rgba(0,0,0,0.04), 0 8px 24px -12px rgba(0,0,0,0.10)'
      }
    }
  },
  plugins: []
}
