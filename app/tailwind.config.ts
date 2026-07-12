import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{vue,ts}'],
  theme: {
    extend: {
      colors: {
        // Sampled from the homepage mockup — keep these as the single source of truth
        // for brand color everywhere else in the app instead of hardcoding hex values.
        romara: {
          green: '#16241A',       // top bar, nav accents, primary buttons
          'green-dark': '#0B1D12', // footer background (slightly deeper than primary)
          amber: '#C8863A',        // "Discover Kenya", prices, underlines, subscribe button
          'amber-light': '#D9A05C',
          cream: '#F7F5F1',        // testimonial box, soft section backgrounds
          ink: '#1F2A24',          // body copy on light backgrounds
        },
      },
      fontFamily: {
        // Headings in the mockup are a confident serif/slab; body copy is a clean sans.
        // Swap these for the exact brand fonts once ROMARA confirms them.
        heading: ['"Merriweather"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 20px -4px rgb(0 0 0 / 0.10)',
        overlap: '0 12px 30px -8px rgb(0 0 0 / 0.18)',
      },
    },
  },
  plugins: [],
} satisfies Config