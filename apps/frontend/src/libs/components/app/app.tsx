import { Loader, RouterOutlet } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/enums.js";
import { checkIfShowLoader } from "~/libs/helpers/helpers.js";
import {
	useAppDispatch,
	useAppSelector,
	useEffect,
	useLocation,
} from "~/libs/hooks/hooks.js";
import { actions as authActions } from "~/modules/auth/auth.js";
import { actions as userActions } from "~/modules/users/users.js";

const App: React.FC = () => {
	const { pathname } = useLocation();
	const dispatch = useAppDispatch();
	const { authDataStatus, users, usersDataStatus } = useAppSelector(
		({ auth, users }) => ({
			authDataStatus: auth.dataStatus,
			users: users.users,
			usersDataStatus: users.dataStatus,
		}),
	);

	const isRoot = pathname === AppRoute.ROOT;

	useEffect(() => {
		if (isRoot) {
			void dispatch(userActions.loadAll());
		}
		void dispatch(authActions.getAuthenticatedUser());
	}, [isRoot, dispatch]);

	if (checkIfShowLoader(authDataStatus)) {
		return <Loader color="orange" size="large" />;
	}

	return (
		<>
			<ul>
				{users.map((user) => (
					<li key={user.id}>{user.email}</li>
				))}
			</ul>
			<div>
				{checkIfShowLoader(usersDataStatus) && (
					<Loader color="orange" size="large" />
				)}
				<RouterOutlet />
			</div>
		</>
	);
};

export { App };
