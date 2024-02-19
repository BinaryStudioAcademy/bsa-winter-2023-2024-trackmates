import { AppRoute } from "~/libs/enums/enums.js";
import { getValidClassNames } from "~/libs/helpers/helpers.js";
import { type IconName, type ValueOf } from "~/libs/types/types.js";

import { Icon } from "../icon/icon.js";
import { Link } from "../link/link.js";
import styles from "./styles.module.css";

type Properties = {
	children?: React.ReactNode;
	className?: string | undefined;
	color?: "basic" | "primary" | "secondary";
	hasVisuallyHiddenLabel?: boolean;
	href?: ValueOf<typeof AppRoute>;
	iconName?: IconName;
	label: string;
	onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
	size?: "regular" | "small";
	style?: "filled" | "outlined";
	type?: "button" | "submit";
};

const Button: React.FC<Properties> = ({
	children,
	className,
	color = "primary",
	hasVisuallyHiddenLabel = false,
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
	const labelStyle = getValidClassNames(
		hasVisuallyHiddenLabel && "visually-hidden",
	);

	return (
		<>
			{href ? (
				<Link className={buttonStyles} to={href}>
					{icon}
					{children}
					<span className={labelStyle}>{label}</span>
				</Link>
			) : (
				<button className={buttonStyles} onClick={onClick} type={type}>
					{icon}
					<span className={labelStyle}>{label}</span>
				</button>
			)}
		</>
	);
};

export { Button };
