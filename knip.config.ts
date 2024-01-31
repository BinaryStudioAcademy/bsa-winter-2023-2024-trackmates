import { KnipConfig } from "knip";

const config: KnipConfig = {
	ignore: ["./prettierrc.config.ts", "./stylelint.config.ts"],
	ignoreDependencies: [
		"simple-git-hooks",
		"stylelint-config-standard",
		"stylelint-order",
		"shared",
		"@commitlint/types",
		"pg",
	],
	workspaces: {
		"apps/backend": {
			entry: ["src/index.ts", "src/db/migrations/*.ts", "knexfile.ts"],
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
