import { loadAll } from "./actions.ts";
import { actions } from "./users.slice.ts";

const allActions = {
	...actions,
	loadAll,
};

export { allActions as actions };
export { reducer } from "./users.slice.ts";
