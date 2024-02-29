import {
	type ActivityDto,
	type ActivityType,
} from "~/modules/activities/libs/types/types.js";

import { FeedAction } from "../feed-activity/feed-activity.js";
import styles from "./styles.module.css";

type Properties = {
	activities: ActivityDto<ActivityType>[];
};

const FeedActivityList: React.FC<Properties> = ({ activities }: Properties) => {
	return (
		<div className={styles["feed"]}>
			{activities.map((activity) => (
				<FeedAction activity={activity} key={activity.id} />
			))}
		</div>
	);
};

export { FeedActivityList };
