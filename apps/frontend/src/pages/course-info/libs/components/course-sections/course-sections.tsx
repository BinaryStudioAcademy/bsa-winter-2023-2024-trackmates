import { type CourseSectionDto } from "~/modules/course-sections/course.sections.js";

import { CourseActivities } from "../course-activities/course-activities.js";
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
				{courseSections.map((section) => {
					return (
						<li className={styles["item"]} key={section.id}>
							{section.title}
						</li>
					);
				})}
			</ul>

			<CourseActivities />
		</div>
	);
};

export { CourseSections };
