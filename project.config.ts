const ProjectPrefix = {
	ISSUE_PREFIXES: ["tm"],
	SCOPES: {
		APPS: ["frontend", "backend"],
		PACKAGES: ["shared"],
	},
	APP: "tm",
	CHANGE_TYPES: [
		"build",
		"chore",
		"ci",
		"docs",
		"feat",
		"fix",
		"perf",
		"refactor",
		"revert",
		"style",
		"test",
	],
	ENVIRONMENT: "main",
} as const;

export { ProjectPrefix };
