export default {
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "@happy-dom/jest-environment",

  globals: {
    "ts-jest": {
      tsconfig: "<rootDir>/tsconfig.json",
      diagnostics: {
        pathRegex: /\.(spec|test)\.ts$/,
        warnOnly: true,
      },
    },
  },

  testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/.next/"],
  collectCoverageFrom: [
    "**/*.{js,jsx,ts,tsx}",
    "!**/*.d.ts",
    "!**/node_modules/**",
  ],

  /* <!--  📥 TS Support (jest code transformations/ ts-jest transpiler) --> */
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  transformIgnorePatterns: ["/node_modules/"],

  // Runs special logic, such as cleaning up components
  // when using React Testing Library and adds special
  // extended assertions to Jest
  setupFilesAfterEnv: ["<rootDir>/test/setup-test-env.ts"],
  moduleDirectories: ["node_modules", "src"],
  moduleNameMapper: {
    "~/(.*)": "<rootDir>/app/$1",
  },
  /* <!--  📥 Test Spec File Resolution Pattern (parent folder `__tests__`; filename to contain `test` or `spec`) --> */
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",

  // Module file extensions for importing
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};
