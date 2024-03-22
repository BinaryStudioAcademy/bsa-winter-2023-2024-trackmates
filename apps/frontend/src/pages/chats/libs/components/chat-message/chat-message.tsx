import {
	DateValue,
	FormatDateType,
	MessageStatus,
} from "~/libs/enums/enums.js";
import {
	getDifferenceInHours,
	getFormattedDate,
	getValidClassNames,
} from "~/libs/helpers/helpers.js";
import { forwardRef, useEffect, useInView } from "~/libs/hooks/hooks.js";
import { type ChatMessageItemResponseDto } from "~/modules/chat-messages/chat-messages.js";

import styles from "./styles.module.css";

type Properties = {
	isCurrentUserSender: boolean;
	message: ChatMessageItemResponseDto;
	onRead: (messageId: number) => void;
};

const ChatMessage = forwardRef<HTMLElement, Properties>(
	({ isCurrentUserSender, message, onRead }: Properties, reference) => {
		const { createdAt, id, senderUser, status, text } = message;

		const { inView, ref: inViewReference } = useInView();
		const isRead = status === MessageStatus.READ;
		const isUnread = status === MessageStatus.UNREAD;

		useEffect(() => {
			if (!isRead && !isCurrentUserSender && inView) {
				onRead(id);
			}
		}, [inView, isCurrentUserSender, isRead, onRead, id]);

		const containerClassNames = getValidClassNames(
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
			<li className={containerClassNames} ref={inViewReference}>
				<div className={styles["sender-container"]}>
					<span className={styles["sender-name"]}>{sender}</span>
					<span className={styles["date"]}>{date}</span>
				</div>
				<div
					className={getValidClassNames(
						styles["message-container"],
						isUnread && styles["unread"],
						styles[isCurrentUserSender ? "right" : "left"],
					)}
				>
					<span className={styles["message"]}>{text}</span>
				</div>
				{reference && <span ref={reference} />}
			</li>
		);
	},
);

export { ChatMessage };
