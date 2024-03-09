import { Loader } from "~/libs/components/components.js";
import { DataStatus } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppSelector,
	useEffect,
} from "~/libs/hooks/hooks.js";
import { actions } from "~/modules/activities/activities.js";

import { FeedActivityList } from "./libs/components/components.js";
import styles from "./styles.module.css";

const Feed: React.FC = () => {
	const { activities, dataStatus } = useAppSelector(
		(state) => state.activities,
	);
	const dispatch = useAppDispatch();

	useEffect(() => {
		void dispatch(actions.loadActivities());
	}, [dispatch]);

	const isLoading = dataStatus === DataStatus.PENDING;

	return (
		<div className={styles["wrapper"]}>
			<h2 className={styles["title"]}>Friends Activity Feed</h2>
			{isLoading ? (
				<Loader color="orange" size="large" />
			) : (
				<FeedActivityList activities={activities} />
			)}
		</div>
	);
};

export { Feed };
