import { DEFAULT_COURSES_DATA } from "~/libs/constants/constants.js";

import { CourseList } from "./components/components.js";
import styles from "./styles.module.css";

const Overview: React.FC = () => {
	return (
		<div className={styles["container"]}>
			<CourseList courses={DEFAULT_COURSES_DATA} />
		</div>
	);
};

export { Overview };
