import { create, getAll, updateStatus } from "./actions.js";
import { actions } from "./section-statuses.slice.js";

const allActions = {
	...actions,
	create,
	getAll,
	updateStatus,
};

export { allActions as actions };
export { reducer } from "./section-statuses.slice.js";
