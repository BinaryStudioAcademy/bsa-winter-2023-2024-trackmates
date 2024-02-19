import { Tab, TabList, TabPanel, Tabs } from "~/libs/components/components.js";

import { MyFriends, PotentialFriends } from "./components/components.js";
import styles from "./styles.module.css";

const Friends: React.FC = () => {
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
			<TabPanel>
				<PotentialFriends />
			</TabPanel>
			<TabPanel>
				<MyFriends />
			</TabPanel>
		</Tabs>
	);
};

export { Friends };
