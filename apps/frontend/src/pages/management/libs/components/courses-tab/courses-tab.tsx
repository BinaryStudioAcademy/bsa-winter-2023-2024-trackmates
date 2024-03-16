import { Button, Loader } from "~/libs/components/components.js";
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
import { TableCell, TableRow } from "../table/libs/components/components.js";
import { Table } from "../table/table.js";
import { EditCourseModal } from "./libs/components/components.js";
import { COURSES_TABLE_HEADERS } from "./libs/constants/constants.js";
import { CoursesTableHeader } from "./libs/enums/enums.js";
import { coursesHeaderToColumnName } from "./libs/maps/maps.js";
import styles from "./styles.module.css";

const CoursesTab: React.FC = () => {
	const dispatch = useAppDispatch();

	const { courseToDataStatus, courses, isCoursesLoading } = useAppSelector(
		(state) => {
			return {
				courseToDataStatus: state.management.courseToDataStatus,
				courses: state.management.courses,
				isCoursesLoading:
					state.management.coursesDataStatus === DataStatus.PENDING,
			};
		},
	);

	const [currentCourse, setCurrentCourse] = useState<CourseDto | null>(null);

	const [isConfirmationModalOpen, setConfirmationModalOpen] =
		useState<boolean>(false);

	const [isEditModalOpen, setEditModalOpen] = useState<boolean>(false);

	useEffect(() => {
		void dispatch(coursesActions.getAll());
	}, [dispatch]);

	const handleOpenConfirmationModal = useCallback((course: CourseDto) => {
		return () => {
			setCurrentCourse(course);
			setConfirmationModalOpen(true);
		};
	}, []);

	const handleCloseConfirmationModal = useCallback(() => {
		setConfirmationModalOpen(false);
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

	const handleOpenEditModal = useCallback((course: CourseDto) => {
		return () => {
			setCurrentCourse(course);
			setEditModalOpen(true);
		};
	}, []);

	const handleCloseEditModal = useCallback(() => {
		setCurrentCourse(null);
		setEditModalOpen(false);
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

	const tableData = courses.map((course) => {
		return {
			buttons: (
				<div className={styles["column-buttons"]}>
					<Button
						className={styles["icon-button"]}
						hasVisuallyHiddenLabel
						iconName="edit"
						isLoading={
							courseToDataStatus[course.id as number]?.updateDataStatus ===
							DataStatus.PENDING
						}
						label={CoursesTableHeader.BUTTONS}
						loaderColor="orange"
						onClick={handleOpenEditModal(course)}
					/>
					<Button
						className={styles["icon-button"]}
						hasVisuallyHiddenLabel
						iconName="delete"
						isLoading={
							courseToDataStatus[course.id as number]?.deleteDataStatus ===
							DataStatus.PENDING
						}
						label={CoursesTableHeader.BUTTONS}
						loaderColor="orange"
						onClick={handleOpenConfirmationModal(course)}
					/>
				</div>
			),
			description: course.description,
			id: course.id,
			title: course.title,
			vendor: course.vendor.name,
		};
	});

	return (
		<>
			<div className={styles["container"]}>
				<div className={styles["table-container"]}>
					{isCoursesLoading ? (
						<Loader color="orange" size="large" />
					) : (
						<Table headers={COURSES_TABLE_HEADERS}>
							{tableData.map((data) => {
								return (
									<TableRow key={data.id}>
										<TableCell isCentered>
											{data[coursesHeaderToColumnName[CoursesTableHeader.ID]]}
										</TableCell>
										<TableCell>
											{
												data[
													coursesHeaderToColumnName[CoursesTableHeader.TITLE]
												]
											}
										</TableCell>
										<TableCell isCentered>
											{
												data[
													coursesHeaderToColumnName[CoursesTableHeader.VENDOR]
												]
											}
										</TableCell>
										<TableCell hasLongText width="narrow">
											{
												data[
													coursesHeaderToColumnName[
														CoursesTableHeader.DESCRIPTION
													]
												]
											}
										</TableCell>
										<TableCell isCentered width="narrow">
											{
												data[
													coursesHeaderToColumnName[CoursesTableHeader.BUTTONS]
												]
											}
										</TableCell>
									</TableRow>
								);
							})}
						</Table>
					)}
				</div>
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
