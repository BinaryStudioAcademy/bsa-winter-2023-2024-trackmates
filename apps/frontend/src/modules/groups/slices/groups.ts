import {
	createGroup,
	deleteGroup,
	getAllGroups,
	updateGroupPermissions,
	updateUserGroups,
} from "./actions.js";

const allActions = {
	createGroup,
	deleteGroup,
	getAllGroups,
	updateGroupPermissions,
	updateUserGroups,
};

export { allActions as actions };
