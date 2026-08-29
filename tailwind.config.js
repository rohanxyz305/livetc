/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        /* ---- The Growth Ledger — MIDNIGHT STAGE EDITION ---- */
        paper: {                  /* page surfaces — deep indigo-black */
          DEFAULT: '#0B0B13',
          deep:   '#101019',      /* wells / alt sections */
          soft:   '#15151F',      /* raised areas */
        },
        cream:  '#15151E',        /* card surface */
        bone: {                   /* light text on dark */
          DEFAULT: '#F2EFE9',
          mute:  '#9B9EAC',
          faint: '#666A78',
        },
        ink: {                    /* dark surface color (bands, chrome) */
          DEFAULT: '#08080D',
          soft:  '#12121A',
          mute:  '#9B9EAC',
          faint: '#666A78',
        },
        pine: {                   /* emerald — bands, icons, secondary surfaces */
          DEFAULT: '#10B981',
          deep: '#08795B',          /* dark band surface (white text safe) */
          rich: '#12805C',
          tint: '#D1FAE5',
        },
        marigold: {                 /* primary accent — saturated orange */
          DEFAULT: '#F97316',
          hot:  '#EA580C',
          bright: '#FBBF24',        /* amber pop for gradients/highlights */
          deep: '#C2410C',          /* accent as TEXT on paper */
          tint: '#FFE1C2',
          pale: '#FFF3E4',
        },
        rani: {                     /* festival pink — tiny pops only (~5%) */
          DEFAULT: '#E42A8A',
          deep: '#BE1A6E',
          tint: '#FBD9EA',
          pale: '#FDF0F7',
        },
        violet: {                   /* purple — gradients, tiles, chips */
          DEFAULT: '#8B5CF6',
          deep: '#6D28D9',          /* violet as TEXT on paper */
          tint: '#EDE9FE',
          pale: '#F5F3FF',
        },
        royal: {                    /* cobalt blue — gradients, tiles, chips */
          DEFAULT: '#2563EB',
          deep: '#1D4ED8',          /* royal as TEXT on paper */
          tint: '#DBEAFE',
          pale: '#EFF6FF',
        },
        leaf: '#22C55E',            /* bright green pop for small accents */
        sage: '#16A34A',            /* success */
        clay: '#DC2626',            /* error */
      },
      fontFamily: {
        sans: ['"Instrument Sans"', 'system-ui', 'sans-serif'],
        display: ['Fraunces', 'Georgia', 'serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        'display-xl': ['clamp(2.75rem,6vw,4.75rem)', { lineHeight: '1.02', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(2.25rem,4.5vw,3.5rem)', { lineHeight: '1.06', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(1.75rem,3vw,2.5rem)', { lineHeight: '1.12', letterSpacing: '-0.01em' }],
      },
      boxShadow: {
        hard: '0 0 0 1px rgba(255,255,255,0.07), 0 30px 70px -30px rgba(0,0,0,0.9)',
        hardmarigold: '5px 5px 0 0 #F97316',
        hardrani: '5px 5px 0 0 #E42A8A',
        lift: '0 0 0 1px rgba(255,255,255,0.06), 0 20px 50px -20px rgba(0,0,0,0.7)',
        glowmarigold: '0 12px 40px -10px rgba(249,115,22,0.55)',
        glowviolet: '0 12px 40px -10px rgba(139,92,246,0.5)',
        glowroyal: '0 12px 40px -10px rgba(37,99,235,0.5)',
      },
      maxWidth: {
        shell: '75rem',
      },
      animation: {
        'marquee': 'marquee 40s linear infinite',
        'fade-up': 'fadeUp .55s cubic-bezier(.2,.7,.2,1) both',
        'pop': 'popIn .4s cubic-bezier(.34,1.56,.64,1) both',
        'spin-slow': 'spin 14s linear infinite',
        'blink': 'blink 1.2s steps(2,start) infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        popIn: {
          '0%': { opacity: '0', transform: 'scale(.94) translateY(12px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}
