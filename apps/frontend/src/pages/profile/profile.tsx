import profileCharacter from "~/assets/img/user-details-img.png";
import { Button, Image } from "~/libs/components/components.js";
import { DEFAULT_USER_AVATAR } from "~/libs/constants/constants.js";

import styles from "./styles.module.css";

const Profile: React.FC = () => {
	return (
		<>
			<div className={styles["container"]}>
				<header className={styles["profile-header"]}>
					<Image
						alt="user avatar"
						height="133"
						shape="circle"
						src={DEFAULT_USER_AVATAR}
						width="133"
					/>
					<Button
						className={styles["add-course-button"]}
						color="basic"
						label="Change the photo"
						size="small"
					/>
				</header>
				<Image alt="profile character" src={profileCharacter} width="176" />
			</div>
		</>
	);
};
export { Profile };
