import { type AppRoute } from "~/libs/enums/enums.js";
import { getValidClassNames } from "~/libs/helpers/helpers.js";
import { type IconName, type ValueOf } from "~/libs/types/types.js";

import { Icon } from "../icon/icon.js";
import { Link } from "../link/link.js";
import styles from "./styles.module.css";

type Properties = {
	className?: string | undefined;
	hasVisuallyHiddenLabel?: boolean;
	hoverIconName?: IconName;
	href?: ValueOf<typeof AppRoute>;
	iconName?: IconName;
	isDisabled?: boolean;
	label: string;
	onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
	size?: "regular" | "small";
	style?: "plain" | "primary" | "secondary";
	type?: "button" | "submit";
};

const Button: React.FC<Properties> = ({
	className,
	hasVisuallyHiddenLabel = false,
	hoverIconName,
	href,
	iconName,
	isDisabled = false,
	label,
	onClick,
	size = "regular",
	style = "primary",
	type = "button",
}: Properties) => {
	const buttonStyles = getValidClassNames(
		styles["button"],
		styles[size],
		styles[style],
		className,
		isDisabled && styles["disabled"],
	);

	const icon = iconName ? <Icon name={iconName} /> : null;
	const hoverIcon = hoverIconName ? <Icon name={hoverIconName} /> : icon;
	const labelStyle = getValidClassNames(
		hasVisuallyHiddenLabel && "visually-hidden",
	);

	return (
		<>
			{href ? (
				<Link className={buttonStyles} to={href}>
					{icon}
					<span className={labelStyle}>{label}</span>
				</Link>
			) : (
				<button
					className={buttonStyles}
					disabled={isDisabled}
					onClick={onClick}
					type={type}
				>
					<div className={styles["icon"]}>{icon}</div>
					<div className={styles["hoverIcon"]}>{hoverIcon}</div>
					<span className={labelStyle}>{label}</span>
				</button>
			)}
		</>
	);
};

export { Button };
