import { getValidClassNames } from "~/libs/helpers/helpers.js";

import styles from "./styles.module.css";

type Properties = {
	color: "orange" | "white";
};

const Loader: React.FC<Properties> = ({ color }: Properties) => {
	return (
		<div className={styles["wrapper"]}>
			<span className={getValidClassNames(styles["dot"], styles[color])} />
			<span className={getValidClassNames(styles["dot"], styles[color])} />
			<span className={getValidClassNames(styles["dot"], styles[color])} />
		</div>
	);
};

export { Loader };
