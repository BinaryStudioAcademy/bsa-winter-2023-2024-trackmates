import { HTMLProps } from "react";

import PlusIcon from "~/assets/img/svg/plus.svg?react";
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
	const Icons: Record<Properties["name"], React.ReactNode> = {
		plus: <PlusIcon {...properties} title="" />,
	};

	return Icons[name];
};

export { Icon };
export { IconName } from "./libs/enums/enums.js";
