import { AppRoute } from "~/libs/enums/enums.js";
import { getValidClassNames } from "~/libs/helpers/helpers.js";
import { type ValueOf } from "~/libs/types/types.js";

import { Icon, IconName } from "../icon/icon.js";
import { Link } from "../link/link.js";
import styles from "./styles.module.css";

type Properties = {
	className?: string | undefined;
	color?: "primary";
	href?: ValueOf<typeof AppRoute>;
	iconName?: IconName;
	label: string;
	size?: "regular" | "small";
	style?: "filled" | "outlined";
	type?: "button" | "submit";
};

const Button: React.FC<Properties> = ({
	className,
	color = "primary",
	href,
	iconName,
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
					{iconName ? <Icon name={iconName} /> : null}
					{label}
				</Link>
			) : (
				<button className={buttonStyles} type={type}>
					{iconName ? <Icon name={iconName} /> : null}
					{label}
				</button>
			)}
		</>
	);
};

export { Button };
