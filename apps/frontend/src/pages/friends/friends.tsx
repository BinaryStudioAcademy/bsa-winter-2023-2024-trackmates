import { DEFAULT_FRIENDS_DATA } from "~/libs/constants/constants.js";

import { Friend } from "./components/components.js";
import styles from "./styles.module.css";

const Friends: React.FC = () => {
	return (
		<ul className={styles["wrapper"]}>
			{DEFAULT_FRIENDS_DATA.map((user) => (
				<Friend key={user.id} user={user} />
			))}
		</ul>
	);
};

export { Friends };
