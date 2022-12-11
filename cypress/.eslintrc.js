module.exports = {
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: "./tsconfig.json",
  },
  extends: ["plugin:cypress/recommended"],
  rules: {
    "jest/valid-expect": "off",
    "jest/expect-expect": "off",
  },
};
