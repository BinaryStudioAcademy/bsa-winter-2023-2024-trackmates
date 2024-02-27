import { type FeedActionDto } from "~/modules/feed/libs/types/types.js";

import { FeedAction } from "../feed-action/feed-action.js";
import styles from "./styles.module.css";

type Properties = {
	actions: FeedActionDto[];
};

const FeedActionList: React.FC<Properties> = ({ actions }: Properties) => {
	return (
		<div className={styles["feed"]}>
			{actions.map((action) => (
				<FeedAction action={action} key={`feed-action-${action.id}`} />
			))}
		</div>
	);
};

export { FeedActionList };
