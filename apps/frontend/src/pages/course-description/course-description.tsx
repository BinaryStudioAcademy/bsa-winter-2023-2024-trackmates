import { Button } from "~/libs/components/components.js";
import { EMPTY_ARRAY_LENGTH } from "~/libs/constants/constants.js";
import { AppRoute } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppSelector,
	useEffect,
	useParams,
} from "~/libs/hooks/hooks.js";
import { actions as courseSectionsActions } from "~/modules/course-sections/course.sections.js";
import { actions as courseActions } from "~/modules/courses/courses.js";

import { CourseDetails, CourseSections } from "./libs/components/components.js";
import styles from "./styles.module.css";

const CourseDescription: React.FC = () => {
	const { course, courseSections } = useAppSelector(({ course, courses }) => ({
		course: courses.currentCourse,
		courseSections: course.courseSections,
	}));

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
			<Button
				className={styles["back-btn"]}
				href={AppRoute.ROOT}
				iconName="backRound"
				label="Back to overview"
			/>
			<div className={styles["wrapper"]}>
				<CourseDetails course={course} courseSections={courseSections} />
				{hasCourseSections && (
					<CourseSections courseSections={courseSections} />
				)}
			</div>
		</>
	);
};

export { CourseDescription };
