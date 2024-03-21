import {
	EmptyPagePlaceholder,
	Loader,
	Pagination,
} from "~/libs/components/components.js";
import {
	EMPTY_LENGTH,
	PAGINATION_PAGES_CUT_COUNT,
} from "~/libs/constants/constants.js";
import { AppTitle, DataStatus, PaginationValue } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppSelector,
	useAppTitle,
	useEffect,
	usePagination,
} from "~/libs/hooks/hooks.js";
import { actions } from "~/modules/activities/activities.js";

import { FeedActivityList } from "./libs/components/components.js";
import styles from "./styles.module.css";

const Feed: React.FC = () => {
	useAppTitle(AppTitle.ACTIVITIES);

	const { activities, dataStatus, totalCount } = useAppSelector((state) => {
		return {
			activities: state.activities.activities,
			dataStatus: state.activities.dataStatus,
			totalCount: state.activities.totalCount,
		};
	});
	const dispatch = useAppDispatch();

	const { page, pages, pagesCount } = usePagination({
		pageSize: PaginationValue.DEFAULT_COUNT,
		pagesCutCount: PAGINATION_PAGES_CUT_COUNT,
		totalCount,
	});

	useEffect(() => {
		void dispatch(
			actions.loadActivities({
				count: PaginationValue.DEFAULT_COUNT,
				page,
			}),
		);
	}, [dispatch, page]);

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
						<div className={styles["content-container"]}>
							<FeedActivityList activities={activities} />
							<Pagination
								currentPage={page}
								pages={pages}
								pagesCount={pagesCount}
							/>
						</div>
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
