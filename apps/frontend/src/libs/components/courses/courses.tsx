import { type CourseDto } from "~/modules/courses/courses.js";
import { type AddCourseRequestDto } from "~/modules/user-courses/user-courses.js";

import { Course } from "../course/course.js";
import styles from "./styles.module.css";

type Properties = {
	courses: CourseDto[];
	onAddCourse?: (coursePayload: AddCourseRequestDto) => void;
	title?: string;
};

const Courses: React.FC<Properties> = ({
	courses,
	onAddCourse,
	title,
}: Properties) => {
	return (
		<div className={styles["container"]}>
			<h2 className={styles["title"]}>{title}</h2>
			<ul className={styles["list"]}>
				{courses.map((course) => {
					return (
						<li className={styles["item"]} key={course.vendorCourseId}>
							<Course course={course} onAddCourse={onAddCourse} />
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export { Courses };
