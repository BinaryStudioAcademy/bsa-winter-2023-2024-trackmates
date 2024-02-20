import { search } from "./actions.js";
import { actions } from "./courses.slice.js";

const allActions = {
	...actions,
	search,
};

export { allActions as actions };
export { reducer } from "./courses.slice.js";
