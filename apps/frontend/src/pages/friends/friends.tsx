import { Friend } from "./components/components.js";
import styles from "./styles.module.css";

const Friends: React.FC = () => {
	return (
		<section className={styles["wrapper"]}>
			<Friend fullName="Test228" imageUrl="Test228" />
		</section>
	);
};

export { Friends };
