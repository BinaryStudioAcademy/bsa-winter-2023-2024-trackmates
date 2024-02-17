import logo from "~/assets/img/svg/logo.svg";
import mobileLogo from "~/assets/img/svg/mobile-logo.svg";
import { Image } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/enums.js";
import { getValidClassNames } from "~/libs/helpers/helpers.js";
import {
	useAppDispatch,
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
	const dispatch = useAppDispatch();
	const { pathname } = useLocation();

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

	const getScreen = (screen: string): React.ReactNode => {
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

	return (
		<main className={styles["container"]}>
			<div
				className={getValidClassNames(
					styles["form-container"],
					styles[pathname.replace("/", "")],
				)}
			>
				<div className={styles["logo-wrapper"]}>
					<picture>
						<source media="(max-width: 480px)" srcSet={mobileLogo} />
						<source media="(min-width: 481px)" srcSet={logo} />
						<Image
							alt="TrackMates logo"
							className={`${styles["logo"]} ${styles["mobile-logo"]}`}
							src={logo}
						/>
					</picture>
				</div>
				{getScreen(pathname)}
			</div>
		</main>
	);
};

export { Auth };
