import { Image, Link } from "~/libs/components/components.js";
import { DEFAULT_USER_AVATAR } from "~/libs/constants/constants.js";
import { AppRoute } from "~/libs/enums/app-route.enum.js";
import {
	configureString,
	createQueryLink,
	formatDate,
} from "~/libs/helpers/helpers.js";
import { type ChatItemResponseDto } from "~/modules/chat-message/chat-message.js";

import styles from "./styles.module.css";

type Properties = {
	chat: ChatItemResponseDto;
};

const ChatLink: React.FC<Properties> = ({ chat }: Properties) => {
	const { id, interlocutor, lastMessage } = chat;
	const chatRouteById = configureString(AppRoute.CHATS_$ID, {
		id: String(id),
	}) as typeof AppRoute.CHATS_$ID;
	const chatRouteWithUser = createQueryLink(
		chatRouteById,
		"user",
		String(interlocutor.id),
	) as typeof AppRoute.CHATS_$ID;

	return (
		<Link className={styles["container"]} to={chatRouteWithUser}>
			<Image
				alt="User avatar"
				height="48"
				shape="circle"
				src={DEFAULT_USER_AVATAR}
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
				<p className={styles["message"]}>{lastMessage.message}</p>
			</div>
		</Link>
	);
};

export { ChatLink };
