import { getAll, getById, remove, updateProfile } from "./actions.js";
import { actions } from "./users.slice.js";

const allActions = {
	...actions,
	getAll,
	getById,
	remove,
	updateProfile,
};

export { allActions as actions };
export { reducer } from "./users.slice.js";
