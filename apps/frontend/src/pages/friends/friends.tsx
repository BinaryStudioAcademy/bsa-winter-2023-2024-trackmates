import { Link } from "~/libs/components/components.js";
import { AppRoute, AppTitle } from "~/libs/enums/enums.js";
import { getValidClassNames } from "~/libs/helpers/helpers.js";
import { useAppTitle, useLocation } from "~/libs/hooks/hooks.js";
import { actions, useLoadFriends } from "~/modules/friends/friends.js";

import { FriendsTab } from "./libs/components/components.js";
import { LINKS } from "./libs/constants/constants.js";
import styles from "./styles.module.css";

const Friends: React.FC = () => {
	useAppTitle(AppTitle.FRIENDS);

	const { pathname } = useLocation();

	const { items: potentialFriends, pagination: potentialFriendsPagination } =
		useLoadFriends({
			itemsKey: "potentialFriends",
			loadAction: actions.getPotentialFriends,
			totalKey: "potentialFriendsTotalCount",
		});

	const { items: followers, pagination: followersPagination } = useLoadFriends({
		itemsKey: "followers",
		loadAction: actions.getFollowers,
		totalKey: "followersTotalCount",
	});

	const { items: followings, pagination: followingsPagination } =
		useLoadFriends({
			itemsKey: "followings",
			loadAction: actions.getFollowings,
			totalKey: "followingsTotalCount",
		});

	const handleScreenRender = (screen: string): React.ReactNode => {
		switch (screen) {
			case AppRoute.FRIENDS: {
				return (
					<FriendsTab
						items={potentialFriends}
						pagination={potentialFriendsPagination}
					/>
				);
			}

			case AppRoute.FRIENDS_FOLLOWERS: {
				return (
					<FriendsTab items={followers} pagination={followersPagination} />
				);
			}

			case AppRoute.FRIENDS_FOLLOWINGS: {
				return (
					<FriendsTab items={followings} pagination={followingsPagination} />
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
