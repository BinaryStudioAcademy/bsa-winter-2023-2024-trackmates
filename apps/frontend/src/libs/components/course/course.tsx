import { AppRoute } from "~/libs/enums/enums.js";
import { configureString } from "~/libs/helpers/helpers.js";
import { useAppSelector, useCallback } from "~/libs/hooks/hooks.js";
import { type CourseDto } from "~/modules/courses/courses.js";
import {
	type AddCourseRequestDto,
	type UserCourseResponseDto,
} from "~/modules/user-courses/user-courses.js";

import { Button } from "../button/button.js";
import { Link } from "../link/link.js";
import { CourseCard } from "./libs/component/component.js";
import { checkIsUserCourse } from "./libs/helpers/helpers.js";
import styles from "./styles.module.css";

type Properties = {
	course: CourseDto | UserCourseResponseDto;
	onAddCourse?: ((coursePayload: AddCourseRequestDto) => void) | undefined;
	userId?: number | undefined;
};

const Course: React.FC<Properties> = ({
	course,
	onAddCourse,
	userId,
}: Properties) => {
	const { id, url, vendor, vendorCourseId } = course;
	const addedVendorCourseIds = useAppSelector(({ courses }) => {
		return courses.addedVendorCourseIds;
	});

	const isButtonDisabled = addedVendorCourseIds.includes(vendorCourseId);

	const courseDescriptionRouteById = configureString(
		AppRoute.USERS_$USER_ID_COURSES_$COURSE_ID,
		{
			courseId: String(id),
			userId: String(userId),
		},
	) as typeof AppRoute.USERS_$USER_ID_COURSES_$COURSE_ID;
	const courseComparisonRoute = configureString(
		AppRoute.USERS_$USER_ID_COURSES_$COURSE_ID_COMPARE,
		{
			courseId: String(id),
			userId: String(userId),
		},
	) as typeof AppRoute.USERS_$USER_ID_COURSES_$COURSE_ID_COMPARE;

	const hasAddCourse = !!onAddCourse;
	const hasProgress = checkIsUserCourse(course);
	const hasCompare = !hasProgress && !hasAddCourse;

	const handleAddCourse = useCallback(() => {
		onAddCourse?.({
			vendorCourseId,
			vendorId: vendor.id,
		});
	}, [onAddCourse, vendor.id, vendorCourseId]);

	return (
		<article className={styles["container"]}>
			{hasProgress ? (
				<Link className={styles["link"]} to={courseDescriptionRouteById}>
					<CourseCard course={course} />
				</Link>
			) : (
				<CourseCard course={course} />
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
						isDisabled={isButtonDisabled}
						label="Add"
						onClick={handleAddCourse}
						size="small"
					/>
				</div>
			)}
			{hasCompare && (
				<div className={styles["actions"]}>
					<Button
						className={styles["compare-progress-button"]}
						href={courseComparisonRoute}
						label="Compare progress"
						size="small"
					/>
				</div>
			)}
		</article>
	);
};

export { Course };
