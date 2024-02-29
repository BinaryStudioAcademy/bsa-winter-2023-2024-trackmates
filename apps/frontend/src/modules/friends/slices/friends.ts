import {
	follow,
	getFollowers,
	getFollowings,
	getIsFollowing,
	getPotentialFriends,
	unfollow,
} from "./actions.js";
import { actions } from "./friends.slice.js";

const allActions = {
	...actions,
	follow,
	getFollowers,
	getFollowings,
	getIsFollowing,
	getPotentialFriends,
	unfollow,
};

export { allActions as actions };
export { reducer } from "./friends.slice.js";
