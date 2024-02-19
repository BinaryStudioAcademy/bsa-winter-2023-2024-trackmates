import {
	useAppDispatch,
	useAppSelector,
	useEffect,
} from "~/libs/hooks/hooks.js";
import { actions } from "~/modules/friends/friends.js";

import { PotentialFriend } from "../potential-friend/potential-friend.js";
import styles from "./styles.module.css";

const PotentialFriends: React.FC = () => {
	const { potentialFriends } = useAppSelector(({ friends }) => ({
		potentialFriends: friends.potentialFriends,
	}));
	const dispatch = useAppDispatch();

	useEffect(() => {
		void dispatch(actions.getPotentialFriends());
	}, [dispatch]);

	return (
		<ul className={styles["friends"]}>
			{potentialFriends.map((friend) => (
				<li className={styles["friend-item"]} key={friend.id}>
					<PotentialFriend friend={friend} />
				</li>
			))}
		</ul>
	);
};

export { PotentialFriends };
