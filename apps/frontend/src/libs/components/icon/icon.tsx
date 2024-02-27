import { getValidClassNames } from "~/libs/helpers/helpers.js";
import { type IconName } from "~/libs/types/types.js";

import { iconNameToSvg } from "./libs/maps/maps.js";
import styles from "./styles.module.css";

type Properties = {
	className?: string | undefined;
	name: IconName;
};

const Icon: React.FC<Properties> = ({ className, name }: Properties) => {
	const IconComponent = iconNameToSvg[name];

	return (
		<IconComponent className={getValidClassNames(styles["icon"], className)} />
	);
};

export { Icon };
