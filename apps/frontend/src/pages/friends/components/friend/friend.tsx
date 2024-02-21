import { Button, Image } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/enums.js";
import { type FriendDto } from "~/libs/types/types.js";

import styles from "./styles.module.css";

type Properties = {
	friend: FriendDto;
};

const Friend: React.FC<Properties> = ({ friend }: Properties) => {
	const chatRouteByUser =
		`${AppRoute.CHATS}?user=${friend.id}` as typeof AppRoute.CHATS;

	return (
		<article className={styles["card"]}>
			<div className={styles["card-content"]}>
				<Image
					alt={`portrait of ${friend.fullName}`}
					className={styles["portrait"]}
					src={friend.imageUrl}
				/>
				<p className={styles["fullName"]}>{friend.fullName}</p>
			</div>

			<div className={styles["actions"]}>
				<Button
					className={styles["add-friend-action"]}
					color="secondary"
					iconName="add"
					label="Add friend"
					size="small"
				/>
				<Button
					className={styles["start-chat"]}
					color="transparent"
					hasVisuallyHiddenLabel
					href={chatRouteByUser}
					iconName="chats"
					label="Start chat"
					style="outlined"
				/>
			</div>
		</article>
	);
};

export { Friend };
