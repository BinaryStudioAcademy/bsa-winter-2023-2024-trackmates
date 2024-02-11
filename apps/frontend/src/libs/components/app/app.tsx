import reactLogo from "~/assets/img/react.svg";
import { Link, RouterOutlet } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppSelector,
	useEffect,
	useLocation,
} from "~/libs/hooks/hooks.js";
import { StorageKey, storage } from "~/libs/modules/storage/storage.js";
import { actions as authActions } from "~/modules/auth/auth.js";
import { actions as userActions } from "~/modules/users/users.js";

const App: React.FC = () => {
	const { pathname } = useLocation();
	const dispatch = useAppDispatch();
	const { dataStatus, users } = useAppSelector(({ auth, users }) => ({
		dataStatus: users.dataStatus,
		user: auth.user,
		users: users.users,
	}));

	const isRoot = pathname === AppRoute.ROOT;

	const hasToken = Boolean(storage.get(StorageKey.TOKEN));

	useEffect(() => {
		if (isRoot) {
			void dispatch(userActions.loadAll());
		}
		if (hasToken) {
			void dispatch(authActions.getAuthenticatedUser());
		}
	}, [isRoot, hasToken, dispatch]);

	return (
		<>
			<img alt="logo" className="App-logo" src={reactLogo} width="30" />

			<ul className="App-navigation-list">
				<li>
					<Link to={AppRoute.ROOT}>Root</Link>
				</li>
				<li>
					<Link to={AppRoute.SIGN_IN}>Sign in</Link>
				</li>
				<li>
					<Link to={AppRoute.SIGN_UP}>Sign up</Link>
				</li>
			</ul>
			<p>Current path: {pathname}</p>

			<div>
				<RouterOutlet />
			</div>
			{isRoot && (
				<>
					<h2>Users:</h2>
					<h3>Status: {dataStatus}</h3>
					<ul>
						{users.map((user) => (
							<li key={user.id}>{user.email}</li>
						))}
					</ul>
				</>
			)}
		</>
	);
};

export { App };
