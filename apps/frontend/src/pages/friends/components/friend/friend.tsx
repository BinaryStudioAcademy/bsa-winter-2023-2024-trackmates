import { Image } from "~/libs/components/components.js";

import styles from "./styles.module.css";

type Properties = {
	children: React.ReactNode;
	fullName: string;
	imageUrl: string;
};

const Friend: React.FC<Properties> = ({
	children,
	fullName,
	imageUrl,
}: Properties) => {
	return (
		<article className={styles["card"]}>
			<div className={styles["card-content"]}>
				<Image
					alt={`portrait of ${fullName}`}
					className={styles["portrait"]}
					src={imageUrl}
				/>
				<p className={styles["fullName"]}>{fullName}</p>
			</div>

			<div className={styles["actions"]}>{children}</div>
		</article>
	);
};

export { Friend };
