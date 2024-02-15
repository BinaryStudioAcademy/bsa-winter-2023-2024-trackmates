import { Course } from "~/libs/components/components.js";
import { type CourseDto } from "~/libs/types/types.js";

import styles from "./styles.module.css";

type Properties = {
	courses: CourseDto[];
};

const Courses: React.FC<Properties> = ({ courses }: Properties) => {
	return (
		<div className={styles["container"]}>
			<h2 className={styles["title"]}>Courses</h2>
			<ul className={styles["list"]}>
				{courses.map((course) => {
					return (
						<li key={course.id}>
							<Course course={course} />
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export { Courses };
