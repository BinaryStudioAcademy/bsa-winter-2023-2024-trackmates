import defaultAvatar from "~/assets/img/default-avatar.png";
import { Button, Image } from "~/libs/components/components.js";
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
};

const FeedActivity: React.FC<Properties> = ({ activity }: Properties) => {
	const dispatch = useAppDispatch();
	const [isCommentsOpen, setIsCommentsOpen] = useState<boolean>(false);

	const handleCommentsToggle = useCallback(() => {
		setIsCommentsOpen((isCommentsOpen) => !isCommentsOpen);
	}, []);

	const handleLike = useCallback(() => {
		void dispatch(activitiesActions.likeActivity(activity.id));
	}, [dispatch, activity.id]);

	return (
		<article className={styles["card"]}>
			<div className={styles["card-content"]}>
				<div className={styles["card-content-wrapper"]}>
					<Image
						alt="User avatar"
						className={styles["card-photo"]}
						src={activity.user.avatarUrl ?? defaultAvatar}
					/>
				</div>
				<div className={styles["card-content-wrapper"]}>
					<div className={styles["card-info"]}>
						{getActivityTitle(activity)}
					</div>
				</div>
			</div>
			<div className={styles["toolbar"]}>
				<div className={styles["tool-container"]}>
					<span className={styles["tool-count"]}>{activity.likesCount}</span>
					<Button
						className={styles["tool-button"]}
						iconName="like"
						label="Like"
						onClick={handleLike}
					/>
				</div>
				<div className={styles["tool-container"]}>
					<span className={styles["tool-count"]}>{activity.commentCount}</span>
					<Button
						className={styles["tool-button"]}
						iconName="comment"
						label="Comment"
						onClick={handleCommentsToggle}
					/>
				</div>
			</div>
			<div
				className={getValidClassNames(
					styles["comments-container"],
					isCommentsOpen && styles["open"],
				)}
			>
				<ActivityComments activityId={activity.id} />
			</div>
		</article>
	);
};

export { FeedActivity };
