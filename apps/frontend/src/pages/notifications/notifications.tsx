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
	QueryParameterName,
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
import styles from "./styles.module.css";

const Notifications: React.FC = () => {
	const navigate = useNavigate();
	const [queryParameters] = useSearchParams();
	const notificationType = queryParameters.get(QueryParameterName.TYPE);
	const searchQuery = queryParameters.get(QueryParameterName.SEARCH);

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
		void dispatch(
			actions.setNotificationType(
				(notificationType as ValueOf<typeof NotificationFilter> | null) ??
					NotificationFilter.ALL,
			),
		);
	}, [dispatch, notificationType]);

	useEffect(() => {
		const hasValidValue =
			notificationType === null ||
			possibleTypeValues.includes(
				notificationType as ValueOf<typeof NotificationFilter>,
			);

		if (!hasValidValue) {
			const queryString = new URLSearchParams({
				[QueryParameterName.SEARCH]: searchQuery ?? "",
			}).toString();

			navigate(AppRoute.NOTIFICATIONS + `?${queryString}`, { replace: true });

			return;
		}

		void dispatch(
			actions.getUserNotifications({
				search: searchQuery ?? "",
				type: notificationType as ValueOf<typeof NotificationFilter> | null,
			}),
		);
	}, [dispatch, notificationType, navigate, possibleTypeValues, searchQuery]);

	const hasNotifications = notifications.length > EMPTY_LENGTH;

	const hasIcon =
		notificationType === null || notificationType === NotificationFilter.ALL;

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
								[QueryParameterName.SEARCH]: searchQuery ?? "",
								[QueryParameterName.TYPE]: filter,
							}).toString();

							const currentLink = AppRoute.NOTIFICATIONS + `?${queryString}`;

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
								<NotificationList
									hasIcon={hasIcon}
									notifications={notifications}
								/>
							) : (
								<EmptyPagePlaceholder
									size="large"
									title="You don't have any notifications yet"
								/>
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
