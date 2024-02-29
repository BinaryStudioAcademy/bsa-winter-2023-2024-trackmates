import { Button, Image } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppSelector,
	useEffect,
	useParams,
} from "~/libs/hooks/hooks.js";
import { actions as courseSectionsActions } from "~/modules/course-sections/course.sections.js";
import { actions as courseActions } from "~/modules/courses/courses.js";

import { CourseActivities } from "./libs/components/components.js";
import styles from "./styles.module.css";

const CourseInfo: React.FC = () => {
	const course = useAppSelector((state) => state.courses.currentCourse);
	const courseSections = useAppSelector((state) => state.course.courseSections);

	const dispatch = useAppDispatch();

	const { id } = useParams<{ id: string }>();

	useEffect(() => {
		void dispatch(courseActions.getById({ id: Number(id) }));
		void dispatch(
			courseSectionsActions.getAllByCourseId({ courseId: Number(id) }),
		);
	}, [dispatch, id]);

	if (!course) {
		return;
	}

	return (
		<>
			<Button
				className={styles["back-btn"]}
				href={AppRoute.ROOT}
				iconName="back"
				label="Back to overview"
			/>
			<div className={styles["wrapper"]}>
				<div className={styles["course-info"]}>
					<div className={styles["title"]}>{course.title}</div>
					<Image alt="Course" className={styles["image"]} src={course.image} />

					<div className={styles["tabs"]}>
						<input
							checked
							className={styles["tabs__radio"]}
							id="tab1"
							name="tabs-example"
							type="radio"
						/>
						<label className={styles["tabs__label"]} htmlFor="tab1">
							About
						</label>
						<div className={styles["tabs__content"]}>
							<div className={styles["tabs__title"]}>About this course</div>
							<div
								dangerouslySetInnerHTML={{ __html: course.description || "" }}
							/>
						</div>
						<input
							className={styles["tabs__radio"]}
							id="tab2"
							name="tabs-example"
							type="radio"
						/>
						<label className={styles["tabs__label"]} htmlFor="tab2">
							Details
						</label>
						<div className={styles["tabs__content"]}>
							<div className={styles["tabs__title"]}>Course Details</div>
							<ul className={styles["tabs__details-list"]}>
								{courseSections.map((section) => {
									return (
										<li
											className={styles["tabs__details-item"]}
											key={section.id}
										>
											{section.title}
										</li>
									);
								})}
							</ul>
						</div>
					</div>
				</div>
				<div className={styles["course-content"]}>
					<div className={styles["title"]}>Course Content</div>
					<ul className={styles["course-content__list"]}>
						{courseSections.map((section) => {
							return (
								<li className={styles["course-content__item"]} key={section.id}>
									{section.title}
								</li>
							);
						})}
					</ul>

					<CourseActivities />
				</div>
			</div>
		</>
	);
};

export { CourseInfo };
