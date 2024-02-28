import videoCover from "~/assets/img/video-cover.png";
import { Button, Image } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppSelector,
	useEffect,
} from "~/libs/hooks/hooks.js";
import { actions as courseActions } from "~/modules/courses/courses.js";

import styles from "./styles.module.css";

const CourseInfo: React.FC = () => {
	const course = useAppSelector((state) => state.courses.currentCourse);

	const dispatch = useAppDispatch();
	const courseID = 3;

	useEffect(() => {
		void dispatch(courseActions.getById({ id: courseID }));
	}, [dispatch]);

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
					<div className={styles["title"]}>{course?.title}</div>
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
