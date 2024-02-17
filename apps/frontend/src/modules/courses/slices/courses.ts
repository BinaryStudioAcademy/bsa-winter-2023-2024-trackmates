import { add, loadAll, search } from "./actions.js";
import { actions } from "./courses.slice.js";

const allActions = {
	...actions,
	add,
	loadAll,
	search,
};

export { allActions as actions };
export { reducer } from "./courses.slice.js";
