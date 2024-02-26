import { useCallback } from "react";
import { NavLink } from "react-router-dom";

import { type AppRoute } from "~/libs/enums/enums.js";
import { getValidClassNames } from "~/libs/helpers/helpers.js";
import { type ValueOf } from "~/libs/types/types.js";

import styles from "./styles.module.css";

type Properties = {
	activeClassName?: string | undefined;
	children: React.ReactNode;
	className?: string | undefined;
	to: ValueOf<typeof AppRoute>;
};

const Link: React.FC<Properties> = ({
	activeClassName,
	children,
	className,
	to,
}: Properties) => {
	const linkStyles = useCallback(
		({ isActive }: { isActive: boolean }): string => {
			return getValidClassNames(
				isActive && activeClassName,
				className,
				styles["link"],
			);
		},
		[activeClassName, className],
	);

	return (
		<NavLink className={linkStyles} to={to}>
			{children}
		</NavLink>
	);
};

export { Link };
