import { Loader } from "~/libs/components/components.js";
import { AppTitle, DataStatus } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppSelector,
	useAppTitle,
	useEffect,
} from "~/libs/hooks/hooks.js";
import { actions } from "~/modules/user-notifications/user-notifications.js";

import { NotificationList } from "./libs/components/notification-list/notification-list.js";
import styles from "./styles.module.css";

const Notifications: React.FC = () => {
	const { isLoading, notifications } = useAppSelector(
		({ userNotifications }) => {
			return {
				isLoading: userNotifications.dataStatus === DataStatus.PENDING,
				notifications: userNotifications.notifications,
			};
		},
	);

	const dispatch = useAppDispatch();

	useAppTitle(AppTitle.NOTIFICATIONS);

	useEffect(() => {
		void dispatch(actions.getUserNotifications());
	}, [dispatch]);

	return (
		<div className={styles["page"]}>
			<div className={styles["content"]}>
				<h2 className={styles["title"]}>Notifications</h2>
				{isLoading ? (
					<Loader color="orange" size="large" />
				) : (
					<NotificationList notifications={notifications} />
				)}
			</div>
			<div className={styles["background"]} />
		</div>
	);
};

export { Notifications };
