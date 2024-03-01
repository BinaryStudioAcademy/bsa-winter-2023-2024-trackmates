import { Button } from "~/libs/components/components.js";
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
import { EMPTY_COURSE_SECTIONS } from "./libs/constants.ts/constants.js";
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
				iconName="backRound"
				label="Back to overview"
			/>
			<div className={styles["wrapper"]}>
				<CourseDetails course={course} courseSections={courseSections} />
				{courseSections.length > EMPTY_COURSE_SECTIONS && (
					<CourseSections courseSections={courseSections} />
				)}
			</div>
		</>
	);
};

export { CourseInfo };
