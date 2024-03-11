import { getValidClassNames } from "~/libs/helpers/helpers.js";

import styles from "./styles.module.css";

type Properties = {
	color: "orange" | "white";
	size: "large" | "medium" | "small";
};

const Loader: React.FC<Properties> = ({ color, size }: Properties) => {
	return (
		<div
			className={getValidClassNames(
				styles["wrapper"],
				styles[color],
				styles[size],
			)}
		>
			<span className={styles["dot"]} />
			<span className={styles["dot"]} />
			<span className={styles["dot"]} />
		</div>
	);
};

export { Loader };
