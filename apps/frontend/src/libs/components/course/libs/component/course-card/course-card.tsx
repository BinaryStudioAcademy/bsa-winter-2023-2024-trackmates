import { Image } from "~/libs/components/components.js";
import { type CourseDto } from "~/modules/courses/courses.js";

import styles from "./styles.module.css";

type Properties = {
	course: CourseDto;
};

const CourseCard: React.FC<Properties> = ({ course }: Properties) => {
	const { image, title, vendor } = course;

	return (
		<div className={styles["content"]}>
			<div className={styles["source-container"]}>
				<Image alt="Course source logo" src={`/vendors/${vendor.key}.svg`} />
			</div>
			<div className={styles["image-container"]}>
				<Image alt="Course" src={image} />
			</div>
			<div className={styles["info-container"]}>
				<h2 className={styles["title"]}>{title}</h2>
			</div>
		</div>
	);
};

export { CourseCard };
