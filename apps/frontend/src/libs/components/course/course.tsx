import { AppRoute } from "~/libs/enums/enums.js";
import { configureString } from "~/libs/helpers/helpers.js";
import { useCallback, useState } from "~/libs/hooks/hooks.js";
import { type CourseDto } from "~/modules/courses/courses.js";
import {
	type AddCourseRequestDto,
	type UserCourseResponseDto,
} from "~/modules/user-courses/user-courses.js";

import { Button } from "../button/button.js";
import { Link } from "../link/link.js";
import { CourseCard } from "./libs/component/component.js";
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
	const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);

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
			vendorCourseId,
			vendorId: vendor.id,
		});
		setIsButtonDisabled(true);
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
						isDisabled={isButtonDisabled}
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
