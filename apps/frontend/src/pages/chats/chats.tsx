import { AppTitle, DataStatus, EmptyLength } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppSelector,
	useAppTitle,
	useCallback,
	useEffect,
	useParams,
} from "~/libs/hooks/hooks.js";
import {
	type ChatMessageCreateRequestDto,
	actions as chatMessagesActions,
} from "~/modules/chat-messages/chat-messages.js";
import { actions as chatsActions } from "~/modules/chats/chats.js";

import { Chat, ChatSidebar, EmptyChat } from "./libs/components/components.js";
import { type DEFAULT_MESSAGE_PAYLOAD } from "./libs/constants/constants.js";
import styles from "./styles.module.css";

const Chats: React.FC = () => {
	const dispatch = useAppDispatch();
	const { id } = useParams<{ id: string }>();

	const { chats, currentChat, isMessageLoading } = useAppSelector(
		({ chatMessages, chats }) => ({
			chats: chats.chats,
			currentChat: chats.currentChat,
			isMessageLoading: chatMessages.dataStatus === DataStatus.PENDING,
		}),
	);

	useAppTitle(AppTitle.CHATS);

	useEffect(() => {
		void dispatch(chatsActions.getAllChats({ search: "" }));

		return () => {
			dispatch(chatsActions.leaveChat());
		};
	}, [dispatch]);

	useEffect(() => {
		if (id && !Number.isNaN(Number(id))) {
			void dispatch(chatsActions.getChat(Number(id)));
		}
	}, [dispatch, id]);

	const onSubmit = useCallback(
		(payload: typeof DEFAULT_MESSAGE_PAYLOAD): void => {
			if (payload.message.trim().length === EmptyLength.STRING) {
				return;
			}

			if (id) {
				const messagePayload: ChatMessageCreateRequestDto = {
					chatId: Number(id),
					text: payload.message,
				};

				void dispatch(chatMessagesActions.sendMessage(messagePayload));
			}
		},
		[dispatch, id],
	);

	return (
		<div className={styles["container"]}>
			<h2 className={styles["title"]}>Chats</h2>
			<div className={styles["chat-container"]}>
				<ChatSidebar chats={chats} />
				{id && currentChat ? (
					<Chat
						isMessageLoading={isMessageLoading}
						messages={currentChat.messages}
						onSubmit={onSubmit}
						receiver={currentChat.interlocutor}
					/>
				) : (
					<EmptyChat />
				)}
			</div>
		</div>
	);
};

export { Chats };
