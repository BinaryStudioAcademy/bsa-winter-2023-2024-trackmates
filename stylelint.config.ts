import { Config } from "stylelint";

const config: Config = {
	extends: ["stylelint-config-standard", "stylelint-config-recess-order"],
	rules: {
		"selector-class-pattern": null,
		"color-hex-length": "long",
		"declaration-no-important": true,
		"max-nesting-depth": 0,
		"no-descending-specificity": true,
		"unit-disallowed-list": ["em", "rem"],
	},
};

export default config;
