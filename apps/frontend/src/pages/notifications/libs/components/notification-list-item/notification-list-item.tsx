import defaultAvatar from "~/assets/img/default-avatar.png";
import { Image, Link } from "~/libs/components/components.js";
import {
	APIPath,
	type AppRoute,
	DateValue,
	FormatDateType,
} from "~/libs/enums/enums.js";
import {
	getDifferenceInHours,
	getFormattedDate,
	getValidClassNames,
} from "~/libs/helpers/helpers.js";
import { useEffect, useInView } from "~/libs/hooks/hooks.js";
import { type ValueOf } from "~/libs/types/types.js";
import { type NotificationResponseDto } from "~/modules/user-notifications/user-notifications.js";

import { NotificationStatus } from "../../enums/enums.js";
import styles from "./styles.module.css";

type Properties = {
	notification: NotificationResponseDto;
	onRead: (notificationId: number) => void;
};

const NotificationListItem: React.FC<Properties> = ({
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

	const date =
		getDifferenceInHours(notification.createdAt) < DateValue.HOURS_IN_DAY
			? getFormattedDate(notification.createdAt, FormatDateType.HH_MM)
			: getFormattedDate(notification.createdAt, FormatDateType.DD_MM_YYYY);

	return (
		<li
			className={getValidClassNames(
				styles["notification"],
				isRead ? "" : styles["unread"],
			)}
			ref={ref}
		>
			<Link
				to={
					`${APIPath.USERS}/${notification.userId}` as ValueOf<typeof AppRoute>
				}
			>
				<Image
					alt="avatar"
					className={styles["notification-source-user-avatar"]}
					src={notification.userAvatarUrl ?? defaultAvatar}
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
				<span className={styles["notification-subtitle"]}>{date}</span>
			</div>
		</li>
	);
};

export { NotificationListItem };
