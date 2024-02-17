import { type CourseDto } from "~/modules/courses/courses.js";

import { Course } from "../course/course.js";
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
						<li className={styles["item"]} key={course.id}>
							<Course course={course} />
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export { Courses };
