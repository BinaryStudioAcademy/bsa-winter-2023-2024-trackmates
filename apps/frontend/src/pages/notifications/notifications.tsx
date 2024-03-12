import { EmptyPagePlaceholder, Loader } from "~/libs/components/components.js";
import { AppTitle, DataStatus, EmptyLength } from "~/libs/enums/enums.js";
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

	const hasNotifications = notifications.length > EmptyLength.ARRAY;

	return (
		<div className={styles["page"]}>
			<div className={styles["content"]}>
				<h2 className={styles["title"]}>Notifications</h2>
				{isLoading ? (
					<Loader color="orange" size="large" />
				) : (
					<>
						{hasNotifications ? (
							<NotificationList notifications={notifications} />
						) : (
							<EmptyPagePlaceholder title="You don't have any notifications yet" />
						)}
					</>
				)}
			</div>
			<div className={styles["background"]} />
		</div>
	);
};

export { Notifications };
