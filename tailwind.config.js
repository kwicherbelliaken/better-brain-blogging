module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    extend: {
      fontFamily: {
        picnic: ["PicNic", "sans-serif"],
        helvetica: ["Helvetica"],
        nhmb: ["NaN Holo Mono Blonde"],
        sim: ["Suisse Intl Mono"],
      },
    },
    colors: {
      graphite: {
        lightest: "#E1DFE1",
        light: "#C7C7C7",
        dark: "#54545C",
        "light-green": "#8C9490",
        "dark-green": "#545c54",
      },
      midnight: {
        light: "#191919",
        dark: "#202226",
      },
      pink: "#FADAD8",
      white: "#FFF",
      yellow: {
        meringue: '#fff799'
      }
    },
  },
  plugins: [
    ({ addVariant }) => {
      addVariant("child", "& > *");
    },
  ],
};
