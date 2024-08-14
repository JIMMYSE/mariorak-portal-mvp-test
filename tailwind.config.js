/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      pretendard: ['Pretendard Variable'],
    },
    colors: {
      grey: '#f4f4f5',
      'grey-1': '#ececec',
      'grey-2': '#cecece',
      'grey-3': '#909090',
      'grey-4': '#606060',
      'grey-5': '#111111',
    },
    fontWeight: {
      hairline: '100',
      extralight: '200',
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      'extra-bold': '800',
      black: '900',
    },
    extend: {},
  },
  plugins: [],
};
