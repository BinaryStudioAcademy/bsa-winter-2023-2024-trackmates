import UdemyLogo from "~/assets/img/svg/udemy-logo.svg";
import { Button, Image } from "~/libs/components/components.js";
import { type CourseDto } from "~/modules/courses/courses.js";

import styles from "./styles.module.css";

type Properties = {
	course: CourseDto;
	isNew?: boolean | undefined;
};

const Course: React.FC<Properties> = ({ course, isNew }: Properties) => {
	const { image, title } = course;
	return (
		<article className={styles["container"]}>
			<div className={styles["content"]}>
				<div className={styles["source-container"]}>
					<Image alt="Course source logo" src={UdemyLogo} />
				</div>
				<div className={styles["image-container"]}>
					<Image alt="Course" src={image} />
				</div>
				<div className={styles["info-container"]}>
					<h2 className={styles["title"]}>{title}</h2>
				</div>
			</div>
			{isNew && (
				<div className={styles["toolbar"]}>
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
						size="small"
						style="filled"
					/>
				</div>
			)}
		</article>
	);
};

export { Course };
