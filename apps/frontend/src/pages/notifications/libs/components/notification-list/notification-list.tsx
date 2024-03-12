import { EMPTY_LENGTH } from "~/libs/constants/constants.js";
import { initDebounce } from "~/libs/helpers/helpers.js";
import {
	useAppDispatch,
	useCallback,
	useEffect,
	useState,
} from "~/libs/hooks/hooks.js";
import {
	type NotificationResponseDto,
	actions as userNotificationsActions,
} from "~/modules/user-notifications/user-notifications.js";

import { READ_NOTIFICATIONS_DELAY_MS } from "../../constants/constants.js";
import { NotificationListItem } from "../notification-list-item/notification-list-item.js";
import styles from "./styles.module.css";

type Properties = {
	notifications: NotificationResponseDto[];
};

const NotificationList: React.FC<Properties> = ({
	notifications,
}: Properties) => {
	const [readNotificationIds, setReadNotificationIds] = useState<Set<number>>(
		new Set<number>(),
	);
	const dispatch = useAppDispatch();

	const handleRead = useCallback(
		(notificationId: number): void => {
			setReadNotificationIds((previous) => {
				return new Set<number>(previous.add(notificationId));
			});
		},
		[setReadNotificationIds],
	);

	const handleReadNotifications = (): void => {
		setReadNotificationIds(new Set<number>());
		void dispatch(
			userNotificationsActions.setReadNotifications({
				notificationIds: [...readNotificationIds],
			}),
		);
	};

	const handleReadNotificationsDebounced = initDebounce(
		handleReadNotifications,
		READ_NOTIFICATIONS_DELAY_MS,
	);

	useEffect(() => {
		if (readNotificationIds.size > EMPTY_LENGTH) {
			handleReadNotificationsDebounced();

			return () => {
				handleReadNotificationsDebounced.clear();
			};
		}
	}, [readNotificationIds, handleReadNotificationsDebounced]);

	return (
		<ul className={styles["notification-list"]}>
			{notifications.map((notification) => (
				<NotificationListItem
					key={notification.id}
					notification={notification}
					onRead={handleRead}
				/>
			))}
		</ul>
	);
};

export { NotificationList };
