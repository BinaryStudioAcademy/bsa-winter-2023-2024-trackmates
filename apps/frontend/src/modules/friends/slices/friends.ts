import {
	follow,
	getFollowers,
	getFollowings,
	getPotentialFriends,
	unfollow,
} from "./actions.js";
import { actions } from "./friends.slice.js";

const allActions = {
	...actions,
	follow,
	getFollowers,
	getFollowings,
	getPotentialFriends,
	unfollow,
};

export { allActions as actions };
export { reducer } from "./friends.slice.js";
