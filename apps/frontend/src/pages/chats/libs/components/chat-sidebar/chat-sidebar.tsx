import { Link } from "~/libs/components/components.js";
import { AppRoute, EmptyLength } from "~/libs/enums/enums.js";
import { type ChatGetAllItemResponseDto } from "~/modules/chats/chats.js";

import { ChatLink } from "../chat-link/chat-link.js";
import { ChatSearchBar } from "../chat-search-bar/chat-search-bar.js";
import styles from "./styles.module.css";

type Properties = {
	chats: ChatGetAllItemResponseDto[];
};

const ChatSidebar: React.FC<Properties> = ({ chats }: Properties) => {
	const hasChats = chats.length > EmptyLength.ARRAY;

	return (
		<>
			<div className={styles["container"]}>
				<div className={styles["search-container"]}>
					<ChatSearchBar />
				</div>
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
			</div>
		</>
	);
};

export { ChatSidebar };
