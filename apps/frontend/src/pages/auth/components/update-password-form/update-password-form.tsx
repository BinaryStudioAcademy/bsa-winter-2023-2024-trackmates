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
import { authPasswordValidationSchema } from "~/modules/auth/auth.js";

import { DEFAULT_AUTH_UPDATE_PASSWORD_IN_PAYLOAD } from "./libs/constants/constants.js";
import styles from "./styles.module.css";

type Properties = {
	onSubmit: (payload: Omit<AuthUpdatePasswordRequestDto, "token">) => void;
};

const UpdatePasswordForm: React.FC<Properties> = ({ onSubmit }: Properties) => {
	const { control, errors, handleSubmit } = useAppForm<
		Omit<AuthUpdatePasswordRequestDto, "token">
	>({
		defaultValues: DEFAULT_AUTH_UPDATE_PASSWORD_IN_PAYLOAD,
		validationSchema: authPasswordValidationSchema,
	});

	const authDataStatus = useAppSelector(({ auth }) => {
		return auth.dataStatus;
	});

	const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

	const handleFormSubmit = useCallback(
		(event_: React.BaseSyntheticEvent): void => {
			void handleSubmit(onSubmit)(event_);
		},
		[handleSubmit, onSubmit],
	);

	const handleChangePasswordVisibility = useCallback(() => {
		setIsPasswordVisible(!isPasswordVisible);
	}, [isPasswordVisible]);

	useAppTitle(AppTitle.UPDATE_PASSWORD);

	const isLoading = authDataStatus === DataStatus.PENDING;

	return (
		<form className={styles["form"]} onSubmit={handleFormSubmit}>
			<div>
				<h2 className={styles["title"]}>Update password</h2>
			</div>
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
