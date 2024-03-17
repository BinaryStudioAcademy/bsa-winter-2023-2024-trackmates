import defaultAvatar from "~/assets/img/default-avatar.png";
import { Icon, Image, Link } from "~/libs/components/components.js";
import {
	APIPath,
	type AppRoute,
	NotificationStatus,
} from "~/libs/enums/enums.js";
import {
	getTimeDistanceFormatDate,
	getValidClassNames,
} from "~/libs/helpers/helpers.js";
import { useEffect, useInView } from "~/libs/hooks/hooks.js";
import { type ValueOf } from "~/libs/types/types.js";
import { type NotificationResponseDto } from "~/modules/user-notifications/user-notifications.js";

import { notificationTypeToIconName } from "./libs/maps/maps.js";
import styles from "./styles.module.css";

type Properties = {
	hasIcon: boolean;
	notification: NotificationResponseDto;
	onRead: (notificationId: number) => void;
};

const NotificationListItem: React.FC<Properties> = ({
	hasIcon,
	notification,
	onRead,
}: Properties) => {
	const { inView, ref } = useInView();

	const isRead = notification.status === NotificationStatus.READ;

	useEffect(() => {
		if (!isRead && inView) {
			onRead(notification.id);
		}
	}, [inView, isRead, onRead, notification.id]);

	const date = getTimeDistanceFormatDate(notification.createdAt);

	const iconName = notificationTypeToIconName[notification.type];

	return (
		<li
			className={getValidClassNames(
				styles["notification"],
				!isRead && styles["unread"],
			)}
			ref={ref}
		>
			<Link
				className={styles["avatar-container"]}
				to={
					`${APIPath.USERS}/${notification.userId}` as ValueOf<typeof AppRoute>
				}
			>
				<Image
					alt="avatar"
					className={styles["notification-source-user-avatar"]}
					src={notification.userAvatarUrl ?? defaultAvatar}
				/>
				{hasIcon && (
					<span className={styles["icon-container"]}>
						<Icon className={styles["icon"]} name={iconName} />
					</span>
				)}
			</Link>
			<div className={styles["text-content"]}>
				<div className={styles["notification-title"]}>
					{notification.message}
				</div>
				<span className={styles["notification-date"]}>{date}</span>
			</div>
		</li>
	);
};

export { NotificationListItem };
