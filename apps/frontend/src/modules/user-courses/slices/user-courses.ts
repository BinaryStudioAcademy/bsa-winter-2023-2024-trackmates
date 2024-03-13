import {
	add,
	loadCommonCourses,
	loadMyCourses,
	loadUserCourses,
} from "./actions.js";
import { actions } from "./user-courses.slice.js";

const allActions = {
	...actions,
	add,
	loadCommonCourses,
	loadMyCourses,
	loadUserCourses,
};

export { allActions as actions };
export { reducer } from "./user-courses.slice.js";
