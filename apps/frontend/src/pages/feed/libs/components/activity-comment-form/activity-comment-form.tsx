import { Button, Input } from "~/libs/components/components.js";
import { useAppForm, useCallback } from "~/libs/hooks/hooks.js";
import { type CommentCreateRequestDto } from "~/modules/comments/comments.js";
import { commentTextValidationSchema } from "~/modules/comments/comments.js";

import styles from "./styles.module.css";

type Properties = {
	isLoading: boolean;
	onSubmit: (payload: Pick<CommentCreateRequestDto, "text">) => void;
};

const ActivityCommentForm: React.FC<Properties> = ({
	isLoading,
	onSubmit,
}: Properties) => {
	const { control, errors, handleSubmit, reset } = useAppForm({
		defaultValues: {
			text: "",
		},
		validationSchema: commentTextValidationSchema,
	});

	const handleCreateComment = useCallback(
		(event_: React.BaseSyntheticEvent): void => {
			void handleSubmit(onSubmit)(event_);
			reset();
		},
		[reset, handleSubmit, onSubmit],
	);

	return (
		<form
			autoComplete="off"
			className={styles["form"]}
			onSubmit={handleCreateComment}
		>
			<Input
				className={styles["input"]}
				control={control}
				errors={errors}
				hasVisuallyHiddenLabel
				label="Enter your comment here.."
				name="text"
			/>
			<Button
				className={styles["icon"]}
				hasVisuallyHiddenLabel
				iconName="message"
				isDisabled={isLoading}
				label="Send a comment"
				type="submit"
			/>
		</form>
	);
};

export { ActivityCommentForm };
