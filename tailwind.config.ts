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
        card: '#495b81',
        'card-hover': '#5265a3',
        white: '#f1f3f5',
        line: '#e3e3e3',
        'dashboard-new': '#b4f1a4',
        'dashboard-due': '#fd7676',
        'dashboard-pending': '#92c6f9',
        'dashboard-assigned': '#fbefa2',
      },
    },
  },
  plugins: [],
};
export default config;
