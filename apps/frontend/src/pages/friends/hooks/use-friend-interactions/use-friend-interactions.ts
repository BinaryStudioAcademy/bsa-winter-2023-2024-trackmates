import { useAppDispatch, useCallback } from "~/libs/hooks/hooks.js";
import { type FriendDto } from "~/libs/types/types.js";
import { actions } from "~/modules/friends/friends.js";

const useFriendInteractions = (friend: FriendDto) => {
	const dispatch = useAppDispatch();

	const handleAcceptRequest = useCallback(() => {
		void dispatch(actions.acceptRequest(friend.id));
	}, [dispatch, friend.id]);

	const handleDenyRequest = useCallback(() => {
		void dispatch(actions.denyRequest(friend.id));
	}, [dispatch, friend.id]);

	const handleSendRequest = useCallback(() => {
		void dispatch(
			actions.sendRequest({
				receiverUserId: friend.id,
			}),
		);
	}, [dispatch, friend.id]);

	return {
		handleAcceptRequest,
		handleDenyRequest,
		handleSendRequest,
	};
};

export { useFriendInteractions };
