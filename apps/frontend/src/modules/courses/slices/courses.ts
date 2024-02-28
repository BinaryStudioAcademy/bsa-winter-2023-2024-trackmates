import { getAll, getById } from "./actions.js";
import { actions } from "./courses.slice.js";

const allActions = {
	...actions,
	getAll,
	getById,
};

export { allActions as actions };
export { reducer } from "./courses.slice.js";
