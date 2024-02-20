import { createSelector } from "~/libs/helpers/helpers.js";
import { type RootState } from "~/libs/modules/store/store.js";

const checkIsFollowingFriend = createSelector(
	[
		(state: RootState) => state.friends.followings,
		(_, userId: number) => userId,
	],
	(followings, userId) => followings.some((user) => user.id === userId),
);

export { checkIsFollowingFriend };
