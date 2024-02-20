import { Tabs } from "~/libs/components/components.js";
import {
	useAppDispatch,
	useAppSelector,
	useEffect,
} from "~/libs/hooks/hooks.js";
import { actions } from "~/modules/friends/friends.js";

import { FriendList } from "./libs/components/components.js";
import styles from "./styles.module.css";

const Friends: React.FC = () => {
	const { followers, followings, potentialFriends } = useAppSelector(
		({ friends }) => ({
			followers: friends.followers,
			followings: friends.followings,
			potentialFriends: friends.potentialFriends,
		}),
	);
	const dispatch = useAppDispatch();

	useEffect(() => {
		void dispatch(actions.getFollowings());
		void dispatch(actions.getFollowers());
		void dispatch(actions.getPotentialFriends());
	}, [dispatch]);

	const TABS = {
		"Find the friends": <FriendList friends={potentialFriends} />,
		Followers: <FriendList friends={followers} />,
		Followings: <FriendList friends={followings} />,
	};

	return (
		<div className={styles["wrapper"]}>
			<Tabs tabs={TABS} />
		</div>
	);
};

export { Friends };
