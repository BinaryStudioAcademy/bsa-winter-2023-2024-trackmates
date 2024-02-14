import { CourseList } from "./components/components.js";
import styles from "./styles.module.css";

const Overview: React.FC = () => {
	return (
		<div className={styles["container"]}>
			<CourseList />
		</div>
	);
};

export { Overview };
