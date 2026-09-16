/**
 * Zirar — Tailwind design tokens.
 *
 * The merchant controls `--color-primary` from the Salla dashboard, so every
 * primary shade is derived from CSS variables that `layouts/master.twig` sets.
 * The sand / ink neutrals below are the theme's own identity and stay fixed.
 */
module.exports = {
  important: false,
  content: ['src/views/**/*.twig', 'src/assets/js/**/*.js'],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: '16px',
      screens: {
        '2xl': '1320px',
      },
    },
    fontFamily: {
      sans: ['var(--font-main)', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      primary: 'var(--font-main)',
    },
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        'primary-d': 'var(--color-primary-dark)',
        'primary-l': 'var(--color-primary-light)',
        'primary-reverse': 'var(--color-primary-reverse)',
        'primary-dark': 'var(--color-primary-dark)',
        ink: 'var(--color-ink)',
        'ink-soft': 'var(--color-ink-soft)',
        muted: 'var(--color-muted)',
        sand: 'var(--color-sand)',
        'sand-d': 'var(--color-sand-dark)',
        ivory: 'var(--color-ivory)',
        surface: 'var(--color-surface)',
        line: 'var(--color-line)',
        gold: 'var(--color-gold)',
        danger: '#A4161A',
        dark: '#1C1A17',
        darker: '#100F0D',
      },
      spacing: {
        3.75: '15px',
        7.5: '30px',
        18: '4.5rem',
        58: '232px',
        62: '248px',
        100: '28rem',
        116: '464px',
        132: '528px',
        200: '800px',
      },
      borderRadius: {
        DEFAULT: 'var(--s-radius)',
        tiny: '4px',
        large: '20px',
        big: '32px',
        pill: '999px',
      },
      fontSize: {
        xxxs: '8px',
        xxs: '10px',
        '22px': '22px',
        'icon-lg': '33px',
        'title-size': '44px',
        'display-size': '64px',
      },
      lineHeight: {
        12: '3rem',
        14: '3.5rem',
        16: '4rem',
        18: '4.5rem',
        20: '5rem',
      },
      boxShadow: {
        default: '0 10px 30px -12px rgba(28, 26, 23, .14)',
        soft: '0 2px 10px rgba(28, 26, 23, .06)',
        card: '0 18px 40px -20px rgba(28, 26, 23, .28)',
        top: '0 -6px 20px rgba(28, 26, 23, .08)',
        dropdown: '0 12px 32px -10px rgba(28, 26, 23, .18)',
        huge: '0 30px 60px -25px rgba(28, 26, 23, .35)',
      },
      width: {
        18: '4.5rem',
        22: '5.5rem',
        74: '18.5rem',
        76: '19rem',
        78: '19.5rem',
      },
      height: {
        banner: '220px',
        'lg-banner': '440px',
        'full-banner': '620px',
        460: '460px',
        500: '500px',
      },
      minWidth: { '1/4': '25%', '1/2': '50%', '3/4': '75%' },
      maxWidth: { '1/4': '25%', '1/2': '50%', '3/4': '75%' },
      zIndex: { '-1': '-1', 1: '1', 2: '2' },
      screens: {
        xxs: { min: '380px', max: '479px' },
        xs: '480px',
      },
      gridTemplateColumns: {
        'auto-fill': 'repeat(auto-fill, minmax(230px, 1fr))',
      },
      transitionTimingFunction: {
        elastic: 'cubic-bezier(.55, 0, .1, 1)',
      },
      transitionProperty: { height: 'height' },
      keyframes: {
        slideUpFromBottom: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDownFromBottom: {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '100%': { transform: 'translateY(100%)', opacity: '0' },
        },
        fadeUp: {
          '0%': { transform: 'translateY(18px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        slideUpFromBottom: 'slideUpFromBottom .6s linear',
        slideDownFromBottom: 'slideDownFromBottom .6s linear',
        fadeUp: 'fadeUp .6s cubic-bezier(.55, 0, .1, 1) both',
      },
    },
  },
  corePlugins: { outline: false },
  // line-clamp ships with Tailwind since v3.3, so only forms is needed here.
  plugins: [require('@tailwindcss/forms')],
};
