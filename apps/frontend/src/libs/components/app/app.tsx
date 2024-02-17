import { Loader, RouterOutlet } from "~/libs/components/components.js";
import { DataStatus } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppSelector,
	useEffect,
} from "~/libs/hooks/hooks.js";
import { actions as authActions } from "~/modules/auth/auth.js";

const App: React.FC = () => {
	const dispatch = useAppDispatch();
	const { authDataStatus } = useAppSelector(({ auth }) => ({
		authDataStatus: auth.dataStatus,
	}));

	useEffect(() => {
		void dispatch(authActions.getAuthenticatedUser());
	}, [dispatch]);

	if (
		authDataStatus === DataStatus.IDLE ||
		authDataStatus === DataStatus.PENDING
	) {
		return <Loader color="orange" size="large" />;
	}

	return (
		<>
			<div>
				<RouterOutlet />
			</div>
		</>
	);
};

export { App };
