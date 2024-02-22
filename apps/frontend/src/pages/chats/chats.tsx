import {
	useAppDispatch,
	useAppSelector,
	useCallback,
	useEffect,
	useLocation,
	useParams,
} from "~/libs/hooks/hooks.js";
import {
	type MessageSendRequestDto,
	actions as chatMessageActions,
} from "~/modules/chat-message/chat-message.js";

import { Chat, ChatSidebar, EmptyChat } from "./libs/components/components.js";
import { DEFAULT_MESSAGE_PAYLOAD } from "./libs/constants/constants.js";
import styles from "./styles.module.css";

const receiver = {
	createdAt: "2024-02-18T15:55:25.409Z",
	email: "test1@gmail.com",
	firstName: "Anna",
	id: 2,
	lastName: "Maksai",
	updatedAt: "2024-02-18T15:55:25.409Z",
};

const Chats: React.FC = () => {
	const dispatch = useAppDispatch();
	const { id } = useParams<{ id: string }>();
	const { search } = useLocation();
	const queryParameters = new URLSearchParams(search);
	const userId = queryParameters.get("user");

	const { chats, currentMessages } = useAppSelector(({ chatMessage }) => ({
		chats: chatMessage.chats,
		currentMessages: chatMessage.currentMessages,
	}));

	const isId = Boolean(id);
	const isUser = Boolean(userId);

	useEffect(() => {
		if (isId) {
			void dispatch(chatMessageActions.getAllChats());
		}
	}, [dispatch, isId]);

	useEffect(() => {
		if (isId) {
			void dispatch(chatMessageActions.getAllMessages(String(id)));
		}
	}, [dispatch, id, isId, chats]);

	const onSubmit = useCallback(
		(payload: typeof DEFAULT_MESSAGE_PAYLOAD): void => {
			const messagePayload: MessageSendRequestDto = {
				message: payload.message,
				receiverId: Number(userId),
			};

			if (isId) {
				void dispatch(chatMessageActions.sendMessage(messagePayload));
			} else {
				void dispatch(chatMessageActions.createChat(messagePayload));
			}
		},
		[dispatch, isId, userId],
	);

	return (
		<div className={styles["container"]}>
			<h2 className={styles["title"]}>Chats</h2>
			<div className={styles["chat-container"]}>
				<ChatSidebar chats={chats} />
				{isId && isUser ? (
					<Chat
						messages={currentMessages}
						onSubmit={onSubmit}
						receiver={receiver}
					/>
				) : (
					<EmptyChat />
				)}
			</div>
		</div>
	);
};

export { Chats };
