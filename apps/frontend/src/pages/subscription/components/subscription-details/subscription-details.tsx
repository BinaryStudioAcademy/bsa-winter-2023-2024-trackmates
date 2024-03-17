import { Button } from "~/libs/components/components.js";
import { useAppSelector } from "~/libs/hooks/hooks.js";
import { SubscriptionPlan } from "~/modules/subscriptions/subscriptions.js";
import { type UserAuthResponseDto } from "~/modules/users/users.js";

import styles from "./styles.module.css";

type Properties = {
	onSubscribe: () => void;
};

const SubscriptionDetails: React.FC<Properties> = ({
	onSubscribe,
}: Properties) => {
	const { user } = useAppSelector(({ auth }) => {
		return {
			user: auth.user as UserAuthResponseDto,
		};
	});

	const hasSubscription = Boolean(user.subscription);

	return (
		<div className={styles["container"]}>
			<div className={styles["plan-title"]}>PRO</div>
			<div className={styles["content"]}>
				<p className={styles["details-row"]}>
					<span className={styles["label"]}>Price:</span>
					<span className={styles["price"]}>
						${SubscriptionPlan.PRICE} / month{" "}
					</span>
				</p>
				<p className={styles["benefits"]}>
					<span className={styles["label"]}>Benefits:</span>
					<span className={styles["benefit"]}>real-time chat</span>
					<span className={styles["benefit"]}>compare progress</span>
					<span className={styles["benefit"]}>comment others activities</span>
				</p>
			</div>
			{hasSubscription ? (
				<div className={styles["active-label"]}>Active</div>
			) : (
				<Button
					className={styles["subscribe-button"]}
					label="Subscribe"
					onClick={onSubscribe}
				/>
			)}
		</div>
	);
};

export { SubscriptionDetails };
