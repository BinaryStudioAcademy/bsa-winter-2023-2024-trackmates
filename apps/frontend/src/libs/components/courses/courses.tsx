import { useAppDispatch, useCallback } from "~/libs/hooks/hooks.js";
import {
	type AddCourseRequestDto,
	type CourseDto,
	actions as courseActions,
} from "~/modules/courses/courses.js";

import { Course } from "../course/course.js";
import styles from "./styles.module.css";

type Properties = {
	courses: CourseDto[];
	isNew?: boolean;
	title?: string;
};

const Courses: React.FC<Properties> = ({
	courses,
	isNew,
	title,
}: Properties) => {
	const dispatch = useAppDispatch();

	const handleAddCourse = useCallback(
		(payload: AddCourseRequestDto) => {
			void dispatch(courseActions.add(payload));
		},
		[dispatch],
	);

	return (
		<div className={styles["container"]}>
			<h2 className={styles["title"]}>{title}</h2>
			<ul className={styles["list"]}>
				{courses.map((course) => {
					return (
						<li className={styles["item"]} key={course.vendorCourseId}>
							<Course
								course={course}
								isNew={isNew}
								onAddCourse={handleAddCourse}
							/>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export { Courses };
