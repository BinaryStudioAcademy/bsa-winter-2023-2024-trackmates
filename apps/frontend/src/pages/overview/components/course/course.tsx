import { Image } from "~/libs/components/components.js";
import { CourseData } from "~/libs/types/types.js";

import styles from "./styles.module.css";

type Properties = {
	course: CourseData;
};

const Course: React.FC<Properties> = ({ course }: Properties) => {
	const { image, source, title } = course;
	return (
		<article className={styles["container"]}>
			<div className={styles["source-container"]}>
				<Image alt="Course source logo" src={source} />
			</div>
			<div className={styles["image-container"]}>
				<Image alt="Course" src={image} />
			</div>
			<div className={styles["info-container"]}>
				<h2 className={styles["title"]}>{title}</h2>
			</div>
		</article>
	);
};

export { Course };
