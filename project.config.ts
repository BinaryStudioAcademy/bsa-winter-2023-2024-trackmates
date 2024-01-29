const ProjectPrefix = {
	ISSUE_PREFIXES: ["tm"],
	SCOPES: {
		APPS: ["frontend", "backend"],
		PACKAGES: ["shared"],
	},
	APP: "tm",
	CHANGE_TYPES: ["feat", "fix", "refactor", "chore", "docs"],
	ENVIRONMENT: "main",
} as const;

export { ProjectPrefix };
