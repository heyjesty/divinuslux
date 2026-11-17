/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: '#ffffff', 900: '#f6f9fd', 800: '#eef4fb', 700: '#e3ecf8', 600: '#d3e1f2' },
        bone: { DEFAULT: '#0b1a33', muted: '#45546c', dim: '#68778f' },
        line: '#0b1a33',
        brand: { blue: '#1f6fe5', cyan: '#13b5c8', violet: '#4c9bf5' },
      },
      fontFamily: {
        display: ['Sora', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(3rem, 9vw, 9.5rem)', { lineHeight: '0.95', letterSpacing: '-0.045em' }],
        'display-lg': ['clamp(2.5rem, 6.2vw, 6.25rem)', { lineHeight: '1', letterSpacing: '-0.04em' }],
        'display-md': ['clamp(2rem, 4.2vw, 4rem)', { lineHeight: '1.05', letterSpacing: '-0.035em' }],
      },
      maxWidth: { site: '1440px' },
      transitionTimingFunction: { expo: 'cubic-bezier(0.16, 1, 0.3, 1)' },
      keyframes: {
        shimmer: { '0%': { backgroundPosition: '0% 50%' }, '100%': { backgroundPosition: '200% 50%' } },
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        floaty: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-14px)' } },
        scrolldot: { '0%': { transform: 'translateY(0)', opacity: '0' }, '30%': { opacity: '1' }, '100%': { transform: 'translateY(18px)', opacity: '0' } },
      },
      animation: {
        shimmer: 'shimmer 6s linear infinite',
        marquee: 'marquee 40s linear infinite',
        floaty: 'floaty 8s ease-in-out infinite',
        scrolldot: 'scrolldot 2s cubic-bezier(0.16,1,0.3,1) infinite',
      },
    },
  },
  plugins: [],
};
