import friendImage from "~/assets/img/friend.jpeg"; //TODO
import { Image } from "~/libs/components/components.js";
import {
	type ActivityActionMap,
	type ActivityDto,
	type ActivityType,
} from "~/modules/activities/libs/types/types.js";

import styles from "./styles.module.css";

// todo  open-close principe
const getTitle = (activity: ActivityDto<ActivityType>): string => {
	const userFullName = `${activity.user.firstName} ${activity.user.lastName}`;

	switch (activity.type) {
		case "FINISH_COURSE": {
			const action = activity.action as ActivityActionMap["FINISH_COURSE"];

			return `Course: ${userFullName} has finished course "${action.title}". Congratulate her(him)!`;
		}

		case "FINISH_SECTION": {
			const action = activity.action as ActivityActionMap["FINISH_SECTION"];

			return `Module:  ${userFullName} has finished module "${action.title}". Congratulate her(him)!`;
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
				<Image
					alt="User avatar"
					className={styles["card-photo"]}
					src={activity.user.avatarUrl || friendImage} //TODO
				/>
				<div className={styles["card-info"]}>
					<p className={styles["card-info-title"]}>{getTitle(activity)}</p>
				</div>
			</div>
		</article>
	);
};

export { FeedAction };
