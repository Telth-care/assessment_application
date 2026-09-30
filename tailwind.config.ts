import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        telth: {
          purple: '#5B2A8C',
          purpleDark: '#3E1D61',
          amber: '#C77B1F',
          ink: '#1F1B24',
          mist: '#F6F3FA',
        },
      },
      fontFamily: {
        display: ['Georgia', 'serif'],
        body: ['system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
