import { getAll, getById, updateProfile } from "./actions.js";
import { actions } from "./users.slice.js";

const allActions = {
	...actions,
	getAll,
	getById,
	updateProfile,
};

export { allActions as actions };
export { reducer } from "./users.slice.js";
