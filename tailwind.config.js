module.exports = {
  // purge: false, // purge: [],
  purge: [
    './src/**/*.html',
    './src/**/*.vue',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: 'var(--primary100) !important',
          75: 'var(--primary75) !important',
          50: 'var(--primary50) !important',
          25: 'var(--primary25) !important',
        },
        accent: {
          100: 'var(--accent100) !important',
          75: 'var(--accent75) !important',
          50: 'var(--accent50) !important',
          25: 'var(--accent25) !important',
        },
        gray: {
          100: 'var(--gray100) !important',
          75: 'var(--gray75) !important',
          50: 'var(--gray50) !important',
          25: 'var(--gray25) !important',
          15: 'var(--gray15) !important',
        },
        'white-100': 'var(--white100) !important',
        white: '#fff !important',
      },
      borderRadius: {
        '2xl': '20px',
        'xl' : '16px',
      },
      boxShadow: {
        lg: '0px 10px 25px rgba(29, 53, 87, 0.26)',
      },
      maxWidth: {
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
      },
      minWidth: {
        '5xl': '64rem',
      },
    },
  },
  variants: {},
  plugins: [],
};
