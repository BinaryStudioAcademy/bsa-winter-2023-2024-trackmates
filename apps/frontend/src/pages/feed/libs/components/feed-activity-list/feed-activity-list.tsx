import { Loader } from "~/libs/components/components.js";
import { useAppSelector, useInfiniteScroll } from "~/libs/hooks/hooks.js";
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
	handleIncreasePage: () => void;
	isLoadingMore: boolean;
	totalCount: number;
};

const FeedActivityList: React.FC<Properties> = ({
	activities,
	handleIncreasePage,
	isLoadingMore,
	totalCount,
}: Properties) => {
	const { user } = useAppSelector(({ auth }) => {
		return {
			user: auth.user as UserAuthResponseDto,
		};
	});

	const loaderElementReference = useInfiniteScroll({
		isLoading: isLoadingMore,
		loadMore: handleIncreasePage,
	});

	const hasAllBeenLoaded = activities.length === totalCount;

	return (
		<div className={styles["feed"]}>
			{activities.map((activity) => (
				<FeedActivity activity={activity} key={activity.id} userId={user.id} />
			))}

			{!hasAllBeenLoaded && (
				<div ref={loaderElementReference}>
					{isLoadingMore && <Loader color="orange" size="large" />}
				</div>
			)}
		</div>
	);
};

export { FeedActivityList };
