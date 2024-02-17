import { Image } from "~/libs/components/components.js";
import { VendorsLogoPath } from "~/libs/enums/enums.js";
import { type CourseDto } from "~/libs/types/types.js";

import styles from "./styles.module.css";

//TODO I think, low-level component do not have to depend from dto types
type Properties = {
	course: CourseDto;
};

const Course: React.FC<Properties> = ({ course }: Properties) => {
	const { imageSmall, title, vendor } = course;
	const source = VendorsLogoPath[vendor.key] || "";

	return (
		<article className={styles["container"]}>
			<div className={styles["source-container"]}>
				<Image alt="Course source logo" src={source} />
			</div>
			<div className={styles["image-container"]}>
				<Image alt="Course" src={imageSmall} />
			</div>
			<div className={styles["info-container"]}>
				<h2 className={styles["title"]}>{title}</h2>
			</div>
		</article>
	);
};

export { Course };
