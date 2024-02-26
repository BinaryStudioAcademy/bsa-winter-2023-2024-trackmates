import { Button, Image, Navigate } from "~/libs/components/components.js";
import { DEFAULT_USER_AVATAR } from "~/libs/constants/constants.js";
import { AppRoute } from "~/libs/enums/enums.js";
import { useAppSelector, useParams } from "~/libs/hooks/hooks.js";

import { UserButton } from "./libs/components/components.js";
import styles from "./styles.module.css";

const User: React.FC = () => {
	const { id } = useParams();
	const { friends } = useAppSelector((state) => {
		return {
			friends: [
				...state.friends.potentialFriends,
				...state.friends.followers,
				...state.friends.followings,
			],
		};
	});

	const user = friends.find((friend) => friend.id === +(id as string));

	if (!user) {
		return <Navigate to={AppRoute.FRIENDS} />;
	}

	return (
		<div className={styles["container"]}>
			<Button
				className={styles["return-button"]}
				hasVisuallyHiddenLabel
				href={AppRoute.FRIENDS}
				iconName="back"
				label="Go back"
				size="small"
			/>

			<div className={styles["user-content"]}>
				<div className={styles["profile-image-wrapper"]}>
					<Image
						alt="avatar"
						className={styles["profile-image"]}
						src={user.avatarUrl ?? DEFAULT_USER_AVATAR}
					/>
				</div>

				<div className={styles["user-wrapper"]}>
					<p
						className={styles["fullName"]}
					>{`${user.firstName} ${user.lastName}`}</p>
					<UserButton id={user.id} />
				</div>
			</div>
		</div>
	);
};

export { User };
