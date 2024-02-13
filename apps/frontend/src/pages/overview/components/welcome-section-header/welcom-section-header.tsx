import welcomeCharacter from "~/assets/img/svg/welcome-character.svg";
import { Button, Icon, IconName } from "~/libs/components/components.js";

import styles from "./styles.module.css";

type Properties = {
	firstName: string;
	lastName: string;
};

const WelcomeHeader: React.FC<Properties> = ({
	firstName,
	lastName,
}: Properties) => {
	return (
		<header className={styles["welcome-section-header"]}>
			<div className={styles["welcome-section-header-content"]}>
				<h2 className={styles["welcome-section-header-title"]}>Welcome back</h2>
				<h3
					className={styles["welcome-section-header-subtitle"]}
				>{`${firstName} ${lastName}`}</h3>
				<div className={styles["welcome-character"]}>
					<div className={styles["particle"]} />
					<div className={styles["particle"]} />
					<img alt="welcome character" src={welcomeCharacter} />
					<div className={styles["particle"]} />
				</div>
			</div>
			<div className={styles["welcome-section-header-actions"]}>
				<Button className={styles["add-course-button"]} label="Add the course">
					<div className={styles["button-icon"]}>
						<Icon name={IconName.PLUS} />
					</div>
				</Button>
			</div>
		</header>
	);
};

export { WelcomeHeader };
