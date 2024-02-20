import { Button } from "~/libs/components/components.js";
import { useAppDispatch, useCallback, useState } from "~/libs/hooks/hooks.js";
import { actions } from "~/modules/friends/friends.js";
import { type UserAuthResponseDto } from "~/modules/users/users.js";

import { Friend } from "../friend/friend.js";
import styles from "./styles.module.css";

type Properties = {
	friend: UserAuthResponseDto;
};

const PotentialFriend: React.FC<Properties> = ({ friend }: Properties) => {
	const [isRequestSent, setIsRequestSent] = useState(false);
	const dispatch = useAppDispatch();

	const handleSendRequest = useCallback(() => {
		void (async () => {
			await dispatch(
				actions.sendRequest({ receiverUserId: friend.id }),
			).unwrap();
			setIsRequestSent(true);
		})();
	}, [dispatch, friend.id]);

	const fullName = `${friend.firstName} ${friend.lastName}`;
	const imageUrl =
		"https://s3-alpha-sig.figma.com/img/e5a8/4d2a/8468b40071144244537e7aa36b4d9354?Expires=1708905600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=YabQdizET7TaHqgYdN~Kai8uMZBSMzSZ0rZL2goz3TgB0QE14X~jzsIvcN5yRmYT~dT5q3Xo33ThriO0QmovboskT6Um5OagC-Zyj-zu40pczDLI7L7-sw15AXjfIWA1G5nPCPPQ30lmLG999MM-LY9v~a1BnhmwDJ1N9r7bPaBOA8PEEmJ4RDSCfnhJC9sDdHUG8-VJGh04amY7NCrKHJjhTYW5iEIlkFiN5pkl7HhTCh-IWckvqZAeB-qTcfhb6AW60gf0IqzzNIO-KeLz1LdpCvSe0Ynty5W4qkLJFwtqCA2jBPkTRfk~iFgspQtBE7Xy3u~0j4EK8dKxx9~RbQ__";

	return (
		<Friend fullName={fullName} imageUrl={imageUrl}>
			{isRequestSent ? (
				<p className={styles["info"]}>Request has been sent</p>
			) : (
				<Button
					className={styles["button"]}
					color="secondary"
					iconName="add"
					label="Add friend"
					onClick={handleSendRequest}
					size="small"
				/>
			)}
		</Friend>
	);
};

export { PotentialFriend };
