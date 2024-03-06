import { type CourseDto } from "~/modules/courses/courses.js";
import {
	type AddCourseRequestDto,
	type UserCourseResponseDto,
} from "~/modules/user-courses/user-courses.js";

import { Course } from "../course/course.js";
import styles from "./styles.module.css";

type Properties = {
	courses: (CourseDto | UserCourseResponseDto)[];
	onAddCourse?: (coursePayload: AddCourseRequestDto) => void;
	userId?: number;
};

const Courses: React.FC<Properties> = ({
	courses,
	onAddCourse,
	userId,
}: Properties) => {
	return (
		<ul className={styles["list"]}>
			{courses.map((course) => {
				return (
					<li className={styles["item"]} key={course.vendorCourseId}>
						<Course course={course} onAddCourse={onAddCourse} userId={userId} />
					</li>
				);
			})}
		</ul>
	);
};

export { Courses };
