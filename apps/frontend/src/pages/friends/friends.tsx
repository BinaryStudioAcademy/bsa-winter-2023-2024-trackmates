import {
	useAppDispatch,
	useAppSelector,
	useEffect,
	useMemo,
} from "~/libs/hooks/hooks.js";
import { FriendDto } from "~/libs/types/types.js";
import { actions } from "~/modules/friends/friends.js";

import { Friend } from "./components/components.js";
import styles from "./styles.module.css";

const Friends: React.FC = () => {
	const { friends: friendsData } = useAppSelector(({ friends }) => ({
		dataStatus: friends.dataStatus,
		friends: friends.friends,
	}));
	const dispatch = useAppDispatch();

	useEffect(() => {
		void dispatch(actions.loadAll());
	}, [dispatch]);

	const imageUrl =
		"https://s3-alpha-sig.figma.com/img/e5a8/4d2a/8468b40071144244537e7aa36b4d9354?Expires=1708905600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=YabQdizET7TaHqgYdN~Kai8uMZBSMzSZ0rZL2goz3TgB0QE14X~jzsIvcN5yRmYT~dT5q3Xo33ThriO0QmovboskT6Um5OagC-Zyj-zu40pczDLI7L7-sw15AXjfIWA1G5nPCPPQ30lmLG999MM-LY9v~a1BnhmwDJ1N9r7bPaBOA8PEEmJ4RDSCfnhJC9sDdHUG8-VJGh04amY7NCrKHJjhTYW5iEIlkFiN5pkl7HhTCh-IWckvqZAeB-qTcfhb6AW60gf0IqzzNIO-KeLz1LdpCvSe0Ynty5W4qkLJFwtqCA2jBPkTRfk~iFgspQtBE7Xy3u~0j4EK8dKxx9~RbQ__";
	const fullName = "Monica Biluc";

	const friends: FriendDto[] = useMemo(
		() => [
			{ fullName, imageUrl, status: "friend", userId: 1 },
			{ fullName, imageUrl, status: "friend", userId: 2 },
			{ fullName, imageUrl, status: "friend", userId: 3 },
			{ fullName, imageUrl, status: "friend", userId: 4 },
			{ fullName, imageUrl, status: "invited", userId: 5 },
			{ fullName, imageUrl, status: "invited", userId: 6 },
			{ fullName, imageUrl, status: "invited", userId: 7 },
			{ fullName, imageUrl, status: "invited", userId: 8 },
			{ fullName, imageUrl, status: "requested", userId: 9 },
			{ fullName, imageUrl, status: "requested", userId: 10 },
			{ fullName, imageUrl, status: "requested", userId: 11 },
			{ fullName, imageUrl, status: "requested", userId: 12 },
			{ fullName, imageUrl, status: "unknown", userId: 13 },
			{ fullName, imageUrl, status: "unknown", userId: 14 },
			{ fullName, imageUrl, status: "unknown", userId: 15 },
			{ fullName, imageUrl, status: "unknown", userId: 16 },
			...friendsData,
		],
		[friendsData],
	);

	const orderedFriends = useMemo(() => {
		const INVITED = 1;
		const FRIEND = 3;
		const REQUESTED = 2;
		const UNKNOWN = 4;

		const sortOrder: Record<FriendDto["status"], number> = {
			friend: FRIEND,
			invited: INVITED,
			requested: REQUESTED,
			unknown: UNKNOWN,
		};

		const SORT_ORDER = {
			AFTER: 1,
			BEFORE: -1,
			ZERO: 0,
		};
		return [...friends].sort((a, b) =>
			sortOrder[a.status] - sortOrder[b.status] > SORT_ORDER.ZERO
				? SORT_ORDER.AFTER
				: SORT_ORDER.BEFORE,
		);
	}, [friends]);

	return (
		<section className={styles["wrapper"]}>
			{orderedFriends.map((friend) => (
				<Friend key={friend.userId} user={friend} />
			))}
		</section>
	);
};

export { Friends };
