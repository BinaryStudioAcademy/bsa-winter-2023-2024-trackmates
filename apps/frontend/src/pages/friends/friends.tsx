import { Link, Loader } from "~/libs/components/components.js";
import { PAGINATION_PAGES_CUT_COUNT } from "~/libs/constants/constants.js";
import {
	AppRoute,
	AppTitle,
	DataStatus,
	PaginationValue,
	QueryParameterName,
} from "~/libs/enums/enums.js";
import { getValidClassNames } from "~/libs/helpers/helpers.js";
import {
	useAppDispatch,
	useAppSelector,
	useAppTitle,
	useEffect,
	useLocation,
	usePagination,
	useSearchParams,
} from "~/libs/hooks/hooks.js";
import { actions } from "~/modules/friends/friends.js";

import { FriendsTab } from "./libs/components/components.js";
import { LINKS } from "./libs/constants/constants.js";
import styles from "./styles.module.css";

const Friends: React.FC = () => {
	useAppTitle(AppTitle.FRIENDS);

	const { pathname } = useLocation();

	const dispatch = useAppDispatch();

	const [queryParameters] = useSearchParams();
	const searchQuery = queryParameters.get(QueryParameterName.SEARCH);

	const { isLoading } = useAppSelector((state) => {
		return {
			isLoading: state.friends.dataStatus === DataStatus.PENDING,
		};
	});

	const friendsData = useAppSelector((state) => {
		switch (pathname) {
			case AppRoute.FRIENDS_FOLLOWERS: {
				return {
					items: state.friends.followers,
					total: state.friends.followersTotalCount,
				};
			}

			case AppRoute.FRIENDS_FOLLOWINGS: {
				return {
					items: state.friends.followings,
					total: state.friends.followingsTotalCount,
				};
			}

			default: {
				return {
					items: state.friends.potentialFriends,
					total: state.friends.potentialFriendsTotalCount,
				};
			}
		}
	});

	const pagination = usePagination({
		pageSize: PaginationValue.DEFAULT_COUNT,
		pagesCutCount: PAGINATION_PAGES_CUT_COUNT,
		totalCount: friendsData.total,
	});

	useEffect(() => {
		switch (pathname) {
			case AppRoute.FRIENDS: {
				void dispatch(
					actions.getPotentialFriends({
						count: PaginationValue.DEFAULT_COUNT,
						page: pagination.page,
						search: searchQuery ?? "",
					}),
				);
				dispatch(actions.clearFollowings());
				break;
			}

			case AppRoute.FRIENDS_FOLLOWERS: {
				void dispatch(
					actions.getFollowers({
						count: PaginationValue.DEFAULT_COUNT,
						page: pagination.page,
						search: searchQuery ?? "",
					}),
				);
				dispatch(actions.clearFollowings());
				break;
			}

			case AppRoute.FRIENDS_FOLLOWINGS: {
				void dispatch(
					actions.getFollowings({
						count: PaginationValue.DEFAULT_COUNT,
						page: pagination.page,
						search: searchQuery ?? "",
					}),
				);
				dispatch(actions.clearFollowings());
				break;
			}
		}
	}, [dispatch, pathname, pagination.page, searchQuery]);

	useEffect(() => {
		void dispatch(actions.getAllFollowingsIds());
	}, [dispatch, pagination.page]);

	const handleScreenRender = (screen: string): React.ReactNode => {
		switch (screen) {
			case AppRoute.FRIENDS: {
				return (
					<FriendsTab
						emptyPlaceholder="There aren't any potential friends"
						items={friendsData.items}
						pagination={pagination}
					/>
				);
			}

			case AppRoute.FRIENDS_FOLLOWERS: {
				return (
					<FriendsTab
						emptyPlaceholder="You don't have any followers yet"
						items={friendsData.items}
						pagination={pagination}
					/>
				);
			}

			case AppRoute.FRIENDS_FOLLOWINGS: {
				return (
					<FriendsTab
						emptyPlaceholder="You aren't following anyone yet"
						items={friendsData.items}
						pagination={pagination}
					/>
				);
			}
		}
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
			{isLoading ? (
				<Loader color="orange" size="large" />
			) : (
				handleScreenRender(pathname)
			)}
		</div>
	);
};

export { Friends };
