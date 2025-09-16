/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'savora-rose': '#f8c8dc',
        'savora-gold': '#f8e3a1',
        'savora-emerald': '#b6f2d4',
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui'],
      },
      boxShadow: {
        glass: '0 20px 45px -25px rgba(15, 23, 42, 0.65)',
      },
      backdropBlur: {
        xl: '24px',
      },
      backgroundImage: {
        'aurora-1':
          'radial-gradient(circle at 20% 20%, rgba(236, 72, 153, 0.25), transparent 55%), radial-gradient(circle at 80% 10%, rgba(34, 211, 238, 0.2), transparent 55%), radial-gradient(circle at 50% 80%, rgba(250, 204, 21, 0.18), transparent 60%)',
      },
    },
  },
  plugins: [],
}
