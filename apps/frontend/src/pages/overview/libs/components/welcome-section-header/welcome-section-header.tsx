import welcomeCharacter from "~/assets/img/svg/welcome-character.svg";
import { Button } from "~/libs/components/components.js";
import { UserAuthResponseDto } from "~/modules/users/users.js";

import styles from "./styles.module.css";

type Properties = {
	user: UserAuthResponseDto;
};

const WelcomeHeader: React.FC<Properties> = ({ user }: Properties) => {
	return (
		<header className={styles["welcome-section-header"]}>
			<div className={styles["welcome-section-header-content"]}>
				<h2 className={styles["welcome-section-header-title"]}>Welcome back</h2>
				<h3 className={styles["welcome-section-header-subtitle"]}>
					{user.firstName} {user.lastName}
				</h3>
				<div className={styles["welcome-character"]}>
					<div className={styles["particle"]} />
					<div className={styles["particle"]} />
					<img
						alt="welcome character"
						className={styles["image"]}
						src={welcomeCharacter}
					/>
					<div className={styles["particle"]} />
				</div>
			</div>
			<div className={styles["welcome-section-header-actions"]}>
				<Button
					className={styles["add-course-button"]}
					iconName="plus"
					label="Add course"
				/>
			</div>
		</header>
	);
};

export { WelcomeHeader };
