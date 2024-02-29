import { Image, Link } from "~/libs/components/components.js";
import { DEFAULT_USER_AVATAR } from "~/libs/constants/constants.js";
import { getTimeAgo } from "~/libs/helpers/helpers.js";
import { type NotificationResponseDto } from "~/modules/user-notifications/user-notifications.js";

import styles from "./styles.module.css";

type Properties = {
	notification: NotificationResponseDto;
};

const NotificationListItem: React.FC<Properties> = ({
	notification,
}: Properties) => {
	return (
		<li className={styles["notification"]}>
			<Link to="/">
				<Image
					alt="avatar"
					className={styles["notification-source-user-avatar"]}
					src={notification.sourceUserAvatarUrl ?? DEFAULT_USER_AVATAR}
				/>
			</Link>
			<div>
				<div className={styles["notification-title"]}>
					<Link className={styles["profile-link"]} to="/">
						{notification.sourceUserFirstName} {notification.sourceUserLastName}
					</Link>
					<span>{notification.message}</span>
				</div>
				<span className={styles["notification-subtitle"]}>
					{getTimeAgo(notification.createdAt)}
				</span>
			</div>
		</li>
	);
};

export { NotificationListItem };
