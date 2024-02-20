import { Tabs } from "~/libs/components/components.js";

import {
	Followers,
	Followings,
	PotentialFriends,
} from "./components/components.js";
import styles from "./styles.module.css";

const Friends: React.FC = () => {
	const TABS = {
		"Find the friends": <PotentialFriends />,
		Followers: <Followers />,
		Followings: <Followings />,
	};

	return (
		<div className={styles["wrapper"]}>
			<Tabs tabs={TABS} />
		</div>
	);
};

export { Friends };
