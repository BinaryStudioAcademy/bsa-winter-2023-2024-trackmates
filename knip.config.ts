import { KnipConfig } from "knip";

const config: KnipConfig = {
	workspaces: {
		"apps/frontend": {
			entry: ["src/index.tsx"],
		},
		"apps/backend": {
			entry: ["src/index.ts", "src/db/migrations/*.ts", "knexfile.ts"],
		},
		"packages/shared": {
			entry: ["src/index.ts"],
		},
	},
	ignore: ["./prettierrc.config.ts", "./stylelint.config.ts"],
	ignoreDependencies: [
		"simple-git-hooks",
		"stylelint-config-standard",
		"stylelint-order",
		"shared",
		"@commitlint/types",
		"pg",
	],
};

export default config;
