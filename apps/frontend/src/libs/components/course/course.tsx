import { Button, Link } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/enums.js";
import { configureString } from "~/libs/helpers/helpers.js";
import { useCallback } from "~/libs/hooks/hooks.js";
import { type CourseDto } from "~/modules/courses/courses.js";
import {
	type AddCourseRequestDto,
	type UserCourseDto,
} from "~/modules/user-courses/user-courses.js";

import { CourseCard } from "./libs/components/components.js";
import styles from "./styles.module.css";

type Properties = {
	course: CourseDto | UserCourseDto;
	onAddCourse?: ((coursePayload: AddCourseRequestDto) => void) | undefined;
	userId?: number | undefined;
};

const Course: React.FC<Properties> = ({
	course,
	onAddCourse,
	userId,
}: Properties) => {
	const { id, url, vendor, vendorCourseId } = course;

	const courseDescriptionRouteById = configureString(
		AppRoute.USERS_$USER_ID_COURSES_$COURSE_ID,
		{
			courseId: String(id),
			userId: String(userId),
		},
	) as typeof AppRoute.USERS_$USER_ID_COURSES_$COURSE_ID;

	const hasAddCourse = !!onAddCourse;

	const handleAddCourse = useCallback(() => {
		onAddCourse?.({
			vendorCourseId: vendorCourseId,
			vendorId: vendor.id,
		});
	}, [onAddCourse, vendor.id, vendorCourseId]);

	return (
		<article className={styles["container"]}>
			{hasAddCourse ? (
				<CourseCard course={course} />
			) : (
				<Link className={styles["link"]} to={courseDescriptionRouteById}>
					<CourseCard course={course} />
				</Link>
			)}
			{hasAddCourse && (
				<div className={styles["actions"]}>
					<a
						className={styles["course-details-link"]}
						href={`${vendor.url}${url}`}
						rel="noreferrer"
						target="_blank"
					>
						Read more
					</a>
					<Button
						className={styles["course-add-button"]}
						iconName="plusOutlined"
						label="Add"
						onClick={handleAddCourse}
						size="small"
					/>
				</div>
			)}
		</article>
	);
};

export { Course };
