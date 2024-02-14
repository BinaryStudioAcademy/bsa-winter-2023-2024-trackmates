import { HTMLProps } from "react";

import { iconNameToSvg } from "./libs/maps/maps.js";
import { type IconName } from "./libs/types/types.js";

type Properties = {
	name: IconName;
};

type ExtendedProperties = HTMLProps<SVGSVGElement> & Properties;

const Icon: React.FC<ExtendedProperties> = ({
	name,
	...properties
}: ExtendedProperties) => {
	const IconComponent = iconNameToSvg[name];

	return <IconComponent {...properties} />;
};

export { Icon };
export { IconNames } from "./libs/enums/enums.js";
