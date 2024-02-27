import { Button, Link } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/enums.js";
import { useCallback } from "~/libs/hooks/hooks.js";
import { type CourseDto } from "~/modules/courses/courses.js";
import { type AddCourseRequestDto } from "~/modules/user-courses/user-courses.js";

import { CourseCard } from "./component/component.js";
import styles from "./styles.module.css";

type Properties = {
	course: CourseDto;
	onAddCourse?: ((coursePayload: AddCourseRequestDto) => void) | undefined;
};

const Course: React.FC<Properties> = ({ course, onAddCourse }: Properties) => {
	const { url, vendor, vendorCourseId } = course;

	const handleAddCourse = useCallback(() => {
		onAddCourse?.({
			vendorCourseId: vendorCourseId,
			vendorId: vendor.id,
		});
	}, [onAddCourse, vendor.id, vendorCourseId]);

	return (
		<article className={styles["container"]}>
			{onAddCourse ? (
				<CourseCard course={course} />
			) : (
				<Link to={AppRoute.COURSE_INFO}>
					<CourseCard course={course} />
				</Link>
			)}
			{onAddCourse && (
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
						color="secondary"
						iconName="plusOutlined"
						label="Add"
						onClick={handleAddCourse}
						size="small"
						style="filled"
					/>
				</div>
			)}
		</article>
	);
};

export { Course };
