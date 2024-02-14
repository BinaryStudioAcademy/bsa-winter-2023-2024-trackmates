import { HTMLProps } from "react";

import { iconNameToSvg } from "./libs/maps/maps.js";
import { IconName } from "./libs/types/types.js";

type Properties = {
	name: IconName;
};

const Icon: React.FC<HTMLProps<SVGSVGElement> & Properties> = ({
	name,
	...properties
}: HTMLProps<SVGSVGElement> & Properties) => {
	const IconComponent = iconNameToSvg[name];

	return <IconComponent {...properties} />;
};

export { Icon };
export { IconName } from "./libs/types/types.js";
