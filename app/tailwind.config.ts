import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{vue,ts}'],
  theme: {
    extend: {
      colors: {
        // Sampled from the homepage mockup — keep these as the single source of truth
        // for brand color everywhere else in the app instead of hardcoding hex values.
        //
        // The base keys (green, green-dark, amber, amber-light, cream, ink) are the
        // original brand tokens and MUST stay stable — many components reference them.
        // The extra numbered steps + warm neutrals below are additive: they give a
        // proper tonal range (tints, shades, atmospheric backgrounds) without changing
        // the brand identity.
        romara: {
          green: '#16241A',        // top bar, nav accents, primary buttons
          'green-dark': '#0B1D12', // footer background (slightly deeper than primary)
          'green-900': '#0B1D12',
          'green-800': '#122017',
          'green-700': '#1B3325',
          'green-600': '#274733',
          'green-500': '#356045',
          'green-100': '#DCE5DF',
          amber: '#C8863A',        // "Discover Kenya", prices, underlines, subscribe button
          'amber-light': '#D9A05C',
          'amber-600': '#B5762E',
          'amber-400': '#D9A05C',
          'amber-300': '#E4B77E',
          'amber-100': '#F3E4CE',
          cream: '#F7F5F1',        // testimonial box, soft section backgrounds
          sand: '#EFE9DF',         // warmer neutral layer for alternating sections
          bone: '#FBFAF7',         // near-white page background with warmth
          ink: '#1F2A24',          // body copy on light backgrounds
          'ink-soft': '#55605A',   // secondary/muted copy
        },
      },
      fontFamily: {
        // Titles use Roboto, body copy uses Poppins — both sans, so the
        // fallbacks are sans too (a serif fallback would reflow badly if the
        // webfont were slow). Roboto carries the weight range the wordmark and
        // display sizes need, up to 900.
        heading: ['"Roboto"', 'ui-sans-serif', 'system-ui', 'Helvetica', 'sans-serif'],
        display: ['"Roboto"', 'ui-sans-serif', 'system-ui', 'Helvetica', 'sans-serif'],
        sans: ['"Poppins"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        // The wordmark only. Kept separate from `heading` so the logo can change
        // without dragging every title with it. Inclusive Sans ships 400 and 700
        // only — there is no black cut, so the lockup uses 700 and leans on size
        // and tight tracking for presence.
        logo: ['"Inclusive Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Editorial display scale (fluid). Used for big hero/section moments.
        eyebrow: ['0.75rem', { lineHeight: '1', letterSpacing: '0.24em' }],
        'display-lg': ['clamp(3rem, 6.4vw, 6rem)', { lineHeight: '1', letterSpacing: '-0.025em' }],
        display: ['clamp(2.5rem, 5vw, 4.5rem)', { lineHeight: '1.02', letterSpacing: '-0.022em' }],
        'display-sm': ['clamp(1.9rem, 3.6vw, 3rem)', { lineHeight: '1.06', letterSpacing: '-0.018em' }],
      },
      letterSpacing: {
        widest2: '0.28em',
      },
      boxShadow: {
        card: '0 4px 20px -4px rgb(0 0 0 / 0.10)',
        overlap: '0 12px 30px -8px rgb(0 0 0 / 0.18)',
        soft: '0 2px 10px -3px rgb(16 36 26 / 0.10)',
        elevated: '0 22px 48px -16px rgb(11 29 18 / 0.28)',
        'glow-amber': '0 10px 30px -10px rgb(200 134 58 / 0.45)',
      },
      borderRadius: {
        // Signature asymmetric card corners: one large diagonal, one near-sharp,
        // so cards read as intentionally shaped rather than uniformly rounded.
        // `card-alt` mirrors the diagonal for alternating rhythm across grids.
        card: '0.625rem 0.2rem',
        'card-alt': '0.2rem 0.625rem',
        '2.5xl': '1.375rem',
      },
      backgroundImage: {
        'scrim-r': 'linear-gradient(90deg, rgb(0 0 0 / 0.68) 0%, rgb(0 0 0 / 0.30) 42%, transparent 78%)',
        // Green version of scrim-r, for heroes whose copy should sit on the
        // brand field rather than a neutral black wash.
        'scrim-green-r':
          'linear-gradient(90deg, rgb(11 29 18 / 0.94) 0%, rgb(11 29 18 / 0.78) 32%, rgb(22 36 26 / 0.42) 58%, rgb(22 36 26 / 0.12) 78%, transparent 92%)',
        'scrim-b': 'linear-gradient(0deg, rgb(0 0 0 / 0.72) 0%, rgb(0 0 0 / 0.18) 46%, transparent 100%)',
        'green-fade': 'linear-gradient(135deg, #16241A 0%, #0B1D12 100%)',
        'amber-fade': 'linear-gradient(135deg, #D9A05C 0%, #C8863A 100%)',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        kenburns: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.12)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        kenburns: 'kenburns 18s ease-out both',
        'fade-up': 'fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) both',
        marquee: 'marquee 32s linear infinite',
      },
    },
  },
  plugins: [],
} satisfies Config
