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
					icon={<Icon name="add" />}
					label="Add friend"
					size="small"
				/>
			</div>
		</div>
	);
};

export { Friend };
