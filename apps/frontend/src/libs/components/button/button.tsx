import { AppRoute } from "~/libs/enums/enums.js";
import { getValidClassNames } from "~/libs/helpers/helpers.js";
import { type IconName, type ValueOf } from "~/libs/types/types.js";

import { Icon } from "../icon/icon.js";
import { Link } from "../link/link.js";
import styles from "./styles.module.css";

type Properties = {
	className?: string | undefined;
	color?: "primary";
	href?: ValueOf<typeof AppRoute>;
	iconName?: IconName;
	label?: string;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
	size?: "regular" | "small";
	style?: "clear" | "filled" | "outlined";
	type?: "button" | "submit";
};

const Button: React.FC<Properties> = ({
	className,
	color = "primary",
	href,
	iconName,
	label,
	onClick,
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

	const icon = iconName ? <Icon name={iconName} /> : null;

	return (
		<>
			{href ? (
				<Link className={buttonStyles} to={href}>
					{icon}
					{label}
				</Link>
			) : (
				<button className={buttonStyles} onClick={onClick} type={type}>
					{icon}
					{label}
				</button>
			)}
		</>
	);
};

export { Button };
