import {
	useAppDispatch,
	useAppSelector,
	useEffect,
	useMemo,
} from "~/libs/hooks/hooks.js";
import { actions } from "~/modules/friends/friends.js";

import { Friend } from "./components/components.js";
import styles from "./styles.module.css";

const Friends: React.FC = () => {
	const { friends, user } = useAppSelector(({ auth, friends }) => ({
		friends: friends.friends,
		user: auth.user,
	}));
	const dispatch = useAppDispatch();

	useEffect(() => {
		void dispatch(actions.loadAll());
	}, [dispatch]);

	const friendsWithoutMyRequests = useMemo(() => {
		return friends.filter((friend) => friend.senderUserId !== user?.id);
	}, [friends, user?.id]);

	return (
		<ul className={styles["wrapper"]}>
			{friendsWithoutMyRequests.map((friend) => (
				<li className={styles["friend-item"]} key={friend.id}>
					<Friend friend={friend} />
				</li>
			))}
		</ul>
	);
};

export { Friends };
