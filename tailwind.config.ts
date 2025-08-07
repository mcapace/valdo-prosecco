import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'primary': ['Inter', 'sans-serif'],
      },
      colors: {
        'gold': '#D4AF37',
        'beige': '#F0E6D2',
        'beige-light': '#F5F0E0',
        'beige-dark': '#E6DCC0',
        'gray-50': '#FAFAFA',
        'gray-200': '#E5E5E5',
        'gray-500': '#404040',
        'gray-600': '#262626',
        'gray-700': '#171717',
      },
      spacing: {
        '1': '8px',
        '2': '16px',
        '3': '24px',
        '4': '32px',
        '6': '48px',
        '8': '64px',
        '12': '96px',
        '16': '128px',
        '24': '192px',
      },
      fontSize: {
        'display': '72px',
        'headline': '48px',
        'title': '32px',
        'subtitle': '24px',
        'body': '16px',
        'caption': '14px',
      },
      fontWeight: {
        'thin': '100',
        'light': '200',
        'normal': '400',
        'medium': '500',
        'semibold': '600',
        'bold': '700',
        'extrabold': '800',
      },
      letterSpacing: {
        'wide': '0.05em',
        'wider': '0.1em',
        'widest': '0.2em',
      },
      lineHeight: {
        'relaxed': '1.7',
      },
      maxWidth: {
        'minimal': '1200px',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

export default config 