import { Loader } from "~/libs/components/components.js";
import { EMPTY_ARRAY_LENGTH } from "~/libs/constants/constants.js";
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

	const hasNotifications = notifications.length > EMPTY_ARRAY_LENGTH;

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
							<p className={styles["empty-page-placeholder"]}>
								You don&apos;t have any notifications yet
							</p>
						)}
					</>
				)}
			</div>
			<div className={styles["background"]} />
		</div>
	);
};

export { Notifications };
