import { Button, Input, Link } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/enums.js";
import { useAppForm, useCallback, useState } from "~/libs/hooks/hooks.js";
import {
	type UserSignUpRequestDto,
	userSignUpValidationSchema,
} from "~/modules/users/users.js";

import { DEFAULT_SIGN_UP_PAYLOAD } from "./libs/constants.js";
import styles from "./styles.module.css";

type Properties = {
	onSubmit: (payload: UserSignUpRequestDto) => void;
};

const SignUpForm: React.FC<Properties> = ({ onSubmit }: Properties) => {
	const { control, errors, handleSubmit } = useAppForm<UserSignUpRequestDto>({
		defaultValues: DEFAULT_SIGN_UP_PAYLOAD,
		validationSchema: userSignUpValidationSchema,
	});

	const [isPasswordVisible, setPasswordVisibility] = useState<boolean>(false);

	const handleFormSubmit = useCallback(
		(event_: React.BaseSyntheticEvent): void => {
			void handleSubmit(onSubmit)(event_);
		},
		[handleSubmit, onSubmit],
	);

	const handleChangePasswordVisibility = useCallback(() => {
		setPasswordVisibility(!isPasswordVisible);
	}, [isPasswordVisible]);

	return (
		<form className={styles["form"]} onSubmit={handleFormSubmit}>
			<div>
				<h2 className={styles["title"]}>Create an account</h2>
				<p className={styles["subtitle"]}>
					Already have an account? Go to{" "}
					<Link className={styles["link"]} to={AppRoute.SIGN_IN}>
						{" "}
						Log In
					</Link>
				</p>
			</div>
			<Input
				color="dark"
				control={control}
				errors={errors}
				label="First name"
				name="firstName"
				type="text"
			/>
			<Input
				color="dark"
				control={control}
				errors={errors}
				label="Last name"
				name="lastName"
				type="text"
			/>
			<Input
				color="dark"
				control={control}
				errors={errors}
				label="Email"
				name="email"
				type="text"
			/>
			<div className={styles["password-input"]}>
				<Input
					className={styles["password"]}
					color="dark"
					control={control}
					errors={errors}
					label="Password"
					name="password"
					type={isPasswordVisible ? "text" : "password"}
				/>
				<Button
					className={styles["icon"]}
					hasVisuallyHiddenLabel
					iconName={isPasswordVisible ? "eye" : "eyeOff"}
					label="eye-icon"
					onClick={handleChangePasswordVisibility}
				/>
			</div>
			<Button
				className={styles["button"]}
				color="primary"
				label="Create an account"
				type="submit"
			/>
		</form>
	);
};

export { SignUpForm };
