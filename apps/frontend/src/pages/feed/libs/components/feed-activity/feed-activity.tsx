import { Image } from "~/libs/components/components.js";
import { DEFAULT_USER_AVATAR } from "~/libs/constants/constants.js";
import {
	type ActivityDto,
	type ActivityType,
} from "~/modules/activities/libs/types/types.js";

import styles from "./styles.module.css";

const getTitle = (activity: ActivityDto<ActivityType>): string => {
	const userFullName = `${activity.user.firstName} ${activity.user.lastName}`;
	const title = activity.payload.title;

	switch (activity.type) {
		case "FINISH_COURSE": {
			return `Course: ${userFullName} has finished course "${title}". Congratulate her(him)!`;
		}

		case "FINISH_SECTION": {
			return `Module:  ${userFullName} has finished module "${title}". Congratulate her(him)!`;
		}
	}
};

type Properties = {
	activity: ActivityDto<ActivityType>;
};

const FeedAction: React.FC<Properties> = ({ activity }: Properties) => {
	return (
		<article className={styles["card"]}>
			<div className={styles["card-content"]}>
				<div className={styles["card-content-wrapper"]}>
					<Image
						alt="User avatar"
						className={styles["card-photo"]}
						src={activity.user.avatarUrl ?? DEFAULT_USER_AVATAR}
					/>
				</div>
				<div className={styles["card-content-wrapper"]}>
					<div className={styles["card-info"]}>{getTitle(activity)}</div>
				</div>
			</div>
		</article>
	);
};

export { FeedAction };
