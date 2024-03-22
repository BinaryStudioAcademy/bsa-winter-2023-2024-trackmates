import { EmptyPagePlaceholder, Loader } from "~/libs/components/components.js";
import { EMPTY_LENGTH } from "~/libs/constants/constants.js";
import { AppTitle, DataStatus, PaginationValue } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppSelector,
	useAppTitle,
	useCallback,
	useEffect,
	useState,
} from "~/libs/hooks/hooks.js";
import { actions } from "~/modules/activities/activities.js";

import { FeedActivityList } from "./libs/components/components.js";
import styles from "./styles.module.css";

const Feed: React.FC = () => {
	useAppTitle(AppTitle.ACTIVITIES);

	const [page, setPage] = useState<number>(PaginationValue.DEFAULT_PAGE);
	const { activities, dataStatus, totalCount } = useAppSelector((state) => {
		return {
			activities: state.activities.activities,
			dataStatus: state.activities.dataStatus,
			totalCount: state.activities.totalCount,
		};
	});
	const dispatch = useAppDispatch();

	useEffect(() => {
		void dispatch(
			actions.loadActivities({
				count: PaginationValue.DEFAULT_COUNT,
				page,
			}),
		);
	}, [dispatch, page]);

	const isLoading =
		dataStatus === DataStatus.PENDING && page === PaginationValue.DEFAULT_PAGE;
	const isLoadingMore =
		dataStatus === DataStatus.PENDING && page !== PaginationValue.DEFAULT_PAGE;
	const hasActivities = activities.length > EMPTY_LENGTH;

	const handleIncreasePage = useCallback(() => {
		setPage((previous) => previous + PaginationValue.DEFAULT_STEP);
	}, []);

	return (
		<div className={styles["wrapper"]}>
			<h2 className={styles["title"]}>Activities</h2>
			{isLoading ? (
				<Loader color="orange" size="large" />
			) : (
				<>
					{hasActivities ? (
						<FeedActivityList
							activities={activities}
							handleIncreasePage={handleIncreasePage}
							isLoadingMore={isLoadingMore}
							totalCount={totalCount}
						/>
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
