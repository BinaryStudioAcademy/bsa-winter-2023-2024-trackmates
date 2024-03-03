import defaultAvatar from "~/assets/img/default-avatar.png";
import { Image, Link } from "~/libs/components/components.js";
import { AppRoute, DateValue, FormatDateType } from "~/libs/enums/enums.js";
import {
	configureString,
	getDifferenceInHours,
	getFormattedDate,
} from "~/libs/helpers/helpers.js";
import { type ChatGetAllItemResponseDto } from "~/modules/chats/chats.js";

import styles from "./styles.module.css";

type Properties = {
	chat: ChatGetAllItemResponseDto;
};

const ChatLink: React.FC<Properties> = ({ chat }: Properties) => {
	const { id, interlocutor, lastMessage } = chat;
	const chatRouteById = configureString(AppRoute.CHATS_$ID, {
		id: String(id),
	}) as typeof AppRoute.CHATS_$ID;

	const isLastMessagesYours = lastMessage.senderUser.id !== interlocutor.id;
	const date =
		getDifferenceInHours(lastMessage.createdAt) < DateValue.HOURS_IN_DAY
			? getFormattedDate(lastMessage.createdAt, FormatDateType.HH_MM)
			: getFormattedDate(lastMessage.createdAt, FormatDateType.DD_MM_YYYY);

	return (
		<Link className={styles["container"]} to={chatRouteById}>
			<Image
				alt="User avatar"
				height="48"
				shape="circle"
				src={interlocutor.avatarUrl ?? defaultAvatar}
				width="48"
			/>
			<div className={styles["text-container"]}>
				<div className={styles["top-container"]}>
					<span
						className={styles["name"]}
					>{`${interlocutor.firstName} ${interlocutor.lastName}`}</span>
					<span className={styles["date"]}>{date}</span>
				</div>
				<p className={styles["message"]}>
					{isLastMessagesYours ? `You: ${lastMessage.text}` : lastMessage.text}
				</p>
			</div>
		</Link>
	);
};

export { ChatLink };
