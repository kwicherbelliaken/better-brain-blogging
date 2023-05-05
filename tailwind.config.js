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
    },
    colors: {
      black: colors.black,
      rose: colors.rose,
      teal: colors.teal,
      stone: colors.stone,
      categories: {
        pink: "#E1679C",
        violet: "#A7ABF5",
        yellow: "#E9AA40",
        orange: "#D4613C",
        default: "#fff799",
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
