import defaultAvatar from "~/assets/img/default-avatar.png";
import { Button, Icon, Image, Link } from "~/libs/components/components.js";
import { type AppRoute } from "~/libs/enums/enums.js";
import { getValidClassNames } from "~/libs/helpers/helpers.js";
import {
	useAppDispatch,
	useAppSelector,
	useCallback,
	useEffect,
	useState,
} from "~/libs/hooks/hooks.js";
import { type ValueOf } from "~/libs/types/types.js";
import { actions as chatsActions } from "~/modules/chats/chats.js";
import { actions } from "~/modules/friends/friends.js";
import { type UserAuthResponseDto } from "~/modules/users/users.js";

import styles from "./styles.module.css";

type Properties = {
	friend: UserAuthResponseDto;
};

const Friend: React.FC<Properties> = ({ friend }: Properties) => {
	const [isFollowing, setIsFollowing] = useState<boolean>(
		useAppSelector((state) =>
			state.friends.allFollowingsIds.includes(friend.id),
		),
	);

	const isFollowingFromSelector = useAppSelector((state) =>
		state.friends.allFollowingsIds.includes(friend.id),
	);
	const dispatch = useAppDispatch();

	useEffect(() => {
		setIsFollowing(isFollowingFromSelector);
	}, [isFollowingFromSelector]);

	const handleCreateChat = useCallback(() => {
		void dispatch(chatsActions.createChat(friend.id));
	}, [dispatch, friend.id]);

	const handleFollow = useCallback(() => {
		void dispatch(actions.follow({ id: friend.id }))
			.unwrap()
			.then(() => {
				setIsFollowing(true);
				dispatch(actions.addFollowedFriendId(friend.id));
			});
	}, [dispatch, friend.id]);

	const handleUnfollow = useCallback(() => {
		void dispatch(actions.unfollow({ id: friend.id }))
			.unwrap()
			.then(() => {
				setIsFollowing(false);
				dispatch(actions.removeUnfollowedFriendId(friend.id));
			});
	}, [dispatch, friend.id]);

	const hasSubscription = Boolean(friend.subscription);

	return (
		<article className={styles["card"]}>
			<Link
				className={styles["card-content"]}
				to={`/users/${friend.id}` as ValueOf<typeof AppRoute>}
			>
				{" "}
				<div className={styles["avatar"]}>
					<Image
						alt="User avatar"
						className={getValidClassNames(
							styles["portrait"],
							hasSubscription && styles["premium"],
						)}
						src={friend.avatarUrl ?? defaultAvatar}
					/>
					{hasSubscription && (
						<Icon className={styles["premium-icon"]} name="crown" />
					)}
				</div>
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
					iconName="chats"
					label="Start chat"
					onClick={handleCreateChat}
					style="secondary"
				/>
			</div>
		</article>
	);
};

export { Friend };
