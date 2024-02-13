import { HTMLProps, ReactNode } from "react";

import HomeIcon from "~/assets/img/svg/home.svg?react";
import { type ValueOf } from "~/libs/types/types.js";

import { IconName } from "./libs/enums/enums.js";

type Properties = {
	name: ValueOf<typeof IconName>;
};

type ExtendedProperties = HTMLProps<SVGSVGElement> & Properties;

const Icon: React.FC<ExtendedProperties> = ({
	name,
	...properties
}: ExtendedProperties) => {
	const Icons: Record<Properties["name"], ReactNode> = {
		home: <HomeIcon {...properties} title="" />,
	};

	return Icons[name];
};

export { Icon };
