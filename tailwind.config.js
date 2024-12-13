import defaultTheme from 'tailwindcss/defaultTheme';
import colors from './colors.json'

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: colors,
      fontFamily: {
        sans: ['Figtree', ...defaultTheme.fontFamily.sans],
        'google-icon-outlined':['Material Symbols Outlined'],
        'google-icon-outlined-fill':['Material Symbols Outlined Fill'],
        'google-icon-rounded':['Material Symbols Rounded'],
        'google-icon-rounded-fill':['Material Symbols Rounded Fill'],
        'google-icon-sharp':['Material Symbols Sharp'],
        'google-icon-sharp-fill':['Material Symbols Sharp Fill'],
      },
    },
  },
  plugins: [],
}
