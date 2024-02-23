import { Link } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/enums.js";
import { getValidClassNames } from "~/libs/helpers/helpers.js";
import {
	useAppDispatch,
	useAppSelector,
	useEffect,
	useLocation,
} from "~/libs/hooks/hooks.js";
import { actions } from "~/modules/friends/friends.js";

import { FriendList } from "./libs/components/components.js";
import { LINKS } from "./libs/constants/constants.js";
import styles from "./styles.module.css";

const Friends: React.FC = () => {
	const { followers, followings, potentialFriends } = useAppSelector(
		({ friends }) => {
			return {
				followers: friends.followers,
				followings: friends.followings,
				potentialFriends: friends.potentialFriends,
			};
		},
	);
	const dispatch = useAppDispatch();
	const { pathname } = useLocation();

	useEffect(() => {
		void dispatch(actions.getFollowings());
		void dispatch(actions.getFollowers());
		void dispatch(actions.getPotentialFriends());
	}, [dispatch]);

	const handleScreenRender = (screen: string): React.ReactNode => {
		switch (screen) {
			case AppRoute.FRIENDS: {
				return <FriendList friends={potentialFriends} />;
			}

			case AppRoute.FRIENDS_FOLLOWERS: {
				return <FriendList friends={followers} />;
			}

			case AppRoute.FRIENDS_FOLLOWINGS: {
				return <FriendList friends={followings} />;
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
