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
	const { dataStatus } = useAppSelector(({ auth }) => ({
		dataStatus: auth.dataStatus,
	}));

	useEffect(() => {
		void dispatch(authActions.getAuthenticatedUser());
	}, [dispatch]);

	return (
		<>
			<div>
				{dataStatus === DataStatus.PENDING && (
					<Loader color="orange" size="large" />
				)}
				<RouterOutlet />
			</div>
		</>
	);
};

export { App };
