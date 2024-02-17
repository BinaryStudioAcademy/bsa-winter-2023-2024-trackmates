import {
	useAppDispatch,
	useAppSelector,
	useEffect,
} from "~/libs/hooks/hooks.js";
import { actions } from "~/modules/friends/friends.js";

import { Friend } from "./components/components.js";
import styles from "./styles.module.css";

const Friends: React.FC = () => {
	const { friends } = useAppSelector(({ friends }) => friends);
	const dispatch = useAppDispatch();

	useEffect(() => {
		void dispatch(actions.loadAll());
	}, [dispatch]);

	return (
		<ul className={styles["wrapper"]}>
			{friends.map((friend) => (
				<li className={styles["friend-item"]} key={friend.id}>
					<Friend friend={friend} />
				</li>
			))}
		</ul>
	);
};

export { Friends };
