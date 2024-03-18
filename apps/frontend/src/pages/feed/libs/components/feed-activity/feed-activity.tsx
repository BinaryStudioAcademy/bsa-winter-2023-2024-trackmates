import defaultAvatar from "~/assets/img/default-avatar.png";
import { Button, Image, Link } from "~/libs/components/components.js";
import { type AppRoute } from "~/libs/enums/enums.js";
import { getValidClassNames } from "~/libs/helpers/helpers.js";
import { useAppDispatch, useCallback, useState } from "~/libs/hooks/hooks.js";
import { type ValueOf } from "~/libs/types/types.js";
import {
	type ActivityResponseDto,
	type ActivityType,
	getActivityTitle,
} from "~/modules/activities/activities.js";
import { actions as activitiesActions } from "~/modules/activities/activities.js";

import { ActivityComments } from "../activity-comments/activity-comments.js";
import styles from "./styles.module.css";

type Properties = {
	activity: ActivityResponseDto<ValueOf<typeof ActivityType>>;
	userId: number;
};

const FeedActivity: React.FC<Properties> = ({
	activity,
	userId,
}: Properties) => {
	const dispatch = useAppDispatch();
	const [isCommentsOpen, setIsCommentsOpen] = useState<boolean>(false);

	const handleCommentsToggle = useCallback(() => {
		setIsCommentsOpen((isCommentsOpen) => !isCommentsOpen);
	}, []);

	const handleLike = useCallback(() => {
		void dispatch(activitiesActions.likeActivity(activity.id));
	}, [dispatch, activity.id]);

	const likeButtonClasses = getValidClassNames(
		styles["tool-button"],
		activity.isLikedByUser && styles["liked"],
	);

	const commentButtonClasses = getValidClassNames(
		styles["tool-button"],
		isCommentsOpen && styles["comments-active"],
	);

	const avatarLink =
		activity.user.id === userId ? "/" : `/users/${activity.user.id}`;

	return (
		<article className={styles["card"]}>
			<div className={styles["card-content-wrapper"]}>
				<Link to={avatarLink as ValueOf<typeof AppRoute>}>
					<Image
						alt="User avatar"
						className={styles["card-photo"]}
						src={activity.user.avatarUrl ?? defaultAvatar}
					/>
				</Link>
			</div>
			<div className={styles["card-content"]}>
				<div>
					<h3 className={styles["activity-title"]}>
						{activity.user.firstName} {activity.user.lastName}
					</h3>
					<p className={styles["card-info"]}>
						{getActivityTitle(activity, userId)}
					</p>
				</div>
				<div className={styles["toolbar"]}>
					<div className={styles["tool-container"]}>
						<span className={styles["tool-count"]}>{activity.likesCount}</span>
						<Button
							className={likeButtonClasses}
							iconName="like"
							label="Like"
							onClick={handleLike}
						/>
					</div>
					<div className={styles["tool-container"]}>
						<span className={styles["tool-count"]}>
							{activity.commentCount}
						</span>
						<Button
							className={commentButtonClasses}
							iconName="comment"
							label="Comment"
							onClick={handleCommentsToggle}
						/>
					</div>
				</div>
			</div>
			<div
				className={getValidClassNames(
					styles["comments-container"],
					isCommentsOpen && styles["open"],
				)}
			>
				{isCommentsOpen && <ActivityComments activityId={activity.id} />}
			</div>
		</article>
	);
};

export { FeedActivity };
