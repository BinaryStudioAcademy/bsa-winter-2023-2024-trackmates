import { Link } from "~/libs/components/components.js";
import { AppRoute, AppTitle, PaginationValue } from "~/libs/enums/enums.js";
import { getValidClassNames } from "~/libs/helpers/helpers.js";
import {
	useAppDispatch,
	useAppSelector,
	useAppTitle,
	useEffect,
	useLocation,
	usePagination,
} from "~/libs/hooks/hooks.js";
import { actions } from "~/modules/friends/friends.js";

import { FriendsTab } from "./libs/components/components.js";
import { LINKS } from "./libs/constants/constants.js";
import styles from "./styles.module.css";

const PAGINATION_PAGES_CUT_COUNT = 5;

const Friends: React.FC = () => {
	useAppTitle(AppTitle.FRIENDS);

	const { pathname } = useLocation();
	const dispatch = useAppDispatch();

	const potentialFriendsData = useAppSelector((state) => {
		return {
			items: state.friends.potentialFriends,
			total: state.friends.potentialFriendsTotalCount,
		};
	});
	const potentialFriendsPagination = usePagination({
		pageSize: PaginationValue.DEFAULT_COUNT,
		pagesCutCount: PAGINATION_PAGES_CUT_COUNT,
		totalCount: potentialFriendsData.total,
	});
	useEffect(() => {
		void dispatch(
			actions.getPotentialFriends({
				count: PaginationValue.DEFAULT_COUNT,
				page: potentialFriendsPagination.page,
			}),
		);
	}, [dispatch, potentialFriendsPagination.page]);

	const followersData = useAppSelector((state) => {
		return {
			items: state.friends.followers,
			total: state.friends.followersTotalCount,
		};
	});
	const followersPagination = usePagination({
		pageSize: PaginationValue.DEFAULT_COUNT,
		pagesCutCount: PAGINATION_PAGES_CUT_COUNT,
		totalCount: followersData.total,
	});
	useEffect(() => {
		void dispatch(
			actions.getFollowers({
				count: PaginationValue.DEFAULT_COUNT,
				page: followersPagination.page,
			}),
		);
	}, [dispatch, followersPagination.page]);

	const followingsData = useAppSelector((state) => {
		return {
			items: state.friends.followings,
			total: state.friends.followingsTotalCount,
		};
	});
	const followingsPagination = usePagination({
		pageSize: PaginationValue.DEFAULT_COUNT,
		pagesCutCount: PAGINATION_PAGES_CUT_COUNT,
		totalCount: followingsData.total,
	});
	useEffect(() => {
		void dispatch(
			actions.getFollowings({
				count: PaginationValue.DEFAULT_COUNT,
				page: followingsPagination.page,
			}),
		);
	}, [dispatch, followingsPagination.page]);

	const handleScreenRender = (screen: string): React.ReactNode => {
		switch (screen) {
			case AppRoute.FRIENDS: {
				return (
					<FriendsTab
						items={potentialFriendsData.items}
						pagination={potentialFriendsPagination}
					/>
				);
			}

			case AppRoute.FRIENDS_FOLLOWERS: {
				return (
					<FriendsTab
						items={followersData.items}
						pagination={followersPagination}
					/>
				);
			}

			case AppRoute.FRIENDS_FOLLOWINGS: {
				return (
					<FriendsTab
						items={followingsData.items}
						pagination={followingsPagination}
					/>
				);
			}
		}

		return null;
	};

	return (
		<div className={styles["wrapper"]}>
			<ul className={styles["link-list"]}>
				{LINKS.map((link, index) => (
					<li
						className={getValidClassNames(
							styles["link-item"],
							link.to === pathname && styles["active"],
						)}
						key={index}
					>
						<Link className={styles["link"]} to={link.to}>
							{link.title}
						</Link>
					</li>
				))}
			</ul>
			{handleScreenRender(pathname)}
		</div>
	);
};

export { Friends };
