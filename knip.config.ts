import { KnipConfig } from "knip";

const config: KnipConfig = {
	ignore: ["./prettier.config.ts", "./stylelint.config.ts", "./dangerfile.ts"],
	ignoreDependencies: [
		"stylelint-config-recess-order",
		"stylelint-config-standard",
	],
	workspaces: {
		"apps/backend": {
			entry: ["src/index.ts", "src/db/migrations/*.ts", "knexfile.ts"],
			ignoreDependencies: ["pg"],
		},
		"apps/frontend": {
			entry: ["src/index.tsx"],
		},
		"packages/shared": {
			entry: ["src/index.ts"],
		},
	},
};

export default config;
