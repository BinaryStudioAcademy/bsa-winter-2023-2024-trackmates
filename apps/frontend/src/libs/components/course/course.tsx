import { Button, Image } from "~/libs/components/components.js";
import { useCallback } from "~/libs/hooks/hooks.js";
import { type CourseDto } from "~/modules/courses/courses.js";
import { type AddCourseRequestDto } from "~/modules/user-courses/user-courses.js";

import styles from "./styles.module.css";

type Properties = {
	course: CourseDto;
	onAddCourse?: ((coursePayload: AddCourseRequestDto) => void) | undefined;
};

const Course: React.FC<Properties> = ({ course, onAddCourse }: Properties) => {
	const { image, title, url, vendor, vendorCourseId } = course;

	const handleAddCourse = useCallback(() => {
		onAddCourse?.({
			vendorCourseId: vendorCourseId,
			vendorId: vendor.id,
		});
	}, [onAddCourse, vendor.id, vendorCourseId]);

	return (
		<article className={styles["container"]}>
			<div className={styles["content"]}>
				<div className={styles["source-container"]}>
					<Image alt="Course source logo" src={`/vendors/${vendor.key}.svg`} />
				</div>
				<div className={styles["image-container"]}>
					<Image alt="Course" src={image} />
				</div>
				<div className={styles["info-container"]}>
					<h2 className={styles["title"]}>{title}</h2>
				</div>
			</div>
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
