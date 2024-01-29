import js from "@eslint/js";
import ts from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import { resolve as tsResolver } from "eslint-import-resolver-typescript";
import importPlugin from "eslint-plugin-import";
import perfectionist from "eslint-plugin-perfectionist";
import sonarjs from "eslint-plugin-sonarjs";
import unicorn from "eslint-plugin-unicorn";
import globals from "globals";

/** @typedef {import("eslint").Linter.FlatConfig} */
let FlatConfig;
/** @typedef {import("eslint").Linter.ParserModule} */
let ParserModule;

/** @type {FlatConfig} */
const jsConfig = {
	languageOptions: {
		globals: globals.browser,
		parserOptions: {
			ecmaVersion: "latest",
			sourceType: "module",
		},
	},
	rules: {
		...js.configs.recommended.rules,
		"no-restricted-syntax": [
			"error",
			{
				message: "Export/Import all (*) is forbidden.",
				selector: "ExportAllDeclaration,ImportAllDeclaration",
			},
			{
				message: "Exports should be at the end of the file.",
				selector: "ExportNamedDeclaration[declaration!=null]",
			},
			{
				message: "TS features are forbidden",
				selector: "TSEnumDeclaration,ClassDeclaration[abstract=true]",
			},
		],
		"arrow-parens": ["error", "always"],
		"no-console": ["error"],
		"no-multiple-empty-lines": [
			"error",
			{
				max: 1,
			},
		],
		"max-params": ["error", 3],
		curly: ["error", "all"],
		quotes: ["error", "double"],
	},
};

/** @type {FlatConfig} */
const importConfig = {
	plugins: {
		import: importPlugin,
	},
	rules: {
		...importPlugin.configs.recommended.rules,
		"import/exports-last": ["error"],
		"import/extensions": ["error", "ignorePackages"],
		"import/no-default-export": ["error"],
		"import/newline-after-import": ["error"],
		"import/no-duplicates": ["error"],
		"import/no-unresolved": ["off"],
	},
	settings: {
		"import/resolver": {
			typescript: tsResolver,
		},
	},
};

/** @type {FlatConfig} */
const sonarConfig = {
	plugins: {
		sonarjs,
	},
	rules: sonarjs.configs.recommended.rules,
};

/** @type {FlatConfig} */
const unicornConfig = {
	plugins: {
		unicorn,
	},
	rules: {
		...unicorn.configs.recommended.rules,
		"unicorn/no-null": ["off"],
	},
};

/** @type {FlatConfig} */
const perfectionistConfig = {
	plugins: {
		perfectionist,
	},
	rules: perfectionist.configs["recommended-natural"].rules,
};

/** @type {FlatConfig} */
const typescriptConfig = {
	languageOptions: {
		parser: /** @type {ParserModule} */ tsParser,
		parserOptions: {
			project: ["./tsconfig.json"],
		},
	},
	plugins: {
		"@typescript-eslint": ts,
	},
	rules: {
		...ts.configs["strict-type-checked"].rules,
		"@typescript-eslint/return-await": ["error", "always"],
		"@typescript-eslint/no-magic-numbers": [
			"error",
			{
				ignoreEnums: true,
				ignoreReadonlyClassProperties: true,
			},
		],
	},
};

/** @type {FlatConfig[]} */
const overridesConfigs = [
	{
		files: [
			"commitlint.config.js",
			"prettierrc.config.ts",
			"lint-staged.config.ts",
			"eslint.config.ts",
			"stylelint.config.ts",
			"knip.config.js",
		],
		rules: {
			"import/no-default-export": ["off"],
		},
	},
];

/** @type {FlatConfig[]} */
const config = [
	jsConfig,
	importConfig,
	sonarConfig,
	unicornConfig,
	perfectionistConfig,
	typescriptConfig,
	...overridesConfigs,
];

export default config;
