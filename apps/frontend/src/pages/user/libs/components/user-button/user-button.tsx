import { Button } from "~/libs/components/components.js";
import {
	useAppDispatch,
	useAppSelector,
	useCallback,
	useState,
} from "~/libs/hooks/hooks.js";
import { actions } from "~/modules/friends/friends.js";

type Properties = {
	id: number;
};

const UserButton: React.FC<Properties> = ({ id }: Properties) => {
	const [isFollowing, setIsFollowing] = useState<boolean>(
		useAppSelector((state) =>
			state.friends.followings.some((friend) => friend.id === id),
		),
	);
	const dispatch = useAppDispatch();

	const handleFollow = useCallback(() => {
		void dispatch(actions.follow({ id }))
			.unwrap()
			.then(() => {
				setIsFollowing(true);
			});
	}, [dispatch, id]);

	const handleUnfollow = useCallback(() => {
		void dispatch(actions.unfollow({ id }))
			.unwrap()
			.then(() => {
				setIsFollowing(false);
			});
	}, [dispatch, id]);

	return (
		<Button
			color="primary"
			iconName={isFollowing ? "cross" : "add"}
			label={isFollowing ? "Following" : "Follow"}
			onClick={isFollowing ? handleUnfollow : handleFollow}
			size="small"
		/>
	);
};

export { UserButton };
