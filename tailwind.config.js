/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        /* ---- The Growth Ledger palette ---- */
        paper: {
          DEFAULT: '#F7F3EA',   // primary page surface (warm ivory)
          deep:   '#EFE8D8',    // alt sections / wells
          soft:   '#FBF8F1',    // subtle raised areas
        },
        cream:  '#FFFDF6',    // cards on paper
        ink: {
          DEFAULT: '#15211A', // near-black green: text + dark bands
          soft:  '#2A3A31',   // secondary dark
          mute:  '#55645B',   // muted body text on paper
          faint: '#8A968E',   // faint labels on paper
        },
        pine: {
          DEFAULT: '#1E4D38', // deep green, secondary brand surface
          deep: '#163A2A',
          tint: '#DDE7DD',    // pale green wash
        },
        marigold: {           // the accent — use sparingly (10%)
          DEFAULT: '#E9762B',
          hot:  '#D4611A',
          deep: '#B35310',    // accent as TEXT on paper (contrast-safe)
          tint: '#FBE3CD',
          pale: '#FDF3E7',
        },
        sage:   '#2E7D4F',    // success
        clay:   '#C6402E',    // error
      },
      fontFamily: {
        sans: ['"Instrument Sans"', 'system-ui', 'sans-serif'],
        display: ['Fraunces', 'Georgia', 'serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        // display scale — serif needs a touch tighter tracking
        'display-xl': ['clamp(2.75rem,6vw,4.75rem)', { lineHeight: '1.02', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(2.25rem,4.5vw,3.5rem)', { lineHeight: '1.06', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(1.75rem,3vw,2.5rem)', { lineHeight: '1.12', letterSpacing: '-0.01em' }],
      },
      boxShadow: {
        hard: '5px 5px 0 0 #15211A',                 // deliberate offset accent — rare
        hardmarigold: '5px 5px 0 0 #E9762B',
        lift: '0 1px 2px rgba(21,33,26,0.06), 0 8px 24px -12px rgba(21,33,26,0.18)',
      },
      maxWidth: {
        shell: '75rem',
      },
      animation: {
        'marquee': 'marquee 40s linear infinite',
        'fade-up': 'fadeUp .55s cubic-bezier(.2,.7,.2,1) both',
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
      },
    },
  },
  plugins: [],
}
