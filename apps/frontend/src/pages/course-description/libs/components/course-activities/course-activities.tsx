import { CircularProgress } from "~/libs/components/components.js";
import { getValidClassNames } from "~/libs/helpers/helpers.js";

import styles from "./styles.module.css";

type Properties = {
	progress: number;
};

const CourseActivities: React.FC<Properties> = ({ progress }: Properties) => {
	return (
		<div className={styles["container"]}>
			<h3 className={styles["title"]}>Course Activities</h3>
			<CircularProgress percentage={progress} />

			<div className={styles["tags"]}>
				<div className={styles["tag"]}>
					<span
						className={getValidClassNames(
							styles["tag-circle"],
							styles["tag-completed"],
						)}
					/>
					<span className={styles["tag-name"]}>Completed</span>
				</div>
				<div className={styles["tag"]}>
					<span
						className={getValidClassNames(
							styles["tag-circle"],
							styles["tag-in-process"],
						)}
					/>
					<span className={styles["tag-name"]}>In Process</span>
				</div>
			</div>
		</div>
	);
};

export { CourseActivities };
