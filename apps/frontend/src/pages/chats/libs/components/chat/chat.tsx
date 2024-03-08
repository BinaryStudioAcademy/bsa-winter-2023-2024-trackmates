import defaultAvatar from "~/assets/img/default-avatar.png";
import { Button, Image, Loader } from "~/libs/components/components.js";
import { LAST_ARRAY_ITEM } from "~/libs/constants/constants.js";
import { AppRoute } from "~/libs/enums/enums.js";
import { useCallback, useNavigate } from "~/libs/hooks/hooks.js";
import { type ChatMessageItemResponseDto } from "~/modules/chat-messages/chat-messages.js";
import { type UserAuthResponseDto } from "~/modules/users/users.js";

import { type DEFAULT_MESSAGE_PAYLOAD } from "../../constants/constants.js";
import { MessageItemOption } from "../../enums/message-item-option.enum.js";
import { prepareMessageItems } from "../../helpers/prepare-message-items.helper.js";
import { ChatDate } from "../chat-date/chat-date.js";
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
	const navigate = useNavigate();

	const handleClick = useCallback((): void => {
		navigate(AppRoute.CHATS);
	}, [navigate]);

	return (
		<div className={styles["container"]}>
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
					<div className={styles["image-container"]}>
						<Image
							alt="User avatar"
							height="48"
							shape="circle"
							src={receiver.avatarUrl ?? defaultAvatar}
							width="48"
						/>
					</div>
					<span
						className={styles["full-name"]}
					>{`${receiver.firstName} ${receiver.lastName}`}</span>
				</div>
			</div>
			<ul className={styles["chat-container"]}>
				{prepareMessageItems(messages).map((item, index) => {
					const message = item.value as ChatMessageItemResponseDto;

					return item.type === MessageItemOption.DATE ? (
						<ChatDate date={item.value as string} key={`date-${index}`} />
					) : (
						<ChatMessage
							isCurrentUserSender={receiver.id !== message.senderUser.id}
							key={message.id}
							message={message}
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
