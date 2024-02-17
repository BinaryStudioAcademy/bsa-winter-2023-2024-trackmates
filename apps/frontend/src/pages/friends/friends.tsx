import { SortOrder } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppSelector,
	useEffect,
	useMemo,
} from "~/libs/hooks/hooks.js";
import { actions } from "~/modules/friends/friends.js";

import { Friend } from "./components/components.js";
import { sortOrder } from "./libs/maps/maps.js";
import styles from "./styles.module.css";

const Friends: React.FC = () => {
	const { friends } = useAppSelector(({ friends }) => friends);
	const dispatch = useAppDispatch();

	useEffect(() => {
		void dispatch(actions.loadAll());
	}, [dispatch]);

	const orderedFriends = useMemo(() => {
		return [...friends].sort((a, b) =>
			sortOrder[a.status] - sortOrder[b.status] > SortOrder.EQUAL
				? SortOrder.GREATER
				: SortOrder.LESS,
		);
	}, [friends]);

	return (
		<ul className={styles["wrapper"]}>
			{orderedFriends.map((friend) => (
				<li className={styles["friend-item"]} key={friend.id}>
					<Friend friend={friend} />
				</li>
			))}
		</ul>
	);
};

export { Friends };
