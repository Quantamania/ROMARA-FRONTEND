/**
 * Merge this `extend` block into your existing tailwind.config.js
 * (the one already used by the public ROMARA site) rather than
 * replacing it — the admin panel should inherit the same brand tokens.
 */
module.exports = {
  theme: {
    extend: {
      colors: {
        sand: {
          50: '#FBF8F3',
          100: '#F4EDE2',   // page background
          200: '#E8DCC8',
          300: '#D8C9B3',   // muted border
        },
        ink: {
          DEFAULT: '#2B2118', // primary text
          light: '#6B5D4F',   // secondary text
        },
        terracotta: {
          DEFAULT: '#C2593B', // primary accent / CTA
          dark: '#A2432A',
          light: '#E8C4B5',
        },
        safari: {
          green: '#3F5D45',   // secondary accent, success states
          'green-light': '#DDE7DC',
        },
        ochre: {
          DEFAULT: '#C89B3C', // highlights, active nav state
          light: '#F1E2BC',
        },
      },
      fontFamily: {
        display: ['Fraunces', 'ui-serif', 'Georgia', 'serif'],
        sans: ['"Public Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
}
