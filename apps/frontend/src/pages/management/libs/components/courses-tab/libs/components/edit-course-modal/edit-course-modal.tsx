import { Button, Input, Modal } from "~/libs/components/components.js";
import { useAppForm, useCallback } from "~/libs/hooks/hooks.js";
import { type CourseDto } from "~/modules/courses/courses.js";
import { courseUpdateValidationSchema } from "~/modules/courses/courses.js";

import styles from "./styles.module.css";

type Properties = {
	course: CourseDto;
	onClose: () => void;
	onConfirm: (payload: CourseDto) => void;
};

const EditCourseModal: React.FC<Properties> = ({
	course,
	onClose,
	onConfirm,
}: Properties) => {
	const { control, errors, handleSubmit, reset } = useAppForm<CourseDto>({
		defaultValues: course,
		validationSchema: courseUpdateValidationSchema,
	});

	const handleFormSubmit = useCallback(
		(event_: React.BaseSyntheticEvent): void => {
			void handleSubmit(onConfirm)(event_);
		},
		[handleSubmit, onConfirm],
	);

	const handleReset = useCallback(() => {
		reset();
	}, [reset]);

	return (
		<Modal
			centered
			className={styles["edit-modal"]}
			isOpen
			onClose={onClose}
			size="small"
		>
			<span className={styles["title"]}>Edit course</span>
			<form className={styles["content"]} onSubmit={handleFormSubmit}>
				<div className={styles["input-fields"]}>
					<Input control={control} errors={errors} label="Title" name="title" />
				</div>
				<div className={styles["modal-footer"]}>
					<Button
						className={styles["button"]}
						label="Cancel"
						onClick={handleReset}
						size="small"
						style="secondary"
					/>
					<Button
						className={styles["button"]}
						label="OK"
						size="small"
						style="primary"
						type="submit"
					/>
				</div>
			</form>
		</Modal>
	);
};

export { EditCourseModal };
