import { type IconName } from "~/libs/types/types.js";

import { iconNameToSvg } from "./libs/maps/maps.js";
import styles from "./styles.module.css";

type Properties = {
	name: IconName;
};

const Icon: React.FC<Properties> = ({ name }: Properties) => {
	const IconComponent = iconNameToSvg[name];

	return <IconComponent className={styles["icon"]} />;
};

export { Icon };
