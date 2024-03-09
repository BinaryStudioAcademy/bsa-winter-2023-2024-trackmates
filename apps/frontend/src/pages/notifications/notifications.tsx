import {
	Button,
	EmptyPagePlaceholder,
	Loader,
} from "~/libs/components/components.js";
import { EMPTY_ARRAY_LENGTH } from "~/libs/constants/constants.js";
import { AppRoute, AppTitle, DataStatus } from "~/libs/enums/enums.js";
import { getValidClassNames } from "~/libs/helpers/helpers.js";
import {
	useAppDispatch,
	useAppSelector,
	useAppTitle,
	useEffect,
	useMemo,
	useNavigate,
	useSearchParams,
} from "~/libs/hooks/hooks.js";
import { type ValueOf } from "~/libs/types/types.js";
import { actions } from "~/modules/user-notifications/user-notifications.js";

import { NotificationList } from "./libs/components/notification-list/notification-list.js";
import { NotificationFilter } from "./libs/enums/enums.js";
import styles from "./styles.module.css";

const Notifications: React.FC = () => {
	const navigate = useNavigate();
	const [queryParameters] = useSearchParams();
	const notificationType = queryParameters.get("type") as ValueOf<
		typeof NotificationFilter
	> | null;

	const possibleTypeValues = useMemo(() => {
		return Object.values(NotificationFilter);
	}, []);

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
		const hasValidValue =
			!notificationType || possibleTypeValues.includes(notificationType);

		if (!hasValidValue) {
			navigate(AppRoute.NOTIFICATIONS, { replace: true });

			return;
		}

		void dispatch(actions.getUserNotifications(notificationType));
	}, [dispatch, notificationType, navigate, possibleTypeValues]);

	const hasNotifications = notifications.length > EMPTY_ARRAY_LENGTH;

	return (
		<div className={styles["page"]}>
			<div className={styles["content"]}>
				<div className={styles["header"]}>
					<h2 className={styles["title"]}>Notification</h2>
					<div className={styles["filters"]}>
						{possibleTypeValues.map((filter) => {
							const currentLink =
								AppRoute.NOTIFICATIONS +
								(filter === NotificationFilter.ALL ? "" : `?type=${filter}`);

							const isActive =
								notificationType === filter ||
								(!notificationType && filter === NotificationFilter.ALL);

							return (
								<Button
									className={getValidClassNames(
										styles["filter-item"],
										isActive && styles["active"],
									)}
									href={currentLink as ValueOf<typeof AppRoute>}
									key={filter}
									label={filter}
								/>
							);
						})}
					</div>
				</div>
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
