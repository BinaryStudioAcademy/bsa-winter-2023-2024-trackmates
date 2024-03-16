import { Button, Input, Link } from "~/libs/components/components.js";
import { AppRoute, AppTitle, DataStatus } from "~/libs/enums/enums.js";
import {
	useAppForm,
	useAppSelector,
	useAppTitle,
	useCallback,
} from "~/libs/hooks/hooks.js";
import {
	type AuthSendUpdatePasswordLinkRequestDto,
	authSendUpdatePasswordLinkValidationSchema,
} from "~/modules/auth/auth.js";

import { DEFAULT_AUTH_SEND_UPDATE_PASSWORD_LINK_IN_PAYLOAD } from "./libs/constants.js";
import styles from "./styles.module.css";

type Properties = {
	onSubmit: (payload: AuthSendUpdatePasswordLinkRequestDto) => void;
};

const ForgotPasswordForm: React.FC<Properties> = ({ onSubmit }: Properties) => {
	const { control, errors, handleSubmit } =
		useAppForm<AuthSendUpdatePasswordLinkRequestDto>({
			defaultValues: DEFAULT_AUTH_SEND_UPDATE_PASSWORD_LINK_IN_PAYLOAD,
			validationSchema: authSendUpdatePasswordLinkValidationSchema,
		});

	const sendUpdatePasswordLinkStatus = useAppSelector(({ auth }) => {
		return auth.sendUpdatePasswordLinkStatus;
	});

	const handleFormSubmit = useCallback(
		(event_: React.BaseSyntheticEvent): void => {
			void handleSubmit(onSubmit)(event_);
		},
		[handleSubmit, onSubmit],
	);

	useAppTitle(AppTitle.FORGOT_PASSWORD);

	const isLoading = sendUpdatePasswordLinkStatus === DataStatus.PENDING;

	if (sendUpdatePasswordLinkStatus === DataStatus.FULFILLED) {
		return (
			<div className={styles["content"]}>
				<h3 className={styles["info"]}>
					Link for updating password was sended to your email.
				</h3>
			</div>
		);
	}

	return (
		<form className={styles["content"]} onSubmit={handleFormSubmit}>
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
