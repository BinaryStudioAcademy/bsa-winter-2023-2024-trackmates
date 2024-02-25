import { add, loadMyCourses, searchMyCourses } from "./actions.js";
import { actions } from "./user-courses.slice.js";

const allActions = {
	...actions,
	add,
	loadMyCourses,
	searchMyCourses,
};

export { allActions as actions };
export { reducer } from "./user-courses.slice.js";
