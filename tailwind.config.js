// tailwind.config.js
module.exports = {
  content: [
    './pages/**/*.{vue,js,ts,jsx,tsx}',
    './components/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        tic: '#737373',
        drive: '#39B269',
        grey: {
          light: '#ECECEC',
        },
        green: {
          light: '#D4EEDE',
          inter: '39B269',
          dark: '#228E4D',
        },
      },
    },
  },
  plugins: [],
};
