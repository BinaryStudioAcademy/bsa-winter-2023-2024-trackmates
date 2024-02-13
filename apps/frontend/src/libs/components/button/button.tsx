import { AppRoute } from "~/libs/enums/enums.js";
import { getValidClassNames } from "~/libs/helpers/helpers.js";
import { type ValueOf } from "~/libs/types/types.js";

import { Link } from "../components.js";
import styles from "./styles.module.css";

type Properties = {
	color?: "primary";
	href?: ValueOf<typeof AppRoute>;
	label: string;
	size?: "regular" | "small";
	style?: "filled" | "fulfilled" | "outlined";
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
	const buttonStyles = getValidClassNames(
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
