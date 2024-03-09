import defaultAvatar from "~/assets/img/default-avatar.png";
import { Image, Loader } from "~/libs/components/components.js";
import { EMPTY_ARRAY_LENGTH } from "~/libs/constants/constants.js";
import { initDebounce } from "~/libs/helpers/helpers.js";
import {
	useAppDispatch,
	useCallback,
	useEffect,
	useState,
} from "~/libs/hooks/hooks.js";
import {
	type ChatMessageItemResponseDto,
	actions as chatMessageActions,
} from "~/modules/chat-messages/chat-messages.js";
import { type UserAuthResponseDto } from "~/modules/users/users.js";

import {
	type DEFAULT_MESSAGE_PAYLOAD,
	READ_CHAT_MESSAGE_DELAY_MS,
} from "../../constants/constants.js";
import { ChatForm } from "../chat-form/chat-form.js";
import { ChatMessage } from "../chat-message/chat-message.js";
import styles from "./styles.module.css";

type Properties = {
	isMessageLoading: boolean;
	messages: ChatMessageItemResponseDto[];
	onSubmit: (payload: typeof DEFAULT_MESSAGE_PAYLOAD) => void;
	receiver: UserAuthResponseDto;
};

const Chat: React.FC<Properties> = ({
	isMessageLoading,
	messages,
	onSubmit,
	receiver,
}: Properties) => {
	const [readChatMessageIds, setChatMessageIds] = useState<Set<number>>(
		new Set<number>(),
	);
	const dispatch = useAppDispatch();

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
				chatMessageIds: [...readChatMessageIds],
			}),
		);
	};

	const handleReadChatMessagesDebounced = initDebounce(
		handleReadChatMessages,
		READ_CHAT_MESSAGE_DELAY_MS,
	);

	useEffect(() => {
		if (readChatMessageIds.size > EMPTY_ARRAY_LENGTH) {
			handleReadChatMessagesDebounced();

			return () => {
				handleReadChatMessagesDebounced.clear();
			};
		}
	}, [readChatMessageIds, handleReadChatMessagesDebounced]);

	return (
		<div className={styles["container"]}>
			<div className={styles["user-container"]}>
				<div className={styles["image-container"]}>
					<Image
						alt="User avatar"
						height="40"
						shape="circle"
						src={receiver.avatarUrl ?? defaultAvatar}
						width="40"
					/>
				</div>
				<span>{`${receiver.firstName} ${receiver.lastName}`}</span>
			</div>
			<ul className={styles["chat-container"]}>
				{messages.map((message) => (
					<ChatMessage
						isCurrentUserSender={receiver.id !== message.senderUser.id}
						key={message.id}
						message={message}
						onRead={handleRead}
					/>
				))}
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
