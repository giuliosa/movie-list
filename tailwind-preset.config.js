module.exports = {
  purge: ['./projects/**/src/**/*.{html,ts}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: [
        '"Dongle"',
        '"Outfit"',
        'Lato',
        'system-ui',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        '"Helvetica Neue"',
        'Arial',
        '"Noto Sans"',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        '"Noto Color Emoji"',
      ],
    },
    fontSize: {
      'xs': '1rem',
      'sm': '1.2rem',
      'base': '1.4rem',
      'lg': '1.6rem',
      'xl': '1.8rem',
      '2xl': '2rem',
      '3xl': '2.4rem',
      '4xl': '2.8rem',
      '5xl': '3.2rem',
      '6xl': '3.6rem',
      '7xl': '4.0rem',
    },
    fontWeight: {
      normal: 400,
      bold: 700,
      black: 800
    },
    colors: {
      'primary-orange-700': '#AE4110',
      'primary-orange-600': '#D05B17',
      'primary-orange-500': '#F37920',
      'primary-orange-400': '#FBBE78',
      'primary-orange-300': '#FDD9A5',
      // Colocar as cores corretas
      'primary-blue-700': '#18394a',
      'primary-blue-600': '#39627b',
      'primary-blue-500': '#62839c',
      'primary-blue-400': '#00C6D9',
      'primary-blue-300': '#6FE4EF',

      'gray-800': '#1E2121',
      'gray-700': '#343A3B',
      'gray-600': '#616B6D',
      'gray-500': '#8F9EA1',
      'gray-400': '#C5D3D3',
      'gray-300': '#E5F0EF',
      'gray-200': '#F2F7F6',
      'white': '#FFFFFF',

      'green-800': '#2C7C36',
      'green-600': '#3D9140',
      'green-400': '#9BDE90',
      'green-200': '#E9FFE5',

      'yellow-800': '#FF9C00',
      'yellow-600': '#FFDE00',
      'yellow-400': '#E6CD6A',
      'yellow-200': '#FFEEA4',

      'red-800': '#BB0E1D',
      'red-600': '#DE0000',
      'red-400': '#F3866E',
      'red-200': '#FFEAE5',

      'blue-800': '#1783BE',
      'blue-600': '#20A8DE',
      'blue-400': '#77E2F5',
      'blue-200': '#E5FBFF',

      'transparent':'transparent',
    },
    spacing: {
      'none': '0px',
      '4': '0.4rem',
      '8': '0.8rem',
      '12': '1.2rem',
      '16': '1.6rem',
      '24': '2.4rem',
      '32': '3.2rem',
      '40': '4.0rem',
      '48': '4.8rem',
      '56': '5.6rem',
      '64': '6.4rem',
    },
    borderRadius: {
      'none': '0px',
      'xs': '0.4rem',
      'sm': '0.8rem',
      'md': '1.6rem',
      'lg': '2.4rem',
      'full': '9999px'
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
