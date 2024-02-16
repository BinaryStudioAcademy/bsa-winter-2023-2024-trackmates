import profileCharacter from "~/assets/img/user-details-img.png";
import { Button, Image, Input, Link } from "~/libs/components/components.js";
import { DEFAULT_USER_AVATAR } from "~/libs/constants/constants.js";
import { AppRoute } from "~/libs/enums/enums.js";
import { useAppForm, useCallback } from "~/libs/hooks/hooks.js";
import {
	type UserProfileRequestDto,
	userProfileValidationSchema,
} from "~/modules/users/users.js";

import { DEFAULT_PROFILE_PAYLOAD } from "./libs/constants.js";
import styles from "./styles.module.css";

const Profile: React.FC = () => {
	const { control, errors, handleSubmit } = useAppForm<UserProfileRequestDto>({
		defaultValues: DEFAULT_PROFILE_PAYLOAD,
		validationSchema: userProfileValidationSchema,
	});

	const onSubmit = useCallback((): void => {
		// handle update profile
	}, []);

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
				<header className={styles["profile-header"]}>
					<Image
						alt="user avatar"
						height="133"
						shape="circle"
						src={DEFAULT_USER_AVATAR}
						width="133"
					/>
					<Button color="secondary" label="Change the photo" size="small" />
				</header>
				<form
					className={styles["profile-form"]}
					name="profile"
					onSubmit={handleFormSubmit}
				>
					{" "}
					<fieldset className={styles["fieldset"]}>
						<Input
							color="light"
							control={control}
							errors={errors}
							label="Full Name"
							name="fullName"
							type="text"
						/>
					</fieldset>
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
