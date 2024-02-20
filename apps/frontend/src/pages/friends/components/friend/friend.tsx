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
		void (async () => {
			await dispatch(actions.follow({ id: friend.id })).unwrap();
			setIsFollowing(true);
		})();
	}, [dispatch, friend.id]);

	const handleUnfollow = useCallback(() => {
		void (async () => {
			await dispatch(actions.unfollow({ id: friend.id })).unwrap();
			setIsFollowing(false);
		})();
	}, [dispatch, friend.id]);
	const fullName = `${friend.firstName} ${friend.lastName}`;

	const imageUrl =
		"https://s3-alpha-sig.figma.com/img/e5a8/4d2a/8468b40071144244537e7aa36b4d9354?Expires=1708905600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=YabQdizET7TaHqgYdN~Kai8uMZBSMzSZ0rZL2goz3TgB0QE14X~jzsIvcN5yRmYT~dT5q3Xo33ThriO0QmovboskT6Um5OagC-Zyj-zu40pczDLI7L7-sw15AXjfIWA1G5nPCPPQ30lmLG999MM-LY9v~a1BnhmwDJ1N9r7bPaBOA8PEEmJ4RDSCfnhJC9sDdHUG8-VJGh04amY7NCrKHJjhTYW5iEIlkFiN5pkl7HhTCh-IWckvqZAeB-qTcfhb6AW60gf0IqzzNIO-KeLz1LdpCvSe0Ynty5W4qkLJFwtqCA2jBPkTRfk~iFgspQtBE7Xy3u~0j4EK8dKxx9~RbQ__";

	return (
		<article className={styles["card"]}>
			<div className={styles["card-content"]}>
				<Image
					alt={`portrait of ${fullName}`}
					className={styles["portrait"]}
					src={imageUrl}
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
