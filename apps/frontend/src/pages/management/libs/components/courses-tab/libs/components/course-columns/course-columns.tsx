import { Button } from "~/libs/components/components.js";
import { useCallback } from "~/libs/hooks/hooks.js";
import { type CourseDto } from "~/modules/courses/courses.js";
import { TableCell } from "~/pages/management/libs/components/table/table.jsx";

import styles from "./styles.module.css";

type Properties = {
	course: CourseDto;
	deletingIsLoading: boolean;
	editingIsLoading: boolean;
	setCurrentCourse: (course: CourseDto) => void;
	setIsConfirmationModalOpen: (isOpen: boolean) => void;
	setIsEditModalOpen: (isOpen: boolean) => void;
};

const CourseColumns: React.FC<Properties> = ({
	course,
	deletingIsLoading,
	editingIsLoading,
	setCurrentCourse,
	setIsConfirmationModalOpen,
	setIsEditModalOpen,
}: Properties) => {
	const handleEditButtonClick = useCallback(() => {
		setCurrentCourse(course);
		setIsEditModalOpen(true);
	}, [course, setCurrentCourse, setIsEditModalOpen]);

	const handleDeleteButtonClick = useCallback(() => {
		setCurrentCourse(course);
		setIsConfirmationModalOpen(true);
	}, [course, setCurrentCourse, setIsConfirmationModalOpen]);

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
