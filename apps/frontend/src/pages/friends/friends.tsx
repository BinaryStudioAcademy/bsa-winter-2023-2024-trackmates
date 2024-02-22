import { Link } from "~/libs/components/components.js";
import { getValidClassNames } from "~/libs/helpers/helpers.js";
import {
	useAppDispatch,
	useAppSelector,
	useEffect,
	useLocation,
} from "~/libs/hooks/hooks.js";
import { type ValueOf } from "~/libs/types/types.js";
import { actions } from "~/modules/friends/friends.js";

import { FriendList } from "./libs/components/components.js";
import { LINKS } from "./libs/constants/constants.js";
import { Category } from "./libs/enums/enums.js";
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
	const [, category] = useLocation()
		.pathname.split("/")
		.filter((segment) => segment !== "");

	useEffect(() => {
		void dispatch(actions.getFollowings());
		void dispatch(actions.getFollowers());
		void dispatch(actions.getPotentialFriends());
	}, [dispatch]);

	const categoryToFriends = {
		[Category.FOLLOWERS]: <FriendList friends={followers} />,
		[Category.FOLLOWINGS]: <FriendList friends={followings} />,
		[Category.POTENTIAL_FRIENDS]: <FriendList friends={potentialFriends} />,
	};

	return (
		<div className={styles["wrapper"]}>
			<ul className={styles["link-list"]}>
				{LINKS.map((link, index) => (
					<li
						className={getValidClassNames(
							styles["link-item"],
							link.category === category && styles["active"],
						)}
						key={index}
					>
						<Link
							className={styles["link"]}
							to={link.category ? `/friends/${link.category}` : "/friends"}
						>
							{link.title}
						</Link>
					</li>
				))}
			</ul>
			{categoryToFriends[(category ?? "") as ValueOf<typeof Category>]}
		</div>
	);
};

export { Friends };
