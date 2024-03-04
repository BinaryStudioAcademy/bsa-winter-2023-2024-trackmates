import { type ValueOf } from "~/libs/types/types.js";
import {
	type ActivityResponseDto,
	type ActivityTypeValue,
} from "~/modules/activities/activities.js";

import { FeedActivity } from "../feed-activity/feed-activity.js";
import styles from "./styles.module.css";

type Properties = {
	activities: ActivityResponseDto<ValueOf<typeof ActivityTypeValue>>[];
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
