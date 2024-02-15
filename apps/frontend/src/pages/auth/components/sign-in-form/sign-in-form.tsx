import {
	Button,
	IconButton,
	Input,
	Link,
} from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/enums.js";
import { useAppForm, useCallback, useState } from "~/libs/hooks/hooks.js";
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

	const [isPasswordVisible, setPasswordVisibility] = useState(false);

	const handleFormSubmit = useCallback(
		(event_: React.BaseSyntheticEvent): void => {
			void handleSubmit(onSubmit)(event_);
		},
		[handleSubmit, onSubmit],
	);

	const handlePasswordVisibility = useCallback(() => {
		setPasswordVisibility(!isPasswordVisible);
	}, [isPasswordVisible]);

	return (
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
				<IconButton
					className={styles["icon"]}
					iconName={isPasswordVisible ? "eye" : "eyeOff"}
					onClick={handlePasswordVisibility}
				/>
			</div>
			<Button color="primary" label="Log in" type="submit" />
		</form>
	);
};

export { SignInForm };
