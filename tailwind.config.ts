import type { Config } from 'tailwindcss'

/**
 * Tailwind config for Project Ultima Web.
 * Colors reference @genesis/vue-design-system CSS variables (single source of truth).
 */
export default {
  content: [
    './components/**/*.{vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './app.vue',
  ],
  theme: {
    extend: {
      colors: {
        // Map Tailwind utilities to Genesis design system CSS variables
        space: {
          deep: 'var(--bg-space-deep)',
          dark: 'var(--bg-space-dark)',
          panel: 'var(--bg-space-panel)',
        },
        neon: {
          cyan: 'var(--color-neon-cyan)',
          blue: 'var(--color-neon-blue)',
          purple: 'var(--color-neon-purple)',
          emerald: 'var(--color-neon-emerald)',
          rose: 'var(--color-neon-rose)',
          amber: 'var(--color-neon-amber)',
        },
        glass: {
          heavy: 'var(--bg-glass-heavy)',
          medium: 'var(--bg-glass-medium)',
          light: 'var(--bg-glass-light)',
          border: 'var(--border-glass)',
        },
        txt: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          tertiary: 'var(--text-tertiary)',
          accent: 'var(--text-accent)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        full: 'var(--radius-full)',
      },
      zIndex: {
        sidebar: 'var(--z-sidebar)',
        dropdown: 'var(--z-dropdown)',
        overlay: 'var(--z-overlay)',
        modal: 'var(--z-modal)',
        toast: 'var(--z-toast)',
        critical: 'var(--z-critical)',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        glow: 'glow 2s ease-in-out infinite alternate',
        'grid-fade': 'gridFade 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { opacity: '0.4' },
          '100%': { opacity: '1' },
        },
        gridFade: {
          '0%, 100%': { opacity: '0.03' },
          '50%': { opacity: '0.08' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config
