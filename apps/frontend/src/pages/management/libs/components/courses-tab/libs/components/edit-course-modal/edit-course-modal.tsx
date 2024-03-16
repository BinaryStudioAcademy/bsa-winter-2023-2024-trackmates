import { Button, Input, Modal } from "~/libs/components/components.js";
import { useAppForm, useCallback, useEffect } from "~/libs/hooks/hooks.js";
import {
	type CourseDto,
	type CourseUpdateRequestDto,
} from "~/modules/courses/courses.js";
import { courseUpdateValidationSchema } from "~/modules/courses/courses.js";

import styles from "./styles.module.css";

type Properties = {
	course: CourseDto | null;
	isOpen: boolean;
	onClose: () => void;
	onConfirm: (payload: CourseUpdateRequestDto) => void;
};

const EditCourseModal: React.FC<Properties> = ({
	course,
	isOpen,
	onClose,
	onConfirm,
}: Properties) => {
	const { control, errors, handleSubmit, reset } =
		useAppForm<CourseUpdateRequestDto>({
			defaultValues: {
				title: course?.title ?? "",
			},
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

	useEffect(() => {
		reset({ title: course?.title ?? "" });
	}, [reset, course]);

	return (
		<Modal
			className={styles["edit-modal"]}
			isCentered
			isOpen={isOpen}
			onClose={onClose}
		>
			<span className={styles["title"]}>Edit course</span>
			<form className={styles["content"]} onSubmit={handleFormSubmit}>
				<div className={styles["input-fields"]}>
					<Input
						control={control}
						errors={errors}
						label="Title"
						name="title"
						placeholder="Course title"
					/>
				</div>
				<div className={styles["modal-footer"]}>
					<Button
						className={styles["button"]}
						label="Reset"
						onClick={handleReset}
						size="small"
						style="secondary"
					/>
					<Button
						className={styles["button"]}
						label="Confirm"
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
