module.exports = {
  root: true,
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    "google",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["tsconfig.json", "tsconfig.dev.json"],
    sourceType: "module",
    tsconfigRootDir: __dirname,
  },
  ignorePatterns: [
    "lib/**/*", // Ignore generated files
    ".eslintrc.js",
  ],
  plugins: ["@typescript-eslint", "import"],
  rules: {
    "quotes": ["error", "double"],
    "import/no-unresolved": "off",
    "max-len": ["error", { "code": 120, "ignoreComments": true }],
    "indent": ["error", 2],
    "object-curly-spacing": ["error", "always"],
    "@typescript-eslint/no-floating-promises": "error",
    "require-jsdoc": "off",
    "valid-jsdoc": "off",
  },
};