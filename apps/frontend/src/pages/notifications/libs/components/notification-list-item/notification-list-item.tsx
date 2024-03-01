import { formatDistanceToNow } from "date-fns";

import { Image, Link } from "~/libs/components/components.js";
import { DEFAULT_USER_AVATAR } from "~/libs/constants/constants.js";
import { APIPath, type AppRoute } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";
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
			<Link
				to={
					`${APIPath.USERS}/${notification.userId}` as ValueOf<typeof AppRoute>
				}
			>
				<Image
					alt="avatar"
					className={styles["notification-source-user-avatar"]}
					src={notification.userAvatarUrl ?? DEFAULT_USER_AVATAR}
				/>
			</Link>
			<div>
				<div className={styles["notification-title"]}>
					<Link
						className={styles["profile-link"]}
						to={
							`${APIPath.USERS}/${notification.userId}` as ValueOf<
								typeof AppRoute
							>
						}
					>
						{notification.userFirstName} {notification.userLastName}
					</Link>
					<span>{notification.message}</span>
				</div>
				<span className={styles["notification-subtitle"]}>
					{formatDistanceToNow(new Date(notification.createdAt), {
						addSuffix: true,
					})}
				</span>
			</div>
		</li>
	);
};

export { NotificationListItem };
