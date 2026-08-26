/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#ffffff',
        foreground: '#081821',
        primary: {
          DEFAULT: '#0EA5E9',
          foreground: '#ffffff',
        },
        accent: {
          DEFAULT: '#1E3A5F',
          foreground: '#ffffff',
        },
        muted: {
          DEFAULT: '#F0F9FF',
          foreground: '#64748b',
        },
        border: '#E0F2FE',
        ring: '#38BDF8',
        'sky-light': '#F0F9FF',
        'dark-blue-2': '#15304A',
        'ultra-dark-blue-600': '#15304A',
        'ultra-dark-blue-700': '#0D2436',
        'ultra-dark-blue-800': '#081821',
        ultra: {
          white: '#FFFFFF',
          'sky-blue': {
            50: '#F0F9FF',
            100: '#E0F2FE',
            200: '#BAE6FD',
            300: '#7DD3FC',
            400: '#38BDF8',
            500: '#0EA5E9',
            600: '#0284C7',
            700: '#0369A1',
          },
          'dark-blue': {
            500: '#1E3A5F',
            600: '#15304A',
            700: '#0D2436',
            800: '#081821',
            900: '#040C10',
          },
        },
      },
      fontFamily: {
        sans: ["var(--font-plus-jakarta-sans)", "ui-sans-serif", "system-ui"],
      },
      spacing: {
        'space-3xs': '0.5rem',
        'space-2xs': '0.75rem',
        'space-xs': '1rem',
        'space-sm': '1.5rem',
        'space-md': '2rem',
        'space-lg': '3rem',
        'space-xl': '4rem',
        'space-2xl': '6rem',
        'space-3xl': '8rem',
        'space-4xl': '12rem',
      },
      fontSize: {
        'display-xl': ['clamp(3.5rem, 8vw, 7rem)', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        'display-lg': ['clamp(2.5rem, 5vw, 4.5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(2rem, 4vw, 3rem)', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
        'display-sm': ['clamp(1.5rem, 3vw, 2.25rem)', { lineHeight: '1.2' }],
        'body-lg': ['1.125rem', { lineHeight: '1.7' }],
        'body': ['1rem', { lineHeight: '1.6' }],
        'body-sm': ['0.875rem', { lineHeight: '1.6' }],
      },
      animation: {
        'bounce-subtle': 'bounceSubtle 2s infinite',
      },
      keyframes: {
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)', animationTimingFunction: 'cubic-bezier(0.8,0,1,1)' },
          '50%': { transform: 'translateY(-10%)', animationTimingFunction: 'cubic-bezier(0,0,0.2,1)' },
        }
      }
    },
  },
  plugins: [],
};
