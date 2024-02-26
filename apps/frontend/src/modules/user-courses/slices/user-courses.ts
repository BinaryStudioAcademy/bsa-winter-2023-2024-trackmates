import { add, loadMyCourses } from "./actions.js";
import { actions } from "./user-courses.slice.js";

const allActions = {
	...actions,
	add,
	loadMyCourses,
};

export { allActions as actions };
export { reducer } from "./user-courses.slice.js";
