import { type CourseDto } from "~/modules/courses/courses.js";

import { Course } from "../course/course.js";
import styles from "./styles.module.css";

type Properties = {
	courses: CourseDto[];
	isNew?: boolean;
};

const Courses: React.FC<Properties> = ({ courses, isNew }: Properties) => {
	return (
		<div className={styles["container"]}>
			<h2 className={styles["title"]}>Courses</h2>
			<ul className={styles["list"]}>
				{courses.map((course) => {
					return (
						<li className={styles["item"]} key={course.id}>
							<Course course={course} isNew={isNew} />
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export { Courses };
