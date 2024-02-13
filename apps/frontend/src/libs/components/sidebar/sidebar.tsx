import { getValidClassNames } from "~/libs/helpers/helpers.js";

type Properties = {
	className?: string;
};

const Sidebar: React.FC<Properties> = ({ className }: Properties) => {
	return <div className={getValidClassNames(className)}>Sidebar</div>;
};

export { Sidebar };
