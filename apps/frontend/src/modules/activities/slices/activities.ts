import { loadActivities } from "./actions.js";
import { actions } from "./activities.slice.js";

const allActions = {
	...actions,
	loadActivities,
};

export { allActions as actions };
export { reducer } from "./activities.slice.js";
