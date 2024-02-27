import { Image, Loader } from "~/libs/components/components.js";
import { DEFAULT_USER_AVATAR } from "~/libs/constants/constants.js";
import { type ChatMessageItemResponseDto } from "~/modules/chat-messages/chat-messages.js";
import { type UserAuthResponseDto } from "~/modules/users/users.js";

import { type DEFAULT_MESSAGE_PAYLOAD } from "../../constants/constants.js";
import { ChatBubble } from "../chat-bubble/chat-bubble.js";
import { ChatForm } from "../chat-form/chat-form.js";
import styles from "./styles.module.css";

type Properties = {
	isMessageLoading: boolean;
	messages: ChatMessageItemResponseDto[];
	onSubmit: (payload: typeof DEFAULT_MESSAGE_PAYLOAD) => Promise<void>;
	receiver: UserAuthResponseDto;
};

const Chat: React.FC<Properties> = ({
	isMessageLoading,
	messages,
	onSubmit,
	receiver,
}: Properties) => {
	return (
		<div className={styles["container"]}>
			<div className={styles["user-container"]}>
				<div className={styles["image-container"]}>
					<Image
						alt="User avatar"
						height="40"
						shape="circle"
						src={receiver.avatarUrl ?? DEFAULT_USER_AVATAR}
						width="40"
					/>
				</div>
				<span>{`${receiver.firstName} ${receiver.lastName}`}</span>
			</div>
			<ul className={styles["chat-container"]}>
				{messages.map((message) => (
					<ChatBubble
						isYouSender={receiver.id !== message.senderUser.id}
						key={message.id}
						messageData={message}
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
