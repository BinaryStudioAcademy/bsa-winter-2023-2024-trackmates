import { Button, Input } from "~/libs/components/components.js";
import { EventCode } from "~/libs/enums/enums.js";
import { useAppForm, useCallback } from "~/libs/hooks/hooks.js";
import { chatMessageValidationSchema } from "~/modules/chat-messages/chat-messages.js";

import { DEFAULT_MESSAGE_PAYLOAD } from "../../constants/constants.js";
import styles from "./styles.module.css";

type Properties = {
	onSubmit: (payload: typeof DEFAULT_MESSAGE_PAYLOAD) => void;
};

const ChatForm: React.FC<Properties> = ({ onSubmit }: Properties) => {
	const { control, errors, handleSubmit, reset } = useAppForm<
		typeof DEFAULT_MESSAGE_PAYLOAD
	>({
		defaultValues: DEFAULT_MESSAGE_PAYLOAD,
		validationSchema: chatMessageValidationSchema,
	});

	const handleFormSubmit = useCallback(
		(event_: React.BaseSyntheticEvent): void => {
			void handleSubmit(onSubmit)(event_);
			reset();
		},
		[handleSubmit, onSubmit, reset],
	);

	const handleKeyDown = useCallback(
		(_event: React.KeyboardEvent): void => {
			if (_event.code == EventCode.ENTER && !_event.shiftKey) {
				_event.preventDefault();
				handleFormSubmit(_event);
			}
		},
		[handleFormSubmit],
	);

	return (
		<form
			autoComplete="off"
			className={styles["form"]}
			onSubmit={handleFormSubmit}
		>
			<Input
				className={styles["textarea"]}
				control={control}
				errors={errors}
				hasVisuallyHiddenLabel
				label="Send a message"
				name="message"
				onKeyDown={handleKeyDown}
				rows={1}
			/>
			<Button
				className={styles["icon"]}
				hasVisuallyHiddenLabel
				iconName="message"
				label="Send a message"
				type="submit"
			/>
		</form>
	);
};

export { ChatForm };
