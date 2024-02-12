import logo from "~/assets/img/svg/sing-logo.svg";
import { Button, Input, Link } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/enums.js";
import { getValidClassNames } from "~/libs/helpers/helpers.js";
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
			<div
				className={getValidClassNames(
					styles["form-container"],
					styles["sign-in-form"],
				)}
			>
				<h1 className={styles["logo-wrapper"]}>
					<img alt="TrackMates logo" src={logo} />
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
					></Input>
					<Button color="primary" label="Log in" type="submit" />
				</form>
			</div>
		</div>
	);
};

export { SignInForm };
