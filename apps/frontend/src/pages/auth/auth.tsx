import logo from "~/assets/img/svg/logo.svg";
import { Image, Navigate } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/enums.js";
import { getValidClassNames } from "~/libs/helpers/helpers.js";
import {
	useAppDispatch,
	useAppSelector,
	useCallback,
	useLocation,
} from "~/libs/hooks/hooks.js";
import { actions as authActions } from "~/modules/auth/auth.js";
import {
	type UserSignInRequestDto,
	type UserSignUpRequestDto,
} from "~/modules/users/users.js";

import { SignInForm, SignUpForm } from "./components/components.js";
import styles from "./styles.module.css";

const Auth: React.FC = () => {
	const { user } = useAppSelector((state) => state.auth);
	const dispatch = useAppDispatch();
	const { pathname } = useLocation();
	const hasUser = user !== null;

	const handleSignInSubmit = useCallback(
		(payload: UserSignInRequestDto): void => {
			void dispatch(authActions.signIn(payload));
		},
		[dispatch],
	);

	const handleSignUpSubmit = useCallback(
		(payload: UserSignUpRequestDto): void => {
			void dispatch(authActions.signUp(payload));
		},
		[dispatch],
	);

	const handleScreenRender = (screen: string): React.ReactNode => {
		switch (screen) {
			case AppRoute.SIGN_IN: {
				return <SignInForm onSubmit={handleSignInSubmit} />;
			}
			case AppRoute.SIGN_UP: {
				return <SignUpForm onSubmit={handleSignUpSubmit} />;
			}
		}

		return null;
	};

	if (hasUser) {
		return <Navigate to={AppRoute.ROOT} />;
	}

	return (
		<main className={styles["container"]}>
			<div
				className={getValidClassNames(
					styles["form-container"],
					styles[pathname.replace("/", "")],
				)}
			>
				<div className={styles["logo-wrapper"]}>
					<Image alt="TrackMates logo" className={styles["logo"]} src={logo} />
				</div>
				{handleScreenRender(pathname)}
			</div>
		</main>
	);
};

export { Auth };
