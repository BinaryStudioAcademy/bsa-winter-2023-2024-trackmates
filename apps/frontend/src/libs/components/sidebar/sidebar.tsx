import { getValidClassNames } from "~/libs/helpers/helpers.js";

import styles from "./styles.module.css";

type Properties = {
	className?: string;
};

const Sidebar: React.FC<Properties> = ({ className }: Properties) => {
	return (
		<div className={getValidClassNames(className, styles["sidebar-wrapper"])}>
			Sidebar
		</div>
	);
};

export { Sidebar };
