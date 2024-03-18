import {
	deleteById,
	getAllByFilter,
	getAllByVendor,
	getById,
	getRecommended,
	update,
} from "./actions.js";
import { actions } from "./courses.slice.js";

const allActions = {
	...actions,
	deleteById,
	getAllByFilter,
	getAllByVendor,
	getById,
	getRecommended,
	update,
};

export { allActions as actions };
export { reducer } from "./courses.slice.js";
