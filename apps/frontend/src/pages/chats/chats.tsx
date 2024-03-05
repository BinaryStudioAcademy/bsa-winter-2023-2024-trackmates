import { Button } from "~/libs/components/components.js";
import { AppRoute, DataStatus } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppSelector,
	useCallback,
	useEffect,
	useLocation,
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
	const { search } = useLocation();
	const queryParameters = new URLSearchParams(search);
	const userId = queryParameters.get("user");

	const { chats, currentMessages, interlocutor, isMessageLoading } =
		useAppSelector(({ chatMessages, chats }) => ({
			chats: chats.chats,
			currentMessages: chatMessages.currentMessages,
			interlocutor: chats.interlocutor,
			isMessageLoading: chatMessages.dataStatus === DataStatus.PENDING,
		}));

	useEffect(() => {
		void dispatch(chatsActions.getAllChats({ search: "" }));

		return () => {
			dispatch(chatsActions.leaveChat());
			dispatch(chatMessagesActions.updateMessages([]));
		};
	}, [dispatch]);

	useEffect(() => {
		if (id && !Number.isNaN(Number(id))) {
			void dispatch(chatsActions.getChat(Number(id)));
		}

		if (userId) {
			void dispatch(chatsActions.createChat(Number(userId)));
		}
	}, [dispatch, id, userId]);

	const onSubmit = useCallback(
		async (payload: typeof DEFAULT_MESSAGE_PAYLOAD): Promise<void> => {
			if (id) {
				const messagePayload: ChatMessageCreateRequestDto = {
					chatId: Number(id),
					text: payload.message,
				};

				await dispatch(chatMessagesActions.sendMessage(messagePayload));
				void dispatch(chatsActions.getChat(Number(id)));
				void dispatch(chatsActions.getAllChats({ search: "" }));
			}
		},
		[dispatch, id],
	);

	return (
		<div className={styles["container"]}>
			<div className={styles["back-container"]}>
				<Button
					className={styles["back-button"]}
					hasVisuallyHiddenLabel
					href={AppRoute.FRIENDS}
					iconName="back"
					label="Back to friends"
					size="small"
				/>
				<span className={styles["subtitle"]}>Back to friends</span>
			</div>
			<h2 className={styles["title"]}>Chats</h2>
			<div className={styles["chat-container"]}>
				<ChatSidebar chats={chats} />
				{id && interlocutor ? (
					<Chat
						isMessageLoading={isMessageLoading}
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
