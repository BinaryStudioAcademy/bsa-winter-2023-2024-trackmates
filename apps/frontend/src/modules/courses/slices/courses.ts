import { getAll, getRecommended } from "./actions.js";
import { actions } from "./courses.slice.js";

const allActions = {
	...actions,
	getAll,
	getRecommended,
};

export { allActions as actions };
export { reducer } from "./courses.slice.js";
