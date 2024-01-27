import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";
import globals from "globals";

import baseConfig from "../../eslint.config.js";

/** @typedef {import('eslint').Linter.FlatConfig} */
let FlatConfig;

/** @type {FlatConfig} */
const ignoresConfig = {
  ignores: ["build"],
};

/** @type {FlatConfig} */
const mainConfig = {
  languageOptions: {
    globals: {
      ...globals.browser,
      React: true,
      JSX: true,
    },
  },
};

/** @type {FlatConfig} */
const reactConfig = {
  files: ["**/*.tsx"],
  plugins: {
    react,
  },
  rules: {
    ...react.configs["jsx-runtime"].rules,
    ...react.configs["recommended"].rules,
    "react/jsx-no-bind": ["error", { ignoreRefs: true }],
    "react/react-in-jsx-scope": ["off"],
  },
};

/** @type {FlatConfig} */
const reactHooksConfig = {
  files: ["**/*.tsx"],
  plugins: {
    "react-hooks": reactHooks,
  },
  rules: reactHooks.configs.recommended.rules,
};

/** @type {FlatConfig} */
const jsxA11yConfig = {
  files: ["**/*.tsx"],
  plugins: {
    "jsx-a11y": jsxA11y,
  },
  rules: jsxA11y.configs.recommended.rules,
};

/** @type {FlatConfig[]} */
const overridesConfigs = [
  {
    files: ["vite.config.ts"],
    rules: {
      "import/no-default-export": ["off"],
    },
  },
  {
    files: ["vite-end.d.ts"],
    rules: {
      "unicorn/prevent-abbreviation": ["off"],
    },
  },
];

/** @type {FlatConfig[]} */
const config = [
  ignoresConfig,
  mainConfig,
  ...baseConfig,
  reactConfig,
  reactHooksConfig,
  jsxA11yConfig,
  ...overridesConfigs,
];

export default config;
