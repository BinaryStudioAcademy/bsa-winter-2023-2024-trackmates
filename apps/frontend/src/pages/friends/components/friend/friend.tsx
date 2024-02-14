import { Button, Icon, Image } from "~/libs/components/components.js";

import styles from "./styles.module.css";

type Properties = {
	fullName: string;
	imageUrl: string;
};

const Friend: React.FC<Properties> = ({ fullName, imageUrl }: Properties) => {
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

			<div className={styles["actions"]}>
				<Button
					className={styles["add-friend-action"]}
					color="secondary"
					label={
						<span className={styles["add-friend-action-content"]}>
							<Icon name="add" />
							Add friend
						</span>
					}
					size="small"
				/>

				<div className={styles["send-message-action"]}>
					{/* FOR THE FUTURE MESSAGE */}
				</div>
			</div>
		</div>
	);
};

export { Friend };
