import { type NotificationResponseDto } from "~/modules/user-notifications/user-notifications.js";

import styles from "./styles.module.css";

type Properties = {
	notification: NotificationResponseDto;
};

const NotificationListItem: React.FC<Properties> = ({
	notification,
}: Properties) => {
	return <li className={styles["notification"]}>{notification.message}</li>;
};

export { NotificationListItem };
