import { Button, Input, Link } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/enums.js";
import { useAppForm, useCallback } from "~/libs/hooks/hooks.js";
import {
	type UserSignInRequestDto,
	userSignInValidationSchema,
} from "~/modules/users/users.js";

import { DEFAULT_SIGN_IN_PAYLOAD } from "./libs/constants.js";
import styles from "./styles.module.css";

type Properties = {
	onSubmit: (payload: UserSignInRequestDto) => void;
};

const SignInForm: React.FC<Properties> = ({ onSubmit }: Properties) => {
	const { control, errors, handleSubmit } = useAppForm<UserSignInRequestDto>({
		defaultValues: DEFAULT_SIGN_IN_PAYLOAD,
		validationSchema: userSignInValidationSchema,
	});

	const handleFormSubmit = useCallback(
		(event_: React.BaseSyntheticEvent): void => {
			void handleSubmit(onSubmit)(event_);
		},
		[handleSubmit, onSubmit],
	);

	return (
		<div className={styles["main-container"]}>
			<div className={`${styles["form-container"]} ${styles["sign-in-form"]}`}>
				<h1 className={styles["logo-wrapper"]}>
					<svg
						fill="none"
						height="62"
						viewBox="0 0 62 62"
						width="62"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M61.9155 30.9577C61.9155 48.0552 48.0552 61.9155 30.9577 61.9155C13.8603 61.9155 0 48.0552 0 30.9577C0 13.8603 13.8603 0 30.9577 0C48.0552 0 61.9155 13.8603 61.9155 30.9577ZM12.3831 30.9577C12.3831 41.2162 20.6992 49.5324 30.9577 49.5324C41.2162 49.5324 49.5324 41.2162 49.5324 30.9577C49.5324 20.6992 41.2162 12.3831 30.9577 12.3831C20.6992 12.3831 12.3831 20.6992 12.3831 30.9577Z"
							fill="#F76519"
						/>
						<circle cx="30.9578" cy="30.9578" fill="#F76519" r="10.9263" />
					</svg>
					TrackMates
				</h1>
				<form className={styles["form"]} onSubmit={handleFormSubmit}>
					<div>
						<h2 className={styles["title"]}>Log In</h2>
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
						label="Email"
						name="email"
						type="text"
					/>
					<Input
						color="dark"
						control={control}
						errors={errors}
						label="Password"
						name="password"
						type="password"
					>
						<span className={styles["sign-in-subtitle"]}>Forgot Password?</span>
					</Input>
					<Button color="primary" label="Log in" type="submit" />
				</form>
			</div>
		</div>
	);
};

export { SignInForm };
