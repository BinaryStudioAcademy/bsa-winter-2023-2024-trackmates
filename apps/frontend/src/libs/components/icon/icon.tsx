import { HTMLProps } from "react";

import { getValidClassNames } from "~/libs/helpers/helpers.js";

import { iconNameToSvg } from "./libs/maps/maps.js";
import { IconName } from "./libs/types/types.js";
import styles from "./styles.module.css";

type Properties = {
	name: IconName;
};

const Icon: React.FC<HTMLProps<SVGSVGElement> & Properties> = ({
	className,
	name,
}: HTMLProps<SVGSVGElement> & Properties) => {
	const IconComponent = iconNameToSvg[name];

	return (
		<IconComponent className={getValidClassNames(className, styles["icon"])} />
	);
};

export { Icon };
export { type IconName } from "./libs/types/types.js";
