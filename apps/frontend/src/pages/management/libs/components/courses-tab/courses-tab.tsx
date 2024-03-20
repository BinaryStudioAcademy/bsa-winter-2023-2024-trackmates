import { Loader } from "~/libs/components/components.js";
import { DataStatus } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppSelector,
	useCallback,
	useEffect,
	useState,
} from "~/libs/hooks/hooks.js";
import {
	type CourseDto,
	type CourseUpdateRequestDto,
	actions as coursesActions,
} from "~/modules/courses/courses.js";

import { ManagementDialogueMessage } from "../../enums/enums.js";
import { ConfirmationModal } from "../confirmation-modal/confirmation-modal.js";
import { TableRow } from "../table/libs/components/components.js";
import { Table } from "../table/table.js";
import {
	CourseColumns,
	EditCourseModal,
} from "./libs/components/components.js";
import { COURSES_TABLE_HEADERS } from "./libs/constants/constants.js";
import styles from "./styles.module.css";

const CoursesTab: React.FC = () => {
	const dispatch = useAppDispatch();

	const { courseToDataStatus, courses, isCoursesLoading } = useAppSelector(
		(state) => {
			return {
				courseToDataStatus: state.courses.courseToDataStatus,
				courses: state.courses.allCourses,
				isCoursesLoading:
					state.courses.allCoursesDataStatus === DataStatus.PENDING,
			};
		},
	);

	const [currentCourse, setCurrentCourse] = useState<CourseDto | null>(null);

	const [isConfirmationModalOpen, setIsConfirmationModalOpen] =
		useState<boolean>(false);

	const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);

	useEffect(() => {
		void dispatch(coursesActions.getAll());
	}, [dispatch]);

	const handleCloseConfirmationModal = useCallback(() => {
		setIsConfirmationModalOpen(false);
		setCurrentCourse(null);
	}, []);

	const handleCourseDelete = useCallback(
		(courseId: number) => {
			return () => {
				void dispatch(coursesActions.deleteById(courseId));
				handleCloseConfirmationModal();
			};
		},
		[dispatch, handleCloseConfirmationModal],
	);

	const handleCloseEditModal = useCallback(() => {
		setCurrentCourse(null);
		setIsEditModalOpen(false);
	}, []);

	const handleConfirmUpdate = useCallback(
		(payload: CourseUpdateRequestDto) => {
			void dispatch(
				coursesActions.update({
					id: currentCourse?.id as number,
					payload,
				}),
			);
			handleCloseEditModal();
		},
		[currentCourse, dispatch, handleCloseEditModal],
	);

	return (
		<>
			<div className={styles["container"]}>
				{isCoursesLoading ? (
					<Loader color="orange" size="large" />
				) : (
					<div className={styles["table-container"]}>
						<Table headers={COURSES_TABLE_HEADERS}>
							{courses.map((course) => {
								return (
									<TableRow key={course.id}>
										<CourseColumns
											course={course}
											isLoading={
												courseToDataStatus[course.id as number] ===
												DataStatus.PENDING
											}
											onSetCurrentCourse={setCurrentCourse}
											onSetIsConfirmationModalOpen={setIsConfirmationModalOpen}
											onSetIsEditModalOpen={setIsEditModalOpen}
										/>
									</TableRow>
								);
							})}
						</Table>
					</div>
				)}
			</div>
			<EditCourseModal
				course={currentCourse}
				isOpen={isEditModalOpen}
				onClose={handleCloseEditModal}
				onConfirm={handleConfirmUpdate}
			/>
			<ConfirmationModal
				isOpen={isConfirmationModalOpen}
				onCancel={handleCloseConfirmationModal}
				onClose={handleCloseConfirmationModal}
				onConfirm={handleCourseDelete(currentCourse?.id as number)}
				title={`${ManagementDialogueMessage.DELETE_COURSE} "${currentCourse?.title}"?`}
			/>
		</>
	);
};

export { CoursesTab };
