import defaultCourseImage from "~/assets/img/mock-course-background.png";
import { Button } from "~/libs/components/button/button.jsx";
import { Image } from "~/libs/components/image/image.jsx";
import { LinearProgress } from "~/libs/components/linear-progress/linear-progress.jsx";
import { type AppRoute } from "~/libs/enums/enums.js";
import {
	type CourseDto,
	type CourseSearchResponseDto,
} from "~/modules/courses/courses.js";
import { type UserCourseResponseDto } from "~/modules/user-courses/user-courses.js";

import { checkIsUserCourse } from "../../helpers/helpers.js";
import styles from "./styles.module.css";

type Properties = {
	course: CourseDto | CourseSearchResponseDto | UserCourseResponseDto;
	courseComparisonRoute?: typeof AppRoute.USERS_$USER_ID_COURSES_$COURSE_ID_COMPARE;
	isCommon?: boolean;
};

const CourseCard: React.FC<Properties> = ({
	course,
	courseComparisonRoute,
	isCommon,
}: Properties) => {
	const { image, title, vendor } = course;

	const progress = checkIsUserCourse(course) ? course.progress : null;

	return (
		<div className={styles["content"]}>
			<div className={styles["source-container"]}>
				<Image alt="Course source logo" src={`/vendors/${vendor.key}.svg`} />
			</div>
			<div className={styles["image-container"]}>
				<Image alt="Course" defaultSrc={defaultCourseImage} src={image} />
				{isCommon && (
					<Button
						className={styles["compare-progress-button"]}
						href={
							courseComparisonRoute as typeof AppRoute.USERS_$USER_ID_COURSES_$COURSE_ID_COMPARE
						}
						iconName="pie"
						label="Compare"
					/>
				)}
			</div>
			<div className={styles["info-container"]}>
				<h2 className={styles["title"]}>{title}</h2>

				{checkIsUserCourse(course) && (
					<div className={styles["progress"]}>
						<LinearProgress progress={progress as number} />
						<p className={styles["progress-info"]}>Completed {progress}%</p>
					</div>
				)}
			</div>
		</div>
	);
};

export { CourseCard };
