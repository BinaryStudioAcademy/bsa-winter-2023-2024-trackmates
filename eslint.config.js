import js from "@eslint/js";
import ts from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import { resolve as tsResolver } from "eslint-import-resolver-typescript";
import importPlugin from "eslint-plugin-import";
import jsdoc from "eslint-plugin-jsdoc";
import perfectionist from "eslint-plugin-perfectionist";
import sonarjs from "eslint-plugin-sonarjs";
import unicorn from "eslint-plugin-unicorn";
import globals from "globals";

const JS_MAX_PARAMS_ALLOWED = 3;

/** @typedef {import("eslint").Linter.FlatConfig} */
let FlatConfig;
/** @typedef {import("eslint").Linter.ParserModule} */
let ParserModule;

/** @type {FlatConfig} */
const ignoresConfig = {
	ignores: ["apps", "packages"],
};

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
		"arrow-parens": ["error", "always"],
		curly: ["error", "all"],
		"max-params": ["error", JS_MAX_PARAMS_ALLOWED],
		"no-console": ["error"],
		"no-multiple-empty-lines": [
			"error",
			{
				max: 1,
			},
		],
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
		"import/newline-after-import": ["error"],
		"import/no-default-export": ["error"],
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
		"@typescript-eslint/no-magic-numbers": [
			"error",
			{
				ignoreEnums: true,
				ignoreReadonlyClassProperties: true,
			},
		],
		"@typescript-eslint/return-await": ["error", "always"],
	},
};

/** @type {FlatConfig} */
const jsdocConfig = {
	files: ["eslint.config.js", "lint-staged.config.js"],
	plugins: {
		jsdoc,
	},
	rules: {
		...jsdoc.configs["recommended-typescript-flavor-error"].rules,
		"jsdoc/no-undefined-types": ["error"],
	},
};

/** @type {FlatConfig[]} */
const overridesConfigs = [
	{
		files: [
			"commitlint.config.ts",
			"prettier.config.ts",
			"lint-staged.config.js",
			"stylelint.config.ts",
			"knip.config.ts",
		],
		rules: {
			"import/no-default-export": ["off"],
		},
	},
	{
		files: ["eslint.config.js"],
		rules: {
			"@typescript-eslint/no-unsafe-assignment": ["off"],
			"@typescript-eslint/no-unsafe-member-access": ["off"],
			"import/no-default-export": ["off"],
		},
	},
	{
		files: ["commitlint.config.ts"],
		rules: {
			"import/extensions": ["off"],
		},
	},
];

/** @type {FlatConfig[]} */
const config = [
	ignoresConfig,
	jsConfig,
	importConfig,
	sonarConfig,
	unicornConfig,
	perfectionistConfig,
	typescriptConfig,
	jsdocConfig,
	...overridesConfigs,
];

export default config;
