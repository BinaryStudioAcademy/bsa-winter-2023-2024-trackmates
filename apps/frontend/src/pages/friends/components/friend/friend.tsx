import { Button, Image } from "~/libs/components/components.js";
import { FriendStatus } from "~/libs/enums/enums.js";
import { getValidClassNames } from "~/libs/helpers/helpers.js";
import { useAppDispatch, useCallback } from "~/libs/hooks/hooks.js";
import { type FriendDto } from "~/libs/types/types.js";
import { actions } from "~/modules/friends/friends.js";

import styles from "./styles.module.css";

type Properties = {
	friend: FriendDto;
};

const Friend: React.FC<Properties> = ({ friend }: Properties) => {
	const dispatch = useAppDispatch();

	const handleAcceptRequest = useCallback(() => {
		void dispatch(actions.acceptRequest(friend.id));
	}, [dispatch, friend.id]);

	const handleDenyRequest = useCallback(() => {
		void dispatch(actions.denyRequest(friend.id));
	}, [dispatch, friend.id]);

	const handleSendRequest = useCallback(() => {
		void dispatch(
			actions.sendRequest({
				receiverUserId: friend.id,
			}),
		);
	}, [dispatch, friend.id]);

	const buttonStyles = styles["button"];
	const imageUrl =
		"https://s3-alpha-sig.figma.com/img/e5a8/4d2a/8468b40071144244537e7aa36b4d9354?Expires=1708905600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=YabQdizET7TaHqgYdN~Kai8uMZBSMzSZ0rZL2goz3TgB0QE14X~jzsIvcN5yRmYT~dT5q3Xo33ThriO0QmovboskT6Um5OagC-Zyj-zu40pczDLI7L7-sw15AXjfIWA1G5nPCPPQ30lmLG999MM-LY9v~a1BnhmwDJ1N9r7bPaBOA8PEEmJ4RDSCfnhJC9sDdHUG8-VJGh04amY7NCrKHJjhTYW5iEIlkFiN5pkl7HhTCh-IWckvqZAeB-qTcfhb6AW60gf0IqzzNIO-KeLz1LdpCvSe0Ynty5W4qkLJFwtqCA2jBPkTRfk~iFgspQtBE7Xy3u~0j4EK8dKxx9~RbQ__";

	const actionsMapping: Record<FriendDto["status"], React.ReactNode> = {
		[FriendStatus.FRIEND]: <p className={styles["info"]}>You are friends</p>,
		[FriendStatus.INVITED]: (
			<>
				<Button
					className={buttonStyles}
					color="success"
					iconName="check"
					label="Accept"
					onClick={handleAcceptRequest}
					size="small"
					type="button"
				/>
				<Button
					className={buttonStyles}
					color="danger"
					iconName="cross"
					label="Deny"
					onClick={handleDenyRequest}
					size="small"
				/>
			</>
		),
		[FriendStatus.REQUESTED]: <p className={styles["info"]}>Request sent</p>,
		[FriendStatus.UNKNOWN]: (
			<Button
				className={buttonStyles}
				color="secondary"
				iconName="add"
				label="Add friend"
				onClick={handleSendRequest}
				size="small"
			/>
		),
	};

	return (
		<article className={styles["card"]}>
			<div className={styles["card-content"]}>
				<Image
					alt={`portrait of ${friend.fullName}`}
					className={styles["portrait"]}
					src={imageUrl}
				/>
				<p className={styles["fullName"]}>{friend.fullName}</p>
			</div>

			<div
				className={getValidClassNames(
					styles["actions"],
					status === FriendStatus.INVITED && styles["actions-invited"],
				)}
			>
				{actionsMapping[friend.status]}
			</div>
		</article>
	);
};

export { Friend };
