import defaultAvatar from "~/assets/img/default-avatar.png";
import { Button, Icon, Image, Link } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/enums.js";
import { configureString, getValidClassNames } from "~/libs/helpers/helpers.js";
import { useAppSelector, useCallback } from "~/libs/hooks/hooks.js";
import { type CommentWithRelationsResponseDto } from "~/modules/comments/comments.js";
import { type UserAuthResponseDto } from "~/modules/users/users.js";

import styles from "./styles.module.css";

type Properties = {
	comment: CommentWithRelationsResponseDto;
	hasSubscription: boolean;
	onDelete: (activityId: number, commentId: number) => void;
};

const CommentCard: React.FC<Properties> = ({
	comment,
	hasSubscription,
	onDelete,
}: Properties) => {
	const { user } = useAppSelector(({ auth }) => {
		return {
			user: auth.user as UserAuthResponseDto,
		};
	});

	const { activityId, author, id: commentId, text, userId } = comment;

	const authorName =
		author.nickname ?? `${author.firstName} ${author.lastName}`;
	const authorAvatar = author.avatarUrl ?? defaultAvatar;
	const userLink = configureString(AppRoute.USERS_$ID, {
		id: String(userId),
	}) as typeof AppRoute.USERS_$ID;

	const handleDeleteComment = useCallback(() => {
		onDelete(activityId, commentId);
	}, [activityId, commentId, onDelete]);

	const isCreator = user.id === userId;

	return (
		<div className={styles["comment-card"]}>
			<Link className={styles["avatar"]} to={userLink}>
				<Image
					alt="user-avatar"
					className={getValidClassNames(hasSubscription && styles["premium"])}
					height="36"
					shape="circle"
					src={authorAvatar}
					width="36"
				/>
				{hasSubscription && (
					<Icon className={styles["premium-icon"]} name="crown" />
				)}
			</Link>
			<div className={styles["content"]}>
				<Link className={styles["name"]} to={userLink}>
					{authorName}
				</Link>
				<p className={styles["text"]}>{text}</p>
			</div>
			{isCreator && (
				<Button
					className={styles["delete-button"]}
					hasVisuallyHiddenLabel
					iconName="cross"
					label="Delete"
					onClick={handleDeleteComment}
					size="small"
					style="plain"
				/>
			)}
		</div>
	);
};

export { CommentCard };
