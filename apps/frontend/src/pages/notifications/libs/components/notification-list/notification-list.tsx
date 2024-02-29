import { type NotificationResponseDto } from "~/modules/user-notifications/user-notifications.js";

import { NotificationListItem } from "../notification-list-item/notification-list-item.js";
import styles from "./styles.module.css";

type Properties = {
	notifications: NotificationResponseDto[];
};

const NotificationList: React.FC<Properties> = ({
	notifications,
}: Properties) => {
	return (
		<ul className={styles["notification-list"]}>
			{notifications.map((notification) => (
				<NotificationListItem
					key={notification.id}
					notification={notification}
				/>
			))}
		</ul>
	);
};

export { NotificationList };
