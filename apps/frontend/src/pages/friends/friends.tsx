import { Tab, TabList, TabPanel, Tabs } from "~/libs/components/components.js";
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
		<Tabs className={styles["wrapper"]}>
			<TabList className={styles["tab-list"]}>
				<Tab
					className={styles["tab"]}
					selectedClassName={styles["tab--selected"]}
				>
					Find the friends
				</Tab>
				<Tab
					className={styles["tab"]}
					selectedClassName={styles["tab--selected"]}
				>
					My Friends
				</Tab>
			</TabList>
			<TabPanel>Here will be a list of potential friends</TabPanel>
			<TabPanel>
				<ul className={styles["friends"]}>
					{friendsWithoutMyRequests.map((friend) => (
						<li className={styles["friend-item"]} key={friend.id}>
							<Friend friend={friend} />
						</li>
					))}
				</ul>
			</TabPanel>
		</Tabs>
	);
};

export { Friends };
