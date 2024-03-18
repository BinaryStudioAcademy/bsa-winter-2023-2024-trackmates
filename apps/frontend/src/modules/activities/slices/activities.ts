import {
	createComment,
	deleteComment,
	getAllCommentsToActivity,
	likeActivity,
	loadActivities,
} from "./actions.js";
import { actions } from "./activities.slice.js";

const allActions = {
	...actions,
	createComment,
	deleteComment,
	getAllCommentsToActivity,
	likeActivity,
	loadActivities,
};

export { allActions as actions };
export { reducer } from "./activities.slice.js";
