import clsx from "clsx";

import { AppRoute } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

import { Link } from "../components.js";
import styles from "./styles.module.css";

type Properties = {
	color?: "primary"; //others are expected to be added in the future
	href?: ValueOf<typeof AppRoute>;
	label: string;
	size?: "regular" | "small";
	style?: "fullfiled" | "outlined";
	type?: "button" | "submit";
};

const Button: React.FC<Properties> = ({
	color = "primary",
	href,
	label,
	size = "regular",
	style = "fullfiled",
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
					<span className={buttonStyles}>{label}</span>
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
