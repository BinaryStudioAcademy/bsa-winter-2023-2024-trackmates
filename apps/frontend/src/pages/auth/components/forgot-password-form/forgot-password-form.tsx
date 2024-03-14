import { Button, Input, Link } from "~/libs/components/components.js";
import { AppRoute, AppTitle, DataStatus } from "~/libs/enums/enums.js";
import {
	useAppForm,
	useAppSelector,
	useAppTitle,
	useCallback,
} from "~/libs/hooks/hooks.js";
import { type AuthForgotPasswordRequestDto } from "~/modules/auth/auth.js";
import { authForgotPasswordValidationSchema } from "~/modules/auth/auth.js";

import { DEFAULT_FORGOT_PASSWORD_IN_PAYLOAD } from "./libs/constants.js";
import styles from "./styles.module.css";

type Properties = {
	onSubmit: (payload: AuthForgotPasswordRequestDto) => void;
};

const ForgotPasswordForm: React.FC<Properties> = ({ onSubmit }: Properties) => {
	const { control, errors, handleSubmit } =
		useAppForm<AuthForgotPasswordRequestDto>({
			defaultValues: DEFAULT_FORGOT_PASSWORD_IN_PAYLOAD,
			validationSchema: authForgotPasswordValidationSchema,
		});

	const authDataStatus = useAppSelector(({ auth }) => {
		return auth.dataStatus;
	});

	const handleFormSubmit = useCallback(
		(event_: React.BaseSyntheticEvent): void => {
			void handleSubmit(onSubmit)(event_);
		},
		[handleSubmit, onSubmit],
	);

	useAppTitle(AppTitle.FORGOT_PASSWORD);

	const isLoading = authDataStatus === DataStatus.PENDING;

	return (
		<form className={styles["form"]} onSubmit={handleFormSubmit}>
			<div>
				<h2 className={styles["title"]}>Get link for update your password</h2>
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
				label="Send me link"
				type="submit"
			/>
		</form>
	);
};

export { ForgotPasswordForm };
