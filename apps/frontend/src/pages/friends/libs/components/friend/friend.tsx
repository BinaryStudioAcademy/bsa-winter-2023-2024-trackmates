import friendImage from "~/assets/img/friend.jpeg";
import { Button, Image } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/enums.js";
import { createQueryLink } from "~/libs/helpers/helpers.js";
import {
	useAppDispatch,
	useAppSelector,
	useCallback,
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
	const dispatch = useAppDispatch();

	const chatRouteByUser = createQueryLink(
		AppRoute.CHATS,
		"user",
		String(friend.id),
	) as typeof AppRoute.CHATS;

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
				<p
					className={styles["fullName"]}
				>{`${friend.firstName} ${friend.lastName}`}</p>
			</div>

			<div className={styles["actions"]}>
				<Button
					className={styles["button"]}
					color="primary"
					iconName={isFollowing ? "cross" : "add"}
					label={isFollowing ? "Following" : "Follow"}
					onClick={isFollowing ? handleUnfollow : handleFollow}
					size="small"
				/>
				<Button
					className={styles["start-chat"]}
					color="secondary"
					hasVisuallyHiddenLabel
					href={chatRouteByUser}
					iconName="chats"
					label="Start chat"
					style="outlined"
				/>
			</div>
		</article>
	);
};

export { Friend };
