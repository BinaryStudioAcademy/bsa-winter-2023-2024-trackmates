import {
	createComment,
	getAllCommentsToActivity,
	loadActivities,
} from "./actions.js";
import { actions } from "./activities.slice.js";

const allActions = {
	...actions,
	createComment,
	getAllCommentsToActivity,
	loadActivities,
};

export { allActions as actions };
export { reducer } from "./activities.slice.js";
