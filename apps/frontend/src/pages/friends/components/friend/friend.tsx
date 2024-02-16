import { Button, Image } from "~/libs/components/components.js";
import { getValidClassNames } from "~/libs/helpers/helpers.js";
import { useAppDispatch, useCallback } from "~/libs/hooks/hooks.js";
import { type FriendDto } from "~/libs/types/types.js";
import { actions } from "~/modules/friends/friends.js";

import styles from "./styles.module.css";

type Properties = {
	user: FriendDto;
};

const Friend: React.FC<Properties> = ({ user }: Properties) => {
	const { fullName, imageUrl, status, userId } = user;
	const dispatch = useAppDispatch();

	const handleAcceptRequest = useCallback(() => {
		void dispatch(actions.acceptRequest(userId));
	}, [dispatch, userId]);

	const handleDenyRequest = useCallback(() => {
		void dispatch(actions.denyRequest(userId));
	}, [dispatch, userId]);

	const handleSendRequest = useCallback(() => {
		void dispatch(
			actions.sendRequest({
				userId: userId,
			}),
		);
	}, [dispatch, userId]);

	const buttonStyles = styles["button"];

	let actionsMapping: Record<FriendDto["status"], React.ReactNode> = {
		friend: <p className={styles["info"]}>You are friends</p>,
		invited: (
			<>
				<Button
					className={buttonStyles}
					color="success"
					iconName="check"
					label="Accept"
					onClick={handleAcceptRequest}
					size="small"
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
		requested: <p className={styles["info"]}>Request sent</p>,
		unknown: (
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
		<div className={styles["card"]}>
			<div className={styles["card-content"]}>
				<Image
					alt={`portrait of ${fullName}`}
					className={styles["portrait"]}
					src={imageUrl}
				/>
				<p className={styles["fullName"]}>{fullName}</p>
			</div>

			<div
				className={getValidClassNames(
					styles["actions"],
					status === "invited" ? styles["actions-invited"] : "",
				)}
			>
				{actionsMapping[status]}
			</div>
		</div>
	);
};

export { Friend };
