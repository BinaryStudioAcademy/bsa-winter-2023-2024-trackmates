import {
	follow,
	getFollowers,
	getFollowings,
	getPotentialFriends,
	unfollow,
} from "./actions.js";
import { actions } from "./friends.slice.js";
import { checkIsFollowingFriend } from "./selectors.js";

const allActions = {
	...actions,
	follow,
	getFollowers,
	getFollowings,
	getPotentialFriends,
	unfollow,
};

const allSelectors = {
	checkIsFollowingFriend,
};

export { allActions as actions };
export { reducer } from "./friends.slice.js";
export { allSelectors as selectors };
