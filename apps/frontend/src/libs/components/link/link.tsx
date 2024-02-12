import { NavLink } from "react-router-dom";

import { type AppRoute } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

import styles from "./styles.module.css";

type Properties = {
	children: React.ReactNode;
	to: ValueOf<typeof AppRoute>;
};

const Link: React.FC<Properties> = ({ children, to }: Properties) => (
	<NavLink className={styles["link"] as string} to={to}>
		{children}
	</NavLink>
);

export { Link };
