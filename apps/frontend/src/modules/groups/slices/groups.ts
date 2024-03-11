import {
	createGroup,
	deleteGroup,
	editGroup,
	getAllGroups,
	updateGroupPermissions,
	updateUserGroups,
} from "./actions.js";

const allActions = {
	createGroup,
	deleteGroup,
	editGroup,
	getAllGroups,
	updateGroupPermissions,
	updateUserGroups,
};

export { allActions as actions };
