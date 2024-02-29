import { type CourseSectionDto } from "~/modules/course-sections/course.sections.js";

import { MAXIMUM_ITEMS, START_INDEX } from "./libs/constants.js";
import styles from "./styles.module.css";

type Properties = {
	courseSections: CourseSectionDto[];
};

const CourseSections: React.FC<Properties> = ({
	courseSections,
}: Properties) => {
	return (
		<div className={styles["container"]}>
			<div className={styles["title"]}>Course Content</div>
			<ul className={styles["list"]}>
				{courseSections.slice(START_INDEX, MAXIMUM_ITEMS).map((section) => {
					return (
						<li className={styles["item"]} key={section.id}>
							{section.title}
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export { CourseSections };
