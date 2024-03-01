import { actions } from "./app.slice.js";

const allActions = {
	...actions,
};

export { allActions as actions };
export { reducer } from "./app.slice.js";
