import { EmptyPagePlaceholder, Loader } from "~/libs/components/components.js";
import { EMPTY_LENGTH } from "~/libs/constants/constants.js";
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

	const { activities, dataStatus } = useAppSelector((state) => {
		return {
			activities: state.activities.activities,
			dataStatus: state.activities.dataStatus,
		};
	});
	const dispatch = useAppDispatch();

	useEffect(() => {
		void dispatch(actions.loadActivities());
	}, [dispatch]);

	const isLoading = dataStatus === DataStatus.PENDING;
	const hasActivities = activities.length > EMPTY_LENGTH;

	return (
		<div className={styles["wrapper"]}>
			<h2 className={styles["title"]}>Activities</h2>
			{isLoading ? (
				<Loader color="orange" size="large" />
			) : (
				<>
					{hasActivities ? (
						<FeedActivityList activities={activities} />
					) : (
						<EmptyPagePlaceholder
							size="large"
							title="There are no activities yet"
						/>
					)}
				</>
			)}
			<div className={styles["background"]} />
		</div>
	);
};

export { Feed };
