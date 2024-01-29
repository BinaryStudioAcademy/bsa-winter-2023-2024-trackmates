import { danger, fail, type GitHubPRDSL as LibraryGitHubDSL } from "danger";

import { ProjectPrefix } from "./project.config.js";

type GitHubPRDSL = LibraryGitHubDSL & {
	milestone: Record<string, unknown> | null;
	labels: unknown[];
	project_id: string | null;
};

type DangerConfig = {
	TITLE: {
		PATTERN: RegExp | null;
	};
	ASSIGNEES: {
		IS_REQUIRED: boolean;
	};
	MILESTONE: {
		IS_REQUIRED: boolean;
	};
	LABELS: {
		IS_REQUIRED: boolean;
	};
	BRANCH: {
		PATTERN: RegExp | null;
	};
};

const config: DangerConfig = {
	TITLE: {
		PATTERN: new RegExp(
			`^(${ProjectPrefix.CHANGE_TYPES.join("|")}: (.*\\S) ${ProjectPrefix.APP}-[0-9]{1,6}$`,
		),
	},
	ASSIGNEES: {
		IS_REQUIRED: true,
	},
	MILESTONE: {
		IS_REQUIRED: true,
	},
	LABELS: {
		IS_REQUIRED: true,
	},
	BRANCH: {
		PATTERN: new RegExp(
			`^[0-9]{1,6}-${ProjectPrefix.CHANGE_TYPES.join("|")}-[a-zA-Z0-9-]+$|(${ProjectPrefix.ENVIRONMENT})$`,
		),
	},
};

const pr = danger.github.pr as GitHubPRDSL;

const checkAssignees = (): void => {
	const hasAssignees = Boolean(pr.assignee);

	if (!hasAssignees) {
		fail("This pull request should have at least one assignee.");
	}
};

const checkTitle = (titlePattern: RegExp): void => {
	const isTitleValid = titlePattern.test(pr.title);

	if (!isTitleValid) {
		fail(
			`The pull request title should match the following pattern: ${String(
				titlePattern,
			)}.`,
		);
	}
};

const checkMilestone = (): void => {
	const hasMilestone = Boolean(pr.milestone);

	if (!hasMilestone) {
		fail("This pull request should have a milestone.");
	}
};

const checkLabels = (): void => {
	const hasLabels = pr.labels.length > 0;

	if (!hasLabels) {
		fail("This pull request should have at least one label.");
	}
};

const checkBranch = (branchPattern: RegExp): void => {
	const isBranchValid = branchPattern.test(pr.head.ref);

	if (!isBranchValid) {
		fail(
			`The pull request branch should match the following pattern: ${String(
				branchPattern,
			)}.`,
		);
	}
};

const applyDanger = (): void => {
	if (config.TITLE.PATTERN) {
		checkTitle(config.TITLE.PATTERN);
	}

	if (config.ASSIGNEES.IS_REQUIRED) {
		checkAssignees();
	}

	if (config.MILESTONE.IS_REQUIRED) {
		checkMilestone();
	}

	if (config.LABELS.IS_REQUIRED) {
		checkLabels();
	}

	if (config.BRANCH.PATTERN) {
		checkBranch(config.BRANCH.PATTERN);
	}
};

applyDanger();
