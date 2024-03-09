import { EmptyPagePlaceholder, Loader } from "~/libs/components/components.js";
import { EMPTY_ARRAY_LENGTH } from "~/libs/constants/constants.js";
import { AppTitle, DataStatus } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppSelector,
	useAppTitle,
	useEffect,
} from "~/libs/hooks/hooks.js";
import { actions } from "~/modules/activities/activities.js";

import { FeedActivityList } from "./libs/components/components.js";
import styles from "./styles.module.css";

const Feed: React.FC = () => {
	useAppTitle(AppTitle.ACTIVITIES);

	const { activities, dataStatus } = useAppSelector(
		(state) => state.activities,
	);
	const dispatch = useAppDispatch();

	useEffect(() => {
		void dispatch(actions.loadActivities());
	}, [dispatch]);

	const isLoading = dataStatus === DataStatus.PENDING;
	const hasActivities = activities.length > EMPTY_ARRAY_LENGTH;

	return (
		<div className={styles["wrapper"]}>
			<h2 className={styles["title"]}>Friends Activity Feed</h2>
			{isLoading ? (
				<Loader color="orange" size="large" />
			) : (
				<>
					{hasActivities ? (
						<FeedActivityList activities={activities} />
					) : (
						<EmptyPagePlaceholder title="There are no activities yet" />
					)}
				</>
			)}
		</div>
	);
};

export { Feed };
