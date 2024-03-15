import { Button, Input } from "~/libs/components/components.js";
import { AppTitle, DataStatus } from "~/libs/enums/enums.js";
import {
	useAppForm,
	useAppSelector,
	useAppTitle,
	useCallback,
	useState,
} from "~/libs/hooks/hooks.js";
import { type AuthUpdatePasswordRequestDto } from "~/modules/auth/auth.js";
import { authUpdatePasswordValidationSchema } from "~/modules/auth/auth.js";

import { DEFAULT_UPDATE_PASSWORD_IN_PAYLOAD } from "./libs/constants.js";
import styles from "./styles.module.css";

type Properties = {
	onSubmit: (payload: AuthUpdatePasswordRequestDto) => void;
	token: string;
};

const UpdatePasswordForm: React.FC<Properties> = ({ onSubmit, token }: Properties) => {
	const { control, errors, handleSubmit } =
		useAppForm<AuthUpdatePasswordRequestDto>({
			defaultValues: {
				...DEFAULT_UPDATE_PASSWORD_IN_PAYLOAD,
				token,
			},
			// validationSchema: authUpdatePasswordValidationSchema,
		});

	const authDataStatus = useAppSelector(({ auth }) => {
		return auth.dataStatus;
	});

	const [isPasswordVisible, setPasswordVisibility] = useState<boolean>(false);

	const handleFormSubmit = useCallback(
		(event_: React.BaseSyntheticEvent): void => {
			console.log("event_", event_)
			void handleSubmit(onSubmit)(event_);
		},
		[handleSubmit, onSubmit],
	);

	const handleChangePasswordVisibility = useCallback(() => {
		setPasswordVisibility(!isPasswordVisible);
	}, [isPasswordVisible]);

	useAppTitle(AppTitle.UPDATE_PASSWORD);

	const isLoading = authDataStatus === DataStatus.PENDING;

	return (
		<form className={styles["form"]} onSubmit={handleFormSubmit}>
			<div>
				<h2 className={styles["title"]}>Update password</h2>
			</div>
			<Input
				// className={"visually-hidden"}
				control={control}
				errors={errors}
				hasVisuallyHiddenLabel={true}
				label="Token"
				name="token"
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
					placeholder="••••••••"
					type={isPasswordVisible ? "text" : "password"}
				/>
				<Button
					className={styles["icon"]}
					hasVisuallyHiddenLabel
					iconName={isPasswordVisible ? "eye" : "eyeOff"}
					label="eye-icon"
					onClick={handleChangePasswordVisibility}
					style="secondary"
				/>
			</div>
			<Button
				className={styles["button"]}
				isDisabled={isLoading}
				isLoading={isLoading}
				label="Update password"
				type="submit"
			/>
		</form>
	);
};

export { UpdatePasswordForm };
