import clsx from "clsx";

import { AppRoute } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

import { Link } from "../link/link.js";
import styles from "./styles.module.css";

type Properties = {
	color?: "primary";
	href?: ValueOf<typeof AppRoute>;
	label: string;
	size?: "regular" | "small";
	style?: "filled" | "outlined";
	type?: "button" | "submit";
};

const Button: React.FC<Properties> = ({
	color = "primary",
	href,
	label,
	size = "regular",
	style = "filled",
	type = "button",
}: Properties) => {
	const buttonStyles = clsx(
		styles["button"],
		styles[size],
		styles[style],
		styles[color],
	);

	return (
		<>
			{href ? (
				<Link to={href}>
					<div className={buttonStyles}>{label}</div>
				</Link>
			) : (
				<button className={buttonStyles} type={type}>
					{label}
				</button>
			)}
		</>
	);
};

export { Button };
