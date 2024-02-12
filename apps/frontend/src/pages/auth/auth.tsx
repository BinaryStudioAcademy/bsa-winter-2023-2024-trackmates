import { AppRoute } from "~/libs/enums/enums.js";
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

	let mainContainerClassName = "sign-in__container";

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
				mainContainerClassName = "sign-in__container";
				return <SignInForm onSubmit={handleSignInSubmit} />;
			}
			case AppRoute.SIGN_UP: {
				mainContainerClassName = "sign-up__container";
				return <SignUpForm onSubmit={handleSignUpSubmit} />;
			}
		}

		return null;
	};

	return (
		<main
			className={`${styles["sign__container"]} ${styles[mainContainerClassName]}`}
		>
			{getScreen(pathname)}
		</main>
	);
};

export { Auth };
