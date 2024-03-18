import { getValidClassNames } from "~/libs/helpers/helpers.js";

import styles from "./styles.module.css";

type Properties = {
	className?: string | undefined;
	color: "orange" | "white";
	size: "large" | "small";
};

const Loader: React.FC<Properties> = ({
	className,
	color,
	size,
}: Properties) => {
	return (
		<div
			className={getValidClassNames(
				className,
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
