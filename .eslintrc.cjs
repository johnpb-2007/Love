module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["dist", "node_modules"],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "react-refresh"],
  // Interaction managers intentionally export both a visual subscriber and
  // a small imperative controller. Keeping those two halves together makes
  // ownership clear, and the rule only affects development-time refresh.
  rules: {
    "react-refresh/only-export-components": "off",
  },
};
