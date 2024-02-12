import clsx from "clsx";

import { AppRoute } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

import { Link } from "../components.js";
import styles from "./styles.module.css";

type Properties = {
	color?: "primary";
	href?: ValueOf<typeof AppRoute>;
	isFluid?: boolean;
	isSmall?: boolean;
	label: string;
	type?: "button" | "submit";
};

const Button: React.FC<Properties> = ({
	color,
	href,
	isFluid,
	isSmall,
	label,
	type = "button",
}: Properties) => {
	const buttonStyles = clsx(
		styles["button"],
		isSmall && styles["small"],
		isFluid && styles["fluid"],
		color && styles[color],
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
