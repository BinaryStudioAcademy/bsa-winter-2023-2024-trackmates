import { Link } from "~/libs/components/components.js";
import { ARRAY_EMPTY_LENGTH } from "~/libs/constants/constants.js";
import { AppRoute } from "~/libs/enums/app-route.enum.js";
import { type ChatGetAllItemResponseDto } from "~/modules/chats/chats.js";

import { ChatLink } from "../chat-link/chat-link.js";
import styles from "./styles.module.css";

type Properties = {
	chats: ChatGetAllItemResponseDto[];
};

const ChatSidebar: React.FC<Properties> = ({ chats }: Properties) => {
	return (
		<ul className={styles["chats"]}>
			{Boolean(chats) && chats.length > ARRAY_EMPTY_LENGTH ? (
				chats.map((item) => {
					return (
						<li key={item.chatId}>
							<ChatLink chat={item} />
						</li>
					);
				})
			) : (
				<p className={styles["empty-chat-list"]}>
					There are no chats yet.{" "}
					<Link className={styles["link"]} to={AppRoute.FRIENDS}>
						Create new one.
					</Link>
				</p>
			)}
		</ul>
	);
};

export { ChatSidebar };