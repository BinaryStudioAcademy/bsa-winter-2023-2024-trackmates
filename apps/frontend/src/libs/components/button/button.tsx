import { NavLink } from "react-router-dom";

import { AppRoute } from "~/libs/enums/enums.js";
import { concatClasses } from "~/libs/helpers/helpers.js";
import { type ValueOf } from "~/libs/types/types.js";

import classes from "./styles.module.css";

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
	const buttonStyles = concatClasses(
		classes["button"],
		classes[size],
		classes[style],
		classes[color],
	);

	return (
		<>
			{href ? (
				<NavLink className={buttonStyles} to={href}>
					<div>{label}</div>
				</NavLink>
			) : (
				<button className={buttonStyles} type={type}>
					{label}
				</button>
			)}
		</>
	);
};

export { Button };
