import { Image } from "~/libs/components/components.js";
import { type CourseDto } from "~/modules/courses/courses.js";
import { type UserCourseResponseDto } from "~/modules/user-courses/user-courses.js";

import { LinearProgress } from "../../../../linear-progress/linear-progress.js";
import styles from "./styles.module.css";

type Properties = {
	course?: CourseDto;
	userCourse?: UserCourseResponseDto;
};

const CourseCard: React.FC<Properties> = ({
	course,
	userCourse,
}: Properties) => {
	const hasCourse = Boolean(course);
	const hasUserCourse = Boolean(userCourse);
	const { image, title, vendor } = hasCourse
		? (course as CourseDto)
		: (userCourse as UserCourseResponseDto);

	const percentage = hasUserCourse
		? (userCourse as UserCourseResponseDto).progress
		: null;

	return (
		<div className={styles["content"]}>
			<div className={styles["source-container"]}>
				<Image alt="Course source logo" src={`/vendors/${vendor.key}.svg`} />
			</div>
			<div className={styles["image-container"]}>
				<Image alt="Course" src={image} />
			</div>
			<div className={styles["info-container"]}>
				<h2 className={styles["title"]}>{title}</h2>

				{hasUserCourse && (
					<div className={styles["progress"]}>
						<LinearProgress progress={percentage as number} />
						<p className={styles["progress-info"]}>Completed {percentage}%</p>
					</div>
				)}
			</div>
		</div>
	);
};

export { CourseCard };
