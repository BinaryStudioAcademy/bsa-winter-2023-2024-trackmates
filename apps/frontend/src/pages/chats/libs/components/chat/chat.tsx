import defaultAvatar from "~/assets/img/default-avatar.png";
import { Button, Image, Loader } from "~/libs/components/components.js";
import {
	LAST_ARRAY_ITEM,
	PREVIOUS_INDEX_OFFSET,
} from "~/libs/constants/constants.js";
import { checkIsDatePrecedesAnotherByOneDay } from "~/libs/helpers/helpers.js";
import { useAppDispatch, useCallback } from "~/libs/hooks/hooks.js";
import { type ChatMessageItemResponseDto } from "~/modules/chat-messages/chat-messages.js";
import { actions as chatActions } from "~/modules/chats/chats.js";
import { type UserAuthResponseDto } from "~/modules/users/users.js";

import { type DEFAULT_MESSAGE_PAYLOAD } from "../../constants/constants.js";
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
	const dispatch = useAppDispatch();

	const handleClick = useCallback((): void => {
		dispatch(chatActions.leaveChat());
	}, [dispatch]);

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
				{messages.flatMap((message, index) => {
					const components = [];
					const previousMessage = messages[index - PREVIOUS_INDEX_OFFSET];

					if (
						previousMessage &&
						checkIsDatePrecedesAnotherByOneDay(
							message.createdAt,
							previousMessage.createdAt,
						)
					) {
						components.push(
							<ChatDate
								date={previousMessage.createdAt}
								key={`date-${message.id}`}
							/>,
						);
					}

					components.push(
						<ChatMessage
							isCurrentUserSender={receiver.id !== message.senderUser.id}
							key={message.id}
							message={message}
						/>,
					);

					return components;
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
