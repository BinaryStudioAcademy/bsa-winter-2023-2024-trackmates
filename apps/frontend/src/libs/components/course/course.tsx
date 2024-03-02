import { Button, Link } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/enums.js";
import { useCallback } from "~/libs/hooks/hooks.js";
import { type ValueOf } from "~/libs/types/types.js";
import { type CourseDto } from "~/modules/courses/courses.js";
import { type AddCourseRequestDto } from "~/modules/user-courses/user-courses.js";

import { CourseCard } from "./libs/component/component.js";
import styles from "./styles.module.css";

type Properties = {
	course: CourseDto;
	onAddCourse?: ((coursePayload: AddCourseRequestDto) => void) | undefined;
};

const Course: React.FC<Properties> = ({ course, onAddCourse }: Properties) => {
	const { id, url, vendor, vendorCourseId } = course;

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
				<Link
					to={
						`${AppRoute.COURSE_DESCRIPTION}/${id}` as ValueOf<typeof AppRoute>
					}
				>
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
