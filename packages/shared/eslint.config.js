import globals from "globals";

import baseConfig from "../../eslint.config.js";

/** @typedef {import("eslint").Linter.FlatConfig} */
let FlatConfig;

/** @type {FlatConfig} */
const mainConfig = {
  languageOptions: {
    parserOptions: {
      project: ["./tsconfig.json"],
    },
    globals: globals.node,
  },
};

/** @type {FlatConfig[]} */
const config = [...baseConfig, mainConfig];

export default config;
