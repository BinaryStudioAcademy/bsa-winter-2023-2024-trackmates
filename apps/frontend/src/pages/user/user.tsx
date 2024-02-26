import { Navigate } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/enums.js";
import { useAppSelector, useParams } from "~/libs/hooks/hooks.js";

const User: React.FC = () => {
	const { id } = useParams();
	const { friends } = useAppSelector((state) => {
		return {
			friends: [
				...state.friends.potentialFriends,
				...state.friends.followers,
				...state.friends.followings,
			],
		};
	});

	const friend = friends.find((friend) => friend.id === +(id as string));

	if (!friend) {
		return <Navigate to={AppRoute.FRIENDS} />;
	}

	return `Hello Friend with id ${id}`;
};

export { User };
