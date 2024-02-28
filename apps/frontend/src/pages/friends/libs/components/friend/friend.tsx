import friendImage from "~/assets/img/friend.jpeg";
import { Button, Image } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppSelector,
	useCallback,
	useEffect,
	useState,
} from "~/libs/hooks/hooks.js";
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

	const parameters = new URLSearchParams({ user: String(friend.id) });
	const chatRouteByUser =
		`${AppRoute.CHATS}?${parameters.toString()}` as typeof AppRoute.CHATS;

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
			<div className={styles["card-content"]}>
				<Image
					alt="User avatar"
					className={styles["portrait"]}
					src={friendImage}
				/>
				<p className={styles["fullName"]}>
					{friend.firstName} {friend.lastName}
				</p>
			</div>

			<div className={styles["actions"]}>
				<Button
					className={styles["button"]}
					iconName={isFollowing ? "cross" : "add"}
					label={isFollowing ? "Following" : "Follow"}
					onClick={isFollowing ? handleUnfollow : handleFollow}
					size="small"
				/>
				<Button
					className={styles["start-chat"]}
					hasVisuallyHiddenLabel
					href={chatRouteByUser}
					iconName="chats"
					label="Start chat"
					style="primary"
				/>
			</div>
		</article>
	);
};

export { Friend };
