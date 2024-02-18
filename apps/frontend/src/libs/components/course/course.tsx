import { Button, Image } from "~/libs/components/components.js";
import { VendorsLogoPath } from "~/libs/enums/enums.js";
import { useAppDispatch, useCallback } from "~/libs/hooks/hooks.js";
import {
	type CourseDto,
	actions as courseActions,
} from "~/modules/courses/courses.js";

import styles from "./styles.module.css";

type Properties = {
	course: CourseDto;
	isNew?: boolean | undefined;
};

const Course: React.FC<Properties> = ({ course, isNew }: Properties) => {
	const dispatch = useAppDispatch();
	const { id, image, title, vendor } = course;
	const source = VendorsLogoPath[vendor.key] || "";

	const handleAddCourse = useCallback(() => {
		void dispatch(
			courseActions.add({
				vendorCourseId: id,
				vendorId: 1,
			}),
		);
	}, [dispatch, id]);

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
			{isNew && (
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
