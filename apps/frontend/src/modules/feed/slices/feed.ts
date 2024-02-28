import { loadFeed } from "./actions.js";
import { actions } from "./feed.slice.js";

const allActions = {
	...actions,
	loadFeed,
};

export { allActions as actions };
export { reducer } from "./feed.slice.js";
