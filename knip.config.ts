import { KnipConfig } from "knip";

const config: KnipConfig = {
	ignore: ["./dangerfile.ts"],
	prettier: ["./prettier.config.ts"],
	stylelint: ["./stylelint.config.ts"],
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
