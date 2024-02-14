import { Image } from "~/libs/components/components.js";

import styles from "./styles.module.css";

type Properties = {
	fullName: string;
	imageUrl: string;
};

const Friend: React.FC<Properties> = ({ fullName, imageUrl }: Properties) => {
	return (
		<div className={styles["card"]}>
			<div>
				<Image alt={`portrait of ${fullName}`} src={imageUrl} />
				<p>{fullName}</p>
			</div>
		</div>
	);
};

export { Friend };
