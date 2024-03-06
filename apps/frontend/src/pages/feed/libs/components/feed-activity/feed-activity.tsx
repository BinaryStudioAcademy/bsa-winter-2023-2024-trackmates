import defaultAvatar from "~/assets/img/default-avatar.png";
import { Button, Image } from "~/libs/components/components.js";
import { type ValueOf } from "~/libs/types/types.js";
import {
	type ActivityResponseDto,
	type ActivityType,
	getActivityTitle,
} from "~/modules/activities/activities.js";

import styles from "./styles.module.css";

type Properties = {
	activity: ActivityResponseDto<ValueOf<typeof ActivityType>>;
};

const FeedActivity: React.FC<Properties> = ({ activity }: Properties) => {
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
					<span className={styles["tool-count"]}>{activity.commentCount}</span>
					<Button
						className={styles["tool-button"]}
						iconName="comment"
						label="Comment"
						onClick={() => {}}
					/>
				</div>
			</div>
		</article>
	);
};

export { FeedActivity };
