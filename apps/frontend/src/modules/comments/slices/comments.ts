import {
	createComment,
	deleteComment,
	getAllCommentsToActivity,
} from "./actions.js";
import { actions } from "./comments.slice.js";

const allActions = {
	...actions,
	createComment,
	deleteComment,
	getAllCommentsToActivity,
};

export { allActions as actions };
export { reducer } from "./comments.slice.js";
