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
	const hasChats = Boolean(chats) && chats.length > ARRAY_EMPTY_LENGTH;

	return (
		<ul className={styles["chats"]}>
			{hasChats &&
				chats.map((item) => {
					return (
						<li key={item.id}>
							<ChatLink chat={item} />
						</li>
					);
				})}
			{!hasChats && (
				<li>
					<p className={styles["empty-chat-list"]}>
						There are no chats yet.{" "}
						<Link className={styles["link"]} to={AppRoute.FRIENDS}>
							Create new one.
						</Link>
					</p>
				</li>
			)}
		</ul>
	);
};

export { ChatSidebar };
