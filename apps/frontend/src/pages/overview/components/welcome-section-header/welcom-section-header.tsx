import { Button } from "~/libs/components/components.js";

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
				<img alt="welcome character" />
			</div>
			<div className={styles["welcome-section-header-actions"]}>
				<Button label="Add the course" />
			</div>
		</header>
	);
};

export { WelcomeHeader };
