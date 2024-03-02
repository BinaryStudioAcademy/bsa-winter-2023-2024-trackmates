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
} from "~/libs/helpers/helpers.js";
import { type ValueOf } from "~/libs/types/types.js";
import { type NotificationResponseDto } from "~/modules/user-notifications/user-notifications.js";

import styles from "./styles.module.css";

type Properties = {
	notification: NotificationResponseDto;
};

const NotificationListItem: React.FC<Properties> = ({
	notification,
}: Properties) => {
	const date =
		getDifferenceInHours(notification.createdAt) < DateValue.HOURS_IN_DAY
			? getFormattedDate(notification.createdAt, FormatDateType.HH_MM)
			: getFormattedDate(notification.createdAt, FormatDateType.DD_MM_YYYY);

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
