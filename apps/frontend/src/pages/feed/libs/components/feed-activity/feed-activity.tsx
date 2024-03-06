import defaultAvatar from "~/assets/img/default-avatar.png";
import { Button, Image } from "~/libs/components/components.js";
import { useAppDispatch, useCallback } from "~/libs/hooks/hooks.js";
import { type ValueOf } from "~/libs/types/types.js";
import {
	type ActivityResponseDto,
	type ActivityType,
	getActivityTitle,
} from "~/modules/activities/activities.js";
import { actions as activitiesActions } from "~/modules/activities/activities.js";

import styles from "./styles.module.css";

type Properties = {
	activity: ActivityResponseDto<ValueOf<typeof ActivityType>>;
};

const FeedActivity: React.FC<Properties> = ({ activity }: Properties) => {
	const dispatch = useAppDispatch();

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
			</div>
		</article>
	);
};

export { FeedActivity };
