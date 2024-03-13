import { actions } from "./management.slice.js";

const allActions = {
	...actions,
};

export { allActions as actions };
export { reducer } from "./management.slice.js";
