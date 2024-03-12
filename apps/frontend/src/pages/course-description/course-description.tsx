import { Button } from "~/libs/components/components.js";
import { BACK_NAVIGATION_STEP } from "~/libs/constants/constants.js";
import { EmptyLength } from "~/libs/enums/enums.js";
import { getPercentage } from "~/libs/helpers/helpers.js";
import {
	useAppDispatch,
	useAppSelector,
	useAppTitle,
	useCallback,
	useEffect,
	useNavigate,
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
	const navigate = useNavigate();

	const { courseId, userId } = useParams<{
		courseId: string;
		userId: string;
	}>();

	const handleClick = useCallback(() => {
		navigate(BACK_NAVIGATION_STEP);
	}, [navigate]);

	useAppTitle();

	useEffect(() => {
		if (courseId) {
			void dispatch(courseActions.getById({ id: courseId }));
			void dispatch(
				courseSectionsActions.getAllByCourseId({ courseId: Number(courseId) }),
			);
		}
	}, [dispatch, courseId]);

	if (!course) {
		return null;
	}

	const hasCourseSections = courseSections.length > EmptyLength.ARRAY;

	return (
		<>
			<Button
				className={styles["back-button"]}
				hasVisuallyHiddenLabel
				iconName="backArrow"
				label="Back to overview"
				onClick={handleClick}
				size="small"
			/>
			<div className={styles["wrapper"]}>
				<CourseDetails course={course} courseSections={courseSections} />
				{hasCourseSections && (
					<div className={styles["course-sections"]}>
						<CourseSections
							courseId={Number(course.id)}
							courseSections={courseSections}
							userId={Number(userId)}
						/>
						<CourseActivities progress={progress} />
					</div>
				)}
			</div>
		</>
	);
};

export { CourseDescription };
