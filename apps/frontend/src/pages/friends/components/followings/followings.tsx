import {
	useAppDispatch,
	useAppSelector,
	useEffect,
} from "~/libs/hooks/hooks.js";
import { actions } from "~/modules/friends/friends.js";

import { FriendList } from "../friend-list/friend-list.js";

const Followings: React.FC = () => {
	const { followings } = useAppSelector(({ friends }) => ({
		followings: friends.followings,
	}));
	const dispatch = useAppDispatch();

	useEffect(() => {
		void dispatch(actions.getFollowings());
	}, [dispatch]);

	return <FriendList friends={followings} />;
};

export { Followings };
