import { Image, Link } from "~/libs/components/components.js";
import { DEFAULT_USER_AVATAR } from "~/libs/constants/constants.js";
import { AppRoute } from "~/libs/enums/app-route.enum.js";
import { configureString, formatDate } from "~/libs/helpers/helpers.js";
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

	return (
		<Link className={styles["container"]} to={chatRouteById}>
			<Image
				alt="User avatar"
				height="48"
				shape="circle"
				src={interlocutor.avatarUrl ?? DEFAULT_USER_AVATAR}
				width="48"
			/>
			<div className={styles["text-container"]}>
				<div className={styles["top-container"]}>
					<span
						className={styles["name"]}
					>{`${interlocutor.firstName} ${interlocutor.lastName}`}</span>
					<span className={styles["date"]}>
						{formatDate(lastMessage.createdAt)}
					</span>
				</div>
				<p className={styles["message"]}>
					{isLastMessagesYours ? `You: ${lastMessage.text}` : lastMessage.text}
				</p>
			</div>
		</Link>
	);
};

export { ChatLink };
