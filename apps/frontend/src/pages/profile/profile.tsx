import profileCharacter from "~/assets/img/profile-character.svg";
import { Button, Image, Input } from "~/libs/components/components.js";
import { DEFAULT_USER_AVATAR } from "~/libs/constants/constants.js";
import {
	useAppDispatch,
	useAppForm,
	useAppSelector,
	useCallback,
} from "~/libs/hooks/hooks.js";
import { actions as filesActions } from "~/modules/files/files.js";
import {
	type UserAuthResponseDto,
	type UserProfileRequestDto,
	userProfileValidationSchema,
	actions as usersActions,
} from "~/modules/users/users.js";

import styles from "./styles.module.css";

const Profile: React.FC = () => {
	const user = useAppSelector(({ auth }) => {
		return auth.user as UserAuthResponseDto;
	});
	const dispatch = useAppDispatch();

	const { control, errors, handleSubmit, reset } =
		useAppForm<UserProfileRequestDto>({
			defaultValues: {
				firstName: user.firstName,
				lastName: user.lastName,
			},
			validationSchema: userProfileValidationSchema,
		});

	const handleFileChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>): void => {
			const [file] = event.target.files ?? [];

			if (file) {
				const formData = new FormData();
				formData.append("file", file);
				void dispatch(filesActions.updateUserAvatar(formData));
			}
		},
		[dispatch],
	);

	const handleInputChange = useCallback(
		(formData: UserProfileRequestDto): void => {
			void dispatch(
				usersActions.updateProfile({
					id: user.id,
					profilePayload: formData,
				}),
			);
		},
		[dispatch, user.id],
	);

	const handleFormSubmit = useCallback(
		(event_: React.BaseSyntheticEvent): void => {
			void handleSubmit(handleInputChange)(event_);
		},
		[handleSubmit, handleInputChange],
	);

	const handleResetForm = useCallback(() => {
		reset();
	}, [reset]);

	return (
		<>
			<div className={styles["container"]}>
				<span className={styles["profile-title"]}>My profile</span>
				<form name="profile" onSubmit={handleFormSubmit}>
					<div className={styles["avatar-container"]}>
						<div className={styles["profile-image-wrapper"]}>
							<Image
								alt="avatar"
								className={styles["profile-image"]}
								height="133"
								shape="circle"
								src={user.avatarUrl ?? DEFAULT_USER_AVATAR}
								width="133"
							/>
							<input
								accept="image/*"
								className={styles["file-input"]}
								onChange={handleFileChange}
								type="file"
							/>
						</div>
					</div>
					<div className={styles["profile-inputs"]}>
						<fieldset className={styles["fieldset"]}>
							<Input
								color="light"
								control={control}
								errors={errors}
								label="First Name"
								name="firstName"
								type="text"
							/>
							<Input
								color="light"
								control={control}
								errors={errors}
								label="Last Name"
								name="lastName"
								type="text"
							/>
						</fieldset>
					</div>
					<Image
						alt="profile character"
						className={styles["profile-character"]}
						height="176"
						src={profileCharacter}
						width="176"
					/>
					<div className={styles["btnWrapper"]}>
						<Button
							className={styles["button"]}
							label="Cancel"
							onClick={handleResetForm}
							size="small"
							style="secondary"
						/>
						<Button
							className={styles["button"]}
							label="Update"
							size="small"
							type="submit"
						/>
					</div>
				</form>
			</div>
		</>
	);
};

export { Profile };
