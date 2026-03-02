import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0c0905',
        text: {
          primary: '#e0d0b8',
          secondary: '#a89070',
        },
        accent: '#c8a050',
        danger: '#c06050',
        success: '#80c080',
      },
      fontFamily: {
        serif: ['var(--font-noto-serif)'],
        sans: ['var(--font-noto-sans)'],
        mono: ['var(--font-jetbrains)'],
      },
    },
  },
  plugins: [],
}
export default config
