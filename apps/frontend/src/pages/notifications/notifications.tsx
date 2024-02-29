import notificationCharacter from "~/assets/img/notification-character.svg";
import { Image } from "~/libs/components/components.js";
import {
	useAppDispatch,
	useAppSelector,
	useEffect,
} from "~/libs/hooks/hooks.js";
import { actions } from "~/modules/user-notifications/user-notifications.js";

import { NotificationList } from "./libs/components/notification-list/notification-list.js";
import { Star } from "./libs/components/star/star.js";
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
				<Star height="13px" left="25%" top="10%" />
				<Star height="15px" left="70%" top="15%" />
				<Star height="22px" left="45%" top="18%" />
				<Star height="20px" left="15%" top="45%" />
				<Star height="18px" left="80%" top="50%" />
				<Star height="18px" left="25%" top="85%" />
				<Star height="15px" left="50%" top="75%" />
				<Star height="10px" left="75%" top="80%" />
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
