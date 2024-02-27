import { type ValueOf } from "@trackmates/shared";

import friendImage from "~/assets/img/friend.jpeg";
import { Button, Image, Link } from "~/libs/components/components.js";
import { type AppRoute } from "~/libs/enums/enums.js";
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
					src={friendImage}
				/>
				<p
					className={styles["fullName"]}
				>{`${friend.firstName} ${friend.lastName}`}</p>
			</Link>

			<div className={styles["actions"]}>
				<Button
					className={styles["button"]}
					color="primary"
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
