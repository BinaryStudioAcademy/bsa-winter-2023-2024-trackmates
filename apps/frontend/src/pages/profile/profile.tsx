import { Button, Image, Link } from "~/libs/components/components.js";
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
					<Button color="secondary" label="Change the photo" size="small" />
				</header>
				<form name="profile">
					<div className={styles["btnWrapper"]}>
						<Link to="/">
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
