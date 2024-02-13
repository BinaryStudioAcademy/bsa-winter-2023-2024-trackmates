import { AppRoute } from "~/libs/enums/enums.js";
import { getValidClassNames } from "~/libs/helpers/helpers.js";
import { type ValueOf } from "~/libs/types/types.js";

import { Link } from "../link/link.js";
import styles from "./styles.module.css";

type Properties = {
	className?: string;
	color?: "primary";
	href?: ValueOf<typeof AppRoute>;
	label: React.ReactNode;
	size?: "regular" | "small";
	style?: "filled" | "outlined";
	type?: "button" | "submit";
};

const Button: React.FC<Properties> = ({
	className,
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
		className,
	);

	return (
		<>
			{href ? (
				<Link className={buttonStyles} to={href}>
					{label}
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
