import subscriptionCharacter from "~/assets/img/subscription-character.svg";
import { Button, Image } from "~/libs/components/components.js";
import { useAppSelector } from "~/libs/hooks/hooks.js";
import { SubscriptionPlan } from "~/modules/subscriptions/subscriptions.js";
import { type UserAuthResponseDto } from "~/modules/users/users.js";

import { SUBSCRIPTION_BENEFITS } from "../../constants/constants.js";
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
			<div className={styles["info"]}>
				<div className={styles["content"]}>
					<h3 className={styles["title"]}>Premium subscription</h3>
					<div className={styles["row"]}>
						<div className={styles["col"]}>
							<span className={styles["label"]}>Payment:</span>
							<p className={styles["price"]}>
								USD{" "}
								<span className={styles["price-value"]}>
									${SubscriptionPlan.PRICE}
								</span>{" "}
								/month
							</p>
						</div>
						<div className={styles["col"]}>
							<span className={styles["label"]}>Benefits:</span>
							<ul className={styles["benefits-list"]}>
								{SUBSCRIPTION_BENEFITS.map((benefit) => (
									<li className={styles["benefit-item"]} key={benefit}>
										{benefit}
									</li>
								))}
							</ul>
						</div>
					</div>
					<p className={styles["cover"]}>
						Unlock unlimited access to our extensive library of courses with our
						subscription plan for just $7! Gain exclusive content, dive deeper
						into your interests, and accelerate your learning journey. Subscribe
						today and take your skills to the next level!
					</p>
				</div>
				<Image
					alt="subscription character"
					className={styles["subscription-character"]}
					src={subscriptionCharacter}
				/>
			</div>
			<div className={styles["footer"]}>
				{hasSubscription ? (
					<div className={styles["active-subscription"]}>Active</div>
				) : (
					<Button
						className={styles["button"]}
						label="Subscribe"
						onClick={onSubscribe}
						size="small"
						style="primary"
					/>
				)}
			</div>
		</div>
	);
};

export { SubscriptionDetails };
