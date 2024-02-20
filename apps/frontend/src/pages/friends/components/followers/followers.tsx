import {
	useAppDispatch,
	useAppSelector,
	useEffect,
} from "~/libs/hooks/hooks.js";
import { actions } from "~/modules/friends/friends.js";

import { FriendList } from "../friend-list/friend-list.js";

const Followers: React.FC = () => {
	const { followers } = useAppSelector(({ friends }) => ({
		followers: friends.followers,
	}));
	const dispatch = useAppDispatch();

	useEffect(() => {
		void dispatch(actions.getFollowers());
	}, [dispatch]);

	return <FriendList friends={followers} />;
};

export { Followers };
