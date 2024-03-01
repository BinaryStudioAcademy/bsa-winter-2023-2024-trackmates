import { Button, Image, Link } from "~/libs/components/components.js";
import { DEFAULT_USER_AVATAR } from "~/libs/constants/constants.js";
import { type AppRoute } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppSelector,
	useCallback,
	useEffect,
	useState,
} from "~/libs/hooks/hooks.js";
import { type ValueOf } from "~/libs/types/types.js";
import { actions } from "~/modules/friends/friends.js";
import { type UserAuthResponseDto } from "~/modules/users/users.js";

import styles from "./styles.module.css";

type Properties = {
	friend: UserAuthResponseDto;
};

const Friend: React.FC<Properties> = ({ friend }: Properties) => {
	const [isFollowing, setIsFollowing] = useState<boolean>(
		useAppSelector((state) =>
			state.friends.followings.some((user) => user.id === friend.id),
		),
	);

	const isFollowingFromSelector = useAppSelector((state) =>
		state.friends.followings.some((user) => user.id === friend.id),
	);
	const dispatch = useAppDispatch();

	useEffect(() => {
		setIsFollowing(isFollowingFromSelector);
	}, [isFollowingFromSelector]);

	const handleFollow = useCallback(() => {
		void dispatch(actions.follow({ id: friend.id }))
			.unwrap()
			.then(() => {
				setIsFollowing(true);
			});
	}, [dispatch, friend.id]);

	const handleUnfollow = useCallback(() => {
		void dispatch(actions.unfollow({ id: friend.id }))
			.unwrap()
			.then(() => {
				setIsFollowing(false);
			});
	}, [dispatch, friend.id]);

	return (
		<article className={styles["card"]}>
			<Link
				className={styles["card-content"]}
				to={`/users/${friend.id}` as ValueOf<typeof AppRoute>}
			>
				<Image
					alt="User avatar"
					className={styles["portrait"]}
					src={friend.avatarUrl ?? DEFAULT_USER_AVATAR}
				/>
				<p
					className={styles["fullName"]}
				>{`${friend.firstName} ${friend.lastName}`}</p>
			</Link>

			<div className={styles["actions"]}>
				<Button
					className={styles["button"]}
					iconName={isFollowing ? "cross" : "add"}
					label={isFollowing ? "Following" : "Follow"}
					onClick={isFollowing ? handleUnfollow : handleFollow}
					size="small"
				/>
			</div>
		</article>
	);
};

export { Friend };
