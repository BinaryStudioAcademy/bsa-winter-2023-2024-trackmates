import { Button } from "~/libs/components/components.js";
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
import { CoursesTableHeader } from "./libs/enums/enums.js";
import { coursesHeaderToColumnName } from "./libs/maps/maps.js";
import styles from "./styles.module.css";

const CoursesTab: React.FC = () => {
	const dispatch = useAppDispatch();

	const { courses } = useAppSelector((state) => {
		return {
			courses: state.management.courses,
		};
	});

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
					id: String(currentCourse?.id),
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
						label={CoursesTableHeader.BUTTONS}
						onClick={handleOpenEditModal(course)}
					/>
					<Button
						className={styles["icon-button"]}
						hasVisuallyHiddenLabel
						iconName="delete"
						label={CoursesTableHeader.BUTTONS}
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

	const tableHeaders = [
		CoursesTableHeader.ID,
		CoursesTableHeader.TITLE,
		CoursesTableHeader.VENDOR,
		CoursesTableHeader.DESCRIPTION,
		CoursesTableHeader.BUTTONS,
	];

	return (
		<>
			<div className={styles["container"]}>
				<div className={styles["table-container"]}>
					<Table headers={tableHeaders}>
						{tableData.map((data) => {
							return (
								<TableRow key={data.id}>
									<TableCell isCentered>
										{data[coursesHeaderToColumnName[CoursesTableHeader.ID]]}
									</TableCell>
									<TableCell>
										{data[coursesHeaderToColumnName[CoursesTableHeader.TITLE]]}
									</TableCell>
									<TableCell isCentered>
										{data[coursesHeaderToColumnName[CoursesTableHeader.VENDOR]]}
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
