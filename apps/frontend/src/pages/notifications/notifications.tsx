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
			<NotificationList notifications={notifications} />
		</div>
	);
};

export { Notifications };
