import { Loader, RouterOutlet } from "~/libs/components/components.js";
import { DataStatus } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppSelector,
	useEffect,
} from "~/libs/hooks/hooks.js";
import { actions as authActions } from "~/modules/auth/auth.js";
import { actions as userNotificationsAction } from "~/modules/user-notifications/user-notifications.js";

const App: React.FC = () => {
	const dispatch = useAppDispatch();
	const { authDataStatus, user } = useAppSelector(({ auth }) => ({
		authDataStatus: auth.dataStatus,
		user: auth.user,
	}));

	useEffect(() => {
		void dispatch(authActions.getAuthenticatedUser());
	}, [dispatch]);

	useEffect(() => {
		if (user) {
			void dispatch(userNotificationsAction.hasUserUnreadNotifications());
		}
	}, [dispatch, user]);

	if (
		authDataStatus === DataStatus.IDLE ||
		authDataStatus === DataStatus.PENDING
	) {
		return <Loader color="orange" size="large" />;
	}

	return (
		<>
			<RouterOutlet />
		</>
	);
};

export { App };
