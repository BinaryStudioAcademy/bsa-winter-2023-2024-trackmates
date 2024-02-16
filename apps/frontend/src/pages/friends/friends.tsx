import { DEFAULT_FRIENDS_DATA } from "~/libs/constants/friends.constants.js";

import { Friend } from "./components/components.js";
import styles from "./styles.module.css";

const Friends: React.FC = () => {
	return (
		<section className={styles["wrapper"]}>
			{DEFAULT_FRIENDS_DATA.map(({ fullName, id, imageUrl }) => (
				<Friend
					key={id}
					user={{
						fullName,
						imageUrl,
					}}
				/>
			))}
		</section>
	);
};

export { Friends };
