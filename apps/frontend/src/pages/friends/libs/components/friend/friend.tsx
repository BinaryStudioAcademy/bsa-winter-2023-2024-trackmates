import friendImage from "~/assets/img/friend.jpeg";
import { Button, Image } from "~/libs/components/components.js";
import {
	useAppDispatch,
	useAppSelector,
	useCallback,
	useState,
} from "~/libs/hooks/hooks.js";
import { actions, selectors } from "~/modules/friends/friends.js";
import { type UserAuthResponseDto } from "~/modules/users/users.js";

import styles from "./styles.module.css";

type Properties = {
	friend: UserAuthResponseDto;
};

const Friend: React.FC<Properties> = ({ friend }: Properties) => {
	const [isFollowing, setIsFollowing] = useState<boolean>(
		useAppSelector((state) =>
			selectors.checkIsFollowingFriend(state, friend.id),
		),
	);
	const dispatch = useAppDispatch();

	const handleFollow = useCallback(() => {
		dispatch(actions.follow({ id: friend.id }))
			.unwrap()
			.then(
				() => {
					setIsFollowing(true);
				},
				() => {},
			);
	}, [dispatch, friend.id]);

	const handleUnfollow = useCallback(() => {
		dispatch(actions.unfollow({ id: friend.id }))
			.unwrap()
			.then(
				() => {
					setIsFollowing(false);
				},
				() => {},
			);
	}, [dispatch, friend.id]);
	const fullName = `${friend.firstName} ${friend.lastName}`;

	return (
		<article className={styles["card"]}>
			<div className={styles["card-content"]}>
				<Image
					alt={`portrait of ${fullName}`}
					className={styles["portrait"]}
					src={friendImage}
				/>
				<p className={styles["fullName"]}>{fullName}</p>
			</div>

			<div className={styles["actions"]}>
				<Button
					className={styles["button"]}
					color="secondary"
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
