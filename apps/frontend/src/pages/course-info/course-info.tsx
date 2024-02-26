import videoCover from "~/assets/img/video-cover.png";
import { Button, Image } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/enums.js";

import styles from "./styles.module.css";

const CourseInfo: React.FC = () => {
	return (
		<>
			<Button
				className={styles["back-btn"]}
				color="secondary"
				href={AppRoute.ROOT}
				iconName="back"
				label="Back to overview"
			/>
			<div className={styles["wrapper"]}>
				<div className={styles["course-info"]}>
					<div className={styles["title"]}>UI Styleguide With Figma</div>
					<Image
						alt="Video Cover"
						className={styles["image"]}
						src={videoCover}
					/>
				</div>
				<div className={styles["course-content"]}>
					<div className={styles["title"]}>Course Content</div>
					<div className={styles["content-item"]}>
						<span className={styles["subtitle"]}>What is UI Design?</span>
					</div>
				</div>
			</div>
		</>
	);
};

export { CourseInfo };
