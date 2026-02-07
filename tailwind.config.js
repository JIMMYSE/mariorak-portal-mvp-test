/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      pretendard: ['Pretendard Variable'],
    },
    colors: {
      white: '#ffffff',
      black: '#000000',
      transparent: 'transparent',
      grey: '#f4f4f5',
      'grey-1': '#ececec',
      'grey-2': '#b5b5b5',
      'grey-3': '#909090',
      'grey-4': '#606060',
      'grey-5': '#111111',
      // 마리오락 테마 컬러
      primary: '#FF385C',
      'primary-light': '#FFF0F3',
      'primary-dark': '#E03A5C',
      secondary: '#333333',
      accent: '#FF385C',
      positive: '#21BA45',
      negative: '#FF385C',
      info: '#31CCEC',
      warning: '#F2C037',
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
