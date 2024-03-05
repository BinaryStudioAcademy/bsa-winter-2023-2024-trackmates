import { Button } from "~/libs/components/components.js";
import { EMPTY_ARRAY_LENGTH } from "~/libs/constants/constants.js";
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

import { CourseDetails, CourseSections } from "./libs/components/components.js";
import { BACK_NAVIGATION_VALUE } from "./libs/constants/constants.js";
import styles from "./styles.module.css";

const CourseDescription: React.FC = () => {
	const { course, courseSections } = useAppSelector(({ course, courses }) => ({
		course: courses.currentCourse,
		courseSections: course.courseSections,
	}));

	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const { courseId, userId } = useParams<{
		courseId: string;
		userId: string;
	}>();

	const handleClick = useCallback(() => {
		navigate(BACK_NAVIGATION_VALUE);
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

	const hasCourseSections = courseSections.length > EMPTY_ARRAY_LENGTH;

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
					<CourseSections
						courseId={Number(courseId)}
						courseSections={courseSections}
						userId={Number(userId)}
					/>
				)}
			</div>
		</>
	);
};

export { CourseDescription };
