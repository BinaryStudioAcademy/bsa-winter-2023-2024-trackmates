import { Link } from "~/libs/components/components.js";
import { AppRoute, AppTitle } from "~/libs/enums/enums.js";
import { getValidClassNames } from "~/libs/helpers/helpers.js";
import { useAppTitle, useCallback, useLocation } from "~/libs/hooks/hooks.js";
import { actions } from "~/modules/friends/friends.js";

import { FriendsTab } from "./friends-tab.js";
import { LINKS } from "./libs/constants/constants.js";
import styles from "./styles.module.css";

// type State = ReturnType<typeof store.instance.getState>;

// const friendsSelector = (
// 	state: State,
// ): PaginationResponseDto<UserAuthResponseDto> => {
// 	return {
// 		items: state.friends.potentialFriends,
// 		total: state.friends.potentialFriendsTotalCount,
// 	};
// };

// const followersSelector = (
// 	state: State,
// ): PaginationResponseDto<UserAuthResponseDto> => {
// 	return {
// 		items: state.friends.followers,
// 		total: state.friends.followersTotalCount,
// 	};
// };

// const followingsSelector = (
// 	state: State,
// ): PaginationResponseDto<UserAuthResponseDto> => {
// 	return {
// 		items: state.friends.followings,
// 		total: state.friends.followingsTotalCount,
// 	};
// };

const Friends: React.FC = () => {
	useAppTitle(AppTitle.FRIENDS);

	const { pathname } = useLocation();

	const handleScreenRender = useCallback((screen: string): React.ReactNode => {
		switch (screen) {
			case AppRoute.FRIENDS: {
				return (
					<FriendsTab
						action={actions.getPotentialFriends}
						itemsKey="potentialFriends"
						totalKey="potentialFriendsTotalCount"
					/>
				);
			}

			case AppRoute.FRIENDS_FOLLOWERS: {
				return (
					<FriendsTab
						action={actions.getFollowers}
						itemsKey="followers"
						totalKey="followersTotalCount"
					/>
				);
			}

			case AppRoute.FRIENDS_FOLLOWINGS: {
				return (
					<FriendsTab
						action={actions.getFollowings}
						itemsKey="followings"
						totalKey="followingsTotalCount"
					/>
				);
			}
		}

		return null;
	}, []);

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
