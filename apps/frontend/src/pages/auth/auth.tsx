import logo from "~/assets/img/logo.svg";
import { Image, Navigate } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/enums.js";
import { getValidClassNames } from "~/libs/helpers/helpers.js";
import {
	useAppDispatch,
	useAppSelector,
	useCallback,
	useLocation,
} from "~/libs/hooks/hooks.js";
import {
	type AuthForgotPasswordRequestDto,
	type AuthUpdatePasswordRequestDto,
	actions as authActions,
} from "~/modules/auth/auth.js";
import {
	type UserSignInRequestDto,
	type UserSignUpRequestDto,
} from "~/modules/users/users.js";

import {
	ForgotPasswordForm,
	SignInForm,
	SignUpForm,
	UpdatePasswordForm,
} from "./components/components.js";
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

	const handleForgotPasswordSubmit = useCallback(
		(payload: AuthForgotPasswordRequestDto): void => {
			void dispatch(authActions.forgotPassword(payload));
		},
		[dispatch],
	);

	const handleUpdatePasswordSubmit = useCallback(
		(payload: Omit<AuthUpdatePasswordRequestDto, "token">): void => {
			void dispatch(authActions.updatePassword(payload));
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

			case AppRoute.FORGOT_PASSWORD: {
				return <ForgotPasswordForm onSubmit={handleForgotPasswordSubmit} />;
			}

			case AppRoute.UPDATE_PASSWORD: {
				return <UpdatePasswordForm onSubmit={handleUpdatePasswordSubmit} />;
			}
		}

		return null;
	};

	if (hasUser) {
		return <Navigate replace to={AppRoute.ROOT} />;
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
