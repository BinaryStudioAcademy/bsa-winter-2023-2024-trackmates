import { ARRAY_EMPTY_LENGTH } from "~/libs/constants/constants.js";
import { AppRoute } from "~/libs/enums/app-route.enum.js";
import { configureString } from "~/libs/helpers/helpers.js";
import {
	useAppDispatch,
	useAppSelector,
	useCallback,
	useEffect,
	useLocation,
	useNavigate,
	useParams,
} from "~/libs/hooks/hooks.js";
import {
	type MessageSendRequestDto,
	actions as chatActions,
} from "~/modules/chat/chat.js";

import { Chat, ChatSidebar, EmptyChat } from "./libs/components/components.js";
import { DEFAULT_MESSAGE_PAYLOAD } from "./libs/constants/constants.js";
import styles from "./styles.module.css";

const receiver = {
	createdAt: "",
	email: "",
	firstName: "FirstName",
	id: 1,
	lastName: "LastName",
	updatedAt: "",
};

const Chats: React.FC = () => {
	const dispatch = useAppDispatch();
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const { search } = useLocation();
	const queryParameters = new URLSearchParams(search);
	const userId = queryParameters.get("user");
	const { chats, messages } = useAppSelector(({ chat }) => ({
		chats: chat.chats,
		messages: chat.currentMessages,
	}));

	const isValidChatId = useCallback(
		(id: string): boolean => {
			return Boolean(id) && chats.some((element) => element.id === id);
		},
		[chats],
	);

	const navigateToNewChat = useCallback(() => {
		const chatId = messages[ARRAY_EMPTY_LENGTH]?.chatId;
		if (chatId) {
			const chatRouteById = configureString(AppRoute.CHATS_$ID, {
				id: String(chatId),
			});
			const chatRouteWithUser =
				`${chatRouteById}?user=${userId}` as typeof AppRoute.CHATS_$ID;
			navigate(chatRouteWithUser);
		}
	}, [navigate, userId, messages]);

	useEffect(() => {
		void dispatch(chatActions.getAllChats());
	}, [dispatch]);

	useEffect(() => {
		if (isValidChatId(String(id))) {
			void dispatch(chatActions.getAllMessages(String(id)));
		}
	}, [dispatch, id, isValidChatId, chats]);

	const onSubmit = useCallback(
		(payload: typeof DEFAULT_MESSAGE_PAYLOAD): void => {
			const messagePayload: MessageSendRequestDto = {
				message: payload.message,
				receiverId: Number(userId),
			};
			void dispatch(chatActions.sendMessage(messagePayload));
			if (!isValidChatId(String(id))) {
				navigateToNewChat();
			}
		},
		[dispatch, id, isValidChatId, navigateToNewChat, userId],
	);

	return (
		<div className={styles["container"]}>
			<h2 className={styles["title"]}>Chats</h2>
			<div className={styles["chat-container"]}>
				<ChatSidebar chats={chats} />
				{chats.length === ARRAY_EMPTY_LENGTH ? (
					<EmptyChat />
				) : (
					<Chat messages={messages} onSubmit={onSubmit} receiver={receiver} />
				)}
			</div>
		</div>
	);
};

export { Chats };
