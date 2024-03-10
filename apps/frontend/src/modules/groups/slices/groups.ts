import {
	createGroup,
	deleteGroup,
	editGroup,
	getAllGroups,
	updateGroupPermissions,
	updateUserGroups,
} from "./actions.js";
import { actions } from "./groups.slice.js";

const allActions = {
	...actions,
	createGroup,
	deleteGroup,
	editGroup,
	getAllGroups,
	updateGroupPermissions,
	updateUserGroups,
};

export { allActions as actions };
export { reducer } from "./groups.slice.js";
