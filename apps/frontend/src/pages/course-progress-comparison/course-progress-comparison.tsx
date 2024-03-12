import { Button, Image, Loader } from "~/libs/components/components.js";
import { BACK_NAVIGATION_STEP } from "~/libs/constants/constants.js";
import { AppTitle, DataStatus } from "~/libs/enums/enums.js";
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
import { actions as sectionStatusActions } from "~/modules/section-statuses/section-statuses.js";
import {
	type UserAuthResponseDto,
	actions as userActions,
} from "~/modules/users/users.js";

import {
	ProgressChart,
	SectionComparison,
} from "./libs/components/components.js";
import { getUserProgress } from "./libs/helpers/helpers.js";
import styles from "./styles.module.css";

const CourseProgressComparison: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const {
		course,
		courseSections,
		currentUser,
		isLoadingCourse,
		sectionStatuses,
		sectionToCompareStatuses,
	} = useAppSelector((state) => {
		return {
			course: state.courses.currentCourse,
			courseSections: state.course.courseSections,
			currentUser: state.auth.user as UserAuthResponseDto,
			friend: state.users.profileUser,
			isLoadingCourse: state.courses.searchDataStatus === DataStatus.PENDING,
			sectionStatuses: state.sectionStatuses.sectionStatuses,
			sectionToCompareStatuses: state.sectionStatuses.sectionToCompareStatuses,
		};
	});
	const { courseId, userId } = useParams<{
		courseId: string;
		userId: string;
	}>();

	useAppTitle(AppTitle.COMPARE_PROGRESS);

	const sectionsCount = courseSections.length;
	const userProgress = getUserProgress(sectionsCount, sectionStatuses);
	const friendProgress = getUserProgress(
		sectionsCount,
		sectionToCompareStatuses,
	);

	const handleGoBack = useCallback(() => {
		navigate(BACK_NAVIGATION_STEP);
	}, [navigate]);

	useEffect(() => {
		if (!courseId) {
			return;
		}

		void dispatch(courseActions.getById({ id: courseId }));
		void dispatch(
			courseSectionsActions.getAllByCourseId({ courseId: Number(courseId) }),
		);
		void dispatch(
			sectionStatusActions.getAll({
				courseId: Number(courseId),
				userId: currentUser.id,
			}),
		);
		void dispatch(
			sectionStatusActions.getAllToCompare({
				courseId: Number(courseId),
				userId: Number(userId),
			}),
		);
		void dispatch(userActions.getById(Number(userId)));
	}, [courseId, currentUser.id, dispatch, userId]);

	if (isLoadingCourse) {
		return (
			<div className={styles["comparison-page"]}>
				<Loader color="orange" size="large" />
			</div>
		);
	}

	if (!course) {
		return null;
	}

	return (
		<div className={styles["comparison-page"]}>
			<Button
				className={styles["back-button"]}
				hasVisuallyHiddenLabel
				iconName="backArrow"
				label="Return back"
				onClick={handleGoBack}
				size="small"
			/>
			<div className={styles["content"]}>
				<h2 className={styles["title"]}>{course.title}</h2>
				<div className={styles["preview-container"]}>
					<Image
						alt="Course"
						className={styles["preview-image"]}
						src={course.image}
					/>
					<ProgressChart
						friendProgress={friendProgress}
						userProgress={userProgress}
					/>
				</div>
				<SectionComparison courseSections={courseSections} />
			</div>
		</div>
	);
};

export { CourseProgressComparison };
