import { type NotificationResponseDto } from "~/modules/user-notifications/user-notifications.js";

import { NotificationListItem } from "../notification-list-item/notification-lsit-item.js";

type Properties = {
	notifications: NotificationResponseDto[];
};

const NotificationList: React.FC<Properties> = ({
	notifications,
}: Properties) => {
	return (
		<ul>
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
