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
const overridesConfigs = [
	{
		files: ["knexfile.ts"],
		rules: {
			"import/no-default-export": ["off"],
		},
	},
	{
		files: ["src/db/migrations/**/*.ts"],
		rules: {
			"unicorn/filename-case": [
				"error",
				{
					case: "snakeCase",
				},
			],
		},
	},
];

/** @type {FlatConfig[]} */
const config = [...baseConfig, mainConfig, ...overridesConfigs];

export default config;
