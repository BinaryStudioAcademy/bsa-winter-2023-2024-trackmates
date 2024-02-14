import { iconNameToSvg } from "./libs/maps/maps.js";
import { type IconName } from "./libs/types/types.js";

type Properties = {
	name: IconName;
};

const Icon: React.FC<Properties> = ({ name, ...properties }: Properties) => {
	const IconComponent = iconNameToSvg[name];

	return <IconComponent {...properties} />;
};

export { Icon };
