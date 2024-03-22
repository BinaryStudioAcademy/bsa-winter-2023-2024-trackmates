import { AppRoute, DataStatus } from "~/libs/enums/enums.js";
import { configureString } from "~/libs/helpers/helpers.js";
import { useAppSelector, useCallback } from "~/libs/hooks/hooks.js";
import {
	type CourseDto,
	type CourseSearchResponseDto,
} from "~/modules/courses/courses.js";
import {
	type AddCourseRequestDto,
	type UserCourseResponseDto,
} from "~/modules/user-courses/user-courses.js";

import { Button } from "../button/button.js";
import { Link } from "../link/link.js";
import { CourseCard } from "./libs/component/component.js";
import {
	checkIsSearchedCourse,
	checkIsUserCourse,
} from "./libs/helpers/helpers.js";
import styles from "./styles.module.css";

type Properties = {
	course: CourseDto | CourseSearchResponseDto | UserCourseResponseDto;
	isCommon?: boolean;
	onAddCourse?: ((coursePayload: AddCourseRequestDto) => void) | undefined;
	userId?: number | undefined;
};

const Course: React.FC<Properties> = ({
	course,
	isCommon = false,
	onAddCourse,
	userId,
}: Properties) => {
	const { id, url, vendor, vendorCourseId } = course;
	const addedVendorCourseDataStatuses = useAppSelector(({ courses }) => {
		return courses.addedVendorCourseDataStatuses;
	});

	const isLoading =
		addedVendorCourseDataStatuses[vendorCourseId] === DataStatus.PENDING;

	const hasUserCourse = checkIsSearchedCourse(course)
		? course.hasUserCourse
		: true;
	const isDisabled = isLoading || hasUserCourse;

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

	const handleAddCourse = useCallback(() => {
		onAddCourse?.({
			vendorCourseId,
			vendorId: vendor.id,
		});
	}, [onAddCourse, vendor.id, vendorCourseId]);

	return (
		<article className={styles["container"]}>
			{hasProgress ? (
				<>
					<Link className={styles["link"]} to={courseDescriptionRouteById}>
						<CourseCard
							course={course}
							courseComparisonRoute={courseComparisonRoute}
							isCommon={isCommon}
						/>
					</Link>
				</>
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
						isDisabled={isDisabled}
						isLoading={isLoading}
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
