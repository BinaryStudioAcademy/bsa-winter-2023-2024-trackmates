import { KnipConfig } from "knip";

const config: KnipConfig = {
	ignore: [
		// TODO remove
		"apps/backend/src/libs/modules/udemy/**",
		"apps/backend/src/libs/modules/http/**",
	],
	prettier: ["./prettier.config.ts"],
	stylelint: ["./stylelint.config.js"],
	workspaces: {
		".": {
			entry: ["./dangerfile.ts"],
		},
		"apps/backend": {
			entry: ["src/index.ts", "src/db/migrations/*.ts", "knexfile.ts"],
			ignoreDependencies: ["pg"],
		},
		"apps/frontend": {
			entry: ["src/index.tsx"],
		},
		"packages/shared": {
			entry: ["src/index.ts"],
			includeEntryExports: true,
		},
	},
};

export default config;
