import { getAllByCourseId } from "./actions.js";
import { actions } from "./course-sections.slice.js";

const allActions = {
	...actions,
	getAllByCourseId,
};

export { allActions as actions };
export { reducer } from "./course-sections.slice.js";
