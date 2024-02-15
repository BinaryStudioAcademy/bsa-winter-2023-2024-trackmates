import { Loader, RouterOutlet } from "~/libs/components/components.js";
import { AppRoute, DataStatus } from "~/libs/enums/enums.js";
import { checkIfSidebarIsShown } from "~/libs/helpers/helpers.js";
import {
	useAppDispatch,
	useAppSelector,
	useEffect,
	useLocation,
} from "~/libs/hooks/hooks.js";
import { actions as authActions } from "~/modules/auth/auth.js";
import { actions as userActions } from "~/modules/users/users.js";

import { Sidebar } from "../sidebar/sidebar.js";
import styles from "./styles.module.css";

const App: React.FC = () => {
	const { pathname } = useLocation();
	const dispatch = useAppDispatch();
	const { dataStatus, users } = useAppSelector(({ users }) => ({
		dataStatus: users.dataStatus,
		users: users.users,
	}));

	const isRoot = pathname === AppRoute.ROOT;

	useEffect(() => {
		if (isRoot) {
			void dispatch(userActions.loadAll());
		}
		void dispatch(authActions.getAuthenticatedUser());
	}, [isRoot, dispatch]);

	return (
		<>
			<ul>
				{users.map((user) => (
					<li key={user.id}>{user.email}</li>
				))}
			</ul>

			<div>
				{dataStatus === DataStatus.PENDING && (
					<Loader color="orange" size="large" />
				)}
				{checkIfSidebarIsShown(pathname) ? (
					<div className={styles["page-layout"]}>
						<Sidebar className={styles["sidebar"]} />
						<div className={styles["page"]}>
							<RouterOutlet />
						</div>
					</div>
				) : (
					<div>
						<RouterOutlet />
					</div>
				)}
			</div>
		</>
	);
};

export { App };
