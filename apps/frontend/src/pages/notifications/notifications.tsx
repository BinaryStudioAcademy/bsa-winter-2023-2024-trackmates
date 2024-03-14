import {
	Button,
	EmptyPagePlaceholder,
	Loader,
} from "~/libs/components/components.js";
import { EMPTY_LENGTH } from "~/libs/constants/constants.js";
import {
	AppRoute,
	AppTitle,
	DataStatus,
	NotificationFilter,
} from "~/libs/enums/enums.js";
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
import { QueryParameterName } from "./libs/enums/enums.js";
import styles from "./styles.module.css";

const Notifications: React.FC = () => {
	const navigate = useNavigate();
	const [queryParameters] = useSearchParams();
	const notificationType = queryParameters.get(QueryParameterName.TYPE);

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
			notificationType === null ||
			possibleTypeValues.includes(
				notificationType as ValueOf<typeof NotificationFilter>,
			);

		if (!hasValidValue) {
			navigate(AppRoute.NOTIFICATIONS, { replace: true });

			return;
		}

		void dispatch(
			actions.getUserNotifications({
				search: "",
				type: notificationType as ValueOf<typeof NotificationFilter> | null,
			}),
		);
	}, [dispatch, notificationType, navigate, possibleTypeValues]);

	const hasNotifications = notifications.length > EMPTY_LENGTH;

	return (
		<div className={styles["page"]}>
			<div className={styles["header"]}>
				<h2 className={styles["title"]}>Notifications</h2>
			</div>
			<div className={styles["notifications-container"]}>
				<div className={styles["notifications"]}>
					<div className={styles["filters"]}>
						{possibleTypeValues.map((filter) => {
							const queryString = new URLSearchParams({
								[QueryParameterName.TYPE]: filter,
							}).toString();
							const currentLink =
								AppRoute.NOTIFICATIONS +
								(filter === NotificationFilter.ALL ? "" : `?${queryString}`);
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
					<div className={styles["divider"]} />
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

				<div className={styles["left-image"]} />
				<div className={styles["right-image"]} />
			</div>
		</div>
	);
};

export { Notifications };
