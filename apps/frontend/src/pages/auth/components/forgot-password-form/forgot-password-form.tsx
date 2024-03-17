import { Button, Input, Link } from "~/libs/components/components.js";
import { AppRoute, AppTitle, DataStatus } from "~/libs/enums/enums.js";
import {
	useAppForm,
	useAppSelector,
	useAppTitle,
	useCallback,
} from "~/libs/hooks/hooks.js";
import {
	type AuthForgotPasswordRequestDto,
	authForgotPasswordValidationSchema,
} from "~/modules/auth/auth.js";

import { DEFAULT_AUTH_FORGOT_PASSWORD_IN_PAYLOAD } from "./libs/constants.js";
import styles from "./styles.module.css";

type Properties = {
	onSubmit: (payload: AuthForgotPasswordRequestDto) => void;
};

const ForgotPasswordForm: React.FC<Properties> = ({ onSubmit }: Properties) => {
	const { control, errors, handleSubmit } =
		useAppForm<AuthForgotPasswordRequestDto>({
			defaultValues: DEFAULT_AUTH_FORGOT_PASSWORD_IN_PAYLOAD,
			validationSchema: authForgotPasswordValidationSchema,
		});

	const forgotPasswordStatus = useAppSelector(({ auth }) => {
		return auth.forgotPasswordStatus;
	});

	const handleFormSubmit = useCallback(
		(event_: React.BaseSyntheticEvent): void => {
			void handleSubmit(onSubmit)(event_);
		},
		[handleSubmit, onSubmit],
	);

	useAppTitle(AppTitle.FORGOT_PASSWORD);

	const isLoading = forgotPasswordStatus === DataStatus.PENDING;

	if (forgotPasswordStatus === DataStatus.FULFILLED) {
		return (
			<div className={styles["content"]}>
				<h3 className={styles["info"]}>
					A link to update your password has been sent to your email.
				</h3>
			</div>
		);
	}

	return (
		<form className={styles["content"]} onSubmit={handleFormSubmit}>
			<div>
				<h2 className={styles["title"]}>Get a link to update your password</h2>
				<p className={styles["subtitle"]}>
					No account? Go to{" "}
					<Link className={styles["link"]} to={AppRoute.SIGN_UP}>
						Create an account
					</Link>
				</p>
			</div>
			<Input
				color="dark"
				control={control}
				errors={errors}
				inputMode="email"
				label="Email"
				name="email"
				placeholder="email@example.com"
				type="text"
			/>
			<Button
				className={styles["button"]}
				isDisabled={isLoading}
				isLoading={isLoading}
				label="Send me a link"
				type="submit"
			/>
		</form>
	);
};

export { ForgotPasswordForm };
