import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'ghibli-blue': '#4d7298',
        'ghibli-light-blue': '#a8dadc',
        'ghibli-cream': '#f1faee',
        'ghibli-red': '#e63946',
        'ghibli-dark': '#1d3557',
        'ghibli-green': '#606c38',
        'ghibli-light-green': '#8ab17d',
        'ghibli-yellow': '#f7d070',
        'text-primary': '#2b2b2b',
        'text-secondary': '#5f6368',
        'text-light': '#f1faee',
      },
      fontFamily: {
        'nunito': ['Nunito', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config 