import { NavLink } from "react-router-dom";

import { type AppRoute } from "~/libs/enums/enums.js";
import { getValidClassNames } from "~/libs/helpers/helpers.js";
import { type ValueOf } from "~/libs/types/types.js";

import styles from "./styles.module.css";

type Properties = {
	children: React.ReactNode;
	className?: string;
	to: ValueOf<typeof AppRoute>;
};

const Link: React.FC<Properties> = ({
	children,
	className,
	to,
}: Properties) => {
	return (
		<NavLink className={getValidClassNames(className, styles["link"])} to={to}>
			{children}
		</NavLink>
	);
};

export { Link };
