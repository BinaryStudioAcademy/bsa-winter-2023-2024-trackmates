import { Loader } from "~/libs/components/components.js";
import { DataStatus } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppSelector,
	useEffect,
} from "~/libs/hooks/hooks.js";
import { actions } from "~/modules/feed/feed.js";

import { FeedActionList } from "./libs/components/components.js";
import styles from "./styles.module.css";

const Feed: React.FC = () => {
	const { dataStatus, friendsActions } = useAppSelector((state) => state.feed);
	const dispatch = useAppDispatch();

	useEffect(() => {
		void dispatch(actions.loadFeed());
	}, [dispatch]);

	const isLoading = dataStatus === DataStatus.PENDING;

	return (
		<div className={styles["wrapper"]}>
			<h2>Friends Activity Feed</h2>
			{isLoading ? (
				<Loader color="orange" size="large" />
			) : (
				<FeedActionList actions={friendsActions} />
			)}
		</div>
	);
};

export { Feed };
