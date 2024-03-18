import { useAppSelector } from "~/libs/hooks/hooks.js";
import { type ValueOf } from "~/libs/types/types.js";
import {
	type ActivityResponseDto,
	type ActivityType,
} from "~/modules/activities/activities.js";
import { type UserAuthResponseDto } from "~/modules/auth/auth.js";

import { FeedActivity } from "../feed-activity/feed-activity.js";
import styles from "./styles.module.css";

type Properties = {
	activities: ActivityResponseDto<ValueOf<typeof ActivityType>>[];
};

const FeedActivityList: React.FC<Properties> = ({ activities }: Properties) => {
	const { user } = useAppSelector(({ auth }) => {
		return {
			user: auth.user as UserAuthResponseDto,
		};
	});

	return (
		<div className={styles["feed"]}>
			{activities.map((activity) => (
				<FeedActivity activity={activity} key={activity.id} userId={user.id} />
			))}
		</div>
	);
};

export { FeedActivityList };
