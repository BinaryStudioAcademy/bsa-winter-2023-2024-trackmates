import { Button } from "~/libs/components/components.js";
import { useCallback } from "~/libs/hooks/hooks.js";
import { type CourseDto } from "~/modules/courses/courses.js";
import { TableCell } from "~/pages/management/libs/components/table/table.jsx";

import styles from "./styles.module.css";

type Properties = {
	course: CourseDto;
	deletingIsLoading: boolean;
	editingIsLoading: boolean;
	onSetCurrentCourse: (course: CourseDto) => void;
	onSetIsConfirmationModalOpen: (isOpen: boolean) => void;
	onSetIsEditModalOpen: (isOpen: boolean) => void;
};

const CourseColumns: React.FC<Properties> = ({
	course,
	deletingIsLoading,
	editingIsLoading,
	onSetCurrentCourse,
	onSetIsConfirmationModalOpen,
	onSetIsEditModalOpen,
}: Properties) => {
	const handleEditButtonClick = useCallback(() => {
		onSetCurrentCourse(course);
		onSetIsEditModalOpen(true);
	}, [course, onSetCurrentCourse, onSetIsEditModalOpen]);

	const handleDeleteButtonClick = useCallback(() => {
		onSetCurrentCourse(course);
		onSetIsConfirmationModalOpen(true);
	}, [course, onSetCurrentCourse, onSetIsConfirmationModalOpen]);

	return (
		<>
			<TableCell isCentered>{course.id}</TableCell>
			<TableCell>{course.title}</TableCell>
			<TableCell isCentered>{course.vendor.name}</TableCell>
			<TableCell isCroppedText width="narrow">
				{course.description}
			</TableCell>
			<TableCell isCentered width="narrow">
				<Button
					className={styles["icon-button"]}
					hasVisuallyHiddenLabel
					iconName="edit"
					isDisabled={deletingIsLoading}
					isLoading={editingIsLoading}
					label="Edit"
					loaderColor="orange"
					onClick={handleEditButtonClick}
				/>
				<Button
					className={styles["icon-button"]}
					hasVisuallyHiddenLabel
					iconName="delete"
					isDisabled={editingIsLoading}
					isLoading={deletingIsLoading}
					label="Delete"
					loaderColor="orange"
					onClick={handleDeleteButtonClick}
				/>
			</TableCell>
		</>
	);
};

export { CourseColumns };
