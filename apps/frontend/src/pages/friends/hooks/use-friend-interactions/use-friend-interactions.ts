import { useAppDispatch, useCallback } from "~/libs/hooks/hooks.js";
import { type Friend } from "~/libs/types/types.js";
import { actions } from "~/modules/friends/friends.js";

const useFriendInteractions = (friend: Friend) => {
	const dispatch = useAppDispatch();

	const acceptRequest = useCallback(() => {
		void dispatch(actions.acceptRequest(friend.id));
	}, [dispatch, friend.id]);

	const denyRequest = useCallback(() => {
		void dispatch(actions.denyRequest(friend.id));
	}, [dispatch, friend.id]);

	const sendRequest = useCallback(() => {
		void dispatch(
			actions.sendRequest({
				receiverUserId: friend.id,
			}),
		);
	}, [dispatch, friend.id]);

	return {
		acceptRequest,
		denyRequest,
		sendRequest,
	};
};

export { useFriendInteractions };
