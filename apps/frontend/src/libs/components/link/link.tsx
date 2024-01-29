import { NavLink } from "react-router-dom";

import { type AppRoute } from "~/libs/enums/enums.ts";
import { type ValueOf } from "~/libs/types/types.ts";

type Properties = {
	children: React.ReactNode;
	to: ValueOf<typeof AppRoute>;
};

const Link: React.FC<Properties> = ({ children, to }: Properties) => (
	<NavLink to={to}>{children}</NavLink>
);

export { Link };
