import { type CourseDto } from "~/modules/courses/courses.js";
import {
	type AddCourseRequestDto,
	type UserCourseResponseDto,
} from "~/modules/user-courses/user-courses.js";

import { Course } from "../course/course.js";
import styles from "./styles.module.css";

type Properties = {
	courses?: CourseDto[];
	onAddCourse?: (coursePayload: AddCourseRequestDto) => void;
	userCourses?: UserCourseResponseDto[];
	userId?: number;
};

const Courses: React.FC<Properties> = ({
	courses,
	onAddCourse,
	userCourses,
	userId,
}: Properties) => {
	const hasCourses = Boolean(courses);
	const hasUserCourses = Boolean(userCourses);

	return (
		<>
			{hasCourses && (
				<ul className={styles["list"]}>
					{(courses as CourseDto[]).map((course) => {
						return (
							<li className={styles["item"]} key={course.vendorCourseId}>
								<Course
									course={course}
									onAddCourse={onAddCourse}
									userId={userId}
								/>
							</li>
						);
					})}
				</ul>
			)}
			{hasUserCourses && (
				<ul className={styles["list"]}>
					{(userCourses as UserCourseResponseDto[]).map((course) => {
						return (
							<li className={styles["item"]} key={course.vendorCourseId}>
								<Course
									onAddCourse={onAddCourse}
									userCourse={course}
									userId={userId}
								/>
							</li>
						);
					})}
				</ul>
			)}
		</>
	);
};

export { Courses };
