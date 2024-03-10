import { getAllPermissions } from "./actions.js";
import { actions } from "./permissions.slice.js";

const allActions = {
	...actions,
	getAllPermissions,
};

export { allActions as actions };
export { reducer } from "./permissions.slice.js";
