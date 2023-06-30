const colors = require("tailwindcss/colors");

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
      fontSize: {
        base: ["1rem", "1.65"],
      },
      gridTemplateRows: {
        // TODO: do not extend tailwind theme, add this as custom class inline
        // INFO: simple 9 row grid
        9: "repeat(9, 1fr)",
      },
      backgroundImage: {
        "miguel-cruz-illustration": "url(../../miguel-cruz-illustration.png)",
      },
      screens: {
        "3xl": "1920px",
        "4xl": "2400px",
      },
    },
    colors: {
      ...colors,
      categories: {
        pink: "#E068A4",
        white: "#F7F1EC",
        green: "#1E4032",
        violet: "#A2A8F1",
        yellow: "#E9AA40",
        orange: "#D4613C",
        default: "#FFF799",
      },
      graphite: {
        huy: "#6C7871",
        dark: "#54545C",
        light: "#C7C7C7",
        merlin: "#44403C",
        lightest: "#E1DFE1",
        "dark-green": "#545c54",
        "light-green": "#8C9490",
      },
      midnight: {
        dark: "#202226",
        light: "#191919",
        "black-pearl": "#17191C",
      },
      pink: "#FADAD8",
      white: "#FFF",
      yellow: {
        meringue: "#fff799",
      },
    },
  },
  plugins: [
    ({ addVariant }) => {
      addVariant("child", "& > *");
    },
  ],
};
