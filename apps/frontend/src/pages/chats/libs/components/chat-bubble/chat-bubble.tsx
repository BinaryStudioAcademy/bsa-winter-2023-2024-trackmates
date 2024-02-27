import { formatDate, getValidClassNames } from "~/libs/helpers/helpers.js";
import { useAppSelector } from "~/libs/hooks/hooks.js";
import { type ChatMessageItemResponseDto } from "~/modules/chat-messages/chat-messages.js";

import styles from "./styles.module.css";

type Properties = {
	messageData: ChatMessageItemResponseDto;
};

const ChatBubble: React.FC<Properties> = ({ messageData }: Properties) => {
	const { createdAt, senderUser, text } = messageData;
	const { user } = useAppSelector(({ auth }) => ({
		user: auth.user,
	}));

	const contsinerClassNmaes =
		senderUser.id === user?.id
			? getValidClassNames(styles["container"], styles["right"])
			: getValidClassNames(styles["container"], styles["left"]);

	const sender =
		senderUser.id === user?.id
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
