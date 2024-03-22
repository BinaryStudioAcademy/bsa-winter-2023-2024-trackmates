import defaultCourseImage from "~/assets/img/mock-course-background.png";
import { Image } from "~/libs/components/image/image.jsx";
import { LinearProgress } from "~/libs/components/linear-progress/linear-progress.jsx";
import { useCallback, useState } from "~/libs/hooks/hooks.js";
import {
	type CourseDto,
	type CourseSearchResponseDto,
} from "~/modules/courses/courses.js";
import { type UserCourseResponseDto } from "~/modules/user-courses/user-courses.js";

import { checkIsUserCourse } from "../../helpers/helpers.js";
import styles from "./styles.module.css";

type Properties = {
	course: CourseDto | CourseSearchResponseDto | UserCourseResponseDto;
};

const CourseCard: React.FC<Properties> = ({ course }: Properties) => {
	const { image, title, vendor } = course;

	const [isImageLoaded, setIsImageLoaded] = useState<boolean>(true);

	const [imageSource, setImageSource] = useState<string>(
		image || defaultCourseImage,
	);

	const progress = checkIsUserCourse(course) ? course.progress : null;

	const handleImageError = useCallback(() => {
		setIsImageLoaded(false);
		setImageSource(defaultCourseImage);
	}, []);

	return (
		<div className={styles["content"]}>
			<div className={styles["source-container"]}>
				<Image alt="Course source logo" src={`/vendors/${vendor.key}.svg`} />
			</div>
			<div className={styles["image-container"]}>
				<Image
					alt="Course"
					onError={handleImageError}
					src={isImageLoaded ? imageSource : defaultCourseImage}
				/>
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
