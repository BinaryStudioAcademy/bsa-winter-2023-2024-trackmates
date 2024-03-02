import { DateValue, FormatDateType } from "~/libs/enums/enums.js";
import {
	getDifferenceInHours,
	getFormattedDate,
	getValidClassNames,
} from "~/libs/helpers/helpers.js";
import { type ChatMessageItemResponseDto } from "~/modules/chat-messages/chat-messages.js";

import styles from "./styles.module.css";

type Properties = {
	isCurrentUserSender: boolean;
	message: ChatMessageItemResponseDto;
};

const ChatMessage: React.FC<Properties> = ({
	isCurrentUserSender,
	message,
}: Properties) => {
	const { createdAt, senderUser, text } = message;

	const contsinerClassNmaes = getValidClassNames(
		styles["container"],
		styles[isCurrentUserSender ? "right" : "left"],
	);

	const sender = isCurrentUserSender
		? "You"
		: `${senderUser.firstName} ${senderUser.lastName}`;

	const date =
		getDifferenceInHours(createdAt) < DateValue.HOURS_IN_DAY
			? getFormattedDate(createdAt, FormatDateType.HH_MM)
			: getFormattedDate(createdAt, FormatDateType.DD_MM_YYYY);

	return (
		<li className={contsinerClassNmaes}>
			<div className={styles["sender-container"]}>
				<span className={styles["sender-name"]}>{sender}</span>
				<span className={styles["date"]}>{date}</span>
			</div>
			<div className={styles["message-container"]}>
				<span className={styles["message"]}>{text}</span>
			</div>
		</li>
	);
};

export { ChatMessage };
