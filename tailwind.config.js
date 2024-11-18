/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      xs: '360px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px'
    },
    extend: {
      colors: {
        primary: '#0C68F4',
        'primary-25': '#E4EEFE',
        'primary-50': '#AECDFB',
        'primary-75': '#78ABF9',
        'primary-100': '#428AF6',
        'primary-200': '#2779F5',
        'primary-400': '#0951BE',
        'primary-500': '#063A88',
        'primary-600': '#052E6D',
        'primary-700': '#042352',
        'primary-900': '#021736',
        secondary: '#F45E0C',
        'secondary-100': '#FDDBC9',
        'secondary-200': '#FAB793',
        'secondary-300': '#F68242',
        'secondary-400': '#F45E0C',
        'secondary-500': '#BE4909',
        'secondary-600': '#883406',
        black: '#0C0C0C',

        'gray-F9F9F9': '#F9F9F9',
        'gray-F6F6F6': '#F6F6F6',
        'gray-EDEDED': '#EDEDED',
        'gray-CBCBCB': '#CBCBCB',
        'gray-B4B4B4': '#B4B4B4',
        'gray-9E9E9E': '#9E9E9E',
        'gray-717171': '#717171',
        'gray-505050': '#505050',
        'gray-444444': '#444444',
        'gray-2D2D2D': '#2D2D2D',
        'gray-CBCBCB': '#CBCBCB',

        error: '#C91433',
        'error-light': '#FAE7EB',
        success: '#198754',
        'success-light': '#D1F7E5'
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif']
      }
    }
  },
  plugins: [typography]
}
