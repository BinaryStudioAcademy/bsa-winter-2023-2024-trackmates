import defaultAvatar from "~/assets/img/default-avatar.png";
import {
	Button,
	Icon,
	Image,
	Link,
	Loader,
} from "~/libs/components/components.js";
import { START_INDEX } from "~/libs/components/content/libs/constants.js";
import { EMPTY_LENGTH, LAST_ARRAY_ITEM } from "~/libs/constants/constants.js";
import { AppRoute } from "~/libs/enums/enums.js";
import { getValidClassNames, initDebounce } from "~/libs/helpers/helpers.js";
import {
	useAppDispatch,
	useCallback,
	useEffect,
	useNavigate,
	useRef,
	useState,
} from "~/libs/hooks/hooks.js";
import { type ValueOf } from "~/libs/types/types.js";
import {
	type ChatMessageItemResponseDto,
	actions as chatMessageActions,
} from "~/modules/chat-messages/chat-messages.js";
import {
	type ChatItemResponseDto,
	actions as chatActions,
} from "~/modules/chats/chats.js";

import {
	type DEFAULT_MESSAGE_PAYLOAD,
	READ_CHAT_MESSAGE_DELAY_MS,
} from "../../constants/constants.js";
import { MessageItemOption } from "../../enums/enums.js";
import { prepareMessageItems } from "../../helpers/helpers.js";
import { ChatDate } from "../chat-date/chat-date.js";
import { ChatForm } from "../chat-form/chat-form.js";
import { ChatMessage } from "../chat-message/chat-message.js";
import styles from "./styles.module.css";

type Properties = {
	chat: ChatItemResponseDto;
	className?: string | undefined;
	isMessageLoading: boolean;
	onSubmit: (payload: typeof DEFAULT_MESSAGE_PAYLOAD) => void;
};

const Chat: React.FC<Properties> = ({
	chat,
	className,
	isMessageLoading,
	onSubmit,
}: Properties) => {
	const { id, interlocutor, messages } = chat;
	const [readChatMessageIds, setChatMessageIds] = useState<Set<number>>(
		new Set<number>(),
	);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const lastMessageReference = useRef<HTMLElement | null>(null);

	const handleRead = useCallback(
		(chatMessageId: number): void => {
			setChatMessageIds((previous) => {
				return new Set<number>(previous.add(chatMessageId));
			});
		},
		[setChatMessageIds],
	);

	const handleReadChatMessages = (): void => {
		setChatMessageIds(new Set<number>());

		void dispatch(
			chatMessageActions.setReadChatMessages({
				chatId: id,
				chatMessageIds: [...readChatMessageIds],
			}),
		);
	};

	const handleReadChatMessagesDebounced = initDebounce(
		handleReadChatMessages,
		READ_CHAT_MESSAGE_DELAY_MS,
	);

	useEffect(() => {
		if (readChatMessageIds.size > EMPTY_LENGTH) {
			handleReadChatMessagesDebounced();

			return () => {
				handleReadChatMessagesDebounced.clear();
			};
		}
	}, [readChatMessageIds, handleReadChatMessagesDebounced]);

	const handleClick = useCallback((): void => {
		navigate(AppRoute.CHATS);
		dispatch(chatActions.leaveChat());
	}, [navigate, dispatch]);

	useEffect(() => {
		lastMessageReference.current?.scrollIntoView({
			behavior: "smooth",
		});
	}, [messages.length, lastMessageReference]);

	const chatsStyles = getValidClassNames(styles["container"], className);
	const hasSubscription = Boolean(interlocutor.subscription);

	return (
		<div className={chatsStyles}>
			<div className={styles["nav-container"]}>
				<Button
					className={styles["back-button"]}
					hasVisuallyHiddenLabel
					iconClassName={styles["back-button-icon"]}
					iconName="backArrow"
					label="Back to overview"
					onClick={handleClick}
					size="small"
				/>

				<div className={styles["user-container"]}>
					<Link
						className={styles["image-container"]}
						to={`/users/${interlocutor.id}` as ValueOf<typeof AppRoute>}
					>
						<Image
							alt="User avatar"
							className={getValidClassNames(
								hasSubscription && styles["premium"],
							)}
							height="48"
							key={interlocutor.avatarUrl ?? defaultAvatar}
							shape="circle"
							src={interlocutor.avatarUrl ?? defaultAvatar}
							width="48"
						/>
						{hasSubscription && (
							<Icon className={styles["premium-icon"]} name="crown" />
						)}
					</Link>
					<span className={styles["full-name"]}>
						{interlocutor.firstName} {interlocutor.lastName}
					</span>
				</div>
			</div>
			<ul className={styles["chat-container"]}>
				{prepareMessageItems(messages).map((item, index) => {
					const message = item.value as ChatMessageItemResponseDto;

					return item.type === MessageItemOption.DATE ? (
						<ChatDate date={item.value as string} key={`date-${index}`} />
					) : (
						<ChatMessage
							isCurrentUserSender={interlocutor.id !== message.senderUser.id}
							key={message.id}
							message={message}
							onRead={handleRead}
							ref={index === START_INDEX ? lastMessageReference : undefined}
						/>
					);
				})}
				{messages.at(LAST_ARRAY_ITEM) && (
					<ChatDate
						date={
							(messages.at(LAST_ARRAY_ITEM) as ChatMessageItemResponseDto)
								.createdAt
						}
					/>
				)}
			</ul>
			{isMessageLoading && (
				<div className={styles["loader"]}>
					<Loader color="orange" size="small" />
				</div>
			)}
			<div className={styles["message-container"]}>
				<ChatForm onSubmit={onSubmit} />
			</div>
		</div>
	);
};

export { Chat };
