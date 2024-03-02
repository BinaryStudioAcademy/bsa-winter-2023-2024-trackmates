import { Button } from "~/libs/components/components.js";
import { EMPTY_ARRAY_LENGTH } from "~/libs/constants/constants.js";
import { AppRoute } from "~/libs/enums/enums.js";
import { getPercentage } from "~/libs/helpers/helpers.js";
import {
	useAppDispatch,
	useAppSelector,
	useEffect,
	useParams,
} from "~/libs/hooks/hooks.js";
import { actions as courseSectionsActions } from "~/modules/course-sections/course-sections.js";
import { actions as courseActions } from "~/modules/courses/courses.js";
import { SectionStatus } from "~/modules/section-statuses/section-statuses.js";

import {
	CourseActivities,
	CourseDetails,
	CourseSections,
} from "./libs/components/components.js";
import styles from "./styles.module.css";

const CourseDescription: React.FC = () => {
	const { course, courseSections, sectionStatuses } = useAppSelector(
		({ course, courses, sectionStatuses }) => ({
			course: courses.currentCourse,
			courseSections: course.courseSections,
			sectionStatuses: sectionStatuses.sectionStatuses,
		}),
	);

	const numberOfSections = courseSections.length;
	const numberOfCompletedSections = sectionStatuses.filter(
		({ status }) => status === SectionStatus.COMPLETED,
	).length;

	const progress = Math.round(
		getPercentage({ part: numberOfCompletedSections, total: numberOfSections }),
	);

	const dispatch = useAppDispatch();

	const { id } = useParams<{ id: string }>();

	useEffect(() => {
		if (id) {
			void dispatch(courseActions.getById({ id: id }));
			void dispatch(
				courseSectionsActions.getAllByCourseId({ courseId: Number(id) }),
			);
		}
	}, [dispatch, id]);

	if (!course) {
		return;
	}

	const hasCourseSections = courseSections.length > EMPTY_ARRAY_LENGTH;

	return (
		<>
			<div className={styles["back-container"]}>
				<Button
					className={styles["back-button"]}
					hasVisuallyHiddenLabel
					href={AppRoute.ROOT}
					iconName="backArrow"
					label="Back to overview"
					size="small"
				/>
				<span className={styles["subtitle"]}>Back to overview</span>
			</div>
			<div className={styles["wrapper"]}>
				<CourseDetails course={course} courseSections={courseSections} />
				{hasCourseSections && (
					<div className={styles["course-sections"]}>
						<CourseSections
							courseId={Number(course.id)}
							courseSections={courseSections}
						/>
						<CourseActivities progress={progress} />
					</div>
				)}
			</div>
		</>
	);
};

export { CourseDescription };
