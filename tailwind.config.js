/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        /**
         * Paleta "verniz": tons de madeira envernizada em vez do branco de galeria.
         * O fundo base (varnish-100) é um bege quente médio — nem branco, nem escuro.
         */
        varnish: {
          50: '#F7EFE2',
          100: '#EFE3D0', // fundo principal do site
          200: '#E4D3B9',
          300: '#D4BC98',
          400: '#C0A176',
          500: '#A9855A',
          600: '#8C6A44',
          700: '#6D5134',
          800: '#4E3A26',
          900: '#33261A',
        },
        /** Madeira teca envernizada — usada em destaques e no acento da marca. */
        teca: {
          light: '#D9A96B',
          DEFAULT: '#B87A3D',
          dark: '#8F5A28',
        },
        /** Preto fosco do alumínio/serralheria. */
        graphite: '#1F1B18',
        ink: '#2A2018',
      },
      /**
       * A escala padrão do Tailwind não cobre passos como /12 ou /92, usados
       * nos véus e filetes do tema verniz. Estendemos de 5 em 5 mais os
       * valores finos empregados no projeto.
       */
      opacity: Object.fromEntries(
        [
          ...Array.from({ length: 21 }, (_, i) => i * 5),
          8, 12, 15, 18, 22, 35, 45, 55, 65, 85, 88, 92,
        ]
          .sort((a, b) => a - b)
          .map((value) => [String(value), String(value / 100)]),
      ),
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.25em',
        brand: '0.35em',
      },
      maxWidth: {
        content: '1280px',
      },
      transitionTimingFunction: {
        luxe: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      backgroundImage: {
        /** Textura sutil de veio de madeira aplicada sobre as seções claras. */
        'grain-verniz':
          'repeating-linear-gradient(96deg, rgba(140,106,68,0.045) 0px, rgba(140,106,68,0.045) 1px, transparent 1px, transparent 5px)',
      },
      keyframes: {
        'fade-in': { from: { opacity: '0' }, to: { opacity: '1' } },
      },
      animation: {
        'fade-in': 'fade-in 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards',
      },
    },
  },
  plugins: [],
}
