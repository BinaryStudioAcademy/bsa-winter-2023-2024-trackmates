import { Loader, RouterOutlet } from "~/libs/components/components.js";
import { DataStatus } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppForm,
	useAppSelector,
	useEffect,
	useNavigate,
} from "~/libs/hooks/hooks.js";
import { actions as appActions } from "~/libs/slices/app/app.js";
import { actions as authActions } from "~/modules/auth/auth.js";
import {
	SectionStatus,
	actions,
} from "~/modules/section-statuses/section-statuses.js";

import { Checkbox } from "../checkbox/checkbox.js";

const App: React.FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { authDataStatus, redirectTo } = useAppSelector(({ app, auth }) => ({
		authDataStatus: auth.dataStatus,
		redirectTo: app.redirectTo,
	}));
	const { control, errors } = useAppForm({
		defaultValues: {
			["test"]: false,
		},
	});

	useEffect(() => {
		void dispatch(authActions.getAuthenticatedUser());
		void dispatch(
			actions.updateStatus({
				payload: { status: SectionStatus.COMPLETED },
				sectionStatusId: 1,
			}),
		);
	}, [dispatch]);

	useEffect(() => {
		if (redirectTo) {
			navigate(redirectTo);
			dispatch(appActions.navigate(null));
		}
	}, [dispatch, navigate, redirectTo]);

	if (
		authDataStatus === DataStatus.IDLE ||
		authDataStatus === DataStatus.PENDING
	) {
		return <Loader color="orange" size="large" />;
	}

	return (
		<>
			<RouterOutlet />
			<Checkbox
				control={control}
				errors={errors}
				hasVisuallyHiddenLabel
				label="Toggle section status"
				name="test"
			/>
		</>
	);
};

export { App };
