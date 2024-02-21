import { Button, Image } from "~/libs/components/components.js";
import { VendorsLogoPath } from "~/libs/enums/enums.js";
import { useCallback } from "~/libs/hooks/hooks.js";
import {
	type AddCourseRequestDto,
	type CourseDto,
} from "~/modules/courses/courses.js";

import styles from "./styles.module.css";

type Properties = {
	course: CourseDto;
	onAddCourse?: ((coursePayload: AddCourseRequestDto) => void) | undefined;
};

const Course: React.FC<Properties> = ({ course, onAddCourse }: Properties) => {
	const { image, title, vendor, vendorCourseId } = course;
	const source = VendorsLogoPath[vendor.key] ?? "";

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
					<Image alt="Course source logo" src={source} />
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
					<Button
						color="secondary"
						label="Read more"
						size="small"
						style="outlined"
					/>
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
