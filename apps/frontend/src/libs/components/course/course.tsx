import { DEFAULT_COURSE_DATA } from "~/libs/constants/constants.js";

import styles from "./styles.module.css";

const Course: React.FC = () => {
	const { image, source, title } = DEFAULT_COURSE_DATA;
	return (
		<div className={styles["container"]}>
			<div className={styles["source-container"]}>
				<img alt="Course source logo" src={source} />
			</div>
			<div className={styles["image-container"]}>
				<img alt="Course" src={image} />
			</div>
			<div className={styles["info-container"]}>
				<h2 className={styles["title"]}>{title}</h2>
			</div>
		</div>
	);
};

export { Course };
