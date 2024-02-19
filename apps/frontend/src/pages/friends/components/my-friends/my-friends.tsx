import {
	useAppDispatch,
	useAppSelector,
	useEffect,
} from "~/libs/hooks/hooks.js";
import { actions } from "~/modules/friends/friends.js";

import { MyFriend } from "../my-friend/my-friend.js";
import styles from "./styles.module.css";

const MyFriends: React.FC = () => {
	const { friends } = useAppSelector(({ friends }) => ({
		friends: friends.friends,
	}));
	const dispatch = useAppDispatch();

	useEffect(() => {
		void dispatch(actions.loadAll());
	}, [dispatch]);

	return (
		<ul className={styles["friends"]}>
			{friends.map((friend) => (
				<li className={styles["friend-item"]} key={friend.id}>
					<MyFriend friend={friend} />
				</li>
			))}
		</ul>
	);
};

export { MyFriends };
