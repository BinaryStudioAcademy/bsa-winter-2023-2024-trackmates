import { Button, Input } from "~/libs/components/components.js";
import { useAppForm, useCallback } from "~/libs/hooks/hooks.js";
import { chatMessageValidationSchema } from "~/modules/chat-messages/chat-messages.js";

import { DEFAULT_MESSAGE_PAYLOAD } from "../../constants/constants.js";
import styles from "./styles.module.css";

type Properties = {
	onSubmit: (payload: typeof DEFAULT_MESSAGE_PAYLOAD) => Promise<void>;
};

const ChatForm: React.FC<Properties> = ({ onSubmit }: Properties) => {
	const { control, handleSubmit, reset } = useAppForm<
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

	return (
		<form className={styles["form"]} onSubmit={handleFormSubmit}>
			<Input className={styles["input"]} control={control} name="message" />
			<Button
				className={styles["icon"]}
				hasVisuallyHiddenLabel
				iconName="message"
				label="sent-message"
				type="submit"
			/>
		</form>
	);
};

export { ChatForm };
