import { HTMLProps } from "react";

import { type ValueOf } from "~/libs/types/types.js";

import { iconNameToSvg } from "./common.js";
import { IconName } from "./libs/enums/enums.js";

type Properties = {
	name: ValueOf<typeof IconName>;
};

type ExtendedProperties = HTMLProps<SVGSVGElement> & Properties;

const Icon: React.FC<ExtendedProperties> = ({
	name,
	...properties
}: ExtendedProperties) => {
	const IconComponent = iconNameToSvg[name];

	return IconComponent ? <IconComponent {...properties} /> : null;
};

export { Icon };
export { IconName } from "./libs/enums/enums.js";
