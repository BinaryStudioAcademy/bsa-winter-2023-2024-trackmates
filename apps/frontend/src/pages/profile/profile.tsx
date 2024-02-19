import profileCharacter from "~/assets/img/user-details-img.png";
import { Button, Image, Input, Link } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppForm,
	useCallback,
	useParams,
	useState,
} from "~/libs/hooks/hooks.js";
import { notification } from "~/libs/modules/notification/notification.js";
import { actions as authActions } from "~/modules/auth/auth.js";
import {
	type UserProfileRequestDto,
	userProfileValidationSchema,
} from "~/modules/users/users.js";

import { Avatar, UploadAvatarButton } from "./components/components.js";
import { DEFAULT_PROFILE_PAYLOAD } from "./libs/constants.js";
import styles from "./styles.module.css";

const Profile: React.FC = () => {
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const { userId } = useParams<{ userId: string }>();
	const dispatch = useAppDispatch();

	const { control, errors, handleSubmit } = useAppForm<UserProfileRequestDto>({
		defaultValues: DEFAULT_PROFILE_PAYLOAD,
		validationSchema: userProfileValidationSchema,
	});

	const handleFileChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>): void => {
			const file = [...(event.target.files || [])].shift();
			setSelectedFile(file ?? null);
		},
		[],
	);

	const onSubmit = useCallback(
		(formData: UserProfileRequestDto): void => {
			const payload: UserProfileRequestDto = {
				...formData,
				id: Number(userId),
			};

			void dispatch(authActions.updateProfile(payload)).then(() => {
				notification.success("Your profile has been updated");
			});
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
							handleFileChange={handleFileChange}
							selectedFile={selectedFile}
						/>
						<div>
							<UploadAvatarButton handleFileChange={handleFileChange} />
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
						<Link to={AppRoute.ROOT}>
							<Button color="secondary" label="Cancel" size="small" />
						</Link>
						<Button color="basic" label="Update" size="small" type="submit" />
					</div>
				</form>
			</div>
		</>
	);
};
export { Profile };
