import {
	acceptRequest,
	denyRequest,
	getPotentialFriends,
	loadAll,
	sendRequest,
} from "./actions.js";
import { actions } from "./friends.slice.js";

const allActions = {
	...actions,
	acceptRequest,
	denyRequest,
	getPotentialFriends,
	loadAll,
	sendRequest,
};

export { allActions as actions };
export { reducer } from "./friends.slice.js";
