import defaultAvatar from "~/assets/img/default-avatar.png";
import { Image, Link } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/enums.js";
import { configureString } from "~/libs/helpers/helpers.js";
import { type CommentWithRelationsResponseDto } from "~/modules/comments/comments.js";

import styles from "./styles.module.css";

type Properties = {
	comment: CommentWithRelationsResponseDto;
};

const CommentCard: React.FC<Properties> = ({ comment }: Properties) => {
	const { author, text, userId } = comment;

	const authorName =
		author.nickname ?? `${author.firstName} ${author.lastName}`;
	const authorAvatar = author.avatarUrl ?? defaultAvatar;
	const userLink = configureString(AppRoute.USERS_$ID, {
		id: String(userId),
	}) as typeof AppRoute.USERS_$ID;

	return (
		<div className={styles["comment-card"]}>
			<Link className={styles["avatar"]} to={userLink}>
				<Image
					alt="user-avatar"
					height="36"
					shape="circle"
					src={authorAvatar}
					width="36"
				/>
			</Link>
			<div className={styles["content"]}>
				<span className={styles["name"]}>{authorName}</span>
				<p className={styles["text"]}>{text}</p>
			</div>
		</div>
	);
};

export { CommentCard };
