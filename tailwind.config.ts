import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        navigation: '#1d3a57',
        button: '#1d3a57',
        card: '#495b81',
        'card-hover': '#5265a3',
        white: '#f1f3f5',
        line: '#e3e3e3',
        form: '#95c7dd',
        'dashboard-new': '#b4f1a4',
        'dashboard-due': '#fd7676',
        'dashboard-pending': '#92c6f9',
        'dashboard-assigned': '#fbefa2',
      },
      screens: {
        sm: '576px',
        md: '960px',
        lg: '1366px',
        xl: '1920px',
        xxl: '2560px',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};
export default config;
