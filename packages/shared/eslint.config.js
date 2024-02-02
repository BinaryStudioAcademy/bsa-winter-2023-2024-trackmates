import globals from "globals";

import baseConfig from "../../eslint.config.js";

/** @typedef {import("eslint").Linter.FlatConfig} */
let FlatConfig;

/** @type {FlatConfig} */
const ignoresConfig = {
	ignores: ["build"],
};

/** @type {FlatConfig} */
const mainConfig = {
	languageOptions: {
		globals: globals.node,
		parserOptions: {
			project: ["./tsconfig.json"],
		},
	},
};

/** @type {FlatConfig[]} */
const config = [...baseConfig, ignoresConfig, mainConfig];

export default config;
