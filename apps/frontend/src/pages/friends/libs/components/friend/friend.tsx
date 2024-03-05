import defaultAvatar from "~/assets/img/default-avatar.png";
import { Button, Image, Link } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppSelector,
	useCallback,
	useEffect,
	useLocation,
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

	const { pathname } = useLocation();

	const Parameters = {
		CHAT_PARAMETERS: new URLSearchParams({ user: String(friend.id) }),
		REDIRECT_TO_PARAMETERS: new URLSearchParams({
			redirectTo: pathname,
		}),
	} as const;

	const chatRouteByUser =
		`${AppRoute.CHATS}?${Parameters.CHAT_PARAMETERS.toString()}` as typeof AppRoute.CHATS;

	const userRouteWithRedirect =
		`/users/${friend.id}?${Parameters.REDIRECT_TO_PARAMETERS.toString()}` as ValueOf<
			typeof AppRoute
		>;

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
			<Link className={styles["card-content"]} to={userRouteWithRedirect}>
				<Image
					alt="User avatar"
					className={styles["portrait"]}
					src={friend.avatarUrl ?? defaultAvatar}
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
					style={isFollowing ? "secondary" : "primary"}
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
