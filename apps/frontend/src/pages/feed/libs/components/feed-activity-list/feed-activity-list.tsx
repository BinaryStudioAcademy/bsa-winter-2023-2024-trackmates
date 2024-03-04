import {
	type ActivityResponseDto,
	type ActivityType,
} from "~/modules/activities/libs/types/types.js";

import { FeedActivity } from "../feed-activity/feed-activity.js";
import styles from "./styles.module.css";

type Properties = {
	activities: ActivityResponseDto<ActivityType>[];
};

const FeedActivityList: React.FC<Properties> = ({ activities }: Properties) => {
	return (
		<div className={styles["feed"]}>
			{activities.map((activity) => (
				<FeedActivity activity={activity} key={activity.id} />
			))}
		</div>
	);
};

export { FeedActivityList };
