import {
	useAppDispatch,
	useAppSelector,
	useCallback,
	useEffect,
	useLocation,
	useParams,
} from "~/libs/hooks/hooks.js";
import {
	type MessageCreateRequestDto,
	actions as chatMessagesActions,
} from "~/modules/chat-messages/chat-messages.js";
import { actions as chatsActions } from "~/modules/chats/chats.js";

import { Chat, ChatSidebar, EmptyChat } from "./libs/components/components.js";
import { DEFAULT_MESSAGE_PAYLOAD } from "./libs/constants/constants.js";
import styles from "./styles.module.css";

const Chats: React.FC = () => {
	const dispatch = useAppDispatch();
	const { id } = useParams<{ id: string }>();
	const { search } = useLocation();
	const queryParameters = new URLSearchParams(search);
	const userId = queryParameters.get("user");

	const { chats, currentMessages, interlocutor } = useAppSelector(
		({ chatMessages, chats }) => ({
			chats: chats.chats,
			currentMessages: chatMessages.currentMessages,
			interlocutor: chats.interlocutor,
		}),
	);

	useEffect(() => {
		void dispatch(chatsActions.getAllChats());

		return () => {
			dispatch(chatsActions.leaveChat());
			dispatch(chatMessagesActions.updateMessages([]));
		};
	}, [dispatch]);

	useEffect(() => {
		if (id) {
			void dispatch(chatsActions.getChat(Number(id)));
		}
		if (userId) {
			void dispatch(chatsActions.createChat(Number(userId)));
		}
	}, [dispatch, id, userId]);

	const onSubmit = useCallback(
		(payload: typeof DEFAULT_MESSAGE_PAYLOAD): void => {
			if (id) {
				const messagePayload: MessageCreateRequestDto = {
					text: payload.message,
					chatId: Number(id),
				};

				void dispatch(chatMessagesActions.sendMessage(messagePayload));
				void dispatch(chatsActions.getChat(Number(id)));
				void dispatch(chatsActions.getAllChats());
			}
		},
		[dispatch, id],
	);

	return (
		<div className={styles["container"]}>
			<h2 className={styles["title"]}>Chats</h2>
			<div className={styles["chat-container"]}>
				<ChatSidebar chats={chats} />
				{id && interlocutor ? (
					<Chat
						messages={currentMessages}
						onSubmit={onSubmit}
						receiver={interlocutor}
					/>
				) : (
					<EmptyChat />
				)}
			</div>
		</div>
	);
};

export { Chats };
