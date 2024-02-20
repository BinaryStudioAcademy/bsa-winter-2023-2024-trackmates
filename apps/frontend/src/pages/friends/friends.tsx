import { Tab, TabList, TabPanel, Tabs } from "~/libs/components/components.js";

import {
	Followers,
	Followings,
	PotentialFriends,
} from "./components/components.js";
import styles from "./styles.module.css";

const Friends: React.FC = () => {
	const tabClassName = styles["tab"];
	const selectedTabClassName = styles["tab--selected"];

	return (
		<Tabs className={styles["wrapper"]}>
			<TabList className={styles["tab-list"]}>
				<Tab className={tabClassName} selectedClassName={selectedTabClassName}>
					Find the friends
				</Tab>
				<Tab className={tabClassName} selectedClassName={selectedTabClassName}>
					Followers
				</Tab>
				<Tab className={tabClassName} selectedClassName={selectedTabClassName}>
					Following
				</Tab>
			</TabList>
			<TabPanel>
				<PotentialFriends />
			</TabPanel>
			<TabPanel>
				<Followers />
			</TabPanel>
			<TabPanel>
				<Followings />
			</TabPanel>
		</Tabs>
	);
};

export { Friends };
