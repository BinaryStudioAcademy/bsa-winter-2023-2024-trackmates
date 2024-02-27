import { formatDate, getValidClassNames } from "~/libs/helpers/helpers.js";
import { type ChatMessageItemResponseDto } from "~/modules/chat-messages/chat-messages.js";

import styles from "./styles.module.css";

type Properties = {
	isYouSender: boolean;
	messageData: ChatMessageItemResponseDto;
};

const ChatBubble: React.FC<Properties> = ({
	isYouSender,
	messageData,
}: Properties) => {
	const { createdAt, senderUser, text } = messageData;

	const contsinerClassNmaes = isYouSender
		? getValidClassNames(styles["container"], styles["right"])
		: getValidClassNames(styles["container"], styles["left"]);

	const sender = isYouSender
		? "You"
		: `${senderUser.firstName} ${senderUser.lastName}`;

	return (
		<li className={contsinerClassNmaes}>
			<div className={styles["sender-container"]}>
				<span className={styles["sender-name"]}>{sender}</span>
				<span className={styles["date"]}>{formatDate(createdAt)}</span>
			</div>
			<div className={styles["message-container"]}>
				<span className={styles["message"]}>{text}</span>
			</div>
		</li>
	);
};

export { ChatBubble };
