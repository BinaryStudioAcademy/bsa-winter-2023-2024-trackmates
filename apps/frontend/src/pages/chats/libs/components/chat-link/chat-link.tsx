import defaultAvatar from "~/assets/img/default-avatar.png";
import { Icon, Image, Link } from "~/libs/components/components.js";
import { AppRoute, DateValue, FormatDateType } from "~/libs/enums/enums.js";
import {
	configureString,
	getDifferenceInHours,
	getFormattedDate,
	getValidClassNames,
} from "~/libs/helpers/helpers.js";
import { useAppSelector } from "~/libs/hooks/hooks.js";
import { type ChatGetAllItemResponseDto } from "~/modules/chats/chats.js";

import { UnreadMessageCountConstraint } from "../../enums/enums.js";
import styles from "./styles.module.css";

type Properties = {
	chat: ChatGetAllItemResponseDto;
	isReducible: boolean;
};

const ChatLink: React.FC<Properties> = ({ chat, isReducible }: Properties) => {
	const { currentChat } = useAppSelector(({ chats }) => ({
		currentChat: chats.currentChat,
	}));
	const { id, interlocutor, lastMessage, unreadMessageCount } = chat;
	const chatRouteById = configureString(AppRoute.CHATS_$ID, {
		id: String(id),
	}) as typeof AppRoute.CHATS_$ID;

	const isLastMessagesYours = lastMessage.senderUser.id !== interlocutor.id;
	const date =
		getDifferenceInHours(lastMessage.createdAt) < DateValue.HOURS_IN_DAY
			? getFormattedDate(lastMessage.createdAt, FormatDateType.HH_MM)
			: getFormattedDate(lastMessage.createdAt, FormatDateType.DD_MM_YYYY);

	const isCurrentChat = currentChat?.id === id;
	const hasUnreadMessages =
		unreadMessageCount > UnreadMessageCountConstraint.NONE_DISPLAY_UNREAD_COUNT;
	const hasSubscription = Boolean(interlocutor.subscription);

	return (
		<Link
			className={getValidClassNames(
				styles["container"],
				isCurrentChat && styles["current"],
				isReducible && styles["reducible"],
			)}
			to={chatRouteById}
		>
			<div className={styles["avatar"]}>
				<Image
					alt="User avatar"
					className={getValidClassNames(hasSubscription && styles["premium"])}
					height="48"
					shape="circle"
					src={interlocutor.avatarUrl ?? defaultAvatar}
					width="48"
				/>
				{hasSubscription && (
					<Icon className={styles["premium-icon"]} name="crown" />
				)}
			</div>
			<div className={styles["text-container"]}>
				<div className={styles["message-container"]}>
					<span
						className={styles["name"]}
					>{`${interlocutor.firstName} ${interlocutor.lastName}`}</span>

					<p className={styles["message"]}>
						{isLastMessagesYours && (
							<span className={styles["your-message"]}>You: </span>
						)}
						{lastMessage.text}
					</p>
				</div>

				<div className={styles["date-and-counter-container"]}>
					<span className={styles["date"]}>{date}</span>
					{hasUnreadMessages && (
						<span className={styles["counter"]}>
							{unreadMessageCount >
							UnreadMessageCountConstraint.MAXIMUM_DISPLAY_UNREAD_COUNT
								? `${UnreadMessageCountConstraint.MAXIMUM_DISPLAY_UNREAD_COUNT}+`
								: unreadMessageCount}
						</span>
					)}
				</div>
			</div>
		</Link>
	);
};

export { ChatLink };
