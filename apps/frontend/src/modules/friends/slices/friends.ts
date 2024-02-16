import { acceptRequest, denyRequest, loadAll, sendRequest } from "./actions.js";
import { actions } from "./friends.slice.js";

const allActions = {
	...actions,
	acceptRequest,
	denyRequest,
	loadAll,
	sendRequest,
};

export { allActions as actions };
export { reducer } from "./friends.slice.js";
