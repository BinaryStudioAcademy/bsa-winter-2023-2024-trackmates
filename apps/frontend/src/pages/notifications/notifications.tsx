import notificationCharacter from "~/assets/img/notification-character.svg";
import { Image } from "~/libs/components/components.js";
import {
	useAppDispatch,
	useAppSelector,
	useEffect,
} from "~/libs/hooks/hooks.js";
import { actions } from "~/modules/user-notifications/user-notifications.js";

import { NotificationList } from "./libs/components/notification-list/notification-list.js";
import styles from "./styles.module.css";

const Notifications: React.FC = () => {
	const notifications = useAppSelector(
		(state) => state.userNotifications.notifications,
	);

	const dispatch = useAppDispatch();

	useEffect(() => {
		void dispatch(actions.getUserNotifications());
	}, [dispatch]);

	return (
		<div className={styles["page"]}>
			<div className={styles["content"]}>
				<h2 className={styles["title"]}>Notifications</h2>
				<NotificationList notifications={notifications} />
			</div>
			<div className={styles["background"]}>
				<Image
					alt="notification character"
					className={styles["notification-character"]}
					src={notificationCharacter}
				/>
			</div>
		</div>
	);
};

export { Notifications };
