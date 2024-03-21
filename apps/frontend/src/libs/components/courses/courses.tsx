import { EMPTY_LENGTH } from "~/libs/constants/constants.js";
import {
	type CourseDto,
	type CourseSearchResponseDto,
} from "~/modules/courses/courses.js";
import {
	type AddCourseRequestDto,
	type UserCourseResponseDto,
} from "~/modules/user-courses/user-courses.js";

import { Course } from "../course/course.js";
import styles from "./styles.module.css";

type Properties = {
	commonCourses?: number[];
	courses: (CourseDto | CourseSearchResponseDto | UserCourseResponseDto)[];
	onAddCourse?: (coursePayload: AddCourseRequestDto) => void;
	userId?: number;
};

const Courses: React.FC<Properties> = ({
	commonCourses = [],
	courses,
	onAddCourse,
	userId,
}: Properties) => {
	return (
		<ul className={styles["list"]}>
			{courses.map((course) => {
				const isCommon =
					commonCourses.length > EMPTY_LENGTH &&
					commonCourses.includes(course.id as number);

				return (
					<li className={styles["item"]} key={course.vendorCourseId}>
						<Course
							course={course}
							isCommon={isCommon}
							onAddCourse={onAddCourse}
							userId={userId}
						/>
					</li>
				);
			})}
		</ul>
	);
};

export { Courses };
