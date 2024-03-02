import { getAll, getById, getRecommended } from "./actions.js";
import { actions } from "./courses.slice.js";

const allActions = {
	...actions,
	getAll,
	getById,
	getRecommended,
};

export { allActions as actions };
export { reducer } from "./courses.slice.js";
