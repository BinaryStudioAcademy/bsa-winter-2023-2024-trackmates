import { Link } from "~/libs/components/components.js";
import { EMPTY_ARRAY_LENGTH } from "~/libs/constants/constants.js";
import { AppRoute } from "~/libs/enums/app-route.enum.js";
import { getValidClassNames } from "~/libs/helpers/helpers.js";
import { type ChatGetAllItemResponseDto } from "~/modules/chats/chats.js";

import { ChatLink } from "../chat-link/chat-link.js";
import { ChatSearchBar } from "../chat-search-bar/chat-search-bar.js";
import styles from "./styles.module.css";

type Properties = {
	chats: ChatGetAllItemResponseDto[];
	className?: string | undefined;
};

const ChatSidebar: React.FC<Properties> = ({
	chats,
	className,
}: Properties) => {
	const hasChats = chats.length > EMPTY_ARRAY_LENGTH;

	const chatsStyles = getValidClassNames(styles["container"], className);

	return (
		<>
			<div className={chatsStyles}>
				<div className={styles["search-container"]}>
					<ChatSearchBar />
				</div>
				<ul className={styles["chats"]}>
					{hasChats &&
						chats.map((item) => {
							return (
								<li className={styles["chats-item"]} key={item.id}>
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
