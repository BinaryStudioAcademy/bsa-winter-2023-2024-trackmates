import profileCharacter from "~/assets/img/user-details-img.png";
import { Button, Image, Input } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppForm,
	useAppSelector,
	useCallback,
	useParams,
	useState,
} from "~/libs/hooks/hooks.js";
import {
	UserAuthResponseDto,
	actions as usersActions,
} from "~/modules/users/users.js";
import {
	type UserProfileRequestDto,
	userProfileValidationSchema,
} from "~/modules/users/users.js";

import { Avatar, UploadAvatarButton } from "./components/components.js";
import styles from "./styles.module.css";

const Profile: React.FC = () => {
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const { userId } = useParams<{ userId: string }>();
	const user = useAppSelector(({ auth }) => {
		return auth.user as UserAuthResponseDto;
	});
	const dispatch = useAppDispatch();

	const defaultValues = {
		firstName: user.firstName,
		lastName: user.lastName,
	};

	const { control, errors, handleSubmit } = useAppForm<UserProfileRequestDto>({
		defaultValues: defaultValues,
		validationSchema: userProfileValidationSchema,
	});

	const handleFileChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>): void => {
			const [file] = event.target.files ?? [];
			setSelectedFile(file ?? null);

			if (file) {
				const formData = new FormData();
				formData.append("file", file);
				void dispatch(usersActions.updateUserAvatar(formData));
			}
		},
		[dispatch],
	);

	const onSubmit = useCallback(
		(formData: UserProfileRequestDto): void => {
			if (!userId) {
				return;
			}

			void dispatch(
				usersActions.updateProfile({
					id: userId,
					profilePayload: formData,
				}),
			);
		},
		[dispatch, userId],
	);

	const handleFormSubmit = useCallback(
		(event_: React.BaseSyntheticEvent): void => {
			void handleSubmit(onSubmit)(event_);
		},
		[handleSubmit, onSubmit],
	);

	return (
		<>
			<div className={styles["container"]}>
				<span className={styles["profile-title"]}>My profile</span>
				<form name="profile" onSubmit={handleFormSubmit}>
					<div className={styles["avatar-container"]}>
						<Avatar
							onFileChange={handleFileChange}
							selectedFile={selectedFile}
						/>
						<div>
							<UploadAvatarButton onFileChange={handleFileChange} />
						</div>
					</div>
					<div className={styles["profile-form"]}>
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
							color="secondary"
							href={AppRoute.ROOT}
							label="Cancel"
							size="small"
							style="outlined"
						/>
						<Button
							className={styles["button"]}
							color="secondary"
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
