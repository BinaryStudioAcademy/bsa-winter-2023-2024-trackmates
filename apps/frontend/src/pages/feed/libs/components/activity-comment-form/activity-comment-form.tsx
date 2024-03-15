import { Button, Input } from "~/libs/components/components.js";
import { checkIfMessageIsTooLong } from "~/libs/helpers/helpers.js";
import { useAppForm, useCallback } from "~/libs/hooks/hooks.js";
import { type CommentCreateRequestDto } from "~/modules/comments/comments.js";
import { commentTextValidationSchema } from "~/modules/comments/comments.js";

import { DEFAULT_COMMENT_PAYLOAD } from "../../constants/constants.js";
import styles from "./styles.module.css";

type Properties = {
	isLoading: boolean;
	onSubmit: (payload: Pick<CommentCreateRequestDto, "text">) => void;
};

const ActivityCommentForm: React.FC<Properties> = ({
	isLoading,
	onSubmit,
}: Properties) => {
	const { control, errors, handleSubmit, reset, watch } = useAppForm({
		defaultValues: DEFAULT_COMMENT_PAYLOAD,
		validationSchema: commentTextValidationSchema,
	});

	const handleCreateComment = useCallback(
		(event_: React.BaseSyntheticEvent): void => {
			void handleSubmit(onSubmit)(event_);

			try {
				const text = watch("text");
				commentTextValidationSchema.parse({ text });
			} catch (error) {
				if (checkIfMessageIsTooLong(error)) {
					return;
				}
			}

			reset();
		},
		[reset, handleSubmit, onSubmit, watch],
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
