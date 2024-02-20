import { type UserAuthResponseDto } from "~/modules/users/users.js";

import { Friend } from "../friend/friend.js";
import styles from "./styles.module.css";

type Properties = {
	friends: UserAuthResponseDto[];
};

const FriendList: React.FC<Properties> = ({ friends }: Properties) => {
	return (
		<ul className={styles["friends"]}>
			{friends.map((friend) => (
				<li className={styles["friend-item"]} key={friend.id}>
					<Friend friend={friend} />
				</li>
			))}
		</ul>
	);
};

export { FriendList };
